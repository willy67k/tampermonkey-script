// ==UserScript==
// @name         Youtube Get Dislike
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let url = "";

  setInterval(() => {
    if (url === window.window.location.href) {
      return;
    }
    url = window.window.location.href;

    const urlParams = new URLSearchParams(window.location.search).get("v");

    if (!urlParams) return;

    const inter = setInterval(() => {
      const disBtn = document.querySelector("#segmented-dislike-button button");
      if (disBtn) {
        clearInterval(inter);
        fetch(`https://returnyoutubedislikeapi.com/Votes?videoId=${urlParams}`)
          .then((res) => res.json())
          .then((data) => {
            if (disBtn && !disBtn.querySelector(".dislike")) {
              disBtn.setAttribute("style", "width:auto !important");
              disBtn.insertAdjacentHTML("beforeend", `<span class="dislike">${data.dislikes}</span>`);
            }
          });
      }
    }, 1000);
  }, 1000);

  // Your code here...
})();
