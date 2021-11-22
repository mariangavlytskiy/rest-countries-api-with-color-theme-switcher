import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import Select from "../Select/Select";

import styles from "./SearchAndFilter.module.css";

const SearchAndFilter = () => {
  return (
    <div className={styles.container}>
      <SearchInput />
      <Select />
    </div>
  );
};

export default SearchAndFilter;
