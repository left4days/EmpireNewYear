import React from "react";
import { Row } from "ui/Layout";
import { Button } from "ui/Button";

import style from "../UserRow/style.scss";

export class GuildRow extends React.Component {
  render() {
    const {
      idx,
      uid,
      name,
      level,
        members,
      onEditLevelClick,
      onDownloadMembersInCSV
    } = this.props;
    return (
      <Row className={style.admin__row}>
        <p className={style.admin__row_item}>{idx}</p>
        <p className={style.admin__row_item}>{name}</p>
        <p className={style.admin__row_item}>{members.length - 1}</p>
        <p className={style.admin__row_item}>{level}</p>
        <Row>
          <Button onClick={() => onEditLevelClick(name)} margin="right">
            Изменить уровень
          </Button>
          <Button onClick={() => onDownloadMembersInCSV(name)}>
            Выгрузить участников
          </Button>
        </Row>
      </Row>
    );
  }
}
