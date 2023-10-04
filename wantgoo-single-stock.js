// ==UserScript==
// @name         Wantgoo Single Stock
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wantgoo.com/stock/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wantgoo.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  window.addEventListener("focus", () => {
    document.querySelector("#refresh").click();
  });
  // Your code here...
})();
