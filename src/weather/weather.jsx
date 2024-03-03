import React from "react";
import ReactRain from "react-rain-animation";

import "react-rain-animation/lib/style.css";

export default function Weather() {
  const raining = false;

  return (
    <>
      {raining && (
        <div
          style={{
            height: "100vh",
            position: "fixed",
            zIndex: 990,
          }}
        >
          <ReactRain numDrops="100" />
        </div>
      )}
    </>
  );
}
