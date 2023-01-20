import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userId = localStorage.getItem("user");

export const expenseSlice = createApi({
  reducerPath: "expense",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: (id) => `expenses/${id}`,
      providesTags: ["Expense"],
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: `expenses/create/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
      query: ({id, ...data}) => ({
        url: `expenses/${userId}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} = expenseSlice;
