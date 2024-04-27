import { useState } from "react";
import { skipToken } from '@reduxjs/toolkit/query';
import { Rating } from "@material-tailwind/react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Slider,
    Input
  } from "@material-tailwind/react";

export default function Reviews({ pubId }) {
    const [makeReview, setMakeReview] = useState(false);
    const reviews = [
        {username: "Mo Salah", review: "this is a great place"}, 
        {username: "Mo Salah", review: "this is a great place"},
        {username: "Mo Salah", review: "this is a great place"},
        {username: "Mo Salah", review: "this is a great place"}, 
        {username: "Mo Salah", review: "this is a great place"},
        {username: "Mo Salah", review: "this is a great place"},
    ];
    // const { data: reviews, refetch } = useGetReviewsPubQuery(getVisitedPubs ? user : skipToken)

    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);


    return (
        <div className="w-full">
            <hr className="border-gray-300 my-2" />

            {reviews.map((review, index) => (
                <div key={index}>
                    <div key={index}>{review.username}</div>
                    <Rating value={4} readonly />
                    <div key={index}>{review.review}</div>
                </div>
                
            ))}

            <Button onClick={handleOpen} variant="gradient">
                Open Dialog
            </Button>

            <Dialog
                className="bg-blue-gray-900"
                open={open}
                handler={handleOpen}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader className="text-blue-gray-500">Make your review of pubname.</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                
                    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                        Overall Rating: 
                        <Rating 
                            unratedColor="blue" 
                            ratedColor="blue"
                            value={0} 
                            onChange={(value) => setRating(value)} 
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                        Toilets Rating: 
                        <Rating 
                            unratedColor="blue" 
                            ratedColor="blue"
                            value={0} 
                            onChange={(value) => setRating(value)} 
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                        Service Rating: 
                        <Rating 
                            unratedColor="blue" 
                            ratedColor="blue"
                            value={0} 
                            onChange={(value) => setRating(value)} 
                        />
                    </div>

                    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                        Volume
                        <Slider defaultValue={50} />
                    </div>

                    <Input size="md" label="Input Medium" />
                
                </DialogBody>
                    <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Submit</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}