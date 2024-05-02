import { React, useEffect, useState } from "react";
import "./SideBar.css";
import { useSelector } from "react-redux";
import BarTab from "../barTab/BarTab";
import { useGetVisitedPubsQuery, useGetPubsQuery } from "../redux/slices/apiSlices/pubApiSlice";
import { skipToken } from '@reduxjs/toolkit/query';

export default function SideBar() {
  const geocode = useSelector((state) => state.pubs.geocode);
  const searchedPub = useSelector((state) => state.pub.pub);
  const user = localStorage.getItem("user");
  const [getVisitedPubs, setGetVisitedPubs] = useState(false);
  const { data: pubs = [] } = useGetPubsQuery(geocode ? geocode : skipToken)

  const { data: visitedPubs, refetch } = useGetVisitedPubsQuery(getVisitedPubs ? user : skipToken)

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    // If user is logged in get VisitedPubs
    if (user) {
      setGetVisitedPubs(true)
    }
  }, [user])

  const visited = (pub) => {
    if (!visitedPubs) {
      return false;
    }
    return visitedPubs.some((visitedPub) => visitedPub.pubDto.id === pub.id);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-2 absolute right-2 z-40 scrollbar-thin overflow-y-auto sm:w-50 md:w-72 lg:w-96 h-5/6 top-20 focus:border-white">
      {!isEmpty(searchedPub) &&
        (<>
          <BarTab key={searchedPub.id} pub={searchedPub} user={user} visited={visited(searchedPub)} refetch={refetch} />
          <hr />
        </>
        )}
      {pubs.map((pub) => (
        <BarTab key={pub.id} pub={pub} user={user} visited={visited(pub)} refetch={refetch} />
      ))}
    </div>
  );
}
