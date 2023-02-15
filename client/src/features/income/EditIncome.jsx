import { useState } from "react";
import { useUpdateIncomeMutation } from "../api/incomeSlice";

export default function EditIncomeForm({ income, setOpenEdit }) {
  const [formData, setFormData] = useState({
    id: income._id,
    value: income.value,
    name: income.name,
  });

  const [updateIncome] = useUpdateIncomeMutation();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
      await updateIncome(formData);
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
    }
  }

  const EditModalStyling = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div
      style={EditModalStyling}
      className=" bg-dark border border-dark rounded-2 mx-5 my-5"
    >
      <form onSubmit={handleSubmit} className="py-3 px-5">
        <div className="container ">
          <div className="row">
            <input
              className="form-control col text-dark"
              placeholder={income.name}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="form-control col text-dark"
              placeholder=""
              name="value"
              type="text"
              value={formData.value}
              onChange={handleChange}
            />
            <button
              className="btn btn-success text-white btn-sm mx-1 col-auto"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
