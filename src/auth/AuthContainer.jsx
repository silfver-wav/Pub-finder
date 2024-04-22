import React from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const AuthContainer = ({ title, children }) => (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-[#9b7171] rounded-xl shadow-sm py-8 px-8 relative">
        <Link to={"/"} className="absolute top-0 right-0 m-4 text-white">
          <RxCross1 size={20}/>
        </Link>
        <h2 className="mb-5 text-center text-4xl font-bold tracking-tight text-white">
          {title}
        </h2>
        {children}
      </div>
    </div>
);

export default AuthContainer;
