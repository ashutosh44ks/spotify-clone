import React from "react";
import logo from "../assets/Logo.svg";
import profile from "../assets/Profile.svg";
import { ReactComponent as ArrowRight } from "../assets/ArrowRight.svg";

const Sidebar = ({ setShowListMobile }) => {
  return (
    <div className="p-6 lg:px-8 flex flex-col justify-between sidebar">
      <div className="flex items-end">
        <img src={logo} alt="logo" />
        <div
          className="text-white show-track-list cursor-pointer"
          onClick={() => setShowListMobile(true)}
        >
          <ArrowRight
            style={{
              height: "2.5rem",
              width: "2.5rem",
            }}
          />
        </div>
      </div>
      <img src={profile} alt="profile" className="h-10 w-10" />
    </div>
  );
};

export default Sidebar;
