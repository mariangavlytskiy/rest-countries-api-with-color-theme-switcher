import { useState, useEffect, useContext } from "react";
import { CountriesContext } from "../contexts/CountriesContext";

const BASE_URL =
  "https://restcountries.com/v3.1/all?fields=cca3,name,flags,capital,population,region,tld,currencies,languages,subregion,borders";
export const transformData = (data) =>
  data.map(
    ({
      name,
      capital,
      flags,
      population,
      region,
      subregion,
      tld,
      currencies,
      languages,
      borders,
      cca3,
    }) => {
      return {
        name: name,
        path: cca3,
        flag: flags.svg,
        population,
        region,
        subregion,
        capital: capital[0],
        tld,
        currencies,
        languages,
        borders,
        cca3,
      };
    }
  );
export const useCountries = () => {
  const [loadedCountries, setLoadedCountries] = useState();
  const { countries, setCountries, region, searchQuery } =
    useContext(CountriesContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController read
    const ac = new AbortController();
    // workaround to use async functionality to fetch data.
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL, { signal: ac.signal });
        if (response.ok) {
          const data = await response.json();
          const transformedData = transformData(data);
          setLoadedCountries(transformedData);
          setCountries(transformedData);
        }
      } catch (e) {
        setError(e);
        console.error(e);
      }
      setLoading(false);
    };

    fetchData();
    return () => ac.abort();
  }, []);

  useEffect(() => {
    if (region) {
      setCountries(
        loadedCountries.filter((country) => country.region === region)
      );
    }
    if (searchQuery) {
      setCountries(
        loadedCountries.filter(({ name }) =>
          name.common.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [region, searchQuery, setCountries]);

  return {
    countries,
    isLoading,
    error,
    region,
    searchQuery,
  };
};
