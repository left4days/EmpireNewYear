import React from "react";
import Modal from "react-modal";

import { Row, Column } from "ui/Layout";

import { GuildRow } from "./GuildRow";
import { UserHeading } from "../UserHeading";
import style from "../UserRow/style.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export class GuildsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };
  }

  onClick = () => {
    this.props.onClick();
  };

  onEditLevelClick = uid => {
    console.log("edit level", uid);
    this.setState({ isModalOpen: true });
  };

  onDownloadMembersInCSV = uid => {
    console.log("download users from", uid);
  };

  render() {
    const { data } = this.props;
    const { isModalOpen } = this.state;

    return (
      <Column>
        <UserHeading
          text="Гильдии"
          onClick={this.onClick}
          buttonText="Обновить"
        />
        <Column ai="flex-start">
          <Row className={style.admin__row}>
            <p className={style.admin__row_item}>№</p>
            <p className={style.admin__row_item}>Name</p>
            <p className={style.admin__row_item}>Level</p>
            <p className={style.admin__row_item}>Actions</p>
          </Row>
          {data.map((guild, i) => (
            <GuildRow
              key={guild.name}
              idx={i + 1}
              {...guild}
              onEditLevelClick={this.onEditLevelClick}
              onDownloadMembersInCSV={this.onDownloadMembersInCSV}
            />
          ))}
        </Column>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => this.setState({ isModalOpen: false })}
          style={customStyles}
          contentLabel="Title"
        >
          modal
        </Modal>
      </Column>
    );
  }
}
