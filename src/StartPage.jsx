import { React } from "react";
import Map from "./map/map";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "./searchBar/searchBar";
import { useDispatch } from "react-redux";
import { toggleLayer } from "./redux/slices/layerSlice";
import DropdownMenu from "./menu/DropdownMenu";
import { Sheet } from 'react-modal-sheet';
import PubDetails from './pubDetails/PubDetails';
import { IoRemoveOutline } from "react-icons/io5";
import useWindowSize from "./useWindowSize";

export default function StartPage() {
  const { width, height } = useWindowSize();
  const dispatch = useDispatch();

  return (
    <>
      <DropdownMenu />
      <SearchBar />
      {width >= 700 &&
        <PubDetails />
      }

      <MdOutlineLayers
        onClick={() => dispatch(toggleLayer())}
        className={`size-10 fixed ${width < 300 ? "bottom-2 left-1" : "bottom-6 left-2"} cursor-pointer z-30 text-white hover:h-12 hover:w-12 transition-all`}
      />
      <Map className="z-10" />

      {width < 700 &&
        <Sheet
          isOpen={true}
          snapPoints={[360, 170, 18]}
          initialSnap={2}
          className="z-30"
        >
          <Sheet.Container>
            <Sheet.Header >
              <div className="bg-gray-900 flex justify-center items-center h-5 rounded-t-md">
                <IoRemoveOutline size={40} />
              </div>
            </Sheet.Header>
            <Sheet.Content className="bg-black">
              <PubDetails mobile={true} />
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      }

    </>
  );
}