import React from "react";
import Formsy from "formsy-react";
import { Input } from "widgets/fields";
import { Column } from "ui/Layout";
import { Button } from "ui/Button";
import { Row } from "ui/Layout";
import { Title } from "ui/Title";
import { getValidationForField } from "../Form/validations";
import config from "./config";
import { getAuthAction } from "./helpers";
import { getFirebaseHeaderToken } from "widgets/requestsHelpers";
import { getValidationError } from "../Form/validations-errors";
import style from "../Form/style.scss";
import get from "lodash/get";
import axios from "axios/index";
import Modal from "react-modal";

export const customStyles = {
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
    width: "400px",
    padding: "20px 40px"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: "50"
  }
};

function getTitle(authType) {
  switch (authType) {
    case "auth":
    default:
      return { title: "Регистрация", button: "Зарегистрироваться" };
    case "login":
      return { title: "Авторизация", button: "Войти" };
  }
}

function BottomPanel(props) {
  const { authType, handleChangeAuth } = props;
  return (
    <Button onClick={handleChangeAuth} size="full">
      {authType === "login" ? "Регистрация" : "Авторизация"}
    </Button>
  );
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
      authType: "auth"
    };

    this.tryRegisterID = 0;
  }

  handleChangeAuth = () => {
    const { authType } = this.state;
    this.setState({ authType: authType === "auth" ? "login" : "auth" });
  };

  formRef = ref => {
    this.form = ref;
  };

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
    const { authType } = this.state;
    const model = this.form.getModel();
    const { userInfo, registerBy = "email", email } = model;

    getAuthAction(authType, model)
      .then(async res => {
        const { user = {} } = res || {};
        const uid = get(res, "user.uid", "");
        const data = { login: userInfo, registerBy, uid, email };
        const options = await getFirebaseHeaderToken();

        return axios.post("api/v1/user", data, options);
      })
      .catch(error => {
        this.setState({ error: error.code });
        setTimeout(() => this.setState({ error: "" }), 8000);
      });
  };

  render() {
    const { valid, error, authType } = this.state;
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
              autoComplete,
              tooltip
            } = item;
            return (
              <>
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
                {tooltip && <p className="tooltip">ⓘ {tooltip}</p>}
              </>
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
            handleChangeAuth={this.handleChangeAuth}
          />
        </Formsy>
      </Column>
    );
  }
}

export { Auth };
