import React from "react";
import { Row, Column } from "ui/Layout";

import { UserRow } from "./UserRow";
import { UserHeading } from "../UserHeading";

import style from "../UserRow/style.scss";
import "./styles.scss";


export class UserTable extends React.Component {
  onClick = () => {
    this.props.onClick();
  };

  render() {
    const { data } = this.props;

    return (
      <Column>
        <UserHeading
          text="Секретные победители"
          onClick={this.onClick}
          buttonText="Сгенерировать"
        />
        <Column ai="flex-start">
          <Row className={style.admin__row}>
            <p className={style.admin__row_item}>№</p>
            <p className={style.admin__row_item}>Login</p>
            <p className={style.admin__row_item}>SteamLogin</p>
            <p className={style.admin__row_item}>Guild</p>
            <p className={style.admin__row_item}>Email</p>
            <p className={style.admin__row_item}>Code</p>
          </Row>
          {data.map((user, i) => (
            <UserRow
              key={user.name}
              idx={i + 1}
              {...user}
            />
          ))}
        </Column>
      </Column>
    );
  }
}
