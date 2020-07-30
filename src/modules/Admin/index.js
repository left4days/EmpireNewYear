import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import firebase from "firebase";
import get from "lodash/get";

import { getFirebaseHeaderToken } from "widgets/requestsHelpers";
import { Button } from "ui/Button";
import { Title } from "ui/Title";
import { Row, Column } from "ui/Layout";
import { SwitchActionStateButton, Table } from "./components";
import { GuildsTable } from "./GuildTable";

import style from "./style.scss";

class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isUserAdmin: false,
      actionState: "ACTIVE",
      localeWinners: [],
      guildList: [],
      guildsNum: 0,
      usersNum: 0,
    };
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(() => {
      this.getCurrentAppState();
      this.getLocaleWinners();
      this.getGuilds();
    });
  };

  getCurrentAppState = async () => {
    const options = await getFirebaseHeaderToken();
    axios.get("/api/v1/appState/state/admin", options).then(res => {
      const { state, mainWinnerEmail, usersNum, guildsNum } = get(res, "data.data", {});
      this.setState({ actionState: state, mainWinnerEmail, usersNum, guildsNum });
    });
  };

  getLocaleWinners = async () => {
    const options = await getFirebaseHeaderToken();
    axios.get("/api/v1/user/winners/10", options).then(res => {
      this.setState({
        localeWinners: res.data.data,
        created: res.data.created,
        isUserAdmin: true
      });
    });
  };

  createLocaleWinners = async () => {
    const options = await getFirebaseHeaderToken();
    axios.get("/api/v1/user/winners-create/10", options).then(res => {
      this.setState({
        localeWinners: res.data.data,
        created: res.data.created
      });
    });
  };

  switchAppState = async currentState => {
    const { actionState } = this.state;
    const options = await getFirebaseHeaderToken();
    const data = { currentState: actionState };
    axios.post("/api/v1/appState/switchState", data, options).then(res => {
      this.setState({ actionState: res.data.data });
    });
  };

  getGuilds = async () => {
    const options = await getFirebaseHeaderToken();
    axios.get("/api/v1/guilds", options).then(res => {
      const guildList = get(res, "data.data", []);
      this.setState({ guildList });
    });
  };

  downloadAllUsers = async () => {
    const options = await getFirebaseHeaderToken();
    axios.get("/api/v1/users", options).then(async res => {
      const encodedUri = encodeURI("data:text/csv;charset=utf-8," + res.data);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "all-users.csv");
      document.body.appendChild(link); // Required for FF

      link.click(); // This will download the data file named "my_data.csv".
    });
  };

  render() {
    const {
      isUserAdmin,
      actionState,
      localeWinners,
      guildList,
      usersNum,
      guildsNum,
      created = Date.now()
    } = this.state;

    if (!isUserAdmin) {
      return (
        <Title containerClassName={style.admin__rejected}>
          You have no permissions to see this page
        </Title>
      );
    }

    return (
      <Column className={style.admin}>
        <Column className={style.admin__container}>
          <Row className={style.admin__header}>
            <SwitchActionStateButton
              actionState={actionState}
              onClick={this.switchAppState}
            />
            <Button style="void" margin="left" onClick={this.getAllUsers}>
              Выгрузить полный список участников
            </Button>
            <Row jc="flex-end" className={style["admin__header-summary"]}>
              <p>Участников: {usersNum}</p>
              <p>Гильдий: {guildsNum}</p>
            </Row>
          </Row>
          <Column>
            <Table
              text={`10 локальных победителей`}
              onClick={this.createLocaleWinners}
              buttonText="Обновить"
              data={localeWinners}
            />
            <p
              style={{ fontSize: "20px", color: "white" }}
            >{`Дата розыгрыша ${new Date(created).toLocaleString("ru")}`}</p>
            <GuildsTable data={guildList} onClick={this.getGuilds} />
          </Column>
        </Column>
      </Column>
    );
  }
}

AdminPanel.propTypes = {
  className: PropTypes.string
};

AdminPanel.defaultProps = {
  className: ""
};

export { AdminPanel };
