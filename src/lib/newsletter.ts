/**
 * Retest-reminder signup, posted to an email provider's embedded form.
 *
 * Defaults follow MailerLite's embedded form fields. Paste the form's
 * action URL (e.g. https://assets.mailerlite.com/jsonp/<account>/forms/
 * <form>/subscribe) into `action`; while it is empty the signup is hidden.
 * The provider handles double opt-in, unsubscribes and the 6-week email.
 */
export const NEWSLETTER = {
  action:
    'https://assets.mailerlite.com/jsonp/2772369/forms/203325435304478081/subscribe',
  fields: {
    email: 'fields[email]',
    locale: 'fields[locale]',
    planUrl: 'fields[plan_url]',
    retestDate: 'fields[retest_date]',
  },
  extra: { 'ml-submit': '1', anticsrf: 'true' } as Record<string, string>,
} as const;

/** Days until the suggested retest (the method retests every ~6 weeks). */
export const RETEST_AFTER_DAYS = 42;

export function retestDate(from: Date, days = RETEST_AFTER_DAYS): string {
  const date = new Date(from);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
