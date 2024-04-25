import { React, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { focusOnPub } from "../redux/slices/pubSlice";
import { useVisitedPubMutation } from "../redux/slices/pubSliceApi";

import correctEncoding from "../utils/correctEncoding";
import formatOpeningHoursForToday from "../utils/formatOpeningHoursForToday";

import { IoTimeOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { FaGlobe, FaToilet } from "react-icons/fa";
import { RxAccessibility } from "react-icons/rx";
import { MdOutlineBeenhere } from "react-icons/md";
import { useUnVisitPubMutation } from "../redux/slices/pubSliceApi";

import "./SideBar.css";

export default function BarTab({ pub, user=false, visited, refetch}) {
    const dispatch = useDispatch();
    const [expandedPubId, setExpandedPubId] = useState(null);
    const [hasVisited, setHasVisited] = useState(false);
    const [visitedPub] = useVisitedPubMutation();
    const [unVisitPub] = useUnVisitPubMutation();
  
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
        <p className="name">{correctEncoding(pub.name)}</p>
        <div className="flex justify-between">
          <p className="price">{pub.price}</p>
          {user && (
              hasVisited ? 
                <MdOutlineBeenhere size={25} className="ml-40 text-cyan-400 hover:text-white" onClick={handleVisitedPub}/>
              :
                <MdOutlineBeenhere size={25} className="ml-40 hover:text-cyan-400" onClick={handleVisitedPub}/>
          )}

        </div>
        <div className="iconText">
          <IoTimeOutline />
          <p className="time" >{formatOpeningHoursForToday(pub.openingHours)}</p>
        </div>
        <div className="iconText">
          <GoLocation />
          <p className="location" >{correctEncoding(pub.location)}</p>
        </div>
  
        {expandedPubId === pub.id && (
          <div className="expandedInfo">
          <p className="description">{pub.description}</p>

            <div className="iconText">
              <FaToilet />
              <p className="description">{pub.washroom ? 'yes' : 'no'}</p>
            </div>
  
            <div className="iconText">
              <FaGlobe />
              <a href={pub.website} target="_blank" rel="noopener noreferrer" className="website-link">
                {pub.website}
              </a>
            </div>
  
            <p className="description">{pub.outDoorSeating}</p>
            <div className="iconText">
              <RxAccessibility />
              <p className="description">Accessible Seating: {pub.accessibility.accessibleSeating ? 'yes' : 'no'}</p>
            </div>
            <div className="iconText">
              <RxAccessibility />
              <p className="description">Accessible Entrance: {pub.accessibility.accessibleEntrance ? 'yes' : 'no'}</p>
            </div>
            <div className="iconText">
              <RxAccessibility />
              <p className="description">Accessible Parking: {pub.accessibility.accessibleParking ? 'yes' : 'no'}</p>
            </div>
          </div>
        )}
  
        <button onClick={() => toggleExpanded(pub.id)} className="button">
          {expandedPubId === pub.id ? 'Show Less' : 'Show More'}
        </button>
  
      </div>
    );
}