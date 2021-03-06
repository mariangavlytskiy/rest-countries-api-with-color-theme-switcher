import React, { useContext, useState } from "react";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import { CountriesContext } from "../../../../contexts/CountriesContext";

import styles from "./Select.module.css";

const REGIONS_ARRAY = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function Select() {
  const [isOpen, setIsOpen] = useState(false);
  const { region, setRegion } = useContext(CountriesContext);
  const options = REGIONS_ARRAY;
  return (
    <div className={styles.container}>
      <div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        {region ? region : "Filter By Region"}
        <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronUp} />
      </div>
      <div
        className={classNames(styles.optionsMenu, { [styles.visible]: isOpen })}
      >
        {options.length === 0 && <div>No options</div>}
        {options.map((regionOption) => (
          <button
            key={regionOption}
            value={regionOption}
            onClick={() => {
              setRegion(regionOption);
              setIsOpen(false);
            }}
          >
            {regionOption}
          </button>
        ))}
      </div>
    </div>
  );
}
