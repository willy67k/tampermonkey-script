// ==UserScript==
// @name         Wantgoo Stocklists
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wantgoo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wantgoo.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const btn = document.querySelector("#serp-result button");
  if (!btn) return;
  btn.style.cssText = `
  position: fixed;
  width: 100px;
  bottom: 30px;
  right: 25px;
  z-index: 99;
  `;

  let url = `https://funny-database.onrender.com`;

  let headers = {
    "Content-Type": "application/json",
  };

  async function getStock() {
    const res = await fetch(`${url}/api/get-stocks`);
    const data = await res.json();
    return data;
  }

  function updateStock(body) {
    fetch(`${url}/api/update-stock`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((e) => e.json())
      .then((r) => console.log(r));
  }

  setInterval(async () => {
    const tbody = document.querySelector("tbody");
    let box = document.querySelector(".rec-box");
    if (!box) {
      box = document.createElement("div");
      box.className = "rec-box";
      document.body.append(box);
      let recPrice = JSON.parse(localStorage.getItem("recprice"));
      if (!recPrice) {
        recPrice = {};
        const data = await getStock();
        data.forEach((el) => {
          const id = el.id.split("s-").join("");
          recPrice[id] = +el.recommend_price;
        });
        window.localStorage.setItem("recprice", JSON.stringify(recPrice));
      }

      tbody.querySelectorAll("tr").forEach((el) => {
        const id = el.children[1].textContent;
        const name = el.children[2].textContent;

        let input = document.querySelector(`#rec-${id}`);
        if (!input) {
          input = document.createElement("input");
          input.id = `rec-${id}`;
          box.append(input);
        }

        input.value = recPrice[id] ? recPrice[id] : 0;
        input.addEventListener("change", (e) => {
          recPrice[id] = e.target.value;
          window.localStorage.setItem("recprice", JSON.stringify(recPrice));
          updateStock({
            id: "s-" + id,
            name: name,
            recommendPrice: e.target.value,
          });
        });
      });
    } else {
      tbody.querySelectorAll("tr").forEach((el) => {
        const id = el.children[1].textContent;
        let top = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top + el.clientHeight / 2 - 13;
        let left = el.getBoundingClientRect().left - 68;
        let input = document.querySelector(`#rec-${id}`);
        input.style.cssText = `
            width: 60px;
            position: absolute;
            top: ${top}px;
            left: ${left}px;
            border: 1px solid #ccc;
            `;
      });
    }
  }, 300);
})();
