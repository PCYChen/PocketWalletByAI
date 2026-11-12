export const CATEGORIES = ["飲食", "交通", "購物", "娛樂", "居住", "醫療", "其他"];

const CATEGORY_STYLES = {
  飲食: "bg-orange-100 text-orange-950",
  交通: "bg-sky-100 text-sky-950",
  購物: "bg-violet-100 text-violet-950",
  娛樂: "bg-rose-100 text-rose-950",
  居住: "bg-amber-100 text-amber-950",
  醫療: "bg-emerald-100 text-emerald-950",
  其他: "bg-stone-200 text-stone-800",
};

export function categoryClass(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES["其他"];
}

export function todayInputValue() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function formatDate(isoDate) {
  if (!isoDate) {
    return "";
  }
  const [year, month, day] = isoDate.split("-");
  return `${year}/${month}/${day}`;
}

export function formatMoney(value) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}
