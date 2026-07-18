export const LOADING_REVEAL_EVENT = "imperial:loading-reveal";

export function dispatchLoadingReveal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LOADING_REVEAL_EVENT));
}

export function onLoadingReveal(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => callback();
  window.addEventListener(LOADING_REVEAL_EVENT, handler);
  return () => window.removeEventListener(LOADING_REVEAL_EVENT, handler);
}
