Github Stars
============

- [Blog post](https://itenium.be/blog/javascript/starify-github-links/)
- [Chrome extension](https://chrome.google.com/webstore/detail/starify-github-repo-links/kpficnopciffopkhjpckhkgmnlakcmig/related)

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

# Publish

Publishing to the [Chrome Web Store](https://chrome.google.com/webstore/detail/kpficnopciffopkhjpckhkgmnlakcmig)

- Increase version in `manifest.json`
- `gulp` will create `./dist/github-stars.zip`

Upload it the store.


```bash
npm install
npm run build

# Or with global Gulp
gulp
```
