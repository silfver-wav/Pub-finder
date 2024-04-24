import { React } from "react";
import "./SideBar.css";
import { useSelector } from "react-redux";
import BarTab from "./BarTab";

export default function SideBar() {
  const pubs = useSelector((state) => state.pubs.pubs);
  const searchedPub = useSelector((state) => state.pub.pub);

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-2 pb-10 absolute top-16 right-2 z-40 scrollbar-thin overflow-y-auto sideDiv">
        {!isEmpty(searchedPub) &&
        (<>
            <BarTab pub={searchedPub} />
            <hr />
        </>
        )}
        {pubs.map((pub) => (
          <BarTab key={pub.id} pub={pub} />
        ))}
    </div>
  );
}
