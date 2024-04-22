import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "./redux/slices/authSlice";

export default function DropdownMenu() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const loginStatus = localStorage.getItem('accessToken');

    const logout = () => {
        dispatch(signout());
        setShowMenu(false);
    };

    return (
        <div className="absolute top-0 left-0 z-50">
            <div>
                <button type="button" 
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
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
                    {loginStatus ? (
                        <>
                            <div className="py-1" role="none">
                                <a href="#" className="menu-item" role="menuitem" tabIndex="-1" id="menu-item-2">Reviews</a>
                                <a href="#" className="menu-item" role="menuitem" tabIndex="-1" id="menu-item-3">Visited Pubs</a>
                            </div>
                            <div className="py-1" role="none">
                                <p href="#" className="menu-item cursor-pointer" role="menuitem" tabIndex="-1" id="menu-item-6" onClick={() => logout()}>Logout</p>
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
    );
}
