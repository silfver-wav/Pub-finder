import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineReviews, MdOutlineBeenhere } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./redux/slices/authSlice";
import { useLogoutMutation } from "./redux/slices/apiSlices/authApiSlice";
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
  } from "@material-tailwind/react";
  import {
    PlusIcon,
    HomeIcon,
    CogIcon,
    Square3Stack3DIcon,
  } from "@heroicons/react/24/outline";

export default function DropdownMenu() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = localStorage.getItem("user");
    const [logout, { isLoading }] = useLogoutMutation();

    const handelLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(signout());
            setShowMenu(false);
        } catch (err) {
            console.log(err)
        }
    };

    const labelProps = {
        variant: "small",
        color: "blue-gray",
        className:
            "absolute top-2/4 left-24 -translate-y-2/4 -translate-x-3/4 font-normal text-white",
    };

  return (
    <div className="relative z-50">
        <div className="absolute left-2 top-4">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <FaUserCircle className="size-6  transition-transform group-hover:size-8" />
            </IconButton>
          </SpeedDialHandler>

          {user ? (
            <SpeedDialContent>
                <SpeedDialAction className="relative">
                    <Link to="#">
                        <MdOutlineBeenhere className="h-5 w-5" />
                        <Typography {...labelProps}>Reviews</Typography>
                    </Link>
                </SpeedDialAction>    
                <SpeedDialAction className="relative">
                    <Link to="/visitedPubs">
                        <MdOutlineBeenhere className="h-5 w-5" />
                        <Typography {...labelProps}>Visited</Typography>
                    </Link>
                </SpeedDialAction>      
                <SpeedDialAction className="relative">
                    <BiLogOut className="h-5 w-5" onClick={() => handelLogout()} />
                    <Typography {...labelProps}>Logout</Typography>
                </SpeedDialAction>        
            </SpeedDialContent>
            ) : (
            <SpeedDialContent>
                <SpeedDialAction className="relative">
                    <Link to="/login">
                        <IoMdLogIn className="h-5 w-5" />
                        <Typography {...labelProps}>Login</Typography>
                    </Link>
                </SpeedDialAction>
            </SpeedDialContent>
        )}
        </SpeedDial>
      </div>
    </div>
  );
}

/*
    <div className="absolute top-0 left-0 z-50">
        <div>
            <button type="button" 
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold"
                id="menu-button" 
                aria-expanded="true" 
                aria-haspopup="true"
                onClick={() => setShowMenu(!showMenu)}
            >
                <FaUserCircle size={45} className="text-black"/>
            </button>
        </div>

        {showMenu && (
            <div
                className="absolute -right-100 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition duration-200 transform opacity-100 scale-100 bg-gray-900"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
            >
                {user ? (
                    <>
                        <div className="py-1" role="none">
                            <Link to="/" className="menu-item" role="menuitem" tabIndex="-1" id="map">Map</Link>
                        </div>
                        <div className="py-1" role="none">
                            <a href="#" className="menu-item" role="menuitem" tabIndex="-1" id="menu-item-2">Reviews</a>
                            <Link to="/visitedPubs" className="menu-item" role="menuitem" tabIndex="-1" id="visitedPubs" onClick={() => setShowMenu(!showMenu)}>Visited Pubs </Link>
                        </div>
                        <div className="py-1" role="none">
                            <p href="#" className="menu-item cursor-pointer" role="menuitem" tabIndex="-1" id="menu-item-6" onClick={() => handelLogout()}>Logout</p>
                        </div>
                    </>
                ) : (
                    <div className="py-1" role="none">
                        <Link to="/login" className="menu-item" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => setShowMenu(!showMenu)}>Login</Link>
                    </div>
                )}
            </div>
        )}
    </div>
*/