import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// https://blog.openreplay.com/fetching-data-in-redux-using-rtk-query/
const userId = localStorage.getItem("user");

export const expenseSlice = createApi({
  reducerPath: "expense",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: (id) => `/expenses/${id}`,
      providesTags: ["Expense"],
    }),
    // createExpense
    createExpense: builder.mutation({
      query: (data) => ({
        url: `/expenses/create/${userId}`,
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
    // updateExpense
  }),
  // tagTypes: ["Category"],
  // endpoints: (builder) => ({
  //   getCategories: builder.query({
  //     query: (id) => `/categories/${id}`,
  //     providesTags: ["Category"],
  //   }),
  // }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseSlice;