import { IRole } from "@/interface/role";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const roleApi = createApi({
  reducerPath: "role",
  tagTypes: ["Role"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      fetchRole: builder.query<IRole[], void>({
        query: () => {
          return {
            url: "/role",
            method: "GET",
          };
        },
      }),
      updateRole: builder.mutation<IRole, Partial<IRole>>({
        query: (role) => ({
          url: `/role/${role.id}`,
          method: "PATCH",
          body: role,
        }),
        invalidatesTags: ["Role"],
      }),
    };
  },
});

export const { useFetchRoleQuery, useUpdateRoleMutation } = roleApi;
export const roleReducer = roleApi.reducer;
export default roleApi;
