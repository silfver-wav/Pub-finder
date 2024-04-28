import { useState } from "react";
import { skipToken } from '@reduxjs/toolkit/query';
import { Rating, Button, Avatar, Typography } from "@material-tailwind/react";
import Review from "./Review";
import { MdOutlineReviews } from "react-icons/md";

export default function Reviews({ pubId, pubname }) {
    const [reviewId, setReviewId] = useState();
    const reviews = [
        {id: 1, username: "Mo Salah", review: "this is a great place"}, 
        {id: 2, username: "Mo Salah", review: "this is a great place"},
        {id: 3, username: "Mo Salah", review: "this is a great place"},
        {id: 4, username: "Mo Salah", review: "this is a great place"}, 
        {id: 5, username: "Mo Salah", review: "this is a great place"},
        {id: 6, username: "Mo Salah", review: "this is a great place"},
    ];
    // const { data: reviews, refetch } = useGetReviewsPubQuery(getVisitedPubs ? user : skipToken)

    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);


    return (
        <div className="w-full flex flex-col">
            <hr className="border-gray-300 my-2" />
            <Button onClick={handleOpen} variant="filled" className="bg-white my-2 flex items-center text-black">
                <MdOutlineReviews size={20} className="mr-2" />
                Write a review
            </Button>


            {reviews.map((review, index) => (
                <div key={review.id}>
                    <div className="flex items-center gap-4 my-1">
                        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                        <Typography variant="h5">{review.username}</Typography>
                    </div>
                    <ReviewRating label="Rating" value={4} />
                    { reviewId === review.id &&
                        <>
                            <ReviewRating label="Toilets" value={4} />
                            <ReviewRating label="Service" value={4} />
                            
                            <Typography color="blue-gray" className="font-medium text-blue-gray-500">
                                Volume: Pleseant
                            </Typography>
                        </>
                    }

                    <Typography variant="paragraph" className="bg-gray-800 rounded-lg my-2 p-2">
                        Material Tailwind is an easy to use components library for Tailwind CSS
                        and Material Design. It provides a simple way to customize your
                        components, you can change the colors, fonts, breakpoints and everything
                        you need.
                    </Typography>

                    <Button 
                        variant="filled"
                        onClick={() => {
                            if (reviewId === review.id) {
                                setReviewId(null)
                            } else {
                                setReviewId(review.id)
                            }
                        }}
                        className="text-sm px-2 py-1 rounded bg-gray-500 text-black"
                    >
                    { reviewId === review.id ?
                        "Show less" : "Show more"
                    }
                    </Button>
                </div>
                
            ))}

            <Review
                pubname={pubname}
                isOpen={open}
                onClose={handleOpen}
            />
        </div>
    );
}

function ReviewRating({ label, value }) {
    return (
        <div className="flex items-center gap-2 font-bold">
            <Typography color="blue-gray" className="font-medium text-blue-gray-500 w-14">
                {label}
            </Typography>
            <Rating value={value} />
        </div>
    );
}