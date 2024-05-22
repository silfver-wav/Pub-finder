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

export default function BarTab({ pub, user = false, visited, refetch }) {
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
    <div
      class="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-gray-900 bg-clip-border text-off_white shadow-lg my-2 cursor-pointer"
      onClick={() => dispatch(focusOnPub([pub.lat, pub.lng]))}
      key={pub.id}
    >
      {/*
        <div
          class="relative mx-2 mt-4 overflow-hidden shadow-lg rounded-xl bg-clip-border shadow-gray-700/20">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
            alt="ui/ux review check" />
          <div
            class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
          </div>
        </div>
      */}

      <div class="flex items-center justify-between font-times pt-4 pl-4">
        <h5 class="block text-2xl antialiased font-medium leading-snug tracking-normal font-oswald text-white">
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


        <div class="grid place-items-center overflow-x-scroll rounded-lg lg:overflow-visible text-inherit">
          <div class="flex divide-x divide-gray-800 row py-1">
            <button
              class="align-middle text-md px-6 font-oswald uppercase transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-140 duration-200"
              onClick={() => {
                setShowInfo(!showInfo);
                setShowReviews(false);
              }}
            >
              More Info
            </button>
            <button
              class="align-middle text-md px-6 font-oswald uppercase transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-140 duration-200"
              onClick={() => {
                setShowReviews(!showReviews);
                setShowInfo(false);
              }}
            >
              Reviews
            </button>
          </div>
        </div>

        {showInfo && <Info pub={pub} />}
        {showReviews && <Reviews pubId={pub.id} pubname={pub.name} user={user} />}

      </div>

    </div>
  );
}

/*
      <div
        className="text-white m-2 my-4 p-4 cursor-pointer flex flex-col items-start rounded-lg bg-opacity-10 bg-white transition duration-300 ease-in-out side-bar"
        onClick={() => dispatch(focusOnPub([pub.lat, pub.lng]))}
        key={pub.id}
      >
        <p className="font-bold mb-1 text-2xl" >{correctEncoding(pub.name)}</p>

        <div className="flex justify-between">

          <p className="text-xl text-left mb-1">{pub.price}</p>
          {user && (
            hasVisited ?
              <MdOutlineBeenhere size={25} className="ml-40 text-cyan-400 hover:text-white" onClick={handleVisit} />
              :
              <MdOutlineBeenhere size={25} className="ml-40 hover:text-cyan-400" onClick={handleVisit} />
          )}

        </div>

        <div className="flex items-center mb-1">
          <IoTimeOutline size={20} className="mr-1" />
          <p className="text-md text-left mb-1" >{formatOpeningHoursForToday(pub.openingHours)}</p>
        </div>
        <div className="flex items-center mb-1">
          <GoLocation size={20} className="mr-1" />
          <p className="location" >{formatLocation(pub.location)}</p>
        </div>

        <div className="flex justify-center">
          <button
            className="text-white bg-transparent border-none transition-colors hover:text-cyan-400 hover:bg-gray-700 px-4 py-2 rounded mr-2"
            onClick={() => {
              setShowInfo(!showInfo);
              setShowReviews(false);
            }}
          >
            More Info
          </button>

          <button
            className="text-white bg-transparent border-none transition-colors hover:text-cyan-400 hover:bg-gray-700 px-4 py-2 rounded ml-2"
            onClick={() => {
              setShowReviews(!showReviews);
              setShowInfo(false);
            }}
          >
            Reviews
          </button>

        </div>

        {showInfo && <Info pub={pub} />}
        {showReviews && <Reviews pubId={pub.id} pubname={pub.name} user={user} />}

      </div>
      */