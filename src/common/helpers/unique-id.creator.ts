export function generateUniqueOrderId(orderNumber: number, createdDate: Date): string {
  if (!orderNumber) {
    throw new Error('Order number cannot be empty');
  }
  const date = createdDate;
  const year = date.getFullYear();
  const m = date.getMonth() + 1;
  const month = m < 10 ? `0${m}` : m;
  const d = date.getDate();
  const day = d < 10 ? `0${d}` : d;

  return `FM${day}${month}${year}${orderNumber}`;
}
