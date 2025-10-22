import { BadgeMatcher } from "../types";
import { BlueskyFollowersMatcher } from "./BlueskyFollowersMatcher";
import { BlueskyPostsMatcher } from "./BlueskyPostsMatcher";
import { GithubFollowersMatcher } from "./GithubFollowersMatcher";
import { GithubForksMatcher } from "./GithubForksMatcher";
import { GithubGistStarsMatcher } from "./GithubGistStarsMatcher";
import { GithubRepositoryMatcher } from "./GithubRepositoryMatcher";
import { GithubUserMatcher } from "./GithubUserMatcher";
import { GithubWatchersMatcher } from "./GithubWatchersMatcher";
import { HackerNewsKarmaMatcher } from "./HackerNewsKarmaMatcher";
import { RedditUserKarmaMatcher } from "./RedditUserKarmaMatcher";
import { SubredditSubscribersMatcher } from "./SubredditSubscribersMatcher";
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
];
