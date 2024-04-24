import { React, useState } from "react";
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

import "./SideBar.css";

export default function BarTab({ pub }) {
    const dispatch = useDispatch();
    const [expandedPubId, setExpandedPubId] = useState(null);
    const [visited, setVisited] = useState(false);
    const [visitedPub, { isLoading }] = useVisitedPubMutation();
  
    const toggleExpanded = (pubId) => {
        setExpandedPubId(expandedPubId === pubId ? null : pubId);
    };

    const handleVisitedPub = async () => {
      setVisited(!visited);
      if (visited) {
        try {
          await visitedPub(pub.id).unwrap()
        } catch (err) {
          console.log(err)
        }
      } else {
        // dispatch(notVisitedPub(pub.id));
        console.log("not visited pub");
      }
    }
  
    return (
      <div
        className="barTab"
        onClick={() => dispatch(focusOnPub([pub.lat, pub.lng]))}
        key={pub.id}
      >
        <p className="name">{correctEncoding(pub.name)}</p>
        <div className="flex justify-between">
          <p className="price">{pub.price}</p>
          { visited ? 
            <MdOutlineBeenhere size={25} className="ml-40 text-cyan-400 hover:text-white" onClick={() => handleVisitedPub()}/>
          :
            <MdOutlineBeenhere size={25} className="ml-40 hover:text-cyan-400" onClick={() => handleVisitedPub()}/>
          }
          
        </div>
        <div className="iconText">
          <IoTimeOutline />
          <p className="time" >{formatOpeningHoursForToday(pub.openingHours)}</p>
        </div>
        <div className="iconText">
          <GoLocation />
          <p className="location" >{correctEncoding(pub.location)}</p>
        </div>
        <p className="description">{pub.description}</p>
  
        {expandedPubId === pub.id && (
          <div className="expandedInfo">
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