import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import c from "./nav.module.scss";

const Nav = () => {
  const location = useLocation();
  const linkMenu = useRef([]);

  const [centerVerticalPosition, setVerticalCenterPosition] = useState(0);
  const [activeLinkPosition, setActiveLinkPosition] = useState(0);

  useEffect(() => {
    const matchingElement = linkMenu.current?.find(
      (link) => link.getAttribute("href") === location.pathname
    );
    setActiveLinkPosition(
      matchingElement.getBoundingClientRect().left +
        matchingElement.getBoundingClientRect().width / 2
    );
  }, [linkMenu, location]);

  useEffect(() => {
    const updateCenterPosition = () => {
      const middle = window.innerWidth / 2;
      console.log(middle, activeLinkPosition);
      if (activeLinkPosition <= middle) {
        setVerticalCenterPosition(middle - activeLinkPosition);
      } else {
        setVerticalCenterPosition(activeLinkPosition - middle);
      }
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
      <nav className={c.nav} style={{ left: `${centerVerticalPosition}px` }}>
        <ul>
          <li>
            <Link to={`/`} ref={(e) => (linkMenu.current[0] = e)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={`/calendar`} ref={(e) => (linkMenu.current[1] = e)}>
              CALENDAR
            </Link>
          </li>
          <li>
            <Link to={`/stats`} ref={(e) => (linkMenu.current[2] = e)}>
              STATS
            </Link>
          </li>
          <li>
            <Link to={`/summary`} ref={(e) => (linkMenu.current[3] = e)}>
              SUMMARY
            </Link>
          </li>
          <li>
            <Link to={`/categories`} ref={(e) => (linkMenu.current[4] = e)}>
              CATEGORIES
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Nav;
