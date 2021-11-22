import React from "react";

import { useCountries } from "../../../../hooks/useCountries";

import styles from "./CountriesList.module.css";

const CountriesList = () => {
  const { countries, isLoading } = useCountries();

  if (isLoading)
    return <div style={{ margin: "30% auto", width: 100 }}>Loading...</div>;
  if (!countries) return null;

  return (
    <div className={styles.container}>
      {countries.map(({ name, flag, population, region, capital }) => (
        <div key={name} className={styles.card}>
          <img src={flag} alt={`${name} flag`} />
          <div className={styles.info}>
            <h1>{name}</h1>
            <ul className={styles.stats}>
              <li>
                <p>
                  <span>Population:</span>
                  &nbsp;
                  {population}
                </p>
              </li>
              <li>
                <p>
                  <span>Region:</span>
                  &nbsp;
                  {region}
                </p>
              </li>
              <li>
                <p>
                  <span>Capital:</span>
                  &nbsp;
                  {capital}
                </p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
