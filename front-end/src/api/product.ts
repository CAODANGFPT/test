import { IProduct } from "@/interface/Product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "products",
  tagTypes: ["Product"],
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
      fetchProducts: builder.query<IProduct[], void>({
        query: () => {
          return {
            url: "/products",
            method: "GET",
          };
        },
        providesTags: ["Product"],
      }),
      getProductsById: builder.query<IProduct, Partial<number>>({
        query: (id) => {
          return {
            url: `/products/${id}`,
            method: "GET",
            providesTags: ["Product"],
          };
        },
        providesTags: ["Product"],
      }),
      fetchOneProduct: builder.query<IProduct, number>({
        query: (id) => {
          return {
            url: `/products/${id}`,
            method: "GET",
          };
        },
      }),
      top6Products: builder.query<IProduct[], void>({
        query: () => {
          return {
            url: "/productsTop6",
            method: "GET",
          };
        },
        providesTags: ["Product"],
      }),
      addProduct: builder.mutation<IProduct, Partial<IProduct>>({
        query: (product) => {
          return {
            url: "/products",
            method: "POST",
            body: product,
          };
        },
        invalidatesTags: ["Product"],
      }),
      removeProduct: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `/products/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Product"],
      }),
      updateProduct: builder.mutation<IProduct, IProduct>({
        query: (product) => ({
          url: `/products/${product.id}`,
          method: "PATCH",
          body: product,
        }),
        invalidatesTags: ["Product"],
      }),
    };
  },
});

export const {
  useFetchProductsQuery,
  useGetProductsByIdQuery,
  useTop6ProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
} = productApi;
export const productReducer = productApi.reducer;

export default productApi;
