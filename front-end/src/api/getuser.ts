import { IRoleUser, IUser } from "@/interface/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
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
      fetchUser: builder.query<IUser[], void>({
        query: () => {
          return {
            url: "/user",
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
      fetchListUser: builder.query<IUser[], void>({
        query: () => {
          return {
            url: "/list/user",
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
      updateUser: builder.mutation<IRoleUser, Partial<IRoleUser>>({
        query: (user) => ({
          url: `/user/${user.id}`,
          method: "put",
          body: user,
        }),
        invalidatesTags: ["User"],
      }),
    };
  },
});

export const {
  useFetchUserQuery,
  useFetchListUserQuery,
  useUpdateUserMutation,
} = userApi;
export const userReducer = userApi.reducer;
export default userApi;
