import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import {
    SpeedDialContent,
    SpeedDialAction,
    Typography,
} from "@material-tailwind/react";
import generateLabelProps from "./labelProps";

export default function LoggedOutMenu() {
    const labelProps = generateLabelProps();

    return (
        <div>
            <SpeedDialContent>
                <SpeedDialAction className="relative">
                    <Link to="/login">
                        <IoMdLogIn className="h-5 w-5" />
                        <Typography {...labelProps}>Login</Typography>
                    </Link>
                </SpeedDialAction>
            </SpeedDialContent>
        </div>
    );
};