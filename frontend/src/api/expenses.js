import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export async function fetchExpenses() {
  const { data } = await client.get("/api/expenses");
  return data;
}

export async function createExpense(payload) {
  const { data } = await client.post("/api/expenses", payload);
  return data;
}

export async function deleteExpense(id) {
  await client.delete(`/api/expenses/${id}`);
}

export function readApiError(error, fallback) {
  const data = error?.response?.data;
  if (data?.errors && Object.keys(data.errors).length > 0) {
    return Object.values(data.errors).join("、");
  }
  if (typeof data?.message === "string" && data.message.length > 0) {
    return data.message;
  }
  return fallback;
}
