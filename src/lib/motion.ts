/**
 * The site's two motion moments, and nothing else:
 *  1. the threshold chart drawing itself in the hero, and
 *  2. manifesto words sharpening into focus as they scroll past.
 *
 * Layout.astro adds `motion-ok` to <html> before paint when the visitor
 * has not asked for reduced motion. CSS uses that class to set the
 * starting state; this module animates from it. If this module never
 * runs, Layout removes the class again so nothing stays hidden.
 */

type MotionWindow = Window & { __nsMotionReady?: boolean };

export async function initMotion(): Promise<void> {
  const root = document.documentElement;
  if (!root.classList.contains('motion-ok')) return;

  const chart = document.querySelector<HTMLElement>('[data-threshold-chart]');
  const manifestos = document.querySelectorAll<HTMLElement>(
    '[data-reveal-words]',
  );
  if (!chart && manifestos.length === 0) {
    (window as MotionWindow).__nsMotionReady = true;
    return;
  }

  const { gsap } = await import('gsap');
  (window as MotionWindow).__nsMotionReady = true;

  if (chart) {
    const line = chart.querySelector('[data-draw="line"]');
    const curve = chart.querySelector('[data-draw="curve"]');
    const label = chart.querySelector('.tc-label');
    gsap
      .timeline({ defaults: { ease: 'power2.inOut' } })
      .to(line, { clipPath: 'inset(-10% 0% -10% 0)', duration: 1 }, 0.15)
      .to(label, { opacity: 1, duration: 0.4 }, 0.7)
      .to(
        curve,
        { clipPath: 'inset(-10% 0% -10% 0)', duration: 2.8, ease: 'none' },
        0.6,
      );
  }

  if (manifestos.length > 0) {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    manifestos.forEach((el) => {
      const words = splitWords(el);
      gsap.fromTo(
        words,
        { opacity: 0.14, filter: 'blur(6px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        },
      );
    });
  }
}

/** Wrap each word in a span, keeping screen readers on the full text. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent?.trim() ?? '';
  const readable = document.createElement('span');
  readable.className = 'sr-only';
  readable.textContent = text;
  el.textContent = '';
  el.append(readable);
  return text.split(/\s+/).map((word, i) => {
    if (i > 0) el.append(document.createTextNode(' '));
    const span = document.createElement('span');
    span.className = 'rw';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = word;
    el.append(span);
    return span;
  });
}
