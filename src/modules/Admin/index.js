import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import firebase from "firebase";
import get from "lodash/get";
import cx from "classnames";

import { getFirebaseHeaderToken } from "widgets/requestsHelpers";
import { Button } from "ui/Button";
import { AuthPage } from "modules/AuthPage";
import { Row, Column } from "ui/Layout";

import { SwitchActionStateButton } from "./components";

import style from "./style.scss";
import { Loader } from "../../ui/Loader";

class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isUserAdmin: false,
      loading: true,
      actionState: "ACTIVE",
      stories: [],
      secretWinners: [],
      winnerEmail: " "
    };
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(() => {
      this.getCurrentAppState();
      this.getStories();
    });
  };

  getCurrentAppState = async () => {
    const options = await getFirebaseHeaderToken();
    axios
      .get("/api/v1/appState/state-admin", options)
      .then(res => {
        const { state, winnerEmail } = get(res, "data.data", {});
        console.log("STATE", winnerEmail);
        this.setState({
          actionState: state,
          winnerEmail,
          isUserAdmin: true,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ loading: false });
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

  getStories = async () => {
    const options = await getFirebaseHeaderToken();
    axios.get("/api/v1/stories", options).then(res => {
      const stories = get(res, "data.data", []);
      this.setState({ stories });
    });
  };

  generateWinner = async () => {
    const options = await getFirebaseHeaderToken();
    axios.post("/api/v1/stories/winner", {}, options).then(res => {
      this.setState({ winnerEmail: res.data.data });
    });
  };

  switchStory = async email => {
    const options = await getFirebaseHeaderToken();
    axios.put("/api/v1/story", { email }, options).then(res => {
      this.getStories();
    });
  };

  render() {
    const {
      isUserAdmin,
      actionState,
      stories,
      winnerEmail,
      loading
    } = this.state;

    if (loading) {
      return (
        <Row jc="center" ai="center" className={style.admin__loading}>
          <Loader />
        </Row>
      );
    }

    if (!isUserAdmin) {
      return <AuthPage />;
    }

    return (
      <Column className={style.admin}>
        <Column className={style.admin__container}>
          <Row className={style.admin__header}>
            <SwitchActionStateButton
              actionState={actionState}
              onClick={this.switchAppState}
            />
            <Button margin="left" onClick={this.generateWinner}>
              Получить случайного победителя
            </Button>
          </Row>
          <Column className={style.admin__wrapper}>
            <h2 className={style.admin__winner_header}>Случайный победитель</h2>
            <p className={style.admin__winner}>{winnerEmail}</p>
            <h2 className={style.admin__winner_header}>Истории</h2>
            <Column>
              {stories.map(story => (
                <Story
                  key={story.created}
                  {...story}
                  switchStory={this.switchStory}
                />
              ))}
            </Column>
          </Column>
        </Column>
      </Column>
    );
  }
}

const Story = props => {
  const {
    text,
    email,
    name,
    created,
    shownOnMainPage,
    switchStory,
    link
  } = props;

  const date = new Date(created);

  return (
    <Column
      className={cx("text-story", shownOnMainPage && "text-story-checked")}
    >
      <p>
        <b>Имя:</b> {name}
      </p>
      <p>
        <b>Email:</b> {email}
      </p>
      <p>
        <b>История:</b> {text}
      </p>
      <p>
        <b>Ссылка на продукт:</b> {link}
      </p>
      <Row jc="space-between">
        <span
          style={{
            background: shownOnMainPage ? "green" : "#13023c",
            cursor: "pointer"
          }}
          onClick={() => switchStory(email)}
        >
          {shownOnMainPage ? "На главной" : "На главную"}
        </span>
        <span>
          {date.toLocaleDateString()}, {date.getHours().toString()}:
          {date.getMinutes().toString()}
        </span>
      </Row>
    </Column>
  );
};

AdminPanel.propTypes = {
  className: PropTypes.string
};

AdminPanel.defaultProps = {
  className: ""
};

export { AdminPanel };
