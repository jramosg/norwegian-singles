/**
 * Share card — renders a branded PNG of the user's training paces entirely
 * client-side with the Canvas API (no dependencies). Every card carries the
 * site URL, so a user posting it to Instagram / WhatsApp / Strava effectively
 * advertises the app for free.
 */

import type { Locale } from '../types';

/** One pace row on the card. */
export interface PlanCardRow {
  label: string;
  value: string;
  /** Accent color for the value + dot (hex). */
  color: string;
}

export interface PlanCardData {
  /** Weekly plan tier label, e.g. "6h · Intermediate". */
  planLabel: string;
  /** Formatted 5K time, e.g. "19:30". */
  fiveKLabel: string;
  /** Unit label, e.g. "min/km". */
  unitLabel: string;
  rows: PlanCardRow[];
}

const W = 1080;
const H = 1350;

const COLORS = {
  bgTop: '#141417',
  bgBottom: '#0a0a0b',
  surface: '#1c1c1f',
  border: 'rgba(255,255,255,0.08)',
  textPrimary: '#fafafa',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  accent: '#ef4444',
};

const FONT = `-apple-system, BlinkMacSystemFont, 'Inter Variable', 'Segoe UI', sans-serif`;
const MONO = `'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace`;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const T = {
  es: {
    subtitle: 'Mis ritmos sub-umbral',
    fiveK: '5K',
    tagline: 'Calcula los tuyos gratis en',
  },
  en: {
    subtitle: 'My sub-threshold paces',
    fiveK: '5K',
    tagline: 'Calculate yours free at',
  },
} as const;

/** Draw the card onto a 1080×1350 canvas. */
export function renderPlanCard(
  canvas: HTMLCanvasElement,
  data: PlanCardData,
  locale: Locale,
): void {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const t = T[locale];

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, COLORS.bgTop);
  bg.addColorStop(1, COLORS.bgBottom);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Accent glow top-left
  const glow = ctx.createRadialGradient(180, 120, 0, 180, 120, 720);
  glow.addColorStop(0, 'rgba(239,68,68,0.18)');
  glow.addColorStop(1, 'rgba(239,68,68,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const pad = 90;

  // Header: flag + wordmark
  ctx.textBaseline = 'alphabetic';
  ctx.font = `60px ${FONT}`;
  ctx.fillText('🇳🇴', pad, 175);
  ctx.fillStyle = COLORS.textPrimary;
  ctx.font = `800 52px ${FONT}`;
  ctx.fillText('NORWEGIAN SINGLES', pad + 90, 168);

  // Subtitle
  ctx.fillStyle = COLORS.textSecondary;
  ctx.font = `400 36px ${FONT}`;
  ctx.fillText(t.subtitle, pad, 235);

  // Divider
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, 285);
  ctx.lineTo(W - pad, 285);
  ctx.stroke();

  // Plan tier + 5K chip
  ctx.fillStyle = COLORS.textPrimary;
  ctx.font = `700 46px ${FONT}`;
  ctx.fillText(data.planLabel, pad, 360);

  ctx.fillStyle = COLORS.textMuted;
  ctx.font = `500 34px ${FONT}`;
  ctx.fillText(`${t.fiveK}  `, pad, 415);
  const fiveKLabelW = ctx.measureText(`${t.fiveK}  `).width;
  ctx.fillStyle = COLORS.textSecondary;
  ctx.font = `700 34px ${MONO}`;
  ctx.fillText(data.fiveKLabel, pad + fiveKLabelW, 415);

  // Pace panel
  const panelX = pad;
  const panelY = 470;
  const panelW = W - pad * 2;
  const rowH = 122;
  const panelH = data.rows.length * rowH + 40;
  ctx.fillStyle = COLORS.surface;
  roundRect(ctx, panelX, panelY, panelW, panelH, 36);
  ctx.fill();
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.stroke();

  data.rows.forEach((row, i) => {
    const cy = panelY + 20 + i * rowH + rowH / 2;
    const innerX = panelX + 56;

    // colored dot
    ctx.fillStyle = row.color;
    ctx.beginPath();
    ctx.arc(innerX + 9, cy, 11, 0, Math.PI * 2);
    ctx.fill();

    // label
    ctx.fillStyle = COLORS.textPrimary;
    ctx.font = `600 40px ${FONT}`;
    ctx.textBaseline = 'middle';
    ctx.fillText(row.label, innerX + 44, cy);

    // value (right-aligned) + unit
    ctx.textAlign = 'right';
    ctx.font = `300 30px ${FONT}`;
    ctx.fillStyle = COLORS.textMuted;
    const unitW = ctx.measureText(` ${data.unitLabel}`).width;
    ctx.fillText(` ${data.unitLabel}`, panelX + panelW - 56, cy + 1);
    ctx.font = `800 52px ${MONO}`;
    ctx.fillStyle = row.color;
    ctx.fillText(row.value, panelX + panelW - 56 - unitW, cy);
    ctx.textAlign = 'left';

    // row divider
    if (i < data.rows.length - 1) {
      ctx.strokeStyle = COLORS.border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(innerX, panelY + 20 + (i + 1) * rowH);
      ctx.lineTo(panelX + panelW - 56, panelY + 20 + (i + 1) * rowH);
      ctx.stroke();
    }
  });

  // Footer
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'center';
  ctx.fillStyle = COLORS.textMuted;
  ctx.font = `400 32px ${FONT}`;
  ctx.fillText(t.tagline, W / 2, H - 110);
  ctx.fillStyle = COLORS.accent;
  ctx.font = `800 46px ${FONT}`;
  ctx.fillText('norwegian-singles.app', W / 2, H - 55);
  ctx.textAlign = 'left';
}

/** Render to a PNG Blob. */
export function planCardBlob(
  data: PlanCardData,
  locale: Locale,
): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  renderPlanCard(canvas, data, locale);
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/png'),
  );
}

/**
 * Share the card as an image file (Web Share API) where supported, otherwise
 * download it. Returns 'shared' | 'downloaded' | 'failed'.
 */
export async function sharePlanCard(
  data: PlanCardData,
  locale: Locale,
  shareUrl: string,
): Promise<'shared' | 'downloaded' | 'failed'> {
  try {
    // Web fonts must be ready before drawing or the canvas falls back to serif.
    if (document.fonts?.ready) await document.fonts.ready;
    const blob = await planCardBlob(data, locale);
    if (!blob) return 'failed';

    const file = new File([blob], 'norwegian-singles-plan.png', {
      type: 'image/png',
    });

    const nav = navigator as Navigator & {
      canShare?: (data?: ShareData) => boolean;
    };
    if (nav.canShare?.({ files: [file] })) {
      await nav.share({
        files: [file],
        url: shareUrl,
        title: 'Norwegian Singles',
        text:
          locale === 'es'
            ? 'Mis ritmos sub-umbral 🇳🇴'
            : 'My sub-threshold paces 🇳🇴',
      });
      return 'shared';
    }

    // Fallback: trigger a download.
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
    return 'downloaded';
  } catch {
    return 'failed';
  }
}
