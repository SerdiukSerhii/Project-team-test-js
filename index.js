import{a as f}from"./assets/vendor-Dl2X3eg5.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();f.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function C(){return(await f.get("/categories")).data}async function S(r="",e=1){const o={page:e,limit:8};return r&&(o.category=r),(await f.get("/furnitures",{params:o})).data}const $=["all-products","sofas","wardrobes","beds","tables","chairs","kitchens","kids","office","hallway","bathroom","outdoor","decor"];function M(r){return r.map((e,o)=>`
        <li class="category-item">
          <button
            class="category-btn ${$[o]||"default"}"
            type="button"
            data-category="${e._id}">
            ${e.name}
          </button>
        </li>
      `).join("")}function y(r){return r.map(e=>{const{_id:o,name:i,images:t=[],color:s=[],price:n=0}=e,b=t[0]||"placeholder.jpg",v=Array.isArray(s)?s:[s];return`
        <li class="furniture-item" data-id="${o}">
          <div class="furniture-thumb">
            <img src="${b}" alt="${i}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${i}</h3>
            <ul class="furniture-color">
              ${v.map(w=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="12" fill="${w}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${n} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}const u=document.querySelector("#categories"),l=document.querySelector("#furniture-list"),m=document.querySelector("#load-more"),a=document.querySelector("#loader");document.querySelector(".btn-pagination-wrapper");let p="",c=1;const q=["Всі товари","М’які меблі","Шафи та системи зберігання","Ліжка та матраци","Столи","Стільці та табурети","Кухні","Меблі для дитячої","Меблі для офісу","Меблі для передпокою","Меблі для ванної кімнати","Садові та вуличні меблі","Декор та аксесуари"];async function O(){try{a.classList.remove("hidden");const r=await C(),e=q.map(i=>{const t=r.find(s=>s.name.trim()===i.trim());return{_id:i==="Всі товари"?"":t?t._id:"temp-id",name:i}});u.innerHTML=M(e);const o=u.querySelector(".category-btn");o&&o.classList.add("is-active"),await g("",1)}catch(r){console.error(r)}finally{a.classList.add("hidden")}}async function g(r="",e=1){try{h(),p=r,c=e;const o=await S(r,e),i=(o==null?void 0:o.furnitures)||[],t=(o==null?void 0:o.totalPages)||1;console.log(`Page: ${e}, TotalPages: ${t}, Items: ${i.length}`),e===1?l.innerHTML=i.length>0?y(i):"<p>Товарів не знайдено</p>":l.insertAdjacentHTML("beforeend",y(i)),i.length===8&&e<t?E():d(),e>1&&e>=t&&console.log("Ви досягли кінця списку")}catch(o){console.error("Помилка:",o),d(),l.innerHTML="<p>Сталася помилка</p>"}finally{L()}}async function P(r){var i;const e=r.target.closest(".category-btn");if(!e)return;(i=document.querySelector(".category-btn.is-active"))==null||i.classList.remove("is-active"),e.classList.add("is-active"),c=1;const o=e.dataset.category||"";await g(o,c)}u.addEventListener("click",P);m.addEventListener("click",async()=>{c+=1,d(),h();try{await g(p,c);const r=document.querySelector(".furniture-item");if(r){const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}catch(r){console.error("Error fetching more furniture:",r)}finally{L()}});function h(){a.classList.add("is-visible")}function L(){a.classList.remove("is-visible")}function E(){m.classList.add("is-visible")}function d(){m.classList.remove("is-visible")}document.addEventListener("DOMContentLoaded",()=>{O()});
//# sourceMappingURL=index.js.map
