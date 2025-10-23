import { BadgeMatcher } from "../types";
import { BlueskyFollowersMatcher } from "./BlueskyFollowersMatcher";
import { BlueskyPostsMatcher } from "./BlueskyPostsMatcher";
import { GithubFollowersMatcher } from "./GithubFollowersMatcher";
import { GithubForksMatcher } from "./GithubForksMatcher";
import { GithubGistStarsMatcher } from "./GithubGistStarsMatcher";
import { GithubRepositoryMatcher } from "./GithubRepositoryMatcher";
import { GithubUserMatcher } from "./GithubUserMatcher";
import { GithubWatchersMatcher } from "./GithubWatchersMatcher";
import { GitlabForksMatcher } from "./GitlabForksMatcher";
import { GitlabStarsMatcher } from "./GitlabStarsMatcher";
import { HackerNewsKarmaMatcher } from "./HackerNewsKarmaMatcher";
import { HangarStarsMatcher } from "./HangarStarsMatcher";
import { HangarWatchersMatcher } from "./HangarWatchersMatcher";
import { LemmyMatcher } from "./LemmyMatcher";
// import { MastodonFollowMatcher } from "./MastodonFollowMatcher";
import { ModrinthFollowersMatcher } from "./ModrinthFollowersMatcher";
import { NostrBandFollowersMatcher } from "./NostrBandFollowersMatcher";
import { RedditUserKarmaMatcher } from "./RedditUserKarmaMatcher";
import { SubredditSubscribersMatcher } from "./SubredditSubscribersMatcher";
import { ThunderstoreLikesMatcher } from "./ThunderstoreLikesMatcher";
import { TwitchStatusMatcher } from "./TwitchStatusMatcher";
import { TwitterFollowMatcher } from "./TwitterFollowMatcher";
import { TwitterUrlMatcher } from "./TwitterUrlMatcher";
import { YoutubeChannelSubscribersMatcher } from "./YoutubeChannelSubscribersMatcher";
import { YoutubeChannelViewsMatcher } from "./YoutubeChannelViewsMatcher";
import { YoutubeVideoCommentsMatcher } from "./YoutubeVideoCommentsMatcher";
import { YoutubeVideoLikesMatcher } from "./YoutubeVideoLikesMatcher";
import { YoutubeVideoViewsMatcher } from "./YoutubeVideoViewsMatcher";

export const badgesConfig: BadgeMatcher[] = [
  new GithubRepositoryMatcher(),
  new GithubUserMatcher(),
  new GithubFollowersMatcher(),
  new GithubGistStarsMatcher(),
  new GithubWatchersMatcher(),
  new GithubForksMatcher(),
  new GitlabStarsMatcher(),
  new GitlabForksMatcher(),
  new SubredditSubscribersMatcher(),
  new RedditUserKarmaMatcher(),
  new BlueskyFollowersMatcher(),
  new BlueskyPostsMatcher(),
  new HackerNewsKarmaMatcher(),
  new TwitchStatusMatcher(),
  new YoutubeVideoViewsMatcher(),
  new YoutubeVideoLikesMatcher(),
  new YoutubeVideoCommentsMatcher(),
  new YoutubeChannelViewsMatcher(),
  new YoutubeChannelSubscribersMatcher(),
  new TwitterUrlMatcher(),
  new TwitterFollowMatcher(),
  new ThunderstoreLikesMatcher(),
  new NostrBandFollowersMatcher(),
  new ModrinthFollowersMatcher(),
  // new MastodonFollowMatcher(),
  new LemmyMatcher(),
  new HangarWatchersMatcher(),
  new HangarStarsMatcher(),
];
