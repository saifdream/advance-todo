import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://sleepy-refuge-75797.herokuapp.com/api"
    }),
    tagTypes: ["TODOS", "TODO"],
    endpoints: builder => ({
        getTodos: builder.query({
            query: (queryStr) => `/todos${queryStr || ''}`,
            keepUnusedDataFor: 100,
            providesTags: ["TODOS"]
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TODOS"]
        }),
        updateTodo: builder.mutation({
            query: ({id, data}) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg, meta) => [
                "TODOS",
                {type: "TODO", id: arg.id}
            ]
        }),
        removeTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TODOS"]
        }),
    })

});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useRemoveTodoMutation,
} = apiSlice;