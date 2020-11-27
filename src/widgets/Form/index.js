import React from "react";
import Formsy from "formsy-react";
import { Input, Textarea } from "widgets/fields";
import { Button } from "ui/Button";
import { Column } from "ui/Layout";
import { getValidationForField } from "./validations";
import config from "./config";
import { createMessage } from "./firebase-configuration";
import { getValidationError } from "./validations-errors";
import style from "./style.scss";
import axios from "axios/index";

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

function ErrorText({ error }) {
  if (!error) {
    return null;
  }
  return <p className={style.auth__error}>{getValidationError(error)}</p>;
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      error: ""
    };
  }

  formRef = ref => {
    this.form = ref;
  };

  onValid = () => {
    this.setState({ valid: true });
  };

  onInvalid = () => {
    this.setState({ valid: false });
  };

  onSubmit = () => {
    const model = this.form.getModel();
    const { name, productLink, email, message } = model;

    return axios.post("api/v1/story", {
      name,
      email,
      text: message,
      link: productLink
    });
    // this.setState({ error: error.code });
    // setTimeout(() => this.setState({ error: "" }), 8000);
  };

  render() {
    const { error, valid } = this.state;
    return (
      <Column>
        <Formsy
          onValidSubmit={this.onSubmit}
          ref={this.formRef}
          onValid={this.onValid}
          onInvalid={this.onInvalid}
        >
          {config.map((item, i) => {
            const {
              type,
              id,
              name,
              placeholder,
              validations,
              validationsError,
              margin,
              autoComplete,
              label
            } = item;
            if (type === "textarea") {
              return (
                <>
                  <Textarea
                    validations={getValidationForField(validations)}
                    margin={margin}
                    label={label}
                    key={i}
                    validationError={validationsError}
                    required
                    autoComplete={autoComplete}
                    id={id}
                    placeholder={placeholder}
                    name={name}
                  />
                </>
              );
            }
            return (
              <>
                <Input
                  validations={getValidationForField(validations)}
                  margin={margin}
                  label={label}
                  key={i}
                  validationError={validationsError}
                  required
                  type={type}
                  autoComplete={autoComplete}
                  id={id}
                  placeholder={placeholder}
                  name={name}
                />
              </>
            );
          })}
          <ErrorText error={error} />
          <Button
            disabled={!valid}
            className="form__button"
            size="l"
            onClick={this.onSubmit}
          >
            Отправить
          </Button>
        </Formsy>
      </Column>
    );
  }
}

export { Form };
