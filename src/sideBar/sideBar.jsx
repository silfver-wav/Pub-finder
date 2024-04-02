import { React, useState } from "react";
import "./SideBar.css";
import { IoTimeOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { FaGlobe } from "react-icons/fa";
import { FaToilet } from "react-icons/fa";
import { RxAccessibility } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { focusOnPub } from "../redux/slices/pubSlice";
import correctEncoding from "../util/correctEncoding";

export default function SideBar() {
  const pubs = useSelector((state) => state.pubs.pubs);
  const [expandedPubId, setExpandedPubId] = useState(null);
  const searchedPub = useSelector((state) => state.pub.pub);

  const toggleExpanded = (pubId) => {
    setExpandedPubId(expandedPubId === pubId ? null : pubId);
  };

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

  return (
    <div className="sideDiv">
        {!isEmpty(searchedPub) &&
        (<>
            <BarTab pub={searchedPub} expanded={expandedPubId === searchedPub.id} toggleExpanded={toggleExpanded} />
            <hr /> {/* Divider */}
        </>
        )}
        {pubs.map((pub) => (
        <BarTab key={pub.id} pub={pub} expanded={expandedPubId === pub.id} toggleExpanded={toggleExpanded} />
        ))}
    </div>
  );
}

const BarTab = ({ pub, expanded, toggleExpanded }) => {
const dispatch = useDispatch();

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const formatOpeningHoursForToday = (openingHours) => {
    if (openingHours === null)
      return ``;
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const todayIndex = new Date().getDay();
    const today = daysOfWeek[todayIndex];

    if (openingHours[today].length > 0) {
      const startTime = formatTime(openingHours[today][0].startTime);
      const endTime = formatTime(openingHours[today][0].endTime);
      return `${startTime} - ${endTime}`;
    } else {
      return `Closed`;
    }
  };

    return (
        <div
          className="barTab"
          onClick={() => dispatch(focusOnPub([pub.lat, pub.lng]))}
          key={pub.id}
        >
          <p className="name">{correctEncoding(pub.name)}</p>

          <p className="price">{pub.price}</p>
          <div className="iconText">
            <IoTimeOutline />
            <p className="time" >{formatOpeningHoursForToday(pub.openingHours)}</p>
          </div>
          <div className="iconText">
            <GoLocation />
            <p className="location" >{correctEncoding(pub.location)}</p>
          </div>
          <p className="description">{pub.description}</p>

          {expanded === pub.id && (
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
            {expanded === pub.id ? 'Show Less' : 'Show More'}
          </button>

        </div>
    );
};