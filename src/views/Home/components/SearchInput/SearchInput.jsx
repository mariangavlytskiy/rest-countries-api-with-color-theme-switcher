import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CountriesContext } from "../../../../contexts/CountriesContext";

import styles from "./SearchInput.module.css";

export default function SearchInput({ selectClassName }) {
  const { searchQuery, setSearchQuery } = useContext(CountriesContext);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={styles.container}>
      <input
        type="search"
        value={searchQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {!isFocused && (
        <span>
          <FontAwesomeIcon icon={faSearch} />
          Search for a country...
        </span>
      )}
    </div>
  );
}
