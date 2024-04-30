import React from "react";
import { FaRegMap } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineReviews, MdOutlineBeenhere } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../redux/slices/authSlice";
import { useLogoutMutation } from "../redux/slices/apiSlices/authApiSlice";
import {
    SpeedDialContent,
    SpeedDialAction,
    Typography,
} from "@material-tailwind/react";
import generateLabelProps from "./labelProps";

export default function LoggedInMenu() {
    const dispatch = useDispatch();
    const [logout, { isLoading }] = useLogoutMutation();
    const labelProps = generateLabelProps();

    const handelLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(signout());
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <SpeedDialContent>
                <SpeedDialAction className="relative">
                    <Link to="/">
                        <FaRegMap size={22} />
                        <Typography {...labelProps}>Map</Typography>
                    </Link>
                </SpeedDialAction>
                <SpeedDialAction className="relative">
                    <Link to="/userReviews">
                        <MdOutlineReviews size={22} />
                        <Typography {...labelProps}>Review</Typography>
                    </Link>
                </SpeedDialAction>
                <SpeedDialAction className="relative">
                    <Link to="/visitedPubs">
                        <MdOutlineBeenhere size={22} />
                        <Typography {...labelProps}>Visited</Typography>
                    </Link>
                </SpeedDialAction>
                <SpeedDialAction className="relative">
                    <BiLogOut size={22} onClick={() => handelLogout()} />
                    <Typography {...labelProps}>Logout</Typography>
                </SpeedDialAction>
            </SpeedDialContent>
        </div>
    );
}