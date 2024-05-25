import { React, useState, useEffect } from "react";
import Map from "./map/map";
import SideBar from "./sideBar/sideBar";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "./searchBar/searchBar";
import { useDispatch } from "react-redux";
import { toggleLayer } from "./redux/slices/layerSlice";
import DropdownMenu from "./menu/DropdownMenu";
import { Sheet } from 'react-modal-sheet';
import BottomBar from './bottomBar/bottomBar';
import { IoRemoveOutline } from "react-icons/io5";
import useWindowSize from "./useWindowSize";

export default function StartPage() {
  const { width, height } = useWindowSize();
  const dispatch = useDispatch();

  return (
    <>
      <DropdownMenu />
      <SearchBar />
      {width > 700 &&
        <SideBar />
      }

      <MdOutlineLayers
        onClick={() => dispatch(toggleLayer())}
        className={`size-10 fixed ${width < 300 ? "bottom-7 left-1" : "bottom-2 left-2"} cursor-pointer z-30 text-white hover:h-12 hover:w-12 transition-all`}
      />
      <Map className="z-10" />

      {width < 700 &&
        <Sheet
          isOpen={true}
          snapPoints={[0.77, 0.35, 16]}
          initialSnap={1}
          className="z-30"
        >
          <Sheet.Container>
            <Sheet.Header >
              <div className="bg-gray-900 flex justify-center items-center h-5 rounded-t-md">
                <IoRemoveOutline size={40} />
              </div>
            </Sheet.Header>
            <Sheet.Content className="bg-black">
              <BottomBar />
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      }

    </>
  );
}