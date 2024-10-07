import React from "react";
import "../../styles/styles.css";

const MientrasSelecciona = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="loader">
        <div className="panWrapper">
          <div className="pan">
            <div className="food"></div>
            <div className="panBase"></div>
            <div className="panHandle"></div>
          </div>
          <div className="panShadow"></div>
        </div>
      </div>
    </div>
  );
};

export default MientrasSelecciona;
