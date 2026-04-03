import{a as f,i as l}from"./assets/vendor-ByN8xaf9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();f.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function v(){return(await f.get("/categories")).data}async function M(r="",e=1){const t={page:e,limit:8};return r&&(t.category=r),(await f.get("/furnitures",{params:t})).data}const w=["all-products","sofas","wardrobes","beds","tables","chairs","kitchens","kids","office","hallway","bathroom","outdoor","decor"];function C(r){return r.map((e,t)=>`
        <li class="category-item">
          <button
            class="category-btn ${w[t]||"default"}"
            type="button"
            data-category="${e._id}">
            ${e.name}
          </button>
        </li>
      `).join("")}function g(r){return r.map(e=>{const{_id:t,name:s,images:i=[],color:o=[],price:c=0}=e,h=i[0]||"placeholder.jpg",L=Array.isArray(o)?o:[o];return`
        <li class="furniture-item" data-id="${t}">
          <div class="furniture-thumb">
            <img src="${h}" alt="${s}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${s}</h3>
            <ul class="furniture-color">
              ${L.map(b=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="12" fill="${b}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${c} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}function S(r,e){r.insertAdjacentHTML("beforeend",g(e))}const n={categoriesList:document.querySelector("#categories"),furnitureList:document.querySelector("#furniture-list"),loadMoreBtn:document.querySelector("#load-more"),loader:document.querySelector("#loader")};let d="",a=1;const B=["Всі товари","М’які меблі","Шафи та системи зберігання","Ліжка та матраци","Столи","Стільці та табурети","Кухні","Меблі для дитячої","Меблі для офісу","Меблі для передпокою","Меблі для ванної кімнати","Садові та вуличні меблі","Декор та аксесуари"];async function $(){try{n.loader.classList.remove("hidden");const r=await v(),e=B.map(s=>{const i=r.find(o=>o.name.trim()===s.trim());return{_id:s==="Всі товари"?"":i?i._id:"temp-id",name:s}});n.categoriesList.innerHTML=C(e);const t=n.categoriesList.querySelector(".category-btn");t&&t.classList.add("is-active"),await m("",1)}catch(r){console.error(r)}finally{n.loader.classList.add("hidden")}}async function m(r="",e=1){try{y(),d=r,a=e;const t=await M(r,e),s=(t==null?void 0:t.furnitures)||[],i=(t==null?void 0:t.totalItems)||0,o=(t==null?void 0:t.limit)||8,c=Math.ceil(i/o);if(e===1){if(n.furnitureList.innerHTML="",s.length===0)return l.info({message:"Товарів не знайдено",position:"topRight"}),u(),t;n.furnitureList.innerHTML=g(s)}else S(n.furnitureList,s);return e>=c||s.length<o?u():R(),e>1&&(e>=c||s.length<o)&&l.info({message:"Ви досягли кінця списку",position:"topRight"}),t}catch{u(),n.furnitureList.innerHTML="",l.error({message:"Сталася помилка. Спробуйте пізніше",position:"topRight"})}finally{p()}}async function O(r){var t;const e=r.target.closest(".category-btn");e&&((t=document.querySelector(".category-btn.is-active"))==null||t.classList.remove("is-active"),e.classList.add("is-active"),d=e.dataset.category||"",a=1,await m(d,a))}n.categoriesList.addEventListener("click",O);n.loadMoreBtn.addEventListener("click",async()=>{a+=1,u(),y();try{await m(d,a);const r=document.querySelector(".furniture-item");if(r){const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}catch{l.error({message:"Сталася помилка. Спробуйте пізніше",position:"topRight"})}finally{p()}});function y(){n.loader.classList.add("is-visible")}function p(){n.loader.classList.remove("is-visible")}function R(){n.loadMoreBtn.classList.add("is-visible")}function u(){n.loadMoreBtn.classList.remove("is-visible")}document.addEventListener("DOMContentLoaded",()=>{$()});
//# sourceMappingURL=index.js.map
