import React from "react";
import styles from "./Home.module.css";
import { CountriesContextProvider } from "../../contexts/CountriesContext";
import CountriesList from "./components/CountriesList/CountriesList";
import SearchInput from "./components/SearchInput/SearchInput";
import Select from "./components/Select/Select";

const Home = () => (
  <main>
    <div className={styles.subHeader}>
      <SearchInput />
      <Select />
    </div>
    <CountriesList />
  </main>
);

export default Home;
