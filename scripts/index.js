import { renderProduct } from "./renderProduct.js";
import {
  renderCart,
  updateCartVisibility,
  updateProductCardUI,
} from "./cartUI.js";
import { attachEvents } from "./events.js";
import { getCart } from "./cartStorage.js";

export const PRODUCTS = await fetch("./data.json").then((res) => res.json());

PRODUCTS.forEach((product, index) => {
  product.id = index;
  renderProduct(product);
  updateCartVisibility();
});

const cart = getCart();
cart.forEach((item) => {
  updateProductCardUI(item.id, item.quantity);
});

renderCart(PRODUCTS);
attachEvents(PRODUCTS);
