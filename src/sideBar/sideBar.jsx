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
    <div className="bg-black rounded-xl p-2 absolute right-2 z-40 snap-y scrollbar-thin overflow-y-auto sm:w-50 md:w-72 lg:w-96 bottom-12 top-20 scroll-snap-type-y-mandatory" style={{ scrollPaddingTop: '10px' }}>
      {Object.keys(searchedPub).length != 0 && (
        <div className="snap-center">
          <BarTab
            key={searchedPub.id}
            pub={searchedPub}
            user={user}
            visited={visited(searchedPub)}
            refetch={refetch}
            isSearchedPub={true}
          />
        </div>
      )}
      {pubs.map((pub) => (
        <div className="snap-center" key={pub.id}>
          {searchedPub.id != pub.id &&
            <BarTab
              pub={pub}
              user={user}
              visited={visited(pub)}
              refetch={refetch}
              isSearchedPub={false}
            />
          }
        </div>
      ))}
    </div>
  );
}
