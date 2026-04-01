import{a as l,S as d}from"./assets/vendor-DMAHcxl-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();l.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function f(){return(await l.get("/categories")).data}document.getElementById("furniture-list");document.getElementById("categories");new d(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function g(s){return["Всі товари",...s].map(o=>`
        <li class="category-item">
          <button class="category-btn" type="button" data-category="${o}">
            ${o}
          </button>
        </li>
      `).join("")}const c=document.querySelector("#categories"),a=document.querySelector("#loader");async function y(){try{a.classList.remove("hidden");const s=await f(),r=g(s);c.innerHTML=r;const o=c.querySelector(".category-btn");o&&o.classList.add("is-active")}catch(s){console.error("Помилка при завантаженні категорій:",s)}finally{a.classList.add("hidden")}}//! ============= submit ======================================
function u(s){const r=s.target.closest(".category-btn");if(!r)return;const o=c.querySelector(".category-btn.is-active");o&&o.classList.remove("is-active"),r.classList.add("is-active");const i=r.dataset.category;console.log(`Обрана категорія: ${i}`)}c.addEventListener("click",u);//! ============= submit ======================================
y();u();//! ============= submit ======================================
//! =========== Click on pagination ===========
//# sourceMappingURL=index.js.map
