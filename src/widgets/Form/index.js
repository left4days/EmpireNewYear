import React from "react";
import Formsy from "formsy-react";
import { Input, Textarea } from "widgets/fields";
import { Button } from "ui/Button";
import { Column } from "ui/Layout";
import { Description } from "ui/Description";
import { getValidationForField } from "./validations";
import config from "./config";
import { getValidationError } from "./validations-errors";
import style from "./style.scss";
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
    background: "#fff",
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
      error: "",
      message: "",
      isFormModalOpened: false
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
    return axios
      .post("api/v1/story", {
        name,
        email,
        text: message,
        link: productLink
      })
      .then(res => {
        if (res.data.success) {
          this.form.reset();
          this.setState({
            message: "Ваша история была успешно отправлена",
            isFormModalOpened: true
          });
        } else {
          this.setState({
            message: "Что-то пошло не так, попробуйте еще раз",
            isFormModalOpened: true
          });
        }
      })
      .catch(() => {
        this.setState({
          message:
            "История с указанным email уже существует. Проверьте правильность данных.",
          isFormModalOpened: true
        });
      });
  };

  onCloseModalForm = () => {
    this.setState({ isFormModalOpened: false });
  };

  render() {
    const { error, valid, isFormModalOpened, message } = this.state;
    return (
      <Column>
        <Formsy
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
              );
            }
            return (
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
            );
          })}
          <ErrorText error={error} />
          <Button
            disabled={!valid}
            onClick={this.onSubmit}
            className="form__button"
            size="l"
            type="submit"
          >
            Отправить
          </Button>
        </Formsy>
        <Modal
          isOpen={isFormModalOpened}
          onRequestClose={this.onCloseModalForm}
          style={customStyles}
          contentLabel="Title"
        >
          <Description>{message}</Description>
        </Modal>
      </Column>
    );
  }
}

export { Form };
