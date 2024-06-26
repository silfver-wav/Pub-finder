import { useState } from "react";
import { Rating, Button, Avatar, Typography } from "@material-tailwind/react";
import MakeReview from "./MakeReview";
import { MdOutlineReviews } from "react-icons/md";
import { useGetUserReviewsQuery } from "../redux/slices/apiSlices/pubApiSlice";
import DropdownMenu from "../menu/DropdownMenu";
import { useDeleteReviewMutation } from "../redux/slices/apiSlices/reviewApiSlice";

export default function UserReviews() {
    const username = localStorage.getItem("user");
    const [review, setReview] = useState();
    const [reviewId, setReviewId] = useState();
    const { data: reviews = [], refetch } = useGetUserReviewsQuery(username)
    const [deleteReview] = useDeleteReviewMutation();

    console.log(reviews)
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleDeleteReview = async (id) => {
        try {
            await deleteReview({ reviewId: id })
            refetch()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-black overflow-y-auto h-full">
            <DropdownMenu />
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-white pt-10">
                User Reviews
            </h2>

            <div className="ml-4 mr-4 mt-10 grid grid-cols-4 gap-4 bg-slate-800 text-white">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-900 rounded-lg p-4">
                        <h1 className="mb-4 text-center text-3xl font-bold text-white">{review.pubname}</h1>

                        <div className="flex items-center gap-4 my-1">
                            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                            <Typography variant="h5">{review.username}</Typography>
                        </div>
                        <ReviewRating label="Rating" value={review.rating} />
                        {reviewId === review.id &&
                            <>
                                <ReviewRating label="Toilets" value={review.toilets} />
                                <ReviewRating label="Service" value={review.service} />

                                <Typography color="blue-gray" className="font-medium text-blue-gray-500">
                                    Volume: {review.loudness}
                                </Typography>
                            </>
                        }

                        <Typography variant="paragraph" className="bg-gray-800 rounded-lg my-2 p-2">
                            {review.review}
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
                            {reviewId === review.id ?
                                "Show less" : "Show more"
                            }
                        </Button>

                        <Button
                            onClick={() => {
                                setOpen(!open)
                                console.log(review)
                                setReview(review)
                            }}
                            variant="filled" className="bg-white my-2 flex items-center text-black"
                        >
                            <MdOutlineReviews size={20} className="mr-2" />
                            Edit Review
                        </Button>

                        <Button
                            onClick={() => handleDeleteReview(review.id)}
                            variant="filled" className="bg-white my-2 flex items-center text-black"
                        >
                            <MdOutlineReviews size={20} className="mr-2" />
                            Delete Review
                        </Button>
                    </div>
                ))}
            </div>

            {review &&
                <MakeReview
                    data={review}
                    pubname={review.pubname}
                    pubId={review.id}
                    isOpen={open}
                    onClose={handleOpen}
                    update={true}
                    refetch={refetch}
                />
            }

        </div>
    );
}

function ReviewRating({ label, value }) {
    return (
        <div className="flex items-center gap-2 font-bold">
            <Typography color="blue-gray" className="font-medium text-blue-gray-500 w-14">
                {label}
            </Typography>
            <Rating value={value} readonly />
        </div>
    );
}