import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPubs: builder.query({
            query: (geocode) => ({
                url: `/pub/getPubs/${geocode.latitude}/${geocode.longitude}/${geocode.radius}`,
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        getPub: builder.query({
            query: (pubId) => ({
                url: `/pub/getPub/${pubId}`,
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        getReviewsForPub: builder.query({
            query: (pubId) => ({
                url: `/pub/reviews/${pubId}`,
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),



        getVisitedPubs: builder.query({
            query: (username) => ({
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
    useGetPubQuery,
    useGetReviewsForPubQuery,
    useGetVisitedPubsQuery,
} = apiSlice