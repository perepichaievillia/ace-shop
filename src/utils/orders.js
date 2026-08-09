// Order persistence layer.
// Currently backed by localStorage. To move to Supabase later, replace the
// bodies of these three functions with calls to your Supabase client while
// keeping the same signatures — nothing above this file needs to change.

const ORDERS_KEY = 'ace-store:orders';

function readOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // ignore write failures (e.g. private browsing quota)
  }
}

export function buildOrder({ customer, deliveryMethod, comment, items, total }) {
  return {
    id: `ace-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    customer,
    deliveryMethod,
    comment,
    items,
    total,
    // paymentStatus / paymentProvider reserved for future payment integration
    paymentStatus: 'pending_offline',
  };
}

export async function saveOrder(order) {
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
  return order;
}

export async function getOrders() {
  return readOrders();
}
