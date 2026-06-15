import PDFDocument from 'pdfkit';
import JSZip from 'jszip';
import type { SavedPlan, Locale, TrainingPaces } from '../../types';
import { formatPace } from '../paces';
import {
  DAYS_OF_WEEK,
  getPlanByHours,
  type DaySession,
  type DoubleDaySession,
  type SubTSession,
} from '../training-plans';
import {
  MARATHON_BUILD,
  getWeekStartDate,
  type MarathonBuildDay,
} from '../marathon-build';
import type { CheckoutOrder } from './order-store';

interface Attachment {
  filename: string;
  content: string;
}

interface WorkoutRow {
  date: string;
  day: string;
  title: string;
  details: string;
  pace: string;
}

const DAY_LABELS: Record<string, { en: string; es: string }> = {
  monday: { en: 'Monday', es: 'Lunes' },
  tuesday: { en: 'Tuesday', es: 'Martes' },
  wednesday: { en: 'Wednesday', es: 'Miércoles' },
  thursday: { en: 'Thursday', es: 'Jueves' },
  friday: { en: 'Friday', es: 'Viernes' },
  saturday: { en: 'Saturday', es: 'Sábado' },
  sunday: { en: 'Sunday', es: 'Domingo' },
};

export async function fulfillPaidOrder(order: CheckoutOrder): Promise<void> {
  if (order.status === 'fulfilled') return;

  const attachments = await buildAttachments(order);
  await sendDeliveryEmail(order, attachments);
}

export async function sendWeeklyReminder(order: CheckoutOrder): Promise<void> {
  const week = order.reminderWeek ?? 1;
  await sendEmail({
    order,
    subject:
      order.locale === 'es'
        ? `Semana ${week} de tu plan Norwegian Singles`
        : `Week ${week} of your Norwegian Singles plan`,
    html: reminderHtml(order, week),
    text: reminderText(order, week),
  });
}

async function buildAttachments(order: CheckoutOrder): Promise<Attachment[]> {
  const planPdf = await renderPlanPdf(order);
  const rows = workoutRows(order.plan, order.locale, order.productId);
  const calendar = renderIcs(order, rows);
  const csv = renderCsv(rows);
  const json = JSON.stringify(
    {
      orderId: order.id,
      productId: order.productId,
      plan: order.plan,
      workouts: rows,
    },
    null,
    2,
  );
  const zip = await renderWorkoutZip({
    calendar,
    csv,
    json,
  });

  return [
    attachment('norwegian-singles-plan.pdf', planPdf),
    attachment('norwegian-singles-calendar.ics', calendar),
    attachment('norwegian-singles-workouts.csv', csv),
    attachment('norwegian-singles-workouts.zip', zip),
  ];
}

async function sendDeliveryEmail(
  order: CheckoutOrder,
  attachments: Attachment[],
): Promise<void> {
  await sendEmail({
    order,
    subject:
      order.locale === 'es'
        ? 'Tu paquete Norwegian Singles'
        : 'Your Norwegian Singles package',
    html: emailHtml(order),
    text: emailText(order),
    attachments,
  });
}

async function sendEmail({
  order,
  subject,
  html,
  text,
  attachments = [],
}: {
  order: CheckoutOrder;
  subject: string;
  html: string;
  text: string;
  attachments?: Attachment[];
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FULFILLMENT_FROM_EMAIL;
  if (!apiKey || !from) {
    throw new Error('Email fulfillment is not configured');
  }

  const supportEmail = process.env.SUPPORT_EMAIL || from;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [order.email],
      reply_to: supportEmail,
      subject,
      html,
      text,
      attachments,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Email delivery failed: ${response.status} ${details}`);
  }
}

function reminderHtml(order: CheckoutOrder, week: number): string {
  const title =
    order.locale === 'es'
      ? `Semana ${week}: mantén la estructura`
      : `Week ${week}: keep the structure`;
  const body =
    order.locale === 'es'
      ? 'Sigue el calendario adjunto que recibiste con tu compra. Prioriza constancia, control en los sub-threshold y recuperación.'
      : 'Follow the calendar you received with your purchase. Prioritize consistency, controlled sub-threshold work, and recovery.';
  return `<h1>${escapeHtml(title)}</h1><p>${escapeHtml(body)}</p><p>Order: ${escapeHtml(order.id)}</p>`;
}

function reminderText(order: CheckoutOrder, week: number): string {
  return order.locale === 'es'
    ? `Semana ${week}: mantén la estructura.\n\nSigue el calendario adjunto que recibiste con tu compra. Prioriza constancia, control en los sub-threshold y recuperación.\n\nPedido: ${order.id}`
    : `Week ${week}: keep the structure.\n\nFollow the calendar you received with your purchase. Prioritize consistency, controlled sub-threshold work, and recovery.\n\nOrder: ${order.id}`;
}

function emailHtml(order: CheckoutOrder): string {
  const title =
    order.locale === 'es' ? 'Tu plan está listo' : 'Your plan is ready';
  const intro =
    order.locale === 'es'
      ? 'Adjuntamos el PDF imprimible, el calendario .ics y los archivos de entreno.'
      : 'Attached are your printable PDF, .ics calendar, and workout export files.';
  return `<h1>${escapeHtml(title)}</h1><p>${escapeHtml(intro)}</p><p>Order: ${escapeHtml(order.id)}</p>`;
}

function emailText(order: CheckoutOrder): string {
  return order.locale === 'es'
    ? `Tu plan está listo.\n\nAdjuntamos el PDF imprimible, calendario .ics y archivos de entreno.\n\nPedido: ${order.id}`
    : `Your plan is ready.\n\nAttached are your printable PDF, .ics calendar, and workout files.\n\nOrder: ${order.id}`;
}

async function renderPlanPdf(order: CheckoutOrder): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 48, size: 'A4' });
  const chunks: Buffer[] = [];
  doc.on('data', (chunk: Buffer) => chunks.push(chunk));

  const finished = new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  const { plan, locale } = order;
  const weekly = getPlanByHours(plan.input.weeklyHours);
  const unitLabel = plan.input.unit === 'km' ? 'min/km' : 'min/mi';

  doc.fontSize(22).text('Norwegian Singles', { continued: false });
  doc.moveDown(0.25);
  doc.fontSize(14).fillColor('#666').text(weekly.label);
  doc.moveDown();
  doc.fillColor('#000').fontSize(11);
  doc.text(`5K: ${formatTime(plan.paces.fiveKSeconds)}`);
  doc.text(
    `Easy pace: ${formatPace(plan.paces.easy, plan.input.unit)} ${unitLabel}`,
  );
  doc.moveDown();

  doc.fontSize(16).text(locale === 'es' ? 'Semana base' : 'Base week');
  doc.moveDown(0.5);
  weekly.days.forEach((session, index) => {
    const day = DAYS_OF_WEEK[index];
    doc
      .fontSize(11)
      .fillColor('#111')
      .text(`${dayLabel(day, locale)}: `, { continued: true })
      .fillColor('#333')
      .text(
        `${sessionTitle(session, locale)} - ${sessionDetails(session, plan.paces, plan.input.unit)}`,
      );
  });

  if (order.productId === 'bundle' && plan.input.marathonDate) {
    doc.addPage();
    doc.fillColor('#000').fontSize(16).text('15-week marathon build');
    doc.moveDown(0.5);
    MARATHON_BUILD.forEach((week) => {
      const start = getWeekStartDate(plan.input.marathonDate!, week.weekNumber);
      doc
        .fontSize(11)
        .fillColor('#111')
        .text(`Week ${week.weekNumber} (${isoDate(start)}): ${week.label}`);
    });
  }

  doc.end();
  return finished;
}

function workoutRows(
  plan: SavedPlan,
  locale: Locale,
  productId: string,
): WorkoutRow[] {
  if (productId === 'bundle' && plan.input.marathonDate) {
    return marathonRows(plan, locale);
  }

  const start = nextMonday(new Date());
  const weekly = getPlanByHours(plan.input.weeklyHours);
  return Array.from({ length: 6 }).flatMap((_, weekIndex) =>
    weekly.days.map((session, dayIndex) => {
      const date = addDays(start, weekIndex * 7 + dayIndex);
      const day = DAYS_OF_WEEK[dayIndex];
      return {
        date: isoDate(date),
        day: dayLabel(day, locale),
        title: sessionTitle(session, locale),
        details: sessionDetails(session, plan.paces, plan.input.unit),
        pace: sessionPace(session, plan.paces, plan.input.unit),
      };
    }),
  );
}

function marathonRows(plan: SavedPlan, locale: Locale): WorkoutRow[] {
  const marathonDate = plan.input.marathonDate!;
  return MARATHON_BUILD.flatMap((week) => {
    const weekStart = getWeekStartDate(marathonDate, week.weekNumber);
    return week.days.map((day, index) => {
      const date = addDays(weekStart, index);
      return {
        date: isoDate(date),
        day: dayLabel(DAYS_OF_WEEK[index], locale),
        title: marathonTitle(day, locale),
        details: marathonDetails(day, plan.paces, plan.input.unit),
        pace: marathonPace(day, plan.paces, plan.input.unit),
      };
    });
  });
}

function renderIcs(order: CheckoutOrder, rows: WorkoutRow[]): string {
  const now = icsDateTime(new Date());
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Norwegian Singles//Training Plan//EN',
    'CALSCALE:GREGORIAN',
    ...rows.flatMap((row) => [
      'BEGIN:VEVENT',
      `UID:${order.id}-${row.date}@norwegian-singles.app`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${row.date.replaceAll('-', '')}`,
      `SUMMARY:${icsEscape(row.title)}`,
      `DESCRIPTION:${icsEscape(`${row.details}${row.pace ? ` | ${row.pace}` : ''}`)}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ].join('\r\n');
}

function renderCsv(rows: WorkoutRow[]): string {
  return [
    ['date', 'day', 'title', 'details', 'pace'].join(','),
    ...rows.map((row) =>
      [row.date, row.day, row.title, row.details, row.pace]
        .map(csvEscape)
        .join(','),
    ),
  ].join('\n');
}

async function renderWorkoutZip(files: {
  calendar: string;
  csv: string;
  json: string;
}): Promise<Buffer> {
  const zip = new JSZip();
  zip.file('calendar.ics', files.calendar);
  zip.file('workouts.csv', files.csv);
  zip.file('training-plan.json', files.json);
  return zip.generateAsync({ type: 'nodebuffer' });
}

function attachment(filename: string, content: Buffer | string): Attachment {
  return {
    filename,
    content: Buffer.isBuffer(content)
      ? content.toString('base64')
      : Buffer.from(content).toString('base64'),
  };
}

function sessionTitle(session: DaySession, locale: Locale): string {
  if (session.kind === 'rest') return locale === 'es' ? 'Descanso' : 'Rest';
  if (session.kind === 'easy')
    return locale === 'es' ? 'Rodaje fácil' : 'Easy run';
  if (session.kind === 'double')
    return locale === 'es' ? 'Doble rodaje fácil' : 'Double easy run';
  return `${session.reps} x ${session.repDurationMin} min`;
}

function sessionDetails(
  session: DaySession,
  paces: TrainingPaces,
  unit: 'km' | 'mile',
): string {
  if (session.kind === 'rest') return '';
  if (session.kind === 'easy') return `${session.durationMin} min`;
  if (session.kind === 'double') {
    const double = session as DoubleDaySession;
    return `AM ${double.morning.durationMin} min / PM ${double.afternoon.durationMin} min`;
  }
  const subT = session as SubTSession;
  const pace = formatPace(paces[subT.paceColumn], unit);
  return `${subT.totalDurationMin} min total, ${subT.recoverySeconds}s recovery, ${pace}`;
}

function sessionPace(
  session: DaySession,
  paces: TrainingPaces,
  unit: 'km' | 'mile',
): string {
  if (session.kind !== 'subT') return '';
  return formatPace(paces[(session as SubTSession).paceColumn], unit);
}

function marathonTitle(day: MarathonBuildDay, locale: Locale): string {
  if (day.kind === 'rest') return locale === 'es' ? 'Descanso' : 'Rest';
  if (day.kind === 'easy') return locale === 'es' ? 'Rodaje fácil' : 'Easy run';
  if (day.kind === 'race') return day.raceName;
  if (day.kind === 'marathon_specific') return 'Marathon pace workout';
  return 'Sub-threshold workout';
}

function marathonDetails(
  day: MarathonBuildDay,
  paces: TrainingPaces,
  unit: 'km' | 'mile',
): string {
  if (day.kind === 'rest') return '';
  if (day.kind === 'easy') return `${day.durationMin} min`;
  if (day.kind === 'race') return day.raceName;
  const distance =
    day.distanceM >= 1000 ? `${day.distanceM / 1000} km` : `${day.distanceM} m`;
  const reps = day.reps === 1 ? distance : `${day.reps} x ${distance}`;
  return `${reps}, ${day.totalDurationMin} min total, ${marathonPace(day, paces, unit)}`;
}

function marathonPace(
  day: MarathonBuildDay,
  paces: TrainingPaces,
  unit: 'km' | 'mile',
): string {
  if (day.kind === 'subT') return formatPace(paces[day.paceColumn], unit);
  if (day.kind === 'marathon_specific')
    return formatPace(paces.marathonPace, unit);
  if (day.kind === 'easy') return formatPace(paces.easy, unit);
  return '';
}

function dayLabel(day: string, locale: Locale): string {
  return DAY_LABELS[day]?.[locale] ?? day;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function nextMonday(from: Date): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const offset = day === 1 ? 0 : (8 - day) % 7;
  d.setDate(d.getDate() + offset);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function icsDateTime(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

function icsEscape(value: string): string {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll(';', '\\;')
    .replaceAll(',', '\\,')
    .replaceAll('\n', '\\n');
}

function csvEscape(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
