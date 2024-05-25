import { React, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPubsQuery } from "../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from '@reduxjs/toolkit/query';
import BarTabMobile from "../barTab/BarTabMobile";
import Tabs from "../barTab/Tabs";


export default function BottomBar() {
  const geocode = useSelector((state) => state.pubs.geocode);
  const { data: pubs = [] } = useGetPubsQuery(geocode ? geocode : skipToken)
  const user = localStorage.getItem("user");

  return (
    <div className="flex overflow-x-auto snap-x scrollbar-hidden pl-2">
      {pubs.map((pub) => (
        <div className="snap-center mr-4" key={pub.id}>
          <BarTabMobile
            pub={pub}
            user={user}
            visited={false}
            isSearchedPub={false}
          />
          <Tabs pub={pub} user={user} />
        </div>
      ))}
    </div>
  );
}