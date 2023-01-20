import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const userId = localStorage.getItem("user");

export const categorySlice = createApi({
  reducerPath: "category",
  // all requests will have URLs starting with localhost or site
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    // baseUrl: "https://wealthy-mi.herokuapp.com/"
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ["Category"],
    }),
    // createCategory
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/create/${userId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    // updateCategory
  }),

});

export const {
    useGetCategoriesQuery
} = categorySlice;
