import React from "react";

import styles from "./InfoList.module.css";

const ListItem = ({ infoTitle, value }) => (
  <li>
    <p>
      <span>{infoTitle}</span>
      &nbsp;
      {value}
    </p>
  </li>
);

const InfoList = ({ info }) => (
  <ul className={styles.infoList}>
    {info.map(({ title, value }) => (
      <ListItem key={title} infoTitle={`${title}:`} value={value} />
    ))}
  </ul>
);

export default InfoList;
