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
  /**
   * Some package sites are SPA and they change
   * location without reloading the page.
   * Set to true to listen to location changes
   * and remove/re-add all the badges when it does
   */
  observeNavigation?: boolean;
  /**
   * By default each badge to a specific repository
   * is only added once. For some pages this adds a
   * badge in a hard-to-see spot. Use this selector
   * to add the same badge there as well.
   */
  extraBadgeSelector?: string;
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
