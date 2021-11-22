import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

const Header = () => {
  const handleOnClick = () => {
    console.log("Works switcher");
  };
  return (
    <div className={styles.headerWrapper}>
      <header>
        <h1>Where is the world?</h1>
        <button onClick={handleOnClick}>
          <FontAwesomeIcon icon={faMoon} />
          &nbsp; Dark Mode
        </button>
      </header>
    </div>
  );
};

export default Header;
