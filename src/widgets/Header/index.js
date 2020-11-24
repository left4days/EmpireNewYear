import React from "react";
import { Link } from "react-router-dom";
import { Row, Column } from "ui/Layout";
import fireCudaLogo from "statics/logo_firecuda.svg";
import seagateLogo from "statics/seagate_logo.png";
import logo from "statics/logo.svg";
import style from "./style.scss";

const menuConfig = [
  {
    text: "Главная",
    link: "/"
  },
  {
    text: "Правила",
    link: "#rules"
  },
  {
    text: "Об акции",
    link: "#about"
  }
];

function Header() {
  return (
    <Column className={style.header} ai="center" jc="space-between">
      <Row className={style.header__container}>
        <Row jc="flex-start" className={style.header__logo_double}>
          <img className={style.header__logo} src={logo} alt="logo" />
          <img className={style.header__logo} src={seagateLogo} alt="seagate" />
        </Row>
        <Row className={style.header__logo_container} jc="flex-end">
          {menuConfig.map(item => {
            return <Link className={style.header__menu_item} to={item.link}>{item.text}</Link>;
          })}
        </Row>
      </Row>
    </Column>
  );
}

export { Header };
