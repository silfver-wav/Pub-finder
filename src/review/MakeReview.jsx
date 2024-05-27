import { React, useState, useEffect, useCallback } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Rating
} from "@material-tailwind/react";
import { useReviewMutation } from "../redux/slices/apiSlices/reviewApiSlice";
import { useUpdateReviewMutation } from "../redux/slices/apiSlices/reviewApiSlice";

export default function MakeReview({ data, pubname, pubId, isOpen, onClose, update, refetch, mobile = false }) {
    const [reviewPub] = useReviewMutation();
    const [updateReview] = useUpdateReviewMutation();
    const [reviewInput, setReviewInput] = useState({
        rating: null,
        toiletsRating: null,
        serviceRating: null,
        volume: "AVERAGE",
        review: "",
    });
    const username = localStorage.getItem("user");

    useEffect(() => {
        setReviewInput({
            rating: data ? data.rating : null,
            toiletsRating: data ? data.toilets : null,
            serviceRating: data ? data.service : null,
            volume: data ? data.loudness : "AVERAGE",
            review: data ? data.review : "",
        });
    }, [data]);

    const handleClose = () => {
        setReviewInput({
            rating: null,
            toiletsRating: null,
            serviceRating: null,
            volume: null,
            review: "",
        });
        onClose();
    };

    const handleUserInput = (name, value) => {
        setReviewInput({
            ...reviewInput,
            [name]: value,
        });
        console.log(reviewInput)
    };

    const handleSubmit = useCallback(async () => {
        console.log(reviewInput)
        try {
            if (update) {
                await updateReview({ id: data.id, review: reviewInput })
            } else {
                if (reviewInput.rating != null) {
                    await reviewPub({
                        review: reviewInput,
                        pubId: pubId,
                        username: username
                    })
                }
            }
            refetch()
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }, [reviewInput, update, pubId, username, updateReview]);

    return (
        <Dialog
            className="bg-gray-900"
            open={isOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader className="text-off_white pb-0 font-oswald">Make your review for {pubname}</DialogHeader>
            <DialogBody className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-bold font-oswald text-off_white">
                    Overall Rating:
                    <Rating
                        unratedColor="yellow"
                        ratedColor="yellow"
                        value={reviewInput.rating}
                        onChange={(rating) => handleUserInput("rating", rating)}
                    />
                </div>
                <div className="flex items-center gap-2 font-bold font-oswald text-off_white">
                    Toilets Rating:
                    <Rating
                        unratedColor="yellow"
                        ratedColor="yellow"
                        value={reviewInput.toiletsRating}
                        onChange={(rating) => handleUserInput("toiletsRating", rating)}
                    />
                </div>
                <div className="flex items-center gap-2 font-bold font-oswald text-off_white">
                    Service Rating:
                    <Rating
                        unratedColor="yellow"
                        ratedColor="yellow"
                        value={reviewInput.serviceRating}
                        onChange={(rating) => handleUserInput("serviceRating", rating)}
                    />
                </div>

                <div className="flex items-center gap-2 font-bold font-oswald text-off_white">
                    Select Volume:
                    <select
                        class="peer text-off_white rounded-xl border border-off_white bg-transparent px-3 py-2.5 text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-200"
                        value={reviewInput.volume}
                        onChange={(e) => handleUserInput("volume", e.target.value)}
                    >
                        <option className="bg-gray-800 text-off_white font-oswald" value="QUITE">Quite</option>
                        <option className="bg-gray-800 text-off_white font-oswald" value="PLEASANT">Pleasant</option>
                        <option className="bg-gray-800 text-off_white font-oswald" value="AVERAGE">Average</option>
                        <option className="bg-gray-800 text-off_white font-oswald" value="LOUD">Loud</option>
                        <option className="bg-gray-800 text-off_white font-oswald" value="VERY_LOUD">Very Loud</option>
                    </select>
                </div>

                <Textarea
                    color="gray"
                    label="Review"
                    className="text-off_white font-oswald"
                    onChange={(e) => {
                        setReviewInput({
                            ...reviewInput,
                            "review": e.target.value,
                        });
                        console.log(reviewInput)
                    }}
                />
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => handleClose()}

                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={() => handleSubmit()}>
                    <span>Submit</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );

}
