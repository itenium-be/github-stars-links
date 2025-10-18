export type DirectActivation = string | RegExp | { url: string; observe: string };

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
