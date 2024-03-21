import { Link } from "react-router-dom";
import { navItems } from "./NavItems";
import { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
import "./Navbar.css";
const Navbar = () => {
  const [navbarBackground, setNavbarBackground] = useState("transparent");
  const [textColor, setTextColor] = useState("white");
  const [inverse, setInverse] = useState("invert(0)")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        setNavbarBackground("white");
        setTextColor("black");
        setInverse("invert(1)")
      } else {
        setNavbarBackground("transparent");
        setTextColor("white");
        setInverse("invert(0)");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        style={{
          backgroundColor: navbarBackground,
          color: "var(--textWhite)",
        }}
      >
        <div >
          <Link to="/">
            <img src={logo} alt="hotelhive" className="logo" style={{filter : inverse}}/>
          </Link>
        </div>
        <ul className="navmenu">
          {navItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={item.cName}
                  to={item.url}
                  style={{ color: textColor }}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="navbuttons">
          <button style={{ color: textColor }}>Login</button>
          <button style={{ color: textColor }}>SignUp</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
