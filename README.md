Starify Links
=============

- [Blog post](https://itenium.be/blog/javascript/starify-github-links/)
- [Chrome extension](https://chrome.google.com/webstore/detail/starify-github-repo-links/kpficnopciffopkhjpckhkgmnlakcmig)

Add Stars badges to GitHub links, Reddit users, Wordpress plugins, Youtube channels, Chrome/Firefox add-ins, ...  
Activates directly on `activateDirectlyOn` array (in `src/directActivation.ts`). For other websites, press `Alt + Shift + S` (configure in `chrome://extensions/shortcuts`)

`activateDirectlyOn` includes:
- Search engines (Google, Bing, ...)
- GitHub (awesome lists!)
- Package managers (npmjs, nuget, ...)


# Development

```bash
npm install
npm run typescript
npm run watch
```

Do need to click reload in `chrome://extensions` after each change to the code.

## Tests

```bash
# Run tests against our custom made html files
npm run test:unit

# Run tests against live whitelisted websites
npm run test:e2e

# Debug tests
npm run test:ui
npm run test:debug
```


# Publish

Publishing to the [Chrome Web Store](https://chrome.google.com/webstore/detail/kpficnopciffopkhjpckhkgmnlakcmig)

- Increase version in `manifest.json` (and `package.json`)
- `gulp` will create `./dist/github-stars.zip`

```bash
npm run build
```

Upload it to [the store](https://chromewebstore.google.com/) and pick 3 dots > "Developer Dashboard".



# Testing

```bash
chrome://extensions/
```

- Turn on "Developer mode"
- Load unpacked
- Select this folder


## Test Urls

- Search Engines
  - [Google](https://www.google.com/search?q=react+github)
  - [Bing](https://www.bing.com/search?q=github+react): [Not implemented](https://github.com/itenium-be/github-stars-links/issues/17) (who uses Bing anyway)
  - [DuckDuckGo](https://duckduckgo.com/?q=github+react)
- [GitHub](https://github.com/itenium-be/Mi-Ke)
  - [Same GitHub](https://github.com/itenium-be/Mi-Ke)
  - [Link with .git](https://github.com/itenium-be/Git-NumberedAdd.git)
  - [Unexisting Repo](https://github.com/itenium-be/RepoNotFound): Would need to do a XMLHttpRequest so the returned content svg content can be examined for "Repo not found"
- [StackOverflow](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm)
- Package Managers
  - [npmjs](https://www.npmjs.com/package/react)
  - [nuget](https://www.nuget.org/packages/Newtonsoft.Json)
  - [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
  - [pypi](https://pypi.org/project/requests/)
  - [rubygems](https://rubygems.org/gems/rails)
  - [crates](https://crates.io/crates/serde/1.0.228)
  - [pkg.go](https://pkg.go.dev/github.com/gin-gonic/gin)
- Other badges:
  - [Github Gist](https://gist.github.com/Laoujin/12f5d2f76d51ee6c0a49)
  - [Subreddit](https://www.reddit.com/r/ProgrammerHumor/?tl=en)
  - [Reddit User](https://www.reddit.com/user/spez)
  - [Bluesky Followers](https://bsky.app/profile/bsky.app)
  - [Hackernews Karma](https://news.ycombinator.com/user?id=pg)
  - [Twitch Status](https://www.twitch.tv/shroud)
  - [Youtube Channel](https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ/videos)
  - [Youtube Video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
  - [Gitlab Repository](https://gitlab.com/gitlab-org/gitlab)
  - [Lemmy Subsribers](https://lemmy.ml/c/technology)
  - [Wordpress Plugins/Themes](https://wordpress.org/plugins/akismet/)
  - [Chrome Extension Users](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)
  - [Firefox Addon Users](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/)


# Similar Extensions

- [GitHub Stargazer](https://chromewebstore.google.com/detail/github-stargazer/pncmfniapibeljknpeoplfkhacmhobbk)
- [GitHub Star Count](https://chromewebstore.google.com/detail/github-star-count/jahogeehepfohgakggfeeimokcgnmdid?hl=en)


# Examples

## Example: Google search results

Turn [google results for "react github"](https://www.google.com/search?q=react+github) into:

![When googling "react github"](media/github-stars-google.png 'When googling "react github"')


## Example: GitHub Awesome list

Turn sindresorhus [awesome-awesome list](https://github.com/sindresorhus/awesome) into:

![sindresorhus/awesome](media/github-stars-awesome.png 'sindresorhus/awesome')


## Example: Other Socials etc

And a whole bunch of other badges!

![other-links](media/other-links.png 'other-links')
