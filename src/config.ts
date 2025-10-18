export const googleUrl = /^https:\/\/(www.)?google\..*\/search/;

// If not on one of these pages, activate with this shortcut
export const isTheHotkey = (e: KeyboardEvent) => e.ctrlKey && e.altKey && e.code === 'KeyG';

export const getCurrentUrl = () => globalThis.window?.document.location.href.toLowerCase() || '';

/** Workaround for "429 Too Many Requests" from shields.io */
export const shieldsConfig = {
  /** Do this many requests */
  groupPer: 100,
  /** Then, wait this long. */
  waitMs: 3000,

  /** Still got 429? Retry in this many ms. */
  retryMs: 30000,
  /** Wait time multiplier increases for each iteration. */
  attempt: 1,
};
