"use client";
import { useState, useEffect } from "react";

export default function AddExpense({ isOpen, onClose, onSubmit, editItem }) {
  const [form, setForm] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  // Prefill form when editing
  useEffect(() => {
    setForm({
      date: editItem?.date || "",
      category: editItem?.category || "",
      description: editItem?.description || "",
      amount: editItem?.amount || 0.0,
    });

    setErrors({});
  }, [editItem, isOpen]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Simple form validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Date is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      newErrors.amount = "Valid amount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({ ...form, amount: parseFloat(form.amount) });
    handleClose();
  };

  const handleClose = () => {
    setForm({ date: "", category: "", description: "", amount: "" });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {editItem ? "Edit Expense" : "Add New Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.date && (
              <p className="text-red-600 text-xs">{errors.date}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select category</option>
              <option>Food</option>
              <option>Travel</option>
              <option>Utilities</option>
              <option>Subscriptions</option>
              <option>Rent</option>
              <option>Miscellaneous</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-xs">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              maxLength={800}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter a brief description"
            />
            {errors.description && (
              <p className="text-red-600 text-xs">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount ({"\u20B9"})
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              min="0"
              step="0.01"
            />
            {errors.amount && (
              <p className="text-red-600 text-xs">{errors.amount}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editItem ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
