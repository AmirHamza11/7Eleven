import { Link } from "react-router-dom";

const OptionBar = () => {
  return (
    <div className="option-bar">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/orders" className="link">
        My Orders
      </Link>
      <Link to="/" className="link">
        Profile
      </Link>
    </div>
  );
};

export default OptionBar;
// css optionBar.css
