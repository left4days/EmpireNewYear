import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";
import DevelopTower from "./DevelopTower";
import Modal from "react-modal";
import get from "lodash/get";
import { Header } from "widgets/Header";
import routes from "./routes";
import "./style.scss";
import { Loader } from "ui/Loader";
import { Column } from "ui/Layout";
import logo from "statics/logo.svg";
import {RulesModal} from "./rules";

const config = {
  apiKey: "AIzaSyAC84idBUU4iWy_mpSzgg00Dnv4yoYunLo",
  authDomain: "empirenewyear.firebaseapp.com",
  databaseURL: "https://empirenewyear.firebaseio.com",
  projectId: "empirenewyear",
  storageBucket: "empirenewyear.appspot.com",
  messagingSenderId: "675056552638",
  appId: "1:675056552638:web:9af5c718ba82439696ecef"
};

firebase.initializeApp(config);

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ff5100",
    background: "#fff",
    borderRadius: "4px",
    width: "60%",
    padding: "20px 0px"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: "50"
  }
};

class App extends Component {
  state = {
    actionState: "ACTIVE",
    stories: [],
    rulesModalOpen: false
  };

  componentWillMount() {
    axios.get("/api/v1/appState/state").then(res => {
      const { state } = get(res, "data.data", {});
      this.setState({ actionState: state });
    });

    axios.get("/api/v1/top-stories").then(res => {
      this.setState({ stories: res.data.data });
    });
  }

  onDevValidChange = () => {
    window.localStorage.setItem("devMode", 1);
    this.setState({ devConfirmed: true });
  };

  onToggleRulesModal = () => {
    const { rulesModalOpen } = this.state;
    this.setState({ rulesModalOpen: !rulesModalOpen });
  };

  render() {
    const isDevMode = !!window.localStorage.getItem("devMode");
    const { actionState, stories, rulesModalOpen } = this.state;
    if (actionState === "loading") {
      return (
        <Column className="loading__app" ai="center" jc="center">
          <img className="header__logo" src={logo} alt="logo" />
          <Loader />
        </Column>
      );
    }
    if (actionState === "DEV" && !isDevMode) {
      return <DevelopTower onValidChange={this.onDevValidChange} />;
    }
    return (
      <Router>
        <Header onToggleRulesModal={this.onToggleRulesModal} />
        <Modal
          isOpen={rulesModalOpen}
          onRequestClose={this.onToggleRulesModal}
          style={customStyles}
          contentLabel="Title"
        >
          <RulesModal onClose={this.onToggleRulesModal} />
        </Modal>
        <div className="app">
          {routes.map(route => {
            const { path, exact, Component } = route;
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={() => (
                  <Component actionState={actionState} stories={stories} />
                )}
              />
            );
          })}
        </div>
        <div className="footer">
          <Link to="/policy">Политика конфиденциальности</Link>
        </div>
      </Router>
    );
  }
}

export default App;
