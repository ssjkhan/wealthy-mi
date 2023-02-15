import { useState } from "react";
import {
  useDeleteExpenseMutation,
  useGetExpensesQuery,
} from "../api/expenseSlice";
import EditExpenseForm from "./EditExpenseForm";
import DataTable, { createTheme } from "react-data-table-component";
import CsvDownloadButton from "react-json-to-csv";

function ExpenseList({ userId }) {
  const [openEdit, setOpenEdit] = useState(false);

  const {
    data: expenses,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
    refetch,
  } = useGetExpensesQuery(userId);

  const [deleteExpense] = useDeleteExpenseMutation();

  function handleDelete(id) {
    deleteExpense(id);
  }
  function convertToCSV() {
    const JSONToCSV = [];
    expenses?.forEach((e) => {
      const { vendor, category, value, posted } = e;
      let formatObj = {
        Merchant: vendor,
        Category: category,
        Date: posted.slice(0, 10),
        Amount: value,
      };
      JSONToCSV.push(formatObj);
    });
    return JSONToCSV;
  }
  function formatCurrency(val) {
    const CDN = { style: "currency", currency: "CAD" };
    const numberFormat = new Intl.NumberFormat("en-CA", CDN);
    return numberFormat.format(val);
  }

  const columns = [
    {
      name: "Merchant",
      selector: (row) => row.vendor,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.posted?.slice(0, 10),
      sortable: true,
    },
    {
      "name": "",
      name: "Amount",
      selector: (row) => `${formatCurrency(row.value)}`,
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => {
        return (
          <div className="container justify-content-center">
            <button
              className="row-col btn btn-danger text-white btn-sm my-1 mx-1 "
              onClick={() => handleDelete(row._id)}
            >
              Remove
            </button>
            <button
              className="row-col btn btn-warning btn-sm text-white my-1 mx-1"
              onClick={() => setOpenEdit(!openEdit)}
            >
              &nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            {openEdit
              ? (
                <EditExpenseForm
                  expense={row}
                  setOpenEdit={setOpenEdit}
                  openEdit={openEdit}
                />
              )
              : null}
          </div>
        );
      },
    },
  ];

  const customTableStyles = {
    headCells: {
      style: {
        color: "var(--bs-white)",
        fontSize: "1rem",
        background: "var(--bs-dark)",
        // border: "1rem var(--bs-primary) solid",
        borderRadius: "0.5rem",
      },
    },
  };

  return (
    <div className="expenses-container">
      <DataTable
        pagination
        columns={columns}
        data={expenses}
        customStyles={customTableStyles}
      />
      <div className="d-flex">
        <div className="me-auto">Download your data</div>
        <CsvDownloadButton
          className="btn btn-dark mx-1"
          data={convertToCSV()}
        />
        <button className="btn btn-warning mx-1 text-white" onClick={refetch}>
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default ExpenseList;
