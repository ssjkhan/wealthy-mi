import { useState } from "react";
import { useUpdateExpenseMutation } from "../api/expenseSlice";

export default function EditExpenseForm({ expense, setOpenEdit, openEdit }) {
  const [formData, setFormData] = useState({
    id: expense._id,
    vendor: expense.vendor,
    category: expense.category,
    posted: expense.posted,
    value: expense.value,
  });
  const [updateExpense] = useUpdateExpenseMutation();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateExpense(formData);
      setOpenEdit(!openEdit);
    } catch (error) {
      console.log(error);
    }
  }

  const tempStyling = {
    // for visibility...
    position: "fixed",
    right: "0",
    bottom: "0",
  };

  return (
    <div style={tempStyling}>
      <form onSubmit={handleSubmit}>
        <div className="container ">
          <div className="row">
            <input
              className="form-control col"
              name="vendor"
              type="text"
              value={formData.vendor}
              onChange={handleChange}
            />
            <input
              className="form-control col"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              className="form-control col"
              form="form-control"
              name="posted"
              value={formData.posted.slice(0, 10)}
              onChange={handleChange}
            />
            <input
              className="form-control col"
              placeholder="amount"
              name="value"
              type="text"
              min="0"
              step="0.01"
              value={formData.value}
              onChange={handleChange}
            />
            <button className="btn btn-dark btn-sm mx-1 col-auto" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
