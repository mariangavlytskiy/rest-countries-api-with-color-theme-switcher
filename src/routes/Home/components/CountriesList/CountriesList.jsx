import React from "react";

import { useCountries } from "../../../../hooks/useCountries";
import { useNavigate } from "react-router-dom";

import styles from "./CountriesList.module.css";
import InfoList from "../../../../shared/components/InfoList/InfoList";

const CountriesList = () => {
  const navigate = useNavigate();
  const { countries, isLoading } = useCountries();

  if (isLoading) {
    return <div style={{ margin: "30% auto", width: 100 }}>Loading...</div>;
  }

  if (!countries) return null;
  // FIXME:we need to change key value.
  return (
    <div className={styles.container}>
      {countries.map(({ name, flag, population, region, capital, path }) => (
        <div
          className={styles.card}
          key={name.common}
          onClick={() => navigate(path)}
        >
          <img src={flag} alt={`${name.common} flag`} />
          <div className={styles.info}>
            <h1>{name.common}</h1>
            <InfoList
              info={[
                { title: "Population", value: population },
                { title: "Region", value: region },
                { title: "Capital", value: capital },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
