import{a as d}from"./assets/vendor-Dl2X3eg5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=r(e);fetch(e.href,i)}})();d.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function L(){return(await d.get("/categories")).data}async function v(n="",t=1){const r={page:t,limit:8};return n&&(r.category=n),(await d.get("/furnitures",{params:r})).data}function b(n){return n.map(t=>`
        <li class="category-item">
          <button
            class="category-btn"
            type="button"
            data-category="${t._id}">
            ${t.name}
          </button>
        </li>
      `).join("")}function p(n){return n.map(t=>{const{_id:r,name:s,images:e=[],color:i=[],price:o=0}=t,y=e[0]||"placeholder.jpg",g=Array.isArray(i)?i:[i];return`
        <li class="furniture-item" data-id="${r}">
          <div class="furniture-thumb">
            <img src="${y}" alt="${s}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${s}</h3>
            <ul class="furniture-color">
              ${g.map(h=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="${h}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${o} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}const l=document.querySelector("#categories"),u=document.querySelector("#furniture-list"),S=document.querySelector("#load-more"),a=document.querySelector("#loader");let m="",c=1;const w=["Всі товари","М’які меблі","Шафи та системи зберігання","Ліжка та матраци","Столи","Стільці та табурети","Кухні","Меблі для дитячої","Меблі для офісу","Меблі для передпокою","Меблі для ванної кімнати","Садові та вуличні меблі","Декор та аксесуари"];async function C(){try{a.classList.remove("hidden");const n=await L(),t=w.map(s=>{const e=n.find(i=>i.name.trim()===s.trim());return{_id:s==="Всі товари"?"":e?e._id:"temp-id",name:s}});l.innerHTML=b(t);const r=l.querySelector(".category-btn");r&&r.classList.add("is-active"),await f("",1)}catch(n){console.error(n)}finally{a.classList.add("hidden")}}async function f(n="",t=1){try{a.classList.remove("hidden"),m=n,c=t;const r=await v(n,t),s=(r==null?void 0:r.furnitures)||[],e=(r==null?void 0:r.totalPages)||1;t===1?u.innerHTML=p(s):u.insertAdjacentHTML("beforeend",p(s));const i=document.querySelector(".btn-pagination-wrapper");t>=e||s.length===0?i.classList.add("hidden"):i.classList.remove("hidden")}catch(r){console.error("Помилка при завантаженні меблів:",r),u.innerHTML="<p>Щось пішло не так</p>",document.querySelector(".pagination-wrapper").classList.add("hidden")}finally{a.classList.add("hidden")}}async function q(n){const t=n.target.closest(".category-btn");if(!t)return;const r=document.querySelector(".category-btn.is-active");r&&r.classList.remove("is-active"),t.classList.add("is-active"),c=1;const s=t.dataset.category||"";await f(s,c)}l.addEventListener("click",q);S.addEventListener("click",()=>{c+=1,f(m,c)});document.addEventListener("DOMContentLoaded",()=>{C()});
//# sourceMappingURL=index.js.map
