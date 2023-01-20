import {
  useDeleteExpenseMutation,
  useGetExpensesQuery,
} from "../api/expenseSlice";
import DataTable from "react-data-table-component";

function ExpenseList({ userId }) {
  const {
    data: expenses,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
  } = useGetExpensesQuery(userId);

  const [deleteExpense] = useDeleteExpenseMutation();

  function handleDelete(id) {
    deleteExpense(id);
  }

  const columns = [
    {
      "name": "Merchant",
      selector: (row) => row.vendor,
      sortable: true,
    },
    {
      "name": "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      "name": "Date",
      selector: (row) => row.posted.slice(0, 10),
      sortable: true,
    },
    {
      "name": "Amount",
      selector: (row) => row.value,
      sortable: true,
    },
    {
      "name": "",
      cell: (row) => {
        return <button onClick={() => handleDelete(row._id)}>Remove</button>;
      },
    },
  ];

  return (
    <div className="expenses-container">
      <h2>Expenses</h2>
      <DataTable columns={columns} data={expenses} />
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, idx) => (
            <tr key={idx}>
              <th>{expense?.vendor}</th>
              <th>{expense?.category}</th>
              {/* temp date slice without using Moment */}
              <th>{expense?.posted.slice(0, 10)}</th>
              <th>${expense?.value}</th>
              <th>
                <button onClick={() => handleDelete(expense._id)}>
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
