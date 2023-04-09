import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Collapse, BDiv, BH5, BSpan } from "bootstrap-4-react";

const Menu = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleMenuClick = () => {
    setExpanded((prev) => !prev);
  };
  const pages = require.context("../pages", true, /\.js$/);
  const pageRoutes = pages.keys().map((key) => {
    let name = key.match(/([a-zA-Z]+)Page\.js$/)[1];
    return {
      name,
      path: name === "Main" ? "/" : name.toLowerCase(),
    };
  });

  console.log(expanded);

  return (
    <div>
      <Navbar>
        <Navbar.Toggler
          target="#navbarToggleExternalContent"
          onClick={() => setExpanded((prev) => !prev)}
        />
      </Navbar>
      <Collapse id="navbarToggleExternalContent">
        <BDiv
          bg="dark"
          p="4"
          className={expanded ? "d-block vw-100 vh-100" : "d-none"}
          onClick={handleMenuClick}
        >
          {pageRoutes.map(
            (page, i) =>
              page.name.toUpperCase() !== "notfound".toUpperCase() && (
                <div key={i}>
                  <BH5 text="white">
                    <Link to={page.path}>{page.name}</Link>
                  </BH5>
                </div>
              )
          )}
        </BDiv>
      </Collapse>
    </div>
  );
};

export default Menu;
