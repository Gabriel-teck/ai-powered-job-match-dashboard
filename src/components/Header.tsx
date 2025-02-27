import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export const Header: React.FC = () => {
  return (
    <>
      {/* Header section */}
      <header className="flex flex-row justify-between bg-white mx-auto px-4 py-6 shadow-md">
        {/* Title */}
        <div className="flex justify-center items-center font-semibold text-xl text-gray-600">
          AI-Powered Job Match
        </div>

        {/* Right side - icons and buttons */}
        <div className="flex gap-4 justify-evenly items-center">
          {/* Search Icon */}
          <form className="hidden lg:flex">
            <label htmlFor="search">
              <FaSearch className="text-green-500 text-xl" />
            </label>
          </form>

          {/* Notification Icon */}
          <div className="hidden lg:flex text-green-500 text-xl">
            <IoIosNotifications />
          </div>

          {/* Interview Button */}
          <button className="flex items-center gap-2 rounded-sm border border-gray-300 bg-white px-2 py-2 shadow-sm transition hover:bg-gray-100">
            <span className="flex items-center justify-center text-green-500">
              <FaRegCommentDots />
            </span>
            <span className="text-sm text-black">Ready to interview</span>
            <span className="text-gray-500">
              <RiArrowDropDownLine className="text-xl" />
            </span>
          </button>

          {/* Profile Icon */}
          <div>
            <CgProfile className="hidden lg:flex text-xl text-green-500" />
          </div>
        </div>
      </header>
    </>
  );
};
