"use client";
import { useState, useEffect } from "react";

// Component Imports
import Tbutton from "./Button";
import AddExpense from "./AddExpense";
import FilterControls from "./Filters";
import PaginationControls from "./Pagination";
import ExpensesTable from "./Expenses";

// CRUD Imports
import ExpenseService from "../services/expenseservice";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Set data for categories
  const categories = ["all", ...new Set(data.map((item) => item.category))];

  // Method to refresh data after each user action
  const refreshData = () => {
    const expenses = ExpenseService.getItems("expenses");
    setData([...expenses]);
  };

  const filteredData = data
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((item) => {
      const matchCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchSearch = item.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const addExpense = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleDelete = (item) => {
    ExpenseService.removeItem(item.id);
    refreshData();
  };

  const handleSubmit = (expense) => {
    let savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (editItem) {
      savedExpenses = savedExpenses.map((item) =>
        item.id === editItem.id ? { ...expense, id: editItem.id } : item
      );
    } else {
      expense.id = Date.now();
      expense.amount = +expense.amount;
      savedExpenses.push(expense);
    }

    localStorage.setItem("expenses", JSON.stringify(savedExpenses));
    refreshData();
    setShowModal(false);
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-4">
        <h4 className="font-bold text-xl">Dashboard</h4>
        <Tbutton text="Add New Expense" onClick={addExpense} />
      </div>

      <FilterControls
        categories={categories}
        categoryFilter={categoryFilter}
        onCategoryChange={(cat) => {
          setCategoryFilter(cat);
          setCurrentPage(1);
        }}
        searchTerm={searchTerm}
        onSearchChange={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
      />

      <PaginationControls
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ExpensesTable
        data={paginatedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddExpense
        isOpen={showModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        editItem={editItem}
      />
    </>
  );
}
