import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPubs: builder.query({
            query: ({ lat, lng, radius }) => ({
                url: `/pub/getPubs/${lat}/${lng}/${radius}`,
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        getVisitedPubs: builder.query({
            query: ({ username }) => ({
                url: `/user/getVisitedPubs/${username}`,
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                }, 
            })
        }),
    })
})

export const {
    useGetPubsQuery,
    useGetVisitedPubsQuery
} = apiSlice