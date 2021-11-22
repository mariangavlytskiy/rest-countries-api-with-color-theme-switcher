import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./Home.module.css";
import { CountriesContextProvider } from "../../contexts/CountriesContext";
import SearchAndFilter from "./components/SearchAndFilter/SearchAndFilter";
import CountriesList from "./components/CountriesList/CountriesList";

const Home = () => {
  return (
    <main>
      <CountriesContextProvider>
        <SearchAndFilter />
        <CountriesList />
      </CountriesContextProvider>
    </main>
  );
};

export default Home;
