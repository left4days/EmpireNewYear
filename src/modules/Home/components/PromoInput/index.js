import React from "react";
import cx from "classnames";
import axios from "axios";
import { Column, Row } from "ui/Layout";
import { Title } from "ui/Title";
import { getFirebaseHeaderToken } from "widgets/requestsHelpers";
import correctImage from "statics/correct.svg";
import Formsy from "formsy-react";
import { Input } from "widgets/fields";
import pudgeImage from 'statics/pudge.png';
import hookImage from 'statics/hook.png';
import "./style.scss";

const NoGuid = ({ valid, onSubmit }) => {
  return (
    <Column className="promo__inner">
      <Title>Введите секретный код и станьте <br/>участником розыгрыша Dragonclaw Hook!</Title>
      <Column className="promo__widget">
        <Input
          required
          type="text"
          id="promocode"
          placeholder="Промокод"
          name="promocode"
        />
        <button
          onClick={() => onSubmit}
          className={cx("promo__button", valid && "promo__button_valid")}
        >
          <img src={correctImage} alt="correct" />
        </button>
      </Column>
    </Column>
  );
};

const WithGuid = ({ guildName }) => {
  return (
    <Column className="guild__inner">
      <Title>Вы состоите в гильдии "{guildName}"</Title>
    </Column>
  );
};

class PromoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      error: ""
    };
  }

  formRef = ref => (this.form = ref);

  onValid = () => {
    this.setState({ valid: true });
  };

  onInvalid = () => {
    this.setState({ valid: false });
  };

  onSubmit = async () => {
    const { user } = this.props;
    const { promocode } = this.form.getModel();
    const options = await getFirebaseHeaderToken();
    axios
      .put(
        "/api/v1/user/add-promocode",
        { promocode: promocode, userId: user.userData.uid },
        options
      )
      .then(res => {
        window.location.reload(false);
      });
  };

  render() {
    const { user } = this.props;
    if(!user.userData) {
      return null;
    }
    console.log(user);

    return (
      <Column className="promo">
        <img className="promo__pudge" src={pudgeImage} alt="pudge-alt"/>
        <Column className="promo__container">
          <Formsy
            onValidSubmit={this.onSubmit}
            ref={this.formRef}
            onValid={this.onValid}
            onInvalid={this.onInvalid}
          >
            <NoGuid
                valid={this.state.valid}
                onSubmit={this.onSubmit}
                handleModal={this.handleModal}
            />
          </Formsy>
        </Column>
        <img className="promo__hook" src={hookImage} alt="hook-alt"/>
      </Column>
    );
  }
}

export { PromoInput };
