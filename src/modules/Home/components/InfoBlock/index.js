import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Column, Row } from "ui/Layout";
import { Description } from "ui/Description";
import icon1 from "statics/1.svg";
import icon2 from "statics/2.svg";
import icon3 from "statics/3.svg";
import asset1 from "statics/asset1.png";
import asset2 from "statics/asset2.png";
import "./style.scss";

const InfoItem = ({ src, text, delay }) => {
  return (
    <ScrollAnimation
      animateIn="fadeInDown"
      className="info__item"
      delay={delay}
      animateOnce={true}
    >
      <div className="info__wrapper">
        <img src={src} alt="image" />
      </div>
      <Description>{text}</Description>
    </ScrollAnimation>
  );
};

const data = [
  {
    src: icon1,
    text: "Зарегистрируйся  и стань участников розыгрыша",
    delay: 0
  },
  {
    src: icon2,
    text: "Регистрируй свою гильдию и участвуй в основном розыгрыше призов",
    delay: 70
  },
  {
    src: icon3,
    text: "Не открывайся от игры и получи шанс выиграть очки Battle Pass!",
    delay: 150
  }
];

const InfoBlock = () => {
  return (
    <Column className="info">
      <img src={asset2} alt="asset1" className="info__asset info__asset_left" />
      <Row className="info__container">
        {data.map((item, i) => (
          <InfoItem
            src={item.src}
            key={i}
            delay={item.delay}
            text={item.text}
          />
        ))}
      </Row>
      <img
        src={asset1}
        alt="asset2"
        className="info__asset info__asset_right"
      />
    </Column>
  );
};

export { InfoBlock };
