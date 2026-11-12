import { categoryClass, formatDate, formatMoney } from "../lib/format";

export default function ExpenseList({ expenses, onDelete, deletingId }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-card px-6 py-14 text-center shadow-card">
        <p className="text-lg font-semibold">還沒有記帳紀錄</p>
        <p className="mt-2 text-sm text-muted">先在左側記下今天的第一筆支出。</p>
      </div>
    );
  }

  return (
    <ul className="overflow-hidden rounded-3xl border border-line bg-card shadow-card">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryClass(expense.category)}`}>
                {expense.category}
              </span>
              <h3 className="truncate font-semibold">{expense.title}</h3>
            </div>
            <p className="mt-1 text-sm text-muted">
              {formatDate(expense.date)}
              {expense.note ? ` · ${expense.note}` : ""}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <p className="text-base font-semibold tabular-nums">{formatMoney(expense.amount)}</p>
            <button
              type="button"
              onClick={() => onDelete(expense)}
              disabled={deletingId === expense.id}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
            >
              {deletingId === expense.id ? "刪除中" : "刪除"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
