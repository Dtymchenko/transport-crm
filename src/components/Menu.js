import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Collapse, BDiv, BH5, BSpan } from "bootstrap-4-react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { founderEmail } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/slices/mainSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.main?.email);
  const [expanded, setExpanded] = React.useState(false);
  const Background =
    "data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%280, 0, 0, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e";
  React.useEffect(() => {
    dispatch(getUser());
    const bgChanger = document.querySelector(".navbar-toggler-icon");
    bgChanger.style.backgroundImage = `url(${Background})`;
  }, [email]);
  const handleMenuClick = () => {
    setExpanded((prev) => !prev);
  };
  const burgerRef = React.useRef(null);
  const pages = require.context("../pages", true, /\.js$/);
  let pageRoutes = pages.keys().map((key) => {
    let name = key.match(/([a-zA-Z]+)Page\.js$/)[1];
    return {
      name,
      path: name === "Main" ? "/" : name.toLowerCase(),
    };
  });
  if (email !== founderEmail) {
    pageRoutes = pageRoutes.filter(
      (page) => page.name.toUpperCase() !== "users".toUpperCase()
    );
  }
  React.useEffect(() => {
    if (expanded && burgerRef?.current) {
      disableBodyScroll(burgerRef?.current);
    }
    return () => clearAllBodyScrollLocks();
  }, [expanded]);

  return (
    <div ref={burgerRef}>
      <Navbar>
        <Navbar.Toggler
          // style={{
          //   backgroundColor: "red",
          // }}
          target="#navbarToggleExternalContent"
          onClick={() => setExpanded((prev) => !prev)}
        />
        {expanded ? (
          <div
            id="navbarToggleExternalContent"
            onClick={() => setExpanded(false)}
          >
            <BDiv
              bg="dark"
              p="4"
              className="d-block vw-100 vh-100"
              onClick={handleMenuClick}
            >
              {pageRoutes.map((page, i) => {
                if (page.name.toUpperCase() !== "notfound".toUpperCase()) {
                  return (
                    <div key={i}>
                      <BH5 text="white">
                        <Link to={page.path}>{page.name}</Link>
                      </BH5>
                    </div>
                  );
                }
              })}
            </BDiv>
          </div>
        ) : null}
      </Navbar>
    </div>
  );
};

export default Menu;
