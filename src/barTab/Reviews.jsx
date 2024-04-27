import { useState } from "react";
import { skipToken } from '@reduxjs/toolkit/query';

export default function Reviews({ pubId }) {
    const [makeReview, setMakeReview] = useState(false);
    const reviews = [
        {review: "this is a great place"}, 
        {review: "this is a great place"},
        {review: "this is a great place"},
        {review: "this is a great place"}, 
        {review: "this is a great place"},
        {review: "this is a great place"},
    ];
    // const { data: reviews, refetch } = useGetReviewsPubQuery(getVisitedPubs ? user : skipToken)

    console.log(reviews)


    return (
        <div className="w-full">
            <hr className="border-gray-300 my-2" />

            <button onClick={() => setMakeReview(true)}>Make a review</button>
            {reviews.map((review) => {
                <div>
                    {review.review}
                </div>
            })}

            { makeReview && (
                <div>make your review</div>
            )}
        </div>
    );
}