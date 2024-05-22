import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
} from "@material-tailwind/react";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";

export default function DropdownMenu() {
    const user = localStorage.getItem("user");

    return (
        <div className="relative z-50">
            <div className="absolute left-2 top-4">
                <SpeedDial>
                    <SpeedDialHandler>
                        <IconButton size="lg" className="rounded-full">
                            <FaUserCircle className="size-7  transition ease-in-out delay group-hover:size-8 duration-200" />
                        </IconButton>
                    </SpeedDialHandler>

                    {user ? (
                        <LoggedInMenu />
                    ) : (
                        <LoggedOutMenu />
                    )}
                </SpeedDial>
            </div>
        </div>
    );
}
