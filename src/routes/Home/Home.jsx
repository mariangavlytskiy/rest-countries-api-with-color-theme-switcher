import React from "react";

import CountriesList from "./components/CountriesList/CountriesList";
import SearchInput from "./components/SearchInput/SearchInput";
import Select from "./components/Select/Select";

import styles from "./Home.module.css";

function SubHeader() {
  return (
    <div className={styles.subHeader}>
      <SearchInput />
      <Select />
    </div>
  );
}

export function Home() {
  return (
    <main>
      <SubHeader />
      <CountriesList />
    </main>
  );
}
