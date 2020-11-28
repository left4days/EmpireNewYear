import React from "react";
import { Row } from "ui/Layout";
import { Auth } from "widgets/Auth";

import style from "./style.scss";

function AuthPage() {
  return (
    <Row jc="center" ai="center" className={style.auth}>
      <div className={style.auth__wrap}>
        <Auth />
      </div>
    </Row>
  );
}

export { AuthPage };
