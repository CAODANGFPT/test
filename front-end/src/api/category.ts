import { ICategory } from "@/interface/Category";
import { IProduct } from "@/interface/Product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "category",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const { accessToken } = JSON.parse(localStorage.getItem("user") as string);
      if (accessToken) {
        headers.set("Authorization", "Bearer " + accessToken);
      }
      return headers;
    },
  }),
  
  endpoints(builder) {
    return {
      fetchCategory: builder.query<ICategory[], void>({
        query: () => {
          return {
            url: "/category",
            method: "GET",
          };
        },
        providesTags: ["Category"],
      }),
      getCategoryById: builder.query<ICategory, Partial<number>>({
        query: (id) => {
          return {
            url: `/category/${id}`,
            method: "GET",
            providesTags: ["category"],
          };
        },
        providesTags: ["Category"],
      }),
      cateProducts: builder.query<IProduct[],Partial<number>>({
        query: (id) => {
          return {
            url: `/categoryProducts/${id}`,
            method: "GET",
          };
        },
      }),
      addCategory: builder.mutation<ICategory, Partial<ICategory>>({
        query: (category) => {
          return {
            url: "/category",
            method: "POST",
            body: category,
          };
        },
        invalidatesTags: ["Category"],
      }),
      updateCategory: builder.mutation<ICategory, ICategory>({
        query: (category) => ({
          url: `/category/${category.id}`,
          method: "PATCH",
          body: category,
        }),
        invalidatesTags: ["Category"],
      }),
      removeCategory: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `/category/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchCategoryQuery,
  useGetCategoryByIdQuery,
  useCateProductsQuery,
  useAddCategoryMutation,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
export const categoryReducer = categoryApi.reducer;

export default categoryApi;
