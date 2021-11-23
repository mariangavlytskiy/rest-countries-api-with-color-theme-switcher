import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import InfoList from "../../shared/components/InfoList/InfoList";
import styles from "./Details.module.css";

const CODE_URL = "https://restcountries.com/v2/alpha";

const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    // TODO: handle null country situations.
    const fetchBordersCountries = async (bordersCountries) => {
      if (!bordersCountries) {
        setBorders([]);
      } else {
        try {
          const response = await fetch(
            `${CODE_URL}?codes=${bordersCountries.join(",")}&fields=name,cioc`,
            { signal: ac.signal }
          );
          if (response.ok) {
            const data = await response.json();
            setBorders(data);
          }
        } catch (e) {
          setError(e);
        }
      }
    };

    const fetchCountryData = async () => {
      try {
        const response = await fetch(`${CODE_URL}/${params.countryName}`, {
          signal: ac.signal,
        });
        if (response.ok) {
          const data = await response.json();
          setCountry(data);
          fetchBordersCountries(data?.borders);
        }
      } catch (e) {
        setError(e);
      }
    };

    fetchCountryData();
    return () => ac.abort();
  }, []);

  if (error) return null;
  if (!country) return null;

  const {
    name,
    nativeName,
    flag,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
  } = country;

  const info = {
    firstList: [
      { title: "Native name", value: nativeName },
      { title: "Population", value: population },
      { title: "Region", value: region },
      { title: "Sub Region", value: subregion },
      { title: "Capital", value: capital },
    ],
    secondList: [
      { title: "Top Level Domain", value: topLevelDomain?.join(",") },
      {
        title: "Currencies",
        value: currencies?.map(({ name }) => name).join(","),
      },
      {
        title: "Languages",
        value: languages?.map(({ name }) => name).join(","),
      },
      { title: "Sub Region", value: subregion },
      { title: "Capital", value: capital },
    ],
  };
  return (
    <main>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>
      <article>
        <div>
          <img src={flag} alt={`${name} country flag`} />
        </div>
        <div>
          <h1>{name}</h1>
          <section className={styles.statsContainer}>
            <InfoList info={info.firstList} />
            <InfoList info={info.secondList} />
          </section>
          {borders && borders.length > 1 && (
            <section className={styles.bordersList}>
              <h4>Border Countries: </h4>
              <ul>
                {borders.map(({ name, cioc }) => (
                  <li key={cioc}>
                    <button
                      onClick={() => {
                        // TODO: find out why navigate doesn't work properly.
                        navigate(`/${cioc}`, { replace: true });
                        window.location.reload();
                      }}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  );
};

export default Details;
