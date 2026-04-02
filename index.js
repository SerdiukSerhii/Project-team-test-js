import{a as f}from"./assets/vendor-Dl2X3eg5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();f.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function v(){return(await f.get("/categories")).data}async function b(i="",t=1){const e={page:t,limit:8};return i&&(e.category=i),(await f.get("/furnitures",{params:e})).data}function C(i){return[{name:"Всі товари",_id:""},...i].map(e=>`
        <li class="category-item">
          <button
            class="category-btn"
            type="button"
            data-category="${e._id}">
            ${e.name}
          </button>
        </li>
      `).join("")}function g(i){return i.map(t=>{const{_id:e,name:n,images:r=[],color:s=[],price:o=0}=t,p=r[0]||"placeholder.jpg",h=Array.isArray(s)?s:[s];return`
        <li class="furniture-item" data-id="${e}">
          <div class="furniture-thumb">
            <img src="${p}" alt="${n}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${n}</h3>
            <ul class="furniture-color">
              ${h.map(L=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="${L}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${o} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}const d=document.querySelector("#categories"),u=document.querySelector("#furniture-list"),a=document.querySelector("#load-more"),l=document.querySelector("#loader");let y="",c=1;async function M(){try{l.classList.remove("hidden");const i=await v(),t=[{name:"Всі товари",_id:""},...i];d.innerHTML=C(t);const e=d.querySelector(".category-btn");e&&e.classList.add("is-active"),await m("",1)}finally{l.classList.add("hidden")}}async function m(i="",t=1){try{l.classList.remove("hidden"),y=i,c=t;const e=await b(i,t),n=(e==null?void 0:e.furnitures)||[];console.log("Items:",n),t===1?u.innerHTML=g(n):u.insertAdjacentHTML("beforeend",g(n)),!n.length||n.length<8?a.classList.add("hidden"):a.classList.remove("hidden")}catch(e){console.error("Помилка при завантаженні меблів:",e),u.innerHTML="<p>Щось пішло не так</p>",a.classList.add("hidden")}finally{l.classList.add("hidden")}}function S(i){var e;const t=i.target.closest(".category-btn");t&&((e=document.querySelector(".category-btn.is-active"))==null||e.classList.remove("is-active"),t.classList.add("is-active"),c=1,m(t.dataset.category,c))}d.addEventListener("click",S);a.addEventListener("click",()=>{c+=1,m(y,c)});document.addEventListener("DOMContentLoaded",()=>{M()});
//# sourceMappingURL=index.js.map
