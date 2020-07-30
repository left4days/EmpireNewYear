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
      onEditLevelClick,
      onDownloadMembersInCSV
    } = this.props;
    return (
      <Row className={style.admin__row}>
        <p className={style.admin__row_item}>{idx}</p>
        <p className={style.admin__row_item}>{name}</p>
        <p className={style.admin__row_item}>{level}</p>
        <Row>
          <Button onClick={() => onEditLevelClick(uid)} margin="right">
            Изменить уровень
          </Button>
          <Button onClick={() => onDownloadMembersInCSV(uid)}>
            Выгрузить участников
          </Button>
        </Row>
      </Row>
    );
  }
}
