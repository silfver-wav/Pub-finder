import { apiSlice } from "./apiSlice";

export const pubApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPub: builder.query({
            query: (pubId) => ({
                url: `/pub/getPub/${pubId}`,
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        visitedPub: builder.mutation({
            query: (pubId) => ({
                url: `/pub/visited/${pubId}`,
                method: 'PUT',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
    })
})

export const {
    useGetPubQuery,
    useVisitedPubMutation
} = apiSlice