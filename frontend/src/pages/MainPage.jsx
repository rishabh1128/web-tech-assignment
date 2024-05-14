import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <ul>
        <li>
          <Link to="/form">Form Page</Link>
        </li>
        <li>
          <Link to="/search">Search Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
