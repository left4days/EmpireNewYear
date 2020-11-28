import React from "react";
import { Row } from "ui/Layout";
import style from "./style.scss";

function UserRow({ user, idx = "№" }) {
  const { login = "-", steamLogin = "-", registerBy = "-", email = "-" } = user;

  return (
    <Row className={style.admin__row}>
      <p className={style.admin__row_item}>{idx}</p>
      <p className={style.admin__row_item}>{login}</p>
      <p className={style.admin__row_item}>{steamLogin}</p>
      <p className={style.admin__row_item}>{email}</p>
      <p className={style.admin__row_item}>{registerBy}</p>
    </Row>
  );
}

export { UserRow };
