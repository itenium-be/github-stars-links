import { blackList } from "../blackList";
import { getCurrentUrl } from "../config";
import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/github/watchers/{userName}/{repoName}';

export class GithubWatchersMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?github\.com\/([^/#]+)\/([^/#]+)/);
    if (match) {
      const userName = match[1];
      const repoName = match[2].replace(/\.git$/i, '');

      const url = `https://github.com/${userName.toLowerCase()}/${repoName.toLowerCase()}`
      const urlTester = new RegExp(url, 'i');
      if (urlTester.test(getCurrentUrl())) {
        return null;
      }

      if (blackList.includes(userName)) {
        return null;
      }

      let badgeUrl = badgeUrlTemplate
        .replace('{userName}', userName)
        .replace('{repoName}', repoName);

      return {
        baseUrl: url,
        badgeUrl,
        badgeType: 'githubWatchers',
      };
    }
    return null;
  }
}
