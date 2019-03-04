Github Stars
============

Add Github Stars shields to Github links.  
Activates directly on `activateDirectlyOn` array. For other websites, press `Control + Alt + G`

```javascript
// Defaults +/- to
const activateDirectlyOn = ['https://stackoverflow.com', 'https://google.com'];
```

## Example: Google search results

![When googling "react github"](github-stars-google.png 'When googling "react github"')



CSP Fun
-------

will need to either include resources locally or work around Github's CSP
```
fetch('https://img.shields.io/github/stars/laoujin/dotfiles.svg?style=social&label=Star')
	.then(x => console.log(x));
```

Just great... Github itself blocks it with CSP.
Would need to include the svg + call the Github API to get the info?


```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70" height="20">
  <style>a #llink:hover{fill:url(#b);stroke:#ccc}a #rlink:hover{fill:#4183c4}</style>
  <linearGradient id="a" x2="0" y2="100%"><stop offset="0" stop-color="#fcfcfc" stop-opacity="0"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#ccc" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
  <g stroke="#d5d5d5"><rect stroke="none" fill="#fcfcfc" x=".5" y=".5" width="50" height="19" rx="2"/>
  <rect y=".5" x="56.5" width="13" height="19" rx="2" fill="#fafafa"/>
  <path stroke="#fafafa" d="M56 7.5h.5v5h-.5z"/>
  <path d="M56.5 6.5l-3 3v1l3 3" stroke="d5d5d5" fill="#fafafa"/></g>
  <image x="5" y="3" width="14" height="14" xlink:href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMTgxNzE3IiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R2l0SHViIGljb248L3RpdGxlPjxwYXRoIGQ9Ik0xMiAuMjk3Yy02LjYzIDAtMTIgNS4zNzMtMTIgMTIgMCA1LjMwMyAzLjQzOCA5LjggOC4yMDUgMTEuMzg1LjYuMTEzLjgyLS4yNTguODItLjU3NyAwLS4yODUtLjAxLTEuMDQtLjAxNS0yLjA0LTMuMzM4LjcyNC00LjA0Mi0xLjYxLTQuMDQyLTEuNjFDNC40MjIgMTguMDcgMy42MzMgMTcuNyAzLjYzMyAxNy43Yy0xLjA4Ny0uNzQ0LjA4NC0uNzI5LjA4NC0uNzI5IDEuMjA1LjA4NCAxLjgzOCAxLjIzNiAxLjgzOCAxLjIzNiAxLjA3IDEuODM1IDIuODA5IDEuMzA1IDMuNDk1Ljk5OC4xMDgtLjc3Ni40MTctMS4zMDUuNzYtMS42MDUtMi42NjUtLjMtNS40NjYtMS4zMzItNS40NjYtNS45MyAwLTEuMzEuNDY1LTIuMzggMS4yMzUtMy4yMi0uMTM1LS4zMDMtLjU0LTEuNTIzLjEwNS0zLjE3NiAwIDAgMS4wMDUtLjMyMiAzLjMgMS4yMy45Ni0uMjY3IDEuOTgtLjM5OSAzLS40MDUgMS4wMi4wMDYgMi4wNC4xMzggMyAuNDA1IDIuMjgtMS41NTIgMy4yODUtMS4yMyAzLjI4NS0xLjIzLjY0NSAxLjY1My4yNCAyLjg3My4xMiAzLjE3Ni43NjUuODQgMS4yMyAxLjkxIDEuMjMgMy4yMiAwIDQuNjEtMi44MDUgNS42MjUtNS40NzUgNS45Mi40Mi4zNi44MSAxLjA5Ni44MSAyLjIyIDAgMS42MDYtLjAxNSAyLjg5Ni0uMDE1IDMuMjg2IDAgLjMxNS4yMS42OS44MjUuNTdDMjAuNTY1IDIyLjA5MiAyNCAxNy41OTIgMjQgMTIuMjk3YzAtNi42MjctNS4zNzMtMTItMTItMTIiLz48L3N2Zz4="/><g fill="#333" text-anchor="middle" font-family="Helvetica Neue,Helvetica,Arial,sans-serif" font-weight="700" font-size="110">
  <text x="335" y="150" fill="#fff" transform="scale(.1)" textLength="230">Star</text>
  <text x="335" y="140" transform="scale(.1)" textLength="230">Star</text>
  <text x="625" y="150" fill="#fff" transform="scale(.1)" textLength="50">6</text>
  <a target="_blank" xlink:href="https://github.com/laoujin/dotfiles/stargazers">
  <text id="rlink" x="625" y="140" transform="scale(.1)" textLength="50" lengthAdjust="spacing">6</text></a>
  </g><a target="_blank" xlink:href="https://github.com/laoujin/dotfiles">
  <rect id="llink" stroke="#d5d5d5" fill="url(#a)" x=".5" y=".5" width="50" height="19" rx="2"/></a></svg>
```

TODO
----

Pay attention to:  
- xxx.github.io link back to github.com?
- Check if there already is a badge?
- Check if path is at raw.githubcontent? or at /tree/master/filename?
- also work with gists?
