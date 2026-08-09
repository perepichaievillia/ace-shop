export function formatPrice(amount, currency = 'UAH') {
  const symbol = currency === 'UAH' ? '\u20B4' : currency;
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return `${symbol}${formatted}`;
}
