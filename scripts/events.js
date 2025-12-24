import { addToCart, changeQuantity, resetOrder } from "./cartLogic.js";
import {
  confirmOrder,
  renderCart,
  updateCartVisibility,
  updateProductCardUI,
} from "./cartUI.js";
import { getCart, findItem } from "./cartStorage.js";

export const attachEvents = (products) => {
  document.addEventListener("click", (e) => {
    /* ================= ADD TO CART ================= */
    const addBtn = e.target.closest(".product__add-to-cart");
    if (addBtn) {
      const id = addBtn.dataset.id;

      addToCart(id);

      const item = findItem(getCart(), id);
      updateProductCardUI(id, item.quantity);
      renderCart(products);
      updateCartVisibility();
      return;
    }

    /* ================= INCREASE ================= */
    const incBtn = e.target.closest(".product__btn--increase");
    if (incBtn) {
      const id = incBtn.closest(".product__controls").dataset.id;

      changeQuantity(id, 1);

      const item = findItem(getCart(), id);
      updateProductCardUI(id, item.quantity);
      renderCart(products);
      updateCartVisibility();
      return;
    }

    /* ================= DECREASE ================= */
    const decBtn = e.target.closest(".product__btn--decrease");
    if (decBtn) {
      const id = decBtn.closest(".product__controls").dataset.id;

      changeQuantity(id, -1);

      const item = findItem(getCart(), id);
      updateProductCardUI(id, item ? item.quantity : 0);
      renderCart(products);
      updateCartVisibility();
      return;
    }

    /* ================= REMOVE FROM CART ================= */
    const removeBtn = e.target.closest(".item__remove");
    if (removeBtn) {
      const id = removeBtn.dataset.id;

      changeQuantity(id, -999); // حذف مباشر
      updateProductCardUI(id, 0);
      renderCart(products);
      updateCartVisibility();
    }

    /* ================= CONFIRM CART ================= */
    const confirmBtn = e.target.closest(".cart__confirm");
    const orderBackdrop = document.querySelector(".order-backdrop");
    const orderConfirmation = document.querySelector(".order-confirmation");
    const container = document.querySelector(".container");
    if (confirmBtn) {
      orderConfirmation.classList.remove("hidden");
      orderBackdrop.classList.remove("hidden");
      confirmOrder();
      return;
    }
    /* ================= CLOSE ORDER ================= */

    const backdrop = e.target.closest(".order-backdrop");
    if (backdrop) {
      orderConfirmation.classList.add("hidden");
      orderBackdrop.classList.add("hidden");

      return;
    }

    const startNewOrderBtn = e.target.closest(".order-confirmation__restart");
    if (startNewOrderBtn) {
      resetOrder(products);

      // إغلاق المودال
      orderConfirmation.classList.add("hidden");
      orderBackdrop.classList.add("hidden");
      return;
    }
  });
};
