import { React, useRef, useEffect } from "react";
import Map from "./map/map";
import { MdOutlineLayers } from "react-icons/md";
import SearchBar from "./searchBar/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleLayer } from "./redux/slices/layerSlice";
import DropdownMenu from "./menu/DropdownMenu";
import { Sheet } from 'react-modal-sheet';
import PubDetails from './pubDetails/PubDetails';
import { IoRemoveOutline } from "react-icons/io5";
import useWindowSize from "./useWindowSize";

export default function StartPage() {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const makeReview = useSelector((state) => state.sheet.makeReview);
  const ref = useRef();
  const snapTo = (i) => ref.current?.snapTo(i);

  useEffect(() => {
    console.log("i am here");
    console.log("make review: ", makeReview);
    if (makeReview) {
      snapTo(3);
    } else {
      snapTo(2);
    }
  }, [makeReview])

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
          ref={ref}
          isOpen={true}
          snapPoints={[1.0, 360, 175, 18]}
          initialSnap={2}
          onSnap={(snapIndex) =>
            console.log('> Current snap point index:', snapIndex)
          }
        >
          <Sheet.Container className="bg-white">
            <Sheet.Header >
              <div className="bg-gray-900 flex justify-center items-center h-5 rounded-t-md">
                <IoRemoveOutline size={40} />
              </div>
            </Sheet.Header>
            <Sheet.Content className="bg-black">
              <PubDetails mobile={true} ref={ref} />
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      }

    </>
  );
}