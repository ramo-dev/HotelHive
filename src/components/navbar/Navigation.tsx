import { Link } from "react-router-dom";
import { navItems } from "./NavItems";
import { useEffect, useState } from "react";
import "./Navbar.css";
const Navbar = () => {
  const [navbarBackground, setNavbarBackground] = useState("transparent");
  const [textColor, setTextColor] = useState('white')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        setNavbarBackground("white");
        setTextColor('black')
      } else {
        setNavbarBackground("transparent"); 
        setTextColor('white')
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
        <div className="logo">
          <Link to="/">
            <h1 style={{ color: textColor }}>KC</h1>
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
