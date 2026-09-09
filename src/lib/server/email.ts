/**
 * Transactional email through Resend.
 *
 * Sending needs two DNS records on a domain, not a mailbox and not a mail
 * server. If it is not configured, delivery is skipped and said so in the
 * log: the success page and the saved link are the primary delivery path, so
 * a missing mail key must never fail a purchase.
 */

import { siteUrl } from './stripe';

export interface PlanLinkEmail {
  to: string;
  locale: string;
  planUrl: string;
  tierName: string;
}

function isConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM);
}

const SUBJECTS: Record<string, string> = {
  en: 'Your marathon plan',
  es: 'Tu plan de maratón',
  ko: '마라톤 플랜',
  de: 'Dein Marathonplan',
  fr: 'Ton plan marathon',
};

const BODIES: Record<string, (url: string, tier: string) => string> = {
  en: (url, tier) =>
    `Your ${tier} plan is ready.\n\n${url}\n\nKeep this link: it is how you get back to your plan, on any device. Your paces update whenever you run a fitness check-in, and the plan re-prices every remaining week around it.`,
  es: (url, tier) =>
    `Tu plan ${tier} está listo.\n\n${url}\n\nGuarda este enlace: es como vuelves a tu plan, desde cualquier dispositivo. Tus ritmos se actualizan cada vez que registras tu estado de forma, y el plan recalcula todas las semanas restantes.`,
  ko: (url, tier) =>
    `${tier} 플랜이 준비되었습니다.\n\n${url}\n\n이 링크를 보관하세요. 어떤 기기에서든 플랜으로 돌아올 수 있습니다. 체력 체크인을 할 때마다 페이스가 갱신되고 남은 주차가 다시 계산됩니다.`,
  de: (url, tier) =>
    `Dein ${tier}-Plan ist fertig.\n\n${url}\n\nBewahre diesen Link auf: damit kommst du auf jedem Gerät zu deinem Plan zurück. Deine Paces aktualisieren sich bei jedem Fitness-Check-in, und der Plan rechnet alle verbleibenden Wochen neu.`,
  fr: (url, tier) =>
    `Ton plan ${tier} est prêt.\n\n${url}\n\nConserve ce lien : c'est comme ça que tu retrouves ton plan, sur n'importe quel appareil. Tes allures se mettent à jour à chaque point de forme, et le plan recalcule toutes les semaines restantes.`,
};

export async function sendPlanLink(email: PlanLinkEmail): Promise<boolean> {
  if (!isConfigured()) {
    console.log(
      `[email] not configured, skipping plan link to ${email.to} (${email.planUrl})`,
    );
    return false;
  }

  const locale = email.locale in SUBJECTS ? email.locale : 'en';
  const body = BODIES[locale](email.planUrl, email.tierName);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM,
      reply_to: process.env.MAIL_REPLY_TO || undefined,
      to: [email.to],
      subject: SUBJECTS[locale],
      text: `${body}\n\n${siteUrl()}`,
    }),
  });

  if (!response.ok) {
    console.error(
      `[email] Resend rejected the send: ${response.status} ${await response.text()}`,
    );
    return false;
  }
  return true;
}
