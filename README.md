Github Stars
============

- [Blog post](https://itenium.be/blog/javascript/starify-github-links/)
- [Chrome extension](https://chrome.google.com/webstore/detail/starify-github-repo-links/kpficnopciffopkhjpckhkgmnlakcmig)

Add Github Stars badges to Github project links.  
Activates directly on `activateDirectlyOn` array. For other websites, press `Control + Alt + G`

```javascript
// Defaults +/- to
const activateDirectlyOn = ['stackoverflow.com', 'google.com', 'github.com'];
```

## Example: Google search results

Turn [google results for "react github"](https://www.google.com/search?q=react+github) into:

![When googling "react github"](media/github-stars-google.png 'When googling "react github"')


## Example: Github Awesome list

Turn sindresorhus [awesome-awesome list](https://github.com/sindresorhus/awesome) into:

![sindresorhus/awesome](media/github-stars-awesome.png 'sindresorhus/awesome')


# Testing

```bash
chrome://extensions/
```

- Turn on "Developer mode"
- Load unpacked
- Select this folder


## Test Urls

- [Google](https://www.google.com/search?q=react+github)
- [Github](https://github.com/itenium-be/Mi-Ke)
- [StackOverflow](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm)
- [Bing](https://www.bing.com/search?q=github+react): Bug: shield is distorted
- [npmjs](https://www.npmjs.com/package/react): Bug: when selecting another package, the shield.io does not refresh
- [nuget](https://www.nuget.org/packages/Newtonsoft.Json): Bug: It replaces the link at the bottom with "Release notes" instead of the one at the top...


## CSP Directives

[Developer docs](https://developer.chrome.com/docs/apps/app_external#external)

```js
// Suggestion from docs did not help for github.com
const xhr = new XMLHttpRequest();
xhr.open('GET', shieldUrl, true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  const badge = document.createElement('img');
  badge.src = window.URL.createObjectURL(this.response);
  el.prepend(badge);
};
xhr.send();
```



# Publish

Publishing to the [Chrome Web Store](https://chrome.google.com/webstore/detail/kpficnopciffopkhjpckhkgmnlakcmig)

- Increase version in `manifest.json`
- `gulp` will create `./dist/github-stars.zip`

Upload it to [the store](https://chromewebstore.google.com/) and pick 3 dots > "Developer Dashboard".


```bash
npm install
npm run build

# Or with global Gulp
gulp

# Rebuild on changes
npm run watch
```
