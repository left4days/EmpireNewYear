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
  apiKey: "AIzaSyAC84idBUU4iWy_mpSzgg00Dnv4yoYunLo",
  authDomain: "empirenewyear.firebaseapp.com",
  databaseURL: "https://empirenewyear.firebaseio.com",
  projectId: "empirenewyear",
  storageBucket: "empirenewyear.appspot.com",
  messagingSenderId: "675056552638",
  appId: "1:675056552638:web:9af5c718ba82439696ecef"
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

    axios.get("/api/v1/top-stories").then(res => {
      const topStories = get(res, "data.data", {});
      this.setState({ topStories });
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
