import React from "react";
import onClickOutside from "react-onclickoutside";
import { Column, Row } from "ui/Layout";
import { Link } from "react-router-dom";

import style from "./style.scss";

function DropDown({ isOpen, signOutUser, role }) {
  if (!isOpen) {
    return null;
  }
  return (
    <Column className={style.dropdown}>
      {role === 'admin' ? <Link className={style.dropdown__button} to="/admin">
        Admin
      </Link> : ''}
      <button onClick={signOutUser} className={style.dropdown__button}>
        Log Out
      </button>
    </Column>
  );
}

class HeaderAuthAuthorized extends React.Component {
  state = { isOpen: false };

  handleOpenDropdown = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      user: { email, userData = {}, displayName = "" },
      signOutUser
    } = this.props;
    const { login = "", email: socialEmail, role } = userData;
    const { isOpen } = this.state;


    return (
      <Row jc="flex-end" ai="center" className={style.header__authorized}>
        <div>
          <p onClick={this.handleOpenDropdown}>
            <b>{login || displayName}</b>
          </p>
          <p className={style.header__user} onClick={this.handleOpenDropdown}>
            {email || socialEmail}
          </p>
        </div>
        <DropDown isOpen={isOpen} signOutUser={signOutUser} role={role} />
      </Row>
    );
  }
}

HeaderAuthAuthorized = onClickOutside(HeaderAuthAuthorized);

export { HeaderAuthAuthorized };
