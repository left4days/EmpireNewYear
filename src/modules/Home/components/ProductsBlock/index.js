import React from "react";
import { Column, Row } from "ui/Layout";
import { BuyBlock } from "../BuyBlock";
import { Description } from "ui/Description";
import {Title} from "ui/Title";
import "./style.scss";

const ProductsBlock = () => {
  return (
    <Column className="products">
      <Column className="products__container">
        <Row ai="center" jc="center">
          <Column className="products__info">
            <Description>
              Узнай информацию о дисках Seagate на сайтах партнеров и напиши
              свою историю
            </Description>
          </Column>
        </Row>
        <BuyBlock />
        <Column className="main__title">
            <Title>Новый <span>год!</span></Title>
            <Title>Новый <span>я!</span></Title>
            <Title>Новые <span>игры!</span></Title>
        </Column>
      </Column>
    </Column>
  );
};

export { ProductsBlock };
