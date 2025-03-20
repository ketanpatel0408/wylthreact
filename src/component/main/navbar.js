import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Notification, UserSupport } from "../svg";
import { CustomTooltip } from "../tooltip";
import { Badge } from "@mui/material";
import ProfileMenu from "./profile";
import NotificationList from "./notificationlist";
import { useSidebar } from "./SidebarContext";

const Navbar = () => {
 
  const { checked, setChecked, hovered, setHovered } = useSidebar();

  const location = useLocation();
  const rootPath = location.pathname.split("/")[1];

  const [notifications, setNotifications] = useState([
    { id: 204022, isRead: true, title: "RM Bulk Mapping", message: "RM Bulk Mapping updated successfully.", time: "24 Jan 2025 10:31 AM" },
    { id: 203575, isRead: false, title: "RTA Feed", message: "Investor Folio feed processing completed.", time: "16 Jan 2025 02:26 PM" },
    { id: 203472, isRead: false, title: "RTA Feed", message: "Investor Folio feed processing completed.", time: "14 Jan 2025 03:59 PM" },
  ]);

  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.isRead).length);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <nav className="bg-white fixed top-0 right-0 left-0 z-[9999] drop-shadow-md">
      <div className="flex items-center justify-start md:justify-between mx-auto px-4 md:px-0 py-0">
        <button onClick={() => setChecked(!checked)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-gray-100 focus:outline-none ring-2 ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
          {hovered || checked ? <i className="fas fa-times text-xl"></i> : <i className="fas fa-bars text-xl"></i> }
        </button>
        <div className="flex items-center py-2 pl-4" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div className={`items-center hidden md:flex !transition-all !duration-300 !ease-in-out ${hovered || checked ? "w-[221px]" : "w-[60px] overflow-hidden"}`}>
            {hovered || checked ?
              <div className={`items-center transition-all duration-300 ease-in-out md:flex md:justify-between md:w-full`}>
                <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src="https://prodfwsg.blob.core.windows.net/images/ifa_logo/17821_D.png?638738073944280183" className="h-[50px] max-w-[120px] object-contain object-center" alt="Desktop Logo" />
                </Link>
                <label className="inline-flex items-center cursor-pointer h-12 relative ml-3 mr-5">
                  <input type="checkbox" className="sr-only peer" checked={checked} onChange={() => setChecked(!checked)} />
                  <div className={`relative w-7 h-4 rounded-full transition-all  peer-focus:outline-none border border-gray-500 ${checked ? "bg-gray-100" : "bg-gray-100"}`}>
                    <div className={`absolute top-[1px] start-[2px] h-3 w-3 border border-gray-300 rounded-full transition-all ${checked ? "translate-x-full rtl:-translate-x-full bg-blue-500" : "bg-gray-200"}`}></div>
                  </div>
                </label>
              </div>
              :
              <div className="items-center transition-all duration-300 ease-in-out md:flex">
                <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse mr-5">
                  <img
                    src="https://prodfwsg.blob.core.windows.net/images/ifa_logo/17821_M.png?638738073944280183"
                    className="h-[50px] max-w-[40px] object-contain object-center"
                    alt="Mobile Logo"
                  />
                </Link>
              </div>
            }
          </div>
          <div className="border-r border-gray-400 h-10 my-auto hidden md:block"></div>
          <span className="self-center text-xl font-medium whitespace-nowrap ml-5 hidden md:block">{rootPath || "Dashboard"}</span>
        </div>
        <div className="items-center flex md:hidden mr-auto px-4 py-2">
          <div className="items-center transition-all duration-300 ease-in-out md:flex">
            <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse mr-5">
              <img
                src="https://prodfwsg.blob.core.windows.net/images/ifa_logo/17821_M.png?638738073944280183"
                className="h-[50px] max-w-[40px] object-contain object-center"
                alt="Mobile Logo"
              />
            </Link>
          </div>
        </div>

        <div className="w-auto md:pr-2 py-2" id="navbar-default">
          <ul className="font-medium flex items-center p-0 pl-1 pr-1 md:pl-4 md:pr-1 border-gray-100 rounded-lg flex-row space-x-2 md:space-x-4 rtl:space-x-reverse mt-0 border-0 bg-white">
            <li>
              <CustomTooltip title="Support Center">
                <Link
                  to=""
                  className="block py-2 px-1 text-white rounded-sm md:bg-transparent md:p-0 dark:text-white"
                  aria-current="page"
                >
                  <UserSupport
                    className="w-6 h-6 text-gray-800"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  />
                </Link>
              </CustomTooltip>
            </li>
            <li>
              <CustomTooltip title="Notification">
                <Link
                  onClick={handleClick}
                  className="block py-2 px-1 md:pr-2 text-white rounded-sm md:bg-transparent dark:text-white"
                  aria-current="page"
                >
                  <Badge
                    badgeContent={unreadCount}
                    color="error"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Notification
                      className="w-[20px] h-[23px] text-gray-800"
                      width="20"
                      height="23"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    />
                  </Badge>
                </Link>
              </CustomTooltip>
              <NotificationList
                notifications={notifications}
                setNotifications={setNotifications}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
            </li>
            <li>
              <ProfileMenu />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;