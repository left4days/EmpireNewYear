import React from "react";
import { Button } from "ui/Button";
import { Row } from "ui/Layout";
import { Loader } from "ui/Loader";
import { HeaderAuthAuthorized } from "./AuthorizedHeader";
import menuImage from "statics/menu.svg";
import style from "./style.scss";
import Modal from "react-modal";
import { Auth, customStyles } from "../../Auth";

class HeaderAuth extends React.Component {
  state = {
    isLoginModalOpen: false,
    isAuthModalOpen: false
  };

  onCloseModalLogin = () => {
    this.setState({ isLoginModalOpen: false });
  };

  onCloseModalAuth = () => {
    this.setState({ isAuthModalOpen: false });
  };

  handleModalLogin = () => {
    this.setState({ isLoginModalOpen: true, isAuthModalOpen: false });
  };

  handleModalAuth = () => {
    this.setState({ isAuthModalOpen: true, isLoginModalOpen: false });
  };

  render() {
    const { user, signOutUser } = this.props;
    const { isLoginModalOpen, isAuthModalOpen } = this.state;
    if (user === "loading") {
      return (
        <Row jc="flex-end" ai="center">
          <Loader />
        </Row>
      );
    }
    if (user) {
      return <HeaderAuthAuthorized user={user} signOutUser={signOutUser} />;
    }
    return (
      <Row jc="flex-end" ai="center" className={style.header__mobile}>
        <Button
          size="s"
          style="fill"
          margin="right_x2"
          onClick={this.handleModalLogin}
        >
          Войти
        </Button>
        <Button size="l" onClick={this.handleModalAuth}>
          Регистрация
        </Button>
        <button
          className={style.header__mobile_btn}
          onClick={this.handleModalAuth}
        >
          <img src={menuImage} alt="menu" />
        </button>
        <Modal
          isOpen={isLoginModalOpen}
          onRequestClose={this.onCloseModalLogin}
          style={customStyles}
          contentLabel="Title"
        >
          <Auth authType="login" />
        </Modal>
        <Modal
          isOpen={isAuthModalOpen}
          onRequestClose={this.onCloseModalAuth}
          style={customStyles}
          contentLabel="Title"
        >
          <Auth authType="auth" />
        </Modal>
      </Row>
    );
  }
}

export { HeaderAuth };
