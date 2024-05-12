import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>HOME</Link>
          </li>
          <li>
            <Link to={`/calendar`}>CALENDAR</Link>
          </li>
          <li>
            <Link to={`/stats`}>STATS</Link>
          </li>
          <li>
            <Link to={`/summary`}>SUMMARY</Link>
          </li>
          <li>
            <Link to={`/categories`}>CATEGORIES</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Nav;
