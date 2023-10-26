import { IOrder, IUpdate } from "@/interface/Oder";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orders",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api"
  }),
  endpoints(builder) {
    return {
      fetchOrderUser: builder.query<IOrder[], Partial<number>>({
        query: (id) => {
          return {
            url: `/orders/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Orders"],
      }),
      addToOrder: builder.mutation<IOrder, Partial<IOrder>>({
        query: (order) => {
          return {
            url: "/orders",
            method: "POST",
            body: order,
          };
        },
        invalidatesTags: ["Orders"],
      }),
      removeOrder: builder.mutation<void, number>({
        query: (id) => {
          return {
            url: `/orders/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Orders"],
      }),
      updateQuantityOrder: builder.mutation<IUpdate, IUpdate>({
        query: (order) => ({
          url: `/orders/${order.id}`,
          method: "PUT",
          body: order,
        }),
        invalidatesTags: ["Orders"],
      }),
    };
  },
});

export const {
  useFetchOrderUserQuery,
  useAddToOrderMutation,
  useRemoveOrderMutation,
  useUpdateQuantityOrderMutation,
} = orderApi;
export const orderReducer = orderApi.reducer;

export default orderApi;
