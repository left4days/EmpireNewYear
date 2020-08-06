import React from "react";
import cx from "classnames";
import axios from "axios";
import { Column, Row } from "ui/Layout";
import { Title } from "ui/Title";
import { getFirebaseHeaderToken } from "widgets/requestsHelpers";
import correctImage from "statics/correct.svg";
import Formsy from "formsy-react";
import { Input } from "widgets/fields";
import Modal from "react-modal";
import { InfoModal } from "widgets/InfoModal";
import {Auth, customStyles} from "widgets/Auth";
import ScrollAnimation from "react-animate-on-scroll";
import { Description } from "ui/Description";
import icon1 from "statics/1.svg";
import icon2 from "statics/2.svg";
import icon3 from "statics/3.svg";
import asset1 from "statics/asset1.png";
import asset2 from "statics/asset2.png";
import "./style.scss";

function getClickByType(clickType, scrollToMyRef, handleModalAuth) {
  switch (clickType) {
    case "ref":
      return scrollToMyRef;
    case "auth":
      return handleModalAuth;
    default:
      return i => i;
  }
}

const InfoItem = ({ src, text, delay, clickType, scrollToMyRef, handleModalAuth }) => {
  const click = getClickByType(clickType, scrollToMyRef, handleModalAuth);
  return (
    <ScrollAnimation
      animateIn="fadeInDown"
      className="info__item"
      delay={delay}
      animateOnce={true}
    >
      <div
        className="info__wrapper"
        onClick={click}
      >
        <img src={src} alt="image" />
      </div>
      <Description>{text}</Description>
    </ScrollAnimation>
  );
};

const data = [
  {
    src: icon1,
    text: "Зарегистрируйся и стань участником розыгрыша",
    delay: 0,
    clickType: "auth"
  },
  {
    src: icon2,
    text: "Регистрируй свою гильдию и участвуй в основном розыгрыше",
    delay: 70,
    clickType: "ref"
  },
  {
    src: icon3,
    text: "Не отрывайся от игры и получи шанс выиграть очки Battle Pass!",
    delay: 150,
    clickType: null
  }
];

const NoGuid = ({ valid, onSubmit, handleModal }) => {
  return (
    <Column className="guild__inner">
      <Title>Укажите свой тег гильдии для участия в основном розыгрыше</Title>
      <Column className="guild__widget">
        <Input
          required
          type="text"
          id="guild"
          placeholder="Тег гильдии"
          name="guild"
        />
        <button
          onClick={() => onSubmit}
          className={cx("guild__button", valid && "guild__button_valid")}
        >
          <img src={correctImage} alt="correct" />
        </button>
      </Column>
      <button onClick={handleModal} className="guild__info">
        Как узнать тег гильдии?
      </button>
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


class GuildInput extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      valid: false,
      error: "",
      isModalOpen: false,
      isAuthModalOpen: false,
    };
  }

  onCloseModalAuth = () => {
    this.setState({ isAuthModalOpen: false });
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

  onSubmit = async () => {
    const { user } = this.props;
    const { guild } = this.form.getModel();
    const options = await getFirebaseHeaderToken();
    axios
      .put(
        "/api/v1/user/add-guild",
        { guildName: guild, userId: user.userData.uid },
        options
      )
      .then(res => {
        window.location.reload(false);
      });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleModal = () => {
    this.setState({ isModalOpen: true });
  };

  scrollToMyRef = () => {
    return window.scrollTo(0, this.myRef.current.offsetTop);
  };

  render() {
    const { user } = this.props;
    const { isModalOpen, isAuthModalOpen } = this.state;

    if (user === "loading" || !user.userData) {
      return null;
    }
    const { guildName = "" } = user.userData;

    return (
      <>
        <Column className="info">
          <img
            src={asset2}
            alt="asset1"
            className="info__asset info__asset_left"
          />
          <Row className="info__container">
            {data.map((item, i) => (
              <InfoItem
                src={item.src}
                key={i}
                handleModalAuth={this.handleModalAuth}
                scrollToMyRef={this.scrollToMyRef}
                delay={item.delay}
                text={item.text}
                clickType={item.clickType}
              />
            ))}
          </Row>
          <img
            src={asset1}
            alt="asset2"
            className="info__asset info__asset_right"
          />
        </Column>
        <div ref={this.myRef}>
          <Column className="guild">
            <Column className="guild__container">
              <Formsy
                onValidSubmit={this.onSubmit}
                ref={this.formRef}
                onValid={this.onValid}
                onInvalid={this.onInvalid}
              >
                {!guildName ? (
                  <NoGuid
                    valid={this.state.valid}
                    onSubmit={this.onSubmit}
                    handleModal={this.handleModal}
                  />
                ) : (
                  <WithGuid guildName={guildName} />
                )}
              </Formsy>
            </Column>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={this.handleCloseModal}
              style={customStyles}
              contentLabel="Title"
            >
              <InfoModal />
            </Modal>
            <Modal
                isOpen={isAuthModalOpen}
                onRequestClose={this.onCloseModalAuth}
                style={customStyles}
                contentLabel="Title"
            >
              <Auth authType="auth" />
            </Modal>
          </Column>
        </div>
      </>
    );
  }
}

export { GuildInput };
