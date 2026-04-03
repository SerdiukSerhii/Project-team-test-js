import{a as g,i as l}from"./assets/vendor-ByN8xaf9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();g.defaults.baseURL="https://furniture-store-v2.b.goit.study/api";async function M(){return(await g.get("/categories")).data}async function S(r="",t=1){const e={page:t,limit:8};return r&&(e.category=r),(await g.get("/furnitures",{params:e})).data}const $=["all-products","sofas","wardrobes","beds","tables","chairs","kitchens","kids","office","hallway","bathroom","outdoor","decor"];function O(r){return r.map((t,e)=>`
        <li class="category-item">
          <button
            class="category-btn ${$[e]||"default"}"
            type="button"
            data-category="${t._id}">
            ${t.name}
          </button>
        </li>
      `).join("")}function h(r){return r.map(t=>{const{_id:e,name:s,images:i=[],color:o=[],price:n=0}=t,v=i[0]||"placeholder.jpg",w=Array.isArray(o)?o:[o];return`
        <li class="furniture-item" data-id="${e}">
          <div class="furniture-thumb">
            <img src="${v}" alt="${s}" loading="lazy" />
          </div>
          <div class="furniture-info">
            <h3 class="furniture-heading">${s}</h3>
            <ul class="furniture-color">
              ${w.map(C=>`
                <li>
                  <svg width="24" height="24">
                    <circle cx="12" cy="12" r="12" fill="${C}" />
                  </svg>
                </li>
              `).join("")}
            </ul>
            <p class="furniture-price">${n} грн</p>
            <button class="details-btn" type="button">Детальніше</button>
          </div>
        </li>
      `}).join("")}function R(r,t){r.insertAdjacentHTML("beforeend",h(t))}const m=document.querySelector("#categories"),a=document.querySelector("#furniture-list"),y=document.querySelector("#load-more"),d=document.querySelector("#loader");let f="",c=1;const q=["Всі товари","М’які меблі","Шафи та системи зберігання","Ліжка та матраци","Столи","Стільці та табурети","Кухні","Меблі для дитячої","Меблі для офісу","Меблі для передпокою","Меблі для ванної кімнати","Садові та вуличні меблі","Декор та аксесуари"];async function B(){try{d.classList.remove("hidden");const r=await M(),t=q.map(s=>{const i=r.find(o=>o.name.trim()===s.trim());return{_id:s==="Всі товари"?"":i?i._id:"temp-id",name:s}});m.innerHTML=O(t);const e=m.querySelector(".category-btn");e&&e.classList.add("is-active"),await p("",1)}catch(r){console.error(r)}finally{d.classList.add("hidden")}}async function p(r="",t=1){try{L(),f=r,c=t;const e=await S(r,t),s=(e==null?void 0:e.furnitures)||[],i=(e==null?void 0:e.totalItems)||0,o=(e==null?void 0:e.limit)||8,n=Math.ceil(i/o);if(t===1){if(a.innerHTML="",s.length===0)return l.info({message:"Товарів не знайдено",position:"topRight"}),u(),e;a.innerHTML=h(s)}else R(a,s);return t>=n||s.length<o?u():T(),t>1&&(t>=n||s.length<o)&&l.info({message:"Ви досягли кінця списку",position:"topRight"}),e}catch{u(),a.innerHTML="",l.error({message:"Сталася помилка. Спробуйте пізніше",position:"topRight"})}finally{b()}}async function E(r){var e;const t=r.target.closest(".category-btn");t&&((e=document.querySelector(".category-btn.is-active"))==null||e.classList.remove("is-active"),t.classList.add("is-active"),f=t.dataset.category||"",c=1,await p(f,c))}m.addEventListener("click",E);y.addEventListener("click",async()=>{c+=1,u(),L();try{await p(f,c);const r=document.querySelector(".furniture-item");if(r){const t=r.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}catch{l.error({message:"Сталася помилка. Спробуйте пізніше",position:"topRight"})}finally{b()}});function L(){d.classList.add("is-visible")}function b(){d.classList.remove("is-visible")}function T(){y.classList.add("is-visible")}function u(){y.classList.remove("is-visible")}document.addEventListener("DOMContentLoaded",()=>{B()});
//# sourceMappingURL=index.js.map
