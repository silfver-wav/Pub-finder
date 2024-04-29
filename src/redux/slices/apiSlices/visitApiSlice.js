import { apiSlice } from "./apiSlice";

export const visitedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        visit: builder.mutation({
            query: ({ pubId, username }) => ({
                url: `/visited/save/${pubId}/${username}`,
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        deleteVisit: builder.mutation({
            query: ({ visitId }) => ({
                url: `/visited/delete/${visitId}`,
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
    })
})

export const {
    useVisitMutation,
    useDeleteVisitMutation,
} = apiSlice