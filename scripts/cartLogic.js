import {
  getCart,
  saveCart,
  findItem,
  removeItem,
  clearCart,
} from "./cartStorage.js";
import { updateCartVisibility, updateProductCardUI } from "./cartUI.js";

export const addToCart = (id) => {
  const cart = getCart();
  const item = findItem(cart, id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: String(id), quantity: 1 });
  }

  saveCart(cart);
};

export const changeQuantity = (id, delta) => {
  const cart = getCart();
  const item = findItem(cart, id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeItem(id);
    return;
  }

  saveCart(cart);
};

export const calculateCartTotal = (products, cart) => {
  return cart.reduce((sum, cartItem) => {
    const product = products.find((p) => String(p.id) === cartItem.id);
    if (!product) return sum;
    return sum + product.price * cartItem.quantity;
  }, 0);
};

export const resetOrder = (products) => {
  // 1️⃣ امسح التخزين
  clearCart();

  // 2️⃣ أعد كل بطاقات المنتجات
  products.forEach((product) => {
    updateProductCardUI(product.id, 0);
  });

  // 3️⃣ أعد حالة السلة
  updateCartVisibility();

  // (renderCart سينتج سلة فارغة تلقائيًا)
};
