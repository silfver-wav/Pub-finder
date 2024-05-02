import { React, useState, useEffect, useCallback } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Slider,
    Textarea,
    Rating
} from "@material-tailwind/react";
import { useReviewMutation } from "../redux/slices/apiSlices/reviewApiSlice";
import { useUpdateReviewMutation } from "../redux/slices/apiSlices/reviewApiSlice";

export default function MakeReview({ data, pubname, pubId, isOpen, onClose, update, refetch }) {
    const [reviewPub] = useReviewMutation();
    const [updateReview] = useUpdateReviewMutation();
    const [volume, setVolume] = useState(50);
    const [reviewInput, setReviewInput] = useState({
        rating: null,
        toiletsRating: null,
        serviceRating: null,
        volume: 50,
        review: "",
    });
    const username = localStorage.getItem("user");

    useEffect(() => {
        if (data) {
            const loudness = setLoundess(data.loudness)
            setVolume(loudness)
        }
        console.log("here")

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

    const setVolumeLevel = (e) => {
        const value = e.target.value
        setVolume(value)
        if (0 <= value && value <= 20) {
            setReviewInput({
                ...reviewInput,
                volume: "QUITE",
            })
        } else if (20 < value && value <= 40) {
            setReviewInput({
                ...reviewInput,
                volume:  "PLEASANT",
            })
        } else if (40 < value && value <= 60) {
            setReviewInput({
                ...reviewInput,
                volume:  "AVERAGE",
            })
        } else if (60 < value && value <= 80) {
            setReviewInput({
                ...reviewInput,
                volume: "LOUD",
            })
        } else {
            setReviewInput({
                ...reviewInput,
                volume:  "VERY_LOUD",
            })
        }
    }

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

    const setLoundess = (value) => {
        if (value === "QUITE") {
            return 10
        } else if (value === "PLEASANT") {
            return 30
        } else if (value === "AVERAGE") {
            return 50
        } else if (value === "LOUD") {
            return 70
        } else {
            return 90
        }
    }

    return (
        <Dialog
            className="bg-blue-gray-900"
            open={isOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader className="text-white">Make your review for {pubname}</DialogHeader>
            <DialogBody className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-bold text-white">
                    Overall Rating: 
                    <Rating 
                        unratedColor="blue" 
                        ratedColor="blue"
                        value={reviewInput.rating}
                        onChange={(rating) => handleUserInput("rating", rating)} 
                    />
                </div>
                <div className="flex items-center gap-2 font-bold text-white">
                    Toilets Rating: 
                    <Rating 
                        unratedColor="blue" 
                        ratedColor="blue"
                        value={reviewInput.toiletsRating} 
                        onChange={(rating) => handleUserInput("toiletsRating", rating)} 
                    />
                </div>
                <div className="flex items-center gap-2 font-bold text-white">
                    Service Rating: 
                    <Rating 
                        unratedColor="blue" 
                        ratedColor="blue"
                        value={reviewInput.serviceRating} 
                        onChange={(rating) => handleUserInput("serviceRating", rating)} 
                    />
                </div>
                
                <div className="flex items-center gap-2 font-bold text-white">
                    Volume
                    <Slider 
                        color="blue"
                        size="md"
                        value={volume}
                        onChange={setVolumeLevel}
                    />
                </div>

                <Textarea 
                    color="gray" 
                    label="Review" 
                    className="text-white"
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
                    className="mr-1"
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