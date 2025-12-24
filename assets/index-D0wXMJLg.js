(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const n of c.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(s){if(s.ep)return;s.ep=!0;const c=r(s);fetch(s.href,c)}})();const h=document.querySelector(".products"),S=document.querySelector(".cart__list"),$=document.querySelector(".cart__total-value");document.querySelector(".cart__empty");document.querySelector(".cart__items");const v="cart_v1",a=()=>{const t=localStorage.getItem(v);if(!t)return[];try{return JSON.parse(t)}catch{return[]}},q=t=>{localStorage.setItem(v,JSON.stringify(t))},m=(t,e)=>t.find(r=>String(r.id)===String(e)),L=t=>{const e=a().filter(r=>String(r.id)!==String(t));q(e)},x=()=>{localStorage.removeItem("cart_v1")},T=t=>{const e=`
    <article class="product" data-id="${t.id}">
      <picture class="product__image-wrapper">
        <source media="(min-width: 1024px)" srcset="${t.image.desktop}" />
        <source media="(min-width: 768px)" srcset="${t.image.tablet}" />
        <source media="(min-width: 480px)" srcset="${t.image.mobile}" />

        <img 
          src="${t.image.mobile}" 
          alt="${t.name}" 
          class="product__image"
        />

        <button class="product__add-to-cart button" data-id="${t.id}">
          <img
            src="./assets/images/icon-add-to-cart.svg"
            alt=""
            class="product__cart-icon"
          />
          Add to cart
        </button>

        <div class="product__controls hidden" data-id="${t.id}">
          <button class="product__btn product__btn--decrease button">
            <img src="./assets/images/icon-decrement-quantity.svg" alt="" />
          </button>

          <span class="product__quantity">1</span>

          <button class="product__btn product__btn--increase button">
            <img src="./assets/images/icon-increment-quantity.svg" alt="" />
          </button>
        </div>
      </picture>

      <div class="product__detailes">
        <span class="product__category">${t.category}</span>
        <h3 class="product__name">${t.name}</h3>
        <span class="product__price">$${t.price.toFixed(2)}</span>
      </div>
    </article>
  `;h.insertAdjacentHTML("beforeend",e);const r=a(),o=m(r,t.id);if(o){const s=h.querySelector(`.product[data-id="${t.id}"]`),c=s.querySelector(".product__add-to-cart"),n=s.querySelector(".product__controls"),_=s.querySelector(".product__quantity");c.classList.add("hidden"),n.classList.remove("hidden"),_.innerText=o.quantity}},O=t=>{const e=a(),r=m(e,t);r?r.quantity+=1:e.push({id:String(t),quantity:1}),q(e)},g=(t,e)=>{const r=a(),o=m(r,t);if(o){if(o.quantity+=e,o.quantity<=0){L(t);return}q(r)}},b=(t,e)=>e.reduce((r,o)=>{const s=t.find(c=>String(c.id)===o.id);return s?r+s.price*o.quantity:r},0),E=t=>{x(),t.forEach(e=>{l(e.id,0)}),u()},p=t=>{const e=a();S.innerHTML="",e.forEach(({id:o,quantity:s})=>{const c=t.find(n=>String(n.id)===String(o));c&&S.insertAdjacentHTML("beforeend",`
<li class="item" data-id="${c.id}"> <div class="item__details"> <h5 class="item__name">${c.name}</h5> <span class="item__quantity">${s}x</span> <span class="item__price">@ $${c.price.toFixed(2)}</span> <span class="item__price-total">$${s*c.price.toFixed(2)}</span> </div> <button class="item__remove button" data-id="${c.id}"> <img src="./assets/images/icon-remove-item.svg" alt="Remove item" /> </button> </li>
      `)});const r=b(t,e);$.innerText=`$${r.toFixed(2)}`},l=(t,e)=>{const r=document.querySelector(`.product[data-id="${t}"]`);if(!r)return;const o=r.querySelector(".product__add-to-cart"),s=r.querySelector(".product__controls"),c=r.querySelector(".product__quantity"),n=r.querySelector(".product__image");e>0?(o.style.display="none",n.style.border="2px solid hsl(14, 86%, 42%)",s.style.display="flex",c.innerText=e):(o.style.display="flex",n.style.border="",s.style.display="none")},u=()=>{const t=a(),e=document.querySelector(".cart__empty"),r=document.querySelector(".cart__items");!e||!r||(t.length===0?(e.style.display="flex",r.style.display="none"):(e.style.display="none",r.style.display="flex"))},C=()=>{const t=a(),e=document.querySelector(".order-confirmation__items");e.innerHTML="";let r="";t.forEach(c=>{const n=y[c.id];r+=`
      <li class="order-item">
        <div class="order-item__details">
          <img
            class="order-item__image"
            src="${n.image.thumbnail}"
            alt="${n.name}"
          />
          <div class="order-item__info">
            <h5 class="order-item__name">${n.name}</h5>
            <div class="order-item__meta">
              <span class="order-item__quantity">${c.quantity}x</span>
              <span class="order-item__price">@ $${n.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <span class="order-item__total">
          $${(c.quantity*n.price).toFixed(2)}
        </span>
      </li>
    `}),e.insertAdjacentHTML("beforeend",r);const o=document.querySelector(".order-confirmation__total-value"),s=b(y,t);o.innerText=`$${s.toFixed(2)}`},B=t=>{document.addEventListener("click",e=>{const r=e.target.closest(".product__add-to-cart");if(r){const i=r.dataset.id;O(i);const d=m(a(),i);l(i,d.quantity),p(t),u();return}const o=e.target.closest(".product__btn--increase");if(o){const i=o.closest(".product__controls").dataset.id;g(i,1);const d=m(a(),i);l(i,d.quantity),p(t),u();return}const s=e.target.closest(".product__btn--decrease");if(s){const i=s.closest(".product__controls").dataset.id;g(i,-1);const d=m(a(),i);l(i,d?d.quantity:0),p(t),u();return}const c=e.target.closest(".item__remove");if(c){const i=c.dataset.id;g(i,-999),l(i,0),p(t),u()}const n=e.target.closest(".cart__confirm"),_=document.querySelector(".order-backdrop"),f=document.querySelector(".order-confirmation");if(document.querySelector(".container"),n){f.classList.remove("hidden"),_.classList.remove("hidden"),C();return}if(e.target.closest(".order-backdrop")){f.classList.add("hidden"),_.classList.add("hidden");return}if(e.target.closest(".order-confirmation__restart")){E(t),f.classList.add("hidden"),_.classList.add("hidden");return}})},y=await fetch("./data.json").then(t=>t.json());y.forEach((t,e)=>{t.id=e,T(t),u()});const w=a();w.forEach(t=>{l(t.id,t.quantity)});p(y);B(y);
