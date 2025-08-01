import { useState, useEffect } from "react";
import "./DefaultHeader.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    document.body.classList.toggle("mobile-menu-open", !menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("mobile-menu-open");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <>
      <header>
        <nav id="header-nav">
          <div id="header-title">
            <a href="/">
              <h1>PLANT SHOP</h1>
            </a>
          </div>

          <div id="header-link">
            <button id="hamburger-button" onClick={toggleMenu}>
              <img
                src={menuOpen ? "/img/icon_close.svg" : "/img/icon_menu.svg"}
                alt="hamburger menu"
              />
            </button>
            <a href="/plants">Plants</a>
            <a href="/about">About</a>
            <a href="/contacts">Contact</a>
          </div>
        </nav>

        <div
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          id="mobile-menu"
        >
          <div className="mobile-menu-links">
            <a href="/plants" onClick={closeMenu}>
              Plants
            </a>
            <a href="/about" onClick={closeMenu}>
              About
            </a>

            <a href="/contacts" onClick={closeMenu}>
              Contact
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
