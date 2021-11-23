import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import InfoList from "../../shared/components/InfoList/InfoList";
const CODE_URL = "https://restcountries.com/v2/alpha";

const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const ac = new AbortController();
    const fetchBorders = async (bordersCountries) => {
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

    const fetchData = async () => {
      try {
        const response = await fetch(`${CODE_URL}/${params.countryName}`, {
          signal: ac.signal,
        });
        if (response.ok) {
          const data = await response.json();
          setCountry(data);
          fetchBorders(data?.borders);
        }
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
    fetchBorders();
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
  return (
    <main>
      <button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>
      <article>
        <img src={flag} alt={`${name} country flag`} />
        <h1>{name}</h1>
        <section>
          <InfoList
            info={[
              { title: "Native name", value: nativeName },
              { title: "Population", value: population },
              { title: "Region", value: region },
              { title: "Sub Region", value: subregion },
              { title: "Capital", value: capital },
            ]}
          />
          <InfoList
            info={[
              { title: "Top Level Domain", value: topLevelDomain.join(",") },
              {
                title: "Currencies",
                value: currencies.map(({ name }) => name).join(","),
              },
              {
                title: "Languages",
                value: languages.map(({ name }) => name).join(","),
              },
              { title: "Sub Region", value: subregion },
              { title: "Capital", value: capital },
            ]}
          />
        </section>
        <section>
          <h2>Border Countries</h2>
          <ul>
            {borders?.map(({ name, cioc }) => (
              <li key={cioc}>
                <button
                  onClick={() => {
                    // TODO: find out why navigate doesn't work properly.
                    navigate(`/${cioc}`, { replace: true });
                    window.location.reload();
                  }}
                >
                  {name}, {cioc}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
};

export default Details;
