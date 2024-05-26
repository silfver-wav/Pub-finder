import React from "react";

const AuthContainer = ({ title, children }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
    <div className="w-full h-full bg-black rounded-xl shadow-sm py-8 px-8 relative pt-[10vw]">
      <h2 className="mb-5 text-center text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {children}
    </div>
  </div>
);

export default AuthContainer;
