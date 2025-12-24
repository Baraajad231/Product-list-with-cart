import { cartList, cartTotalValue } from "./elements.js";
import { getCart } from "./cartStorage.js";
import { calculateCartTotal } from "./cartLogic.js";
import { PRODUCTS } from "./index.js";

export const renderCart = (products) => {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach(({ id, quantity }) => {
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) return;

    cartList.insertAdjacentHTML(
      "beforeend",
      `
<li class="item" data-id="${
        product.id
      }"> <div class="item__details"> <h5 class="item__name">${
        product.name
      }</h5> <span class="item__quantity">${quantity}x</span> <span class="item__price">@ $${product.price.toFixed(
        2
      )}</span> <span class="item__price-total">$${
        quantity * product.price.toFixed(2)
      }</span> </div> <button class="item__remove button" data-id="${
        product.id
      }"> <img src="./assets/images/icon-remove-item.svg" alt="Remove item" /> </button> </li>
      `
    );
  });

  const total = calculateCartTotal(products, cart);
  cartTotalValue.innerText = `$${total.toFixed(2)}`;
};

export const updateProductCardUI = (productId, quantity) => {
  // 1️⃣ احضر عنصر المنتج
  const product = document.querySelector(`.product[data-id="${productId}"]`);
  if (!product) return;

  // 2️⃣ احضر الزر والكنترول
  const addBtn = product.querySelector(".product__add-to-cart");
  const controls = product.querySelector(".product__controls");
  const quantitySpan = product.querySelector(".product__quantity");
  const productImage = product.querySelector(".product__image");

  // 3️⃣ حدّث الواجهة حسب الكمية
  if (quantity > 0) {
    // إخفاء زر Add
    addBtn.style.display = "none";
    productImage.style.border = "2px solid hsl(14, 86%, 42%)";
    // إظهار الكنترول
    controls.style.display = "flex";

    // تحديث الرقم
    quantitySpan.innerText = quantity;
  } else {
    // إظهار زر Add
    addBtn.style.display = "flex";
    productImage.style.border = "";

    // إخفاء الكنترول
    controls.style.display = "none";
  }
};

export const updateCartVisibility = () => {
  const cart = getCart();

  const cartEmpty = document.querySelector(".cart__empty");
  const cartItems = document.querySelector(".cart__items");

  if (!cartEmpty || !cartItems) return;

  if (cart.length === 0) {
    // السلة فاضية
    cartEmpty.style.display = "flex";
    cartItems.style.display = "none";
  } else {
    // السلة فيها عناصر
    cartEmpty.style.display = "none";
    cartItems.style.display = "flex";
  }
};

export const confirmOrder = () => {
  const cart = getCart();
  const confirmationList = document.querySelector(".order-confirmation__items");

  // امسح المحتوى القديم
  confirmationList.innerHTML = "";

  let itemsHTML = "";

  cart.forEach((item) => {
    const product = PRODUCTS[item.id];

    itemsHTML += `
      <li class="order-item">
        <div class="order-item__details">
          <img
            class="order-item__image"
            src="${product.image.thumbnail}"
            alt="${product.name}"
          />
          <div class="order-item__info">
            <h5 class="order-item__name">${product.name}</h5>
            <div class="order-item__meta">
              <span class="order-item__quantity">${item.quantity}x</span>
              <span class="order-item__price">@ $${product.price.toFixed(
                2
              )}</span>
            </div>
          </div>
        </div>
        <span class="order-item__total">
          $${(item.quantity * product.price).toFixed(2)}
        </span>
      </li>
    `;
  });

  confirmationList.insertAdjacentHTML("beforeend", itemsHTML);

  const confirmTotalValue = document.querySelector(
    ".order-confirmation__total-value"
  );
  const total = calculateCartTotal(PRODUCTS, cart);
  confirmTotalValue.innerText = `$${total.toFixed(2)}`;
};
