import React from "react";
import { Column, Row } from "ui/Layout";
import { Auth } from "widgets/Auth";

import style from "./style.scss";

function AuthPage(props) {
  return (
    <Row jc="center" ai="center" className={style.auth}>
      <div className={style.auth__wrap}>
        <Auth />
      </div>
    </Row>
  );
}

export { AuthPage };
