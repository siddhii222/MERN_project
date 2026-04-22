import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "" });

  const token = localStorage.getItem("token");

  const BASE_URL = "https://mern-project-9u8s.onrender.com"; // 🔥 clean base

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(res.data);
    } catch (err) {
      console.log("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${BASE_URL}/api/expenses`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setForm({ title: "", amount: "", category: "" });
      fetchExpenses();

    } catch (err) {
      alert("Error adding expense");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Add Expense</h3>
      <form onSubmit={addExpense}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button>Add</button>
      </form>

      <h3>Expenses</h3>

      {expenses.map((e) => (
        <div key={e._id}>
          {e.title} - ₹{e.amount}
        </div>
      ))}
    </div>
  );
}