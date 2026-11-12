import { useState } from "react";
import { CATEGORIES, todayInputValue } from "../lib/format";

const EMPTY_FORM = {
  title: "",
  amount: "",
  category: "飲食",
  date: todayInputValue(),
  note: "",
};

export default function ExpenseForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const title = form.title.trim();
    const amount = Number(form.amount);
    if (!title) {
      setFormError("請輸入標題");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("金額必須大於 0");
      return;
    }
    if (!form.date) {
      setFormError("請選擇日期");
      return;
    }

    setFormError("");
    const saved = await onSubmit({
      title,
      amount: Math.round(amount * 100) / 100,
      category: form.category,
      date: form.date,
      note: form.note.trim(),
    });
    if (saved) {
      setForm({ ...EMPTY_FORM, date: todayInputValue(), category: form.category });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-card p-5 shadow-card">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">New entry</p>
        <h2 className="mt-1 text-xl font-semibold">新增一筆消費</h2>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">標題</span>
          <input
            name="title"
            value={form.title}
            onChange={updateField}
            maxLength={100}
            placeholder="例如：午餐、捷運、咖啡"
            className="w-full rounded-2xl border border-line bg-white px-3.5 py-2.5 focus:border-clay"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">金額</span>
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              value={form.amount}
              onChange={updateField}
              placeholder="0"
              className="w-full rounded-2xl border border-line bg-white px-3.5 py-2.5 focus:border-clay"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">分類</span>
            <select
              name="category"
              value={form.category}
              onChange={updateField}
              className="w-full rounded-2xl border border-line bg-white px-3.5 py-2.5 focus:border-clay"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">日期</span>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={updateField}
            className="w-full rounded-2xl border border-line bg-white px-3.5 py-2.5 focus:border-clay"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">備註</span>
          <textarea
            name="note"
            value={form.note}
            onChange={updateField}
            maxLength={500}
            rows={3}
            placeholder="選填"
            className="w-full resize-none rounded-2xl border border-line bg-white px-3.5 py-2.5 focus:border-clay"
          />
        </label>
      </div>

      {formError ? <p className="mt-3 text-sm text-red-700">{formError}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-clay disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {submitting ? "儲存中…" : "記下一筆"}
      </button>
    </form>
  );
}
