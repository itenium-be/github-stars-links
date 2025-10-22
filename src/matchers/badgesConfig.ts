import { BadgeMatcher } from "../types";
import { GithubFollowersMatcher } from "./GithubFollowersMatcher";
import { GithubRepositoryMatcher } from "./GithubRepositoryMatcher";
import { GithubUserMatcher } from "./GithubUserMatcher";

export const badgesConfig: BadgeMatcher[] = [
  new GithubRepositoryMatcher(),
  new GithubUserMatcher(),
  new GithubFollowersMatcher(),
];
