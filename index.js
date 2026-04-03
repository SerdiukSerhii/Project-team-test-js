import{a as f}from"./assets/vendor-Dl2X3eg5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();f.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function C(){return(await f.get("/categories")).data}async function S(r="",e=1){const i={page:e,limit:8};return r&&(i.category=r),(await f.get("/furnitures",{params:i})).data}function $(r){return r.map(e=>`
        <li class="category-item">
          <button
            class="category-btn"
            type="button"
            data-category="${e._id}">
            ${e.name}
          </button>
        </li>
      `).join("")}function y(r){return r.map(e=>{const{_id:i,name:o,images:t=[],color:n=[],price:s=0}=e,v=t[0]||"placeholder.jpg",b=Array.isArray(n)?n:[n];return`
        <li class="furniture-item" data-id="${i}">
          <div class="furniture-thumb">
            <img src="${v}" alt="${o}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${o}</h3>
            <ul class="furniture-color">
              ${b.map(w=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="${w}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${s} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}const u=document.querySelector("#categories"),l=document.querySelector("#furniture-list"),m=document.querySelector("#load-more"),a=document.querySelector("#loader");document.querySelector(".btn-pagination-wrapper");let p="",c=1;const M=["Всі товари","М’які меблі","Шафи та системи зберігання","Ліжка та матраци","Столи","Стільці та табурети","Кухні","Меблі для дитячої","Меблі для офісу","Меблі для передпокою","Меблі для ванної кімнати","Садові та вуличні меблі","Декор та аксесуари"];async function q(){try{a.classList.remove("hidden");const r=await C(),e=M.map(o=>{const t=r.find(n=>n.name.trim()===o.trim());return{_id:o==="Всі товари"?"":t?t._id:"temp-id",name:o}});u.innerHTML=$(e);const i=u.querySelector(".category-btn");i&&i.classList.add("is-active"),await g("",1)}catch(r){console.error(r)}finally{a.classList.add("hidden")}}async function g(r="",e=1){try{h(),p=r,c=e;const i=await S(r,e),o=(i==null?void 0:i.furnitures)||[],t=(i==null?void 0:i.totalPages)||1;console.log(`Page: ${e}, TotalPages: ${t}, Items: ${o.length}`),e===1?l.innerHTML=o.length>0?y(o):"<p>Товарів не знайдено</p>":l.insertAdjacentHTML("beforeend",y(o)),o.length===8&&e<t?P():d(),e>1&&e>=t&&console.log("Ви досягли кінця списку")}catch(i){console.error("Помилка:",i),d(),l.innerHTML="<p>Сталася помилка</p>"}finally{L()}}async function O(r){var o;const e=r.target.closest(".category-btn");if(!e)return;(o=document.querySelector(".category-btn.is-active"))==null||o.classList.remove("is-active"),e.classList.add("is-active"),c=1;const i=e.dataset.category||"";await g(i,c)}u.addEventListener("click",O);m.addEventListener("click",async()=>{c+=1,d(),h();try{await g(p,c);const r=document.querySelector(".furniture-item");if(r){const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}catch(r){console.error("Error fetching more furniture:",r)}finally{L()}});function h(){a.classList.add("is-visible")}function L(){a.classList.remove("is-visible")}function P(){m.classList.add("is-visible")}function d(){m.classList.remove("is-visible")}document.addEventListener("DOMContentLoaded",()=>{q()});
//# sourceMappingURL=index.js.map
