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
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACACAMAAADAmVDlAAAAWlBMVEUAAAD///+AgIATExNMTEx3d3fn5+dSUlKkpKRra2tvb2/W1taurq4yMjLQ0NBbW1vKysogICC1tbXd3d0ZGRmLi4uSkpLBwcE8PDzv7+8qKiqenp719fUICAjQhERKAAAB7ElEQVR4nO3cyXaCQBBA0SIGUCZHwPH/fzO0KILpTa3qLeptsr1HcqAbrZbkVVkV9cq4uqjKt0fGP81WIG2bOSy15sxLJ1iWW1uW5dkLBnMNshGGuo5jaYDtrBWxdgMMdyFDeSKNtSFeI2trQry1YO6sy7aytybEg7JCD2tAvIfU1oR4tQDv+6FUDtaEeAc5nqwNsU5HIT7Dw1NckswaESsLy57KWvG/alwottaO79r3mr+zlizrPpuR/myN+XTu59u3y7peWYtCq3p9Wewrnzve7se47rPfncFgOUybw7Q5TJvDtDlMm8O0OUybw7Q5TJvDtDlMm8O0TbCsbzf5r2n5pu2zL1iWXq1fW4xd02wOu1l75t0m2L2wtiwr7i8YzDXIRhjsfWKoC7DSWhGrHGAba0SsTSIl8uu3RynAt/yhSpBXcriWArnjfwdloYN+ZlfuPz/2doG9wWIfSdyHOHbZw10ocpfW2M0IePvG3fDycpg2h2lzmDaHaXOYNodpc5g2h2lzmDaHaXOYNodpo/8InPqzeeqgAeyd4jSaQR1mAb7pf47/YAemqCNm2KE87Bgj8kqGwU/sqCzyyzfszHMIOim+5478Yw9JwB4rgT2Ig3t0CfEpnrKPx+EeKAS7mul8+0Y9tCrhHfP1B3s3NIVmpot5AAAAAElFTkSuQmCC";
  React.useEffect(() => {
    dispatch(getUser());
    const bgChanger = document.querySelector(".navbar-toggler-icon");
    bgChanger.style.backgroundImage = `url(${Background})`;
    console.log(bgChanger.style);
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
