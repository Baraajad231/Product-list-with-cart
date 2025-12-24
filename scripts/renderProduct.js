import { productsDiv } from "./elements.js";
import { getCart, findItem } from "./cartStorage.js";

export const renderProduct = (product) => {
  const productElement = `
    <article class="product" data-id="${product.id}">
      <picture class="product__image-wrapper">
        <source media="(min-width: 1024px)" srcset="${product.image.desktop}" />
        <source media="(min-width: 768px)" srcset="${product.image.tablet}" />
        <source media="(min-width: 480px)" srcset="${product.image.mobile}" />

        <img 
          src="${product.image.mobile}" 
          alt="${product.name}" 
          class="product__image"
        />

        <button class="product__add-to-cart button" data-id="${product.id}">
          <img
            src="./assets/images/icon-add-to-cart.svg"
            alt=""
            class="product__cart-icon"
          />
          Add to cart
        </button>

        <div class="product__controls hidden" data-id="${product.id}">
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
        <span class="product__category">${product.category}</span>
        <h3 class="product__name">${product.name}</h3>
        <span class="product__price">$${product.price.toFixed(2)}</span>
      </div>
    </article>
  `;

  productsDiv.insertAdjacentHTML("beforeend", productElement);

  /* 🔹 التعديل المهم هنا 🔹 */
  const cart = getCart();

  const cartItem = findItem(cart, product.id);

  if (cartItem) {
    const productEl = productsDiv.querySelector(
      `.product[data-id="${product.id}"]`
    );

    const addBtn = productEl.querySelector(".product__add-to-cart");
    const controls = productEl.querySelector(".product__controls");
    const qty = productEl.querySelector(".product__quantity");

    addBtn.classList.add("hidden");
    controls.classList.remove("hidden");
    qty.innerText = cartItem.quantity;
  }
};
