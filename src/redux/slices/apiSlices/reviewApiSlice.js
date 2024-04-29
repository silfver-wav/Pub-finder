import { apiSlice } from "./apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        review: builder.mutation({
            query: ({ review, pubId, username }) => ({
                url: `/review/save/${pubId}/${username}`,
                method: 'POST',
                body: {
                    'review': review.review,
                    'rating': review.rating,
                    'toilets': review.toiletsRating,
                    'volume': review.volume,
                    'service': review.serviceRating,
                },
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
        deleteReview: builder.mutation({
            query: ({ reviewId }) => ({
                url: `/review/delete/${reviewId}`,
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json",
                },
            })
        }),
    })
})

export const {
    useReviewMutation,
    usedeleteReviewMutation,
} = apiSlice