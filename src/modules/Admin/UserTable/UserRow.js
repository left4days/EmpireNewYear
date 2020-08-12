import React from "react";
import { Row } from "ui/Layout";

import style from "../UserRow/style.scss";

export class UserRow extends React.Component {
  render() {
    const {
      idx,
      login,
      steamLogin,
      guildName = "-",
      email,
      promocode
    } = this.props;
    return (
      <Row className={style.admin__row}>
        <p className={style.admin__row_item}>{idx}</p>
        <p className={style.admin__row_item}>{login}</p>
        <p className={style.admin__row_item}>{steamLogin}</p>
        <p className={style.admin__row_item}>{guildName}</p>
        <p className={style.admin__row_item}>{email}</p>
        <p className={style.admin__row_item}>{promocode}</p>
      </Row>
    );
  }
}
