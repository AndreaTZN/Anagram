// Same pattern as globalLenisRef: PageTransition registers its navigate
// function here so components that push routes programmatically (e.g. the
// case "close" button) can still get the exit/enter animation.
export const pageTransitionRef: { current: ((href: string) => void) | null } =
  { current: null };

export function transitionTo(href: string) {
  if (pageTransitionRef.current) {
    pageTransitionRef.current(href);
    return;
  }
  window.location.href = href;
}
