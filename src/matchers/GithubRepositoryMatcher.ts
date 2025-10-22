import { blackList } from "../blackList";
import { getCurrentUrl } from "../config";
import { BadgeLinkInfo, BadgeMatcher, MatcherResult } from "../types";

const badgeUrlTemplate = 'https://img.shields.io/github/stars/{userName}/{repoName}.svg';

export class GithubRepositoryMatcher implements BadgeMatcher {
  match(link: BadgeLinkInfo): MatcherResult | null {
    const match = link.href.match(/^https?:\/\/(?:www\.)?github\.com\/([^/#]+)\/([^/#?]+)/);
    if (match) {
      const userName = match[1];
      const repoName = match[2].replace(/\.git$/i, '');

      // Do not replace badges on the repo page itself
      const url = `https://github.com/${userName.toLowerCase()}/${repoName.toLowerCase()}`
      const urlTester = new RegExp(url, 'i');
      if (urlTester.test(getCurrentUrl())) {
        return null;
      }

      // Exclude GitHub's own pages
      if (blackList.includes(userName)) {
        return null;
      }

      let badgeUrl = badgeUrlTemplate
        .replace('{userName}', userName)
        .replace('{repoName}', repoName);

      return {
        baseUrl: url,
        badgeUrl,
        badgeType: 'githubRepository',
      };
    }
    return null;
  }
}
