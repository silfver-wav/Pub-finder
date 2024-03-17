import { React, useState } from "react";
import "./SideBar.css";
import { IoTimeOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { focusOnPub } from "../redux/slices/pubSlice";

export default function SideBar() {
  const pubs = useSelector((state) => state.pubs.pubs);
  const dispatch = useDispatch();
  console.log(pubs);

  return (
    <div className="sideDiv">
      {pubs.map((pub) => (
        <div
          className="barTab"
          onClick={() => dispatch(focusOnPub([pub.lat, pub.lng]))}
          key={pub.id}
        >
          <p className="name">{pub.name}</p>
          <div className="iconText">
            <GoLocation />
            <p>{pub.location}</p>
          </div>
          <div className="iconText">
            <IoTimeOutline />
            <p>{pub.open}</p>
          </div>
          <p className="description">{pub.description}</p>
        </div>
      ))}
    </div>
  );
}
