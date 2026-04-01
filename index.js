import{a}from"./assets/vendor-Dl2X3eg5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();a.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function f(){return(await a.get("/categories")).data}async function y(r="",t=1){const i={page:t,limit:8};return r&&r!=="Всі товари"&&(i.category=r),(await a.get("/furniture",{params:i})).data}function g(r){return["Всі товари",...r].map(i=>`
        <li class="category-item">
          <button class="category-btn" type="button" data-category="${i}">
            ${i}
          </button>
        </li>
      `).join("")}function p(r){return r.map(({_id:t,img:i,name:n,color:e,price:s})=>{const o=Array.isArray(e)?e:[e];return`
        <li class="furniture-item" data-id="${t}">
          <div class="furniture-thumb">
            <img src="${i}" alt="${n}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${n}</h3>
             <ul class="furniture-color">
              ${o.map(d=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="${d}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${s} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}const c=document.querySelector("#categories"),m=document.querySelector("#furniture-list"),u=document.querySelector("#loader");async function h(){try{u.classList.remove("hidden");const r=await f();c.innerHTML=g(r);const t=c.querySelector(".category-btn");t&&t.classList.add("is-active"),l("Всі товари")}finally{u.classList.add("hidden")}}async function l(r="",t=1){const i=await y(r,t);m.innerHTML=p(i.results)}function L(r){var i;const t=r.target.closest(".category-btn");t&&((i=document.querySelector(".category-btn.is-active"))==null||i.classList.remove("is-active"),t.classList.add("is-active"),l(t.dataset.category))}c.addEventListener("click",L);document.addEventListener("DOMContentLoaded",()=>{h()});//! ============= submit ======================================
//! =========== Click on pagination ===========
//# sourceMappingURL=index.js.map
