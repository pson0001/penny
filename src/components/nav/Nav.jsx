import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import c from "./nav.module.scss";

const Nav = () => {
  const location = useLocation();
  const linkMenu = useRef([]);
  const navRef = useRef();

  const [centerVerticalPosition, setVerticalCenterPosition] = useState(0);
  const [activeLinkPosition, setActiveLinkPosition] = useState(0);

  useEffect(() => {
    const matchingElement = linkMenu.current?.find(
      (link) => link.getAttribute("href") === location.pathname
    );

    const parentLeft = navRef.current?.getBoundingClientRect().left;
    const childLeft =
      matchingElement?.getBoundingClientRect().left +
      matchingElement?.getBoundingClientRect().width / 2;

    setActiveLinkPosition(childLeft - parentLeft);
  }, [linkMenu, location]);

  useEffect(() => {
    const updateCenterPosition = () => {
      const middle = window.innerWidth / 2;
      setVerticalCenterPosition(middle - activeLinkPosition);
    };

    updateCenterPosition(); // Initial update

    // Event listener to update center position on window resize
    window.addEventListener("resize", updateCenterPosition);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateCenterPosition);
    };
  }, [activeLinkPosition]);

  return (
    <div className={c.navContainer}>
      <nav
        className={c.nav}
        style={{ left: `${centerVerticalPosition}px` }}
        ref={navRef}
      >
        <ul>
          <li>
            <NavLink
              to={`/`}
              ref={(e) => (linkMenu.current[0] = e)}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/calendar`}
              ref={(e) => (linkMenu.current[1] = e)}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              CALENDAR
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/stats`}
              ref={(e) => (linkMenu.current[2] = e)}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              STATS
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/summary`}
              ref={(e) => (linkMenu.current[3] = e)}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              SUMMARY
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/categories`}
              ref={(e) => (linkMenu.current[4] = e)}
              className={({ isActive }) => (isActive ? c.active : "")}
            >
              CATEGORIES
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Nav;
