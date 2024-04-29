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

export default function Review({ pubname, pubId, isOpen, onClose }) {
    const [reviewPub] = useReviewMutation();
    const [reviewInput, setReviewInput] = useState({
        rating: null,
        toiletsRating: null,
        serviceRating: null,
        volume: null,
        review: "",
    });
    const username = localStorage.getItem("user");

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
        const value = parseInt(e.target.value);
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
                volume:  "PLEASANT",
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
    };


    const handleSubmit = async () => {
        console.log(reviewInput)
        try {
            await reviewPub({
                review: reviewInput,
                pubId: pubId,
                username: username
            })
            handleClose()
        } catch (err) {
            console.log(err)
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
                        defaultValue={50} 
                        onChange={(value) => setVolumeLevel(value)}
                    />
                </div>

                <Textarea 
                    color="gray" 
                    label="Review" 
                    className="text-white"
                    // onChange={(text) => handleUserInput("review", text)} 
                    onChange={(e) => {               
                        setReviewInput({
                            ...reviewInput,
                            "review": e.target.value,
                        });
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