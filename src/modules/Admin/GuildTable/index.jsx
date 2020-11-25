import React from "react";
import Modal from "react-modal";

import { Row, Column } from "ui/Layout";
import { Button } from "ui/Button";
import axios from "axios";

import { GuildRow } from "./GuildRow";
import { UserHeading } from "../UserHeading";
import Formsy from "formsy-react";
import { Input } from "widgets/fields";
import { getFirebaseHeaderToken } from "widgets/requestsHelpers";
import { customStyles } from "widgets/Form";

import style from "../UserRow/style.scss";
import "./styles.scss";


export class GuildsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      guildName: ""
    };
  }

  onClick = () => {
    this.props.onClick();
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false, guildName: "" });
  };

  onEditLevelClick = guildName => {
    this.setState({ isModalOpen: true, guildName });
  };

  onDownloadMembersInCSV = async guildName => {
    const options = await getFirebaseHeaderToken();
    axios
      .post("/api/v1/users/guild", { guildName }, options)
      .then(async res => {
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + res.data);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
          "download",
          `${guildName}.csv`
        );
        document.body.appendChild(link);

        link.click();
      });
  };

  formRef = ref => (this.form = ref);

  onValid = () => {
    this.setState({ valid: true });
  };

  onInvalid = () => {
    this.setState({ valid: false });
  };

  onSubmit = async () => {
    const { guildName } = this.state;
    const { level } = this.form.getModel();
    const options = await getFirebaseHeaderToken();

    if (!isNaN(Number(level)) && !!guildName) {
      axios
        .put("/api/v1/guild/level", { level, guildName }, options)
        .then(res => {
          this.props.onClick();
          this.onCloseModal();
        });
    }
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
            <p className={style.admin__row_item}>Members</p>
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
          onRequestClose={this.onCloseModal}
          style={customStyles}
          contentLabel="Title"
        >
          <div className="modal-body">
            <Formsy
              onValidSubmit={this.onSubmit}
              ref={this.formRef}
              onValid={this.onValid}
              onInvalid={this.onInvalid}
            >
              <h2>Изменить уровень гильдии {this.state.guildName}</h2>
              <p>Уровень гильдии</p>
              <Input required type="text" id="level" name="level" />
            </Formsy>
            <Row jc="flex-end" style={{ marginTop: "12px" }}>
              <Button size="m" onClick={this.onSubmit}>
                Обновить
              </Button>
            </Row>
          </div>
        </Modal>
      </Column>
    );
  }
}
