import React from "react";
import { Column, Row } from "ui/Layout";
import { Description } from "ui/Description";
import "./style.scss";
import {Auth} from "../../../../widgets/Auth";

const FormBlock = () => {
  return (
    <Column className="form">
        <Row className="form__container">
            <Column>
                <Description>
                    <span>Расскажи историю</span> о том, почему ты хочешь
                    купить игровой диск <span>Seagate</span>. Авторам трех лучших историй мы подарим желаемый диск.
                </Description>
                <div className="form__image"/>
            </Column>
            <Column>
                <Auth authType="login" />
            </Column>
        </Row>
    </Column>
  );
};

export { FormBlock };
