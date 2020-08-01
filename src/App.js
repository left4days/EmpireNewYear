import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";
import get from "lodash/get";
import { Header } from "widgets/Header";
import { Modal } from "ui/Modal";
import routes from "./routes";
import { signOutUser } from "widgets/Auth/firebase-configuration";
import "./style.scss";

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
    user: "loading",
    actionState: "ACTIVE",
    mainWinnerData: {},
    product_link: false
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(res => {
      const uid = get(res, "uid", "");
      if (uid) {
        axios.get(`/api/v1/user/${uid}`).then(resData => {
          const user = { ...res, userData: resData.data };
          this.setState({ user });
        });
      } else {
        this.setState({ user: false });
      }
    });

    axios.get("/api/v1/appState/state").then(res => {
      const { state, mainWinnerData, product_link } = get(res, "data.data", {});
      this.setState({ actionState: state, mainWinnerData, product_link });
    });
  }

  signOutUserAction = () => {
    signOutUser();
    this.setState({ user: false });
  };

  render() {
    const { user, actionState, mainWinnerData, product_link } = this.state;

    return (
      <Router>
        <Header signOutUser={this.signOutUserAction} user={user} />
        <div className="app">
          {routes.map(route => {
            const { path, exact, Component } = route;
            return (
              <Route
                key={path}
                path={path}
                exact={exact}
                component={() => (
                  <Component
                    user={user}
                    actionState={actionState}
                    product_link={product_link}
                    mainWinnerData={mainWinnerData}
                  />
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
