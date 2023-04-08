import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Link to="/">
      <div className="d-flex flex-column text-center">
        <div className="">Not Found</div>
        <div className="">Click to return to main page</div>
        <img src="/assets/404.jpg" alt="Error 404" />
      </div>
    </Link>
  );
};

export default NotFound;
