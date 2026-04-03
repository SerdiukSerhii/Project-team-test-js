import{a as f,i as y}from"./assets/vendor-ByN8xaf9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();f.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function $(){return(await f.get("/categories")).data}async function M(o="",e=1){const t={page:e,limit:8};return o&&(t.category=o),(await f.get("/furnitures",{params:t})).data}const P=["all-products","sofas","wardrobes","beds","tables","chairs","kitchens","kids","office","hallway","bathroom","outdoor","decor"];function q(o){return o.map((e,t)=>`
        <li class="category-item">
          <button
            class="category-btn ${P[t]||"default"}"
            type="button"
            data-category="${e._id}">
            ${e.name}
          </button>
        </li>
      `).join("")}function h(o){return o.map(e=>{const{_id:t,name:i,images:r=[],color:s=[],price:c=0}=e,w=r[0]||"placeholder.jpg",S=Array.isArray(s)?s:[s];return`
        <li class="furniture-item" data-id="${t}">
          <div class="furniture-thumb">
            <img src="${w}" alt="${i}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${i}</h3>
            <ul class="furniture-color">
              ${S.map(C=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="12" fill="${C}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${c} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}const d=document.querySelector("#categories"),u=document.querySelector("#furniture-list"),g=document.querySelector("#load-more"),a=document.querySelector("#loader");document.querySelector(".btn-pagination-wrapper");let p="",n=1;const O=["Всі товари","М’які меблі","Шафи та системи зберігання","Ліжка та матраци","Столи","Стільці та табурети","Кухні","Меблі для дитячої","Меблі для офісу","Меблі для передпокою","Меблі для ванної кімнати","Садові та вуличні меблі","Декор та аксесуари"];async function B(){try{a.classList.remove("hidden");const o=await $(),e=O.map(i=>{const r=o.find(s=>s.name.trim()===i.trim());return{_id:i==="Всі товари"?"":r?r._id:"temp-id",name:i}});d.innerHTML=q(e);const t=d.querySelector(".category-btn");t&&t.classList.add("is-active"),await m("",1)}catch(o){console.error(o)}finally{a.classList.add("hidden")}}async function m(o="",e=1){try{L(),p=o,n=e;const t=await M(o,e),i=(t==null?void 0:t.furnitures)||[],r=(t==null?void 0:t.totalPages)||1;console.log(`Page: ${e}, TotalPages: ${r}, Items: ${i.length}`),e===1?u.innerHTML=i.length>0?h(i):"<p>Товарів не знайдено</p>":u.insertAdjacentHTML("beforeend",h(i)),i.length===8&&e<r?v():l(),e>1&&e>=r&&console.log("Ви досягли кінця списку")}catch(t){console.error("Помилка:",t),l(),u.innerHTML="<p>Сталася помилка</p>"}finally{b()}}async function E(o){var i;const e=o.target.closest(".category-btn");if(!e)return;(i=document.querySelector(".category-btn.is-active"))==null||i.classList.remove("is-active"),e.classList.add("is-active"),n=1;const t=e.dataset.category||"";await m(t,n)}d.addEventListener("click",E);g.addEventListener("click",async()=>{n+=1,l(),L();try{const o=await m(p,n);n>=o.totalPages||o.items.length===0?(l(),y.info({message:"We're sorry, but you've reached the end of the catalog.",position:"topRight"})):v();const e=document.querySelector(".furniture-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}catch(o){y.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(o)}finally{b()}});function L(){a.classList.add("is-visible")}function b(){a.classList.remove("is-visible")}function v(){g.classList.remove("is-hidden")}function l(){g.classList.add("is-hidden")}document.addEventListener("DOMContentLoaded",()=>{B()});
//# sourceMappingURL=index.js.map
