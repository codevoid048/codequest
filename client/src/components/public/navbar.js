import React, { useEffect, useRef, useState } from 'react'
import {Link } from 'react-router-dom';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { bodyRoutes } from "../../utils/BodyRoutes";

function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenNav(false);
        setOpenSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSubMenu = (key) => {
    setOpenSubMenu(openSubMenu === key ? null : key);
  };
  const handleClose = () => {
    setOpenSubMenu(null);
    setOpenNav(false);
  };
  const renderMenuItems = (routes) => {
    return routes.map(({ name, path }) => (
      <li
        key={name}
        className="text-black text-lg py-2 px-4 hover:bg-gray-200 rounded"
      >
        <Link to={path} onClick={handleClose}>
          {name}
        </Link>
      </li>
    ));
  };

  return (
    <nav
      ref={navRef}
      className="bg-transparent backdrop-blur-md shadow-lg sticky top-0 z-50 w-full px-8 py-4"
    >
      <div className="flex items-center justify-between text-black">
        <a href="/" className="mr-4 py-1.5 lg:ml-2">
          <img src="" alt="CodeQuest" className="h-8" />
        </a>
        <ul className="hidden lg:flex space-x-8">
          {Object.keys(bodyRoutes).map((key) => (
            <li key={key} className="relative">
              <div
                className="cursor-pointer text-black font-semibold"
                onClick={() => toggleSubMenu(key)}
              >
                {bodyRoutes[key].length > 1 ? (
                  <p>{key}</p>
                ) : (
                  <Link to={bodyRoutes[key][0].path} onClick={handleClose}>
                    {" "}
                    {key}
                  </Link>
                )}
              </div>
              {bodyRoutes[key].length > 1 && (
                <ul
                  className={`absolute left-0 bg-white shadow-lg w-52 px-2 py-3 rounded-lg space-y-2 mt-1 transition-all duration-1000 ease-in-out transform ${
                    openSubMenu === key
                      ? "block opacity-100 translate-y-0"
                      : "hidden opacity-0 translate-y-2"
                  }`}
                >
                  {renderMenuItems(bodyRoutes[key])}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Navbar (hamburger menu) */}
        <button
          className="lg:hidden text-black"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-8 w-8 text-black" />
          ) : (
            <Bars3Icon className="h-8 w-8 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu (visible when openNav is true) */}
      {openNav && (
        <div className="lg:hidden bg-white p-4">
          <ul className="space-y-4">
            {Object.keys(bodyRoutes).map((key) => (
              <li key={key} className="relative">
                <div
                  className="cursor-pointer text-black font-bold"
                  onClick={() => toggleSubMenu(key)}
                >
                  {bodyRoutes[key].length > 1 ? (
                    <p>{key}</p>
                  ) : (
                    <Link to={bodyRoutes[key][0].path} onClick={handleClose}>
                      {" "}
                      {key}
                    </Link>
                  )}
                </div>
                {bodyRoutes[key].length > 1 && (
                  <ul
                    className={` left-0 bg-white shadow-lg w-52 px-2 py-3 rounded-lg space-y-2 mt-1 transition-all duration-1000 ease-in-out transform ${
                      openSubMenu === key
                        ? "block opacity-100 translate-y-0"
                        : "hidden opacity-0 translate-y-2"
                    }`}
                  >
                    {renderMenuItems(bodyRoutes[key])}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;