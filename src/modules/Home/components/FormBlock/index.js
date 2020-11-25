import React from "react";
import { Column, Row } from "ui/Layout";
import { Description } from "ui/Description";
import "./style.scss";
import { Form } from "widgets/Form";

const FormBlock = () => {
  return (
    <Column className="form" id="rules">
        <Row className="form__container">
            <Column className="form__column">
                <Description>
                    <span>Расскажи историю</span> о том, почему ты хочешь
                    купить игровой диск <span>Seagate</span>. Авторам трех лучших историй мы подарим желаемый диск.
                </Description>
                <div className="form__image"/>
            </Column>
            <Column className="form__column" jc="flex-end">
                <Form />
            </Column>
        </Row>
    </Column>
  );
};

export { FormBlock };
