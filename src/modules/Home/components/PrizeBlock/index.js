import React from "react";
import { Column, Row } from "ui/Layout";
import { Description } from "ui/Description";
import { Title } from "ui/Title";
import prize1 from "statics/prize1.png";
import prize2 from "statics/prize2.png";
import prize3 from "statics/prize3.png";
import cx from "classnames";
import "./style.scss";

const prizeConfig = [
  {
    id: "5d61de47-0000-42b3-877f-0f105c06ee23",
    image: prize1,
    className: "product_1",
    text: "",
    subtext: "Firecuda SSD"
  },
  {
    id: "61a16c05-9c3d-451d-bb8b-8add0429e811",
    image: prize2,
    className: "product_2",
    text: "Игровые джерси",
    subtext: "Team Empire"
  },
  {
    id: "7b58e020-6730-435c-b14f-e04668d5a31a",
    image: prize3,
    className: "product_3",
    text: "Игровые фигурки",
    subtext: "Dotakins Box vinyl"
  }
];

const PrizeBlock = () => {
  return (
    <Column className="prize">
      <Column className="prize__container">
        <Title size="l">Список призов</Title>
        <Row className="prize__wrapper" ai="flex-end">
          {prizeConfig.map(item => {
            return (
              <Column
                key={item.id}
                className={cx("prize__item", item.className)}
              >
                <img src={item.image} alt="product_image" />
                <Description>
                  {item.text} <br/>
                  <span>{item.subtext}</span>
                </Description>
              </Column>
            );
          })}
        </Row>
      </Column>
    </Column>
  );
};

export { PrizeBlock };
