export type AnalyticsEvent =
  | 'training_form_start'
  | 'training_plan_generate'
  | 'language_change'
  | 'plan_share'
  | 'plan_share_image';

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === 'undefined') return;

  const detail = { event, ...payload };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent('nsm:analytics', { detail }));
}
