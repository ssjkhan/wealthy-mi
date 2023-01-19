import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://wealthy-mi.herokuapp.com/',
    baseUrl: 'http://127.0.0.1:3000/'
  }),
  // fetch calls for HTTP requests here: 
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        // url: 'user/<user_route>',
        // method: 'GET',
      }),
    }),
  }),
})

// export react hook
export const { useGetDetailsQuery } = authApi
