import { React, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { focusOnPub } from "../redux/slices/pubSlice";
import { useVisitedPubMutation } from "../redux/slices/pubSliceApi";

import correctEncoding from "../utils/correctEncoding";
import formatOpeningHoursForToday from "../utils/formatOpeningHoursForToday";

import { IoTimeOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { MdOutlineBeenhere } from "react-icons/md";
import { useUnVisitPubMutation } from "../redux/slices/pubSliceApi";

import Info from "./Info";
import Reviews from "./Reviews";

export default function BarTab({ pub, user=false, visited, refetch}) {
    const dispatch = useDispatch();
    const [expandedPubId, setExpandedPubId] = useState(null);
    const [hasVisited, setHasVisited] = useState(false);
    const [visitedPub] = useVisitedPubMutation();
    const [unVisitPub] = useUnVisitPubMutation();
    const [showInfo, setShowInfo] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
  
    const toggleExpanded = (pubId) => {
        setExpandedPubId(expandedPubId === pubId ? null : pubId);
    };

    const handleVisitedPub = useCallback(async () => {
      if (hasVisited) {
          try {
              await unVisitPub({
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
      // force re-fetches the data
      refetch()
    }, [visitedPub, unVisitPub, pub.id, hasVisited, setHasVisited, user, refetch]);


    useEffect(() => {
      setHasVisited(visited);
    }, [visited]);
  
    return (
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
                <MdOutlineBeenhere size={25} className="ml-40 text-cyan-400 hover:text-white" onClick={handleVisitedPub}/>
              :
                <MdOutlineBeenhere size={25} className="ml-40 hover:text-cyan-400" onClick={handleVisitedPub}/>
          )}

        </div>

        <div className="flex items-center mb-1">
          <IoTimeOutline size={20} className="mr-1" />
          <p className="text-md text-left mb-1" >{formatOpeningHoursForToday(pub.openingHours)}</p>
        </div>
        <div className="flex items-center mb-1">
          <GoLocation size={30} className="mr-1" />
          <p className="location" >{correctEncoding(pub.location)}</p>
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
        {showReviews && <Reviews pubId={pub.id} />}

      </div>
    );
}

/*
  {expandedPubId === pub.id && (
    <div className="flex justify-center">
      <button 
        className="text-white bg-transparent border-none transition-colors hover:text-cyan-400 hover:bg-gray-700 px-4 py-2 rounded mr-2" 
        onClick={() => setBottomDiv("Info")}
      >
        More Info
      </button>
      
      <button 
        className="text-white bg-transparent border-none transition-colors hover:text-cyan-400 hover:bg-gray-700 px-4 py-2 rounded ml-2" 
        onClick={() => setBottomDiv("Reviews")}
      >
        Reviews
      </button>

      </div>
    )}


    <button onClick={() => toggleExpanded(pub.id)} className="text-white bg-transparent block mx-auto border-none transition-colors hover:text-cyan-400">
      {expandedPubId === pub.id ? 'Show Less' : 'Show More'}
    </button>
  */