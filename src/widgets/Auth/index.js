import React from "react";
import Formsy from "formsy-react";
import { Link } from "react-router-dom";
import { Input } from "widgets/fields";
import { Column } from "ui/Layout";
import { Button } from "ui/Button";
import { Row } from "ui/Layout";
import { Title } from "ui/Title";
import { Description } from "ui/Description";
import { getValidationForField } from "./validations";
import config from "./config";
import { getAuthAction } from "./helpers";
import { getFirebaseHeaderToken } from "widgets/requestsHelpers";
import { getValidationError } from "./validations-errors";

import style from "./style.scss";
import get from "lodash/get";
import axios from "axios/index";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ff5100",
    background: "#0a0b0a",
    borderRadius: "4px",
    width: "300px",
    padding: "20px 40px"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  }
};

function getTitle(authType) {
  switch (authType) {
    case "auth":
    default:
      return { title: "Регистрация", button: "Зарегистрироваться" };
    case "login":
      return { title: "Авторизация", button: "Войти" };
    case "reset":
      return { title: "Восстановить пароль", button: "Восстановить" };
  }
}

function BottomPanel(props) {
  const { authType, handleModalAuth, handleModalReset } = props;
  switch (authType) {
    case "auth":
      return (
        <Description>
          Нажимая на кнопку Зарегистрироваться, вы подтверждаете свое согласие с
          <Link to="/policy" target="_blank" className={style.auth__link}>
            Условиями предоставления услуг
          </Link>
        </Description>
      );
    case "login":
      return (
        <Row>
          <Button className={style.auth__button_more} onClick={handleModalAuth}>
            Регистрация
          </Button>
          <Button
            className={style.auth__button_more}
            onClick={handleModalReset}
          >
            Забыли пароль?
          </Button>
        </Row>
      );
    case "reset":
    default:
      return null;
  }
}
function AuthHeader({ authType }) {
  if (authType === "reset") {
    return <Title align="center">{getTitle(authType).title}</Title>;
  }
  return (
    <Column>
      <Title align="center">{getTitle(authType).title}</Title>
    </Column>
  );
}

function ErrorText({ error }) {
  if (!error) {
    return null;
  }
  return <p className={style.auth__error}>{getValidationError(error)}</p>;
}

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      error: "",
      isLoginModalOpen: false,
      isAuthModalOpen: false,
      isResetModalOpen: false
    };

    this.tryRegisterID = 0;
  }

  onCloseModalLogin = () => {
    this.setState({ isLoginModalOpen: false });
  };

  onCloseModalAuth = () => {
    this.setState({ isAuthModalOpen: false });
  };

  onCloseResetModal = () => {
    this.setState({ isResetModalOpen: false });
  };

  handleModalLogin = () => {
    this.setState({ isLoginModalOpen: true, isAuthModalOpen: false });
  };

  handleModalReset = () => {
    this.setState({
      isLoginModalOpen: false,
      isAuthModalOpen: false,
      isResetModalOpen: true
    });
  };

  handleModalAuth = () => {
    this.setState({ isAuthModalOpen: true, isLoginModalOpen: false });
  };

  formRef = ref => (this.form = ref);

  onValid = () => {
    this.setState({ valid: true });
  };

  onInvalid = () => {
    this.setState({ valid: false });
  };

  componentWillUnmount() {
    clearTimeout(this.tryRegisterID);
  }

  onSubmit = () => {
    const { authType = "auth" } = this.props;
    const model = this.form.getModel();
    const { login, registerBy = "email", email, steamLink } = model;

    getAuthAction(authType, model)
      .then(async res => {
        const { user = {} } = res || {};
        const uid = get(res, "user.uid", "");
        const data = { login, registerBy, uid, email, steamLink };
        const options = await getFirebaseHeaderToken();

        return axios.post("api/v1/user", data, options);
      })
      .catch(error => {
        this.setState({ error: error.code });
        setTimeout(() => this.setState({ error: "" }), 8000);
      });
  };

  render() {
    const {
      valid,
      error,
      isLoginModalOpen,
      isAuthModalOpen,
      isResetModalOpen
    } = this.state;
    const { authType = "auth" } = this.props;

    return (
      <Column>
        <AuthHeader authType={authType} />
        <Formsy
          onValidSubmit={this.onSubmit}
          ref={this.formRef}
          onValid={this.onValid}
          onInvalid={this.onInvalid}
        >
          {config[authType].map((item, i) => {
            const {
              type,
              id,
              name,
              placeholder,
              validations,
              validationsError,
              margin,
              autoComplete
            } = item;
            return (
              <Input
                validations={getValidationForField(validations)}
                margin={margin}
                key={i}
                validationError={validationsError}
                required
                type={type}
                autoComplete={autoComplete}
                id={id}
                placeholder={placeholder}
                name={name}
              />
            );
          })}
          <ErrorText error={error} />
          <Button
            className={style.auth__button}
            type="submit"
            size="full"
            margin="bottom_x2"
            disabled={!valid}
          >
            {getTitle(authType).button}
          </Button>
          <BottomPanel
            authType={authType}
            handleModalLogin={this.handleModalLogin}
            handleModalAuth={this.handleModalAuth}
            handleModalReset={this.handleModalReset}
          />
        </Formsy>
        <Modal
          isOpen={isLoginModalOpen}
          onRequestClose={this.onCloseModalLogin}
          style={customStyles}
          contentLabel="Title"
        >
          <Auth authType="login" />;
        </Modal>
        <Modal
          isOpen={isAuthModalOpen}
          onRequestClose={this.onCloseModalAuth}
          style={customStyles}
          contentLabel="Title"
        >
          <Auth authType="auth" />;
        </Modal>
        <Modal
          isOpen={isResetModalOpen}
          onRequestClose={this.onCloseResetModal}
          style={customStyles}
          contentLabel="Title"
        >
          <Auth authType="reset" />
        </Modal>
      </Column>
    );
  }
}

export { Auth };
