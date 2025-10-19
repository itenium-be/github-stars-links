export type DirectActivation = {
  url: string | RegExp;
  /**
   * A CSS Selector to observe in
   * which Github links get added
   **/
  observe?: string;
  /**
   * When false, do not replace the a.href text
   * This is disabled on npmjs.com for example,
   * because it breaks badge adding after searching+navigating to a different package
   **/
  replaceText?: boolean;
}

export type BadgeInfo = {
  url: string;
  userName: string;
  repoName: string;
  el: HTMLAnchorElement;
}

export type BadgeLinkInfo = {
  href: string;
  el: HTMLAnchorElement;
}
