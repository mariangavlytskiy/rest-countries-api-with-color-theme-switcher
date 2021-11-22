import React, { useState } from "react";

export const CountriesContext = React.createContext({
  countries: [],
  setCountries: () => {},
});

export const CountriesContextProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState(null);
  return (
    <CountriesContext.Provider
      value={{
        countries,
        setCountries,
        searchQuery,
        setSearchQuery,
        region,
        setRegion,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
