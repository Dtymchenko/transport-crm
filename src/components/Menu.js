import React from "react";
import { pages } from "../data";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      {pages.map((page, i) => (
        <div key={i}>
          <Link to={page.link}>{page.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
