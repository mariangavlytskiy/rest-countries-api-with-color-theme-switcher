import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

const Header = () => {
  const toggleTheme = () => {
    const body = document.querySelector("html");
    const theme = body.getAttribute("data-theme");
    body.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
  };
  return (
    <div className={styles.headerWrapper}>
      <header>
        <h1>Where is the world?</h1>
        <button onClick={toggleTheme}>
          <FontAwesomeIcon icon={faMoon} />
          &nbsp; Dark Mode
        </button>
      </header>
    </div>
  );
};

export default Header;
