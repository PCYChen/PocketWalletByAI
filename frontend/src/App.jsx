import { useEffect, useMemo, useState } from "react";
import { createExpense, deleteExpense, fetchExpenses, readApiError } from "./api/expenses";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { formatMoney } from "./lib/format";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  );

  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    setLoading(true);
    setError("");
    try {
      setExpenses(await fetchExpenses());
    } catch (requestError) {
      setError(readApiError(requestError, "無法載入記帳紀錄，請確認後端與 MySQL 已啟動。"));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    setSubmitting(true);
    setError("");
    try {
      const created = await createExpense(payload);
      setExpenses((current) =>
        [created, ...current].sort((left, right) => {
          if (left.date === right.date) {
            return right.id - left.id;
          }
          return right.date.localeCompare(left.date);
        })
      );
      return true;
    } catch (requestError) {
      setError(readApiError(requestError, "新增失敗，請稍後再試。"));
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(expense) {
    const confirmed = window.confirm(`刪除「${expense.title}」？此操作無法復原。`);
    if (!confirmed) {
      return;
    }
    setDeletingId(expense.id);
    setError("");
    try {
      await deleteExpense(expense.id);
      setExpenses((current) => current.filter((item) => item.id !== expense.id));
    } catch (requestError) {
      setError(readApiError(requestError, "刪除失敗，請稍後再試。"));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">Pocket Wallet</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">口袋記帳</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">記錄每一筆日常支出，並隨時看累計金額。</p>
        </div>
        <div className="rounded-3xl border border-line bg-moss px-5 py-4 text-white shadow-card">
          <p className="text-xs uppercase tracking-[0.16em] text-emerald-100">累計支出</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{formatMoney(total)}</p>
          <p className="mt-1 text-xs text-emerald-100">{expenses.length} 筆紀錄</p>
        </div>
      </header>

      {error ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p>{error}</p>
          <button type="button" onClick={loadExpenses} className="font-semibold underline">
            重新載入
          </button>
        </div>
      ) : null}

      <main className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <ExpenseForm onSubmit={handleCreate} submitting={submitting} />
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">消費紀錄</h2>
            <p className="text-xs text-muted">依日期新到舊</p>
          </div>
          {loading ? (
            <div className="rounded-3xl border border-line bg-card px-5 py-10 text-sm text-muted shadow-card">
              正在讀取記帳紀錄…
            </div>
          ) : (
            <ExpenseList expenses={expenses} onDelete={handleDelete} deletingId={deletingId} />
          )}
        </section>
      </main>
    </div>
  );
}
