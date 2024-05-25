import { React, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { focusOnPub } from "../redux/slices/pubSlice";

import formatLocation from "../utils/formatLocation";
import formatOpeningHoursForToday from "../utils/formatOpeningHoursForToday";

import { WiTime1 } from "react-icons/wi";
import { GoLocation } from "react-icons/go";
import { BiSolidBeenHere } from "react-icons/bi";
import { useDeleteVisitMutation } from "../redux/slices/apiSlices/visitApiSlice";
import { useVisitMutation } from "../redux/slices/apiSlices/visitApiSlice";

import Info from "./Info";
import Reviews from "../review/Reviews";
import correctEncoding from "../utils/correctEncoding";
import { motion } from "framer-motion"

export default function BarTabMobile({ pub, user = false, visited, refetch, isSearchedPub = false }) {
    const dispatch = useDispatch();
    const [expandedPubId, setExpandedPubId] = useState(null);
    const [hasVisited, setHasVisited] = useState(false);
    const [visitedPub] = useVisitMutation();
    const [deleteVisit] = useDeleteVisitMutation();
    const [showInfo, setShowInfo] = useState(false);
    const [showReviews, setShowReviews] = useState(false);

    const toggleExpanded = (pubId) => {
        setExpandedPubId(expandedPubId === pubId ? null : pubId);
    };

    const handleVisit = useCallback(async () => {
        if (hasVisited) {
            try {
                await deleteVisit({
                    pubId: pub.id,
                    username: user
                }).unwrap()
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                await visitedPub({
                    pubId: pub.id,
                    username: user
                }).unwrap();
            } catch (err) {
                console.log(err)
            }
        }
        setHasVisited(!hasVisited);

        refetch()
    }, [visitedPub, deleteVisit, pub.id, hasVisited, setHasVisited, user, refetch]);


    useEffect(() => {
        setHasVisited(visited);
    }, [visited]);

    return (
        <>
            <div
                class={`relative flex w-64 flex-col rounded-xl ${isSearchedPub ? 'bg-gray-700' : 'bg-gray-900'} bg-clip-border text-off_white shadow-lg my-2 cursor-pointer transition ease-in-out delay-150 focus:bg-gray-700 active:bg-gray-700 duration-200`}
                onClick={() => {
                    dispatch(focusOnPub([pub.lat, pub.lng]))
                    isSearchedPub = false
                }
                }
                tabIndex="0"
                key={pub.id}
            >

                <div class="flex items-center justify-between font-times pt-4 pl-4">
                    <h5 class="block text-2xl antialiased font-medium leading-snug tracking-normal font-oswald text-off_white">
                        {correctEncoding(pub.name)}
                    </h5>
                    {pub.rating != 0 &&
                        <p
                            class="flex items-center gap-1.5 font-oswald text-base font-normal leading-relaxed text-off_white antialiased">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="-mt-0.5 h-5 w-5 text-yellow-700">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {pub.rating}
                        </p>
                    }
                </div>

                <div class="pl-4 pb-4">

                    <div class="flex items-center justify-between font-times">
                        <p class="block font-oswald text-xl font-normal leading-relaxed text-inherit" >
                            {pub.price}
                        </p>
                        {user && (
                            hasVisited ?
                                <BiSolidBeenHere size={25} className="transition ease-in-out delay-150 ml-40 text-blue-300 hover:text-white hover:-translate-y-1 hover:scale-140 duration-200" onClick={handleVisit} />
                                :
                                <BiSolidBeenHere size={25} className="transition ease-in-out delay-150 ml-40 text-white hover:text-blue-300 hover:-translate-y-1 hover:scale-140 duration-200" onClick={handleVisit} />
                        )}
                    </div>

                    <li class="flex items-center gap-4 text-inherit mb-1">
                        <WiTime1 size={20} />
                        <p class="block font-oswald text-base font-200 leading-relaxed antialiased" >
                            {formatOpeningHoursForToday(pub.openingHours)}
                        </p>
                    </li>



                    <li class="flex items-center gap-4 text-inherit mb-1">
                        <GoLocation size={20} />
                        <p class="block font-oswald text-base font-200 leading-relaxed antialiased">
                            {formatLocation(pub.location)}
                        </p>
                    </li>

                </div>
            </div>
        </>
    );
}
