import React from "react";
import { Link } from "react-router-dom";
import { Row, Column } from "ui/Layout";
import seagateLogo from "statics/seagate_logo.png";
import logo from "statics/logo.svg";
import style from "./style.scss";

const menuConfig = [
  {
    id: "0c698af7-a543-4c66-82f4-6102f4d6c79b",
    text: "Правила",
    link: "#rules"
  }
];

function Header({ onToggleRulesModal }) {
  return (
    <Column className={style.header} ai="center" jc="space-between">
      <Row className={style.header__container}>
        <Row jc="flex-start" className={style.header__logo_double}>
          <img className={style.header__logo} src={logo} alt="logo" />
          <img className={style.header__logo} src={seagateLogo} alt="seagate" />
        </Row>
        <Row className={style.header__logo_container} jc="flex-end">
          {menuConfig.map(item => {
            return (
              <button
                key={item.id}
                className={style.header__menu_item}
                onClick={onToggleRulesModal}
              >
                {item.text}
              </button>
            );
          })}
        </Row>
      </Row>
    </Column>
  );
}

export { Header };
