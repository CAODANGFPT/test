import { INews } from "@/interface/News";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const newsApi = createApi({
  reducerPath: "news",
  tagTypes: ["News"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const { accessToken } = JSON.parse(
        localStorage.getItem("user") as string
      );
      if (accessToken) {
        headers.set("Authorization", "Bearer " + accessToken);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchNews: builder.query<INews[], void>({
        query: () => {
          return {
            url: "/news",
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      fetchNewsById: builder.query<INews, Partial<number>>({
        query: (id) => {
          return {
            url: `/news/${id}`,
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      addNews: builder.mutation<INews, Partial<INews>>({
        query: (news) => {
          return {
            url: "/news",
            method: "POST",
            body: news,
          };
        },
        invalidatesTags: ["News"],
      }),
      removeNews: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `/news/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["News"],
      }),
      updateNews: builder.mutation<INews, INews>({
        query: (news) => ({
          url: `/news/${news.id}`,
          method: "PUT",
          body: news,
        }),
        invalidatesTags: ["News"],  
      }),
    };
  },
});
export const { useFetchNewsQuery,useFetchNewsByIdQuery,useUpdateNewsMutation, useAddNewsMutation, useRemoveNewsMutation } =
  newsApi;
export const newsReducer = newsApi.reducer;
export default newsApi;
