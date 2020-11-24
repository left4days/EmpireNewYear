import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";
import DevelopTower from "./DevelopTower";
import get from "lodash/get";
import { Header } from "widgets/Header";
import routes from "./routes";
import "./style.scss";
import { Loader } from 'ui/Loader';
import { Column } from 'ui/Layout';
import logo from 'statics/logo.svg';

const config = {
  apiKey: "AIzaSyA3YXk8w0t2E58C1gCPUBi1dOn_M05ARk8",
  authDomain: "sg-challenge.firebaseapp.com",
  databaseURL: "https://sg-challenge.firebaseio.com",
  projectId: "sg-challenge",
  storageBucket: "sg-challenge.appspot.com",
  messagingSenderId: "698626447936",
  appId: "1:698626447936:web:f957f1cff204739d8e5da5",
  measurementId: "G-Z2SLXT6N79"
};

firebase.initializeApp(config);

class App extends Component {
  state = {
    actionState: "ACTIVE"
  };

  componentWillMount() {
    axios.get("/api/v1/appState/state").then(res => {
      const { state } = get(res, "data.data", {});
      this.setState({ actionState: state });
    });
  }

  onDevValidChange = () => {
    window.localStorage.setItem("devMode", 1);
    this.setState({ devConfirmed: true });
  };

  render() {
    const isDevMode = !!window.localStorage.getItem("devMode");
    const { actionState } = this.state;
      if (actionState === 'loading') {
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
        <Header />
        <div className="app">
          {routes.map(route => {
            const { path, exact, Component } = route;
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={() => <Component actionState={actionState} />}
              />
            );
          })}
        </div>
        <div className="footer">
          <Link to="/policy">Политика конфиденциальности</Link>
          <p className="footer__info">
            ⓘ Изображения взяты с сайта{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.dota2.com/"
            >
              dota2.com
            </a>{" "}
            и переработаны. Team Empire и Seagate не претендуют на авторство
            данных изображений.
          </p>
        </div>
      </Router>
    );
  }
}

export default App;
