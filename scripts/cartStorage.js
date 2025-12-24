const CART_KEY = "cart_v1";

export const getCart = () => {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const findItem = (cart, id) => {
  return cart.find((item) => String(item.id) === String(id));
};

export const removeItem = (id) => {
  const cart = getCart().filter((i) => String(i.id) !== String(id));
  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem("cart_v1");
};
