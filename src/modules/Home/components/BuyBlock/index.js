import React from "react";
import { Column, Row } from "ui/Layout";
import buy1 from "statics/buy1.png";
import buy2 from "statics/buy2.png";
import buy3 from "statics/buy3.png";
import buy4 from "statics/buy4.png";
import buy5 from "statics/buy5.png";
import buy6 from "statics/buy6.png";
import buy7 from "statics/buy7.png";
import buy8 from "statics/buy8.png";
import "./style.scss";

const config = [
  {
    src: buy1,
    link: "#"
  },
  {
    src: buy2,
    link: "#"
  },
  {
    src: buy3,
    link: "#"
  },
  {
    src: buy4,
    link: "#"
  },
  {
    src: buy5,
    link: "#"
  },
  {
    src: buy6,
    link: "#"
  },
  {
    src: buy7,
    link: "#"
  },
  {
    src: buy8,
    link: "#"
  }
];

const BuyItem = ({ src, link }) => {
  return (
    <Column className="buy__item">
      <a
        href={link}
        className="buy__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={src} alt="buy-image" />
      </a>
    </Column>
  );
};

const BuyBlock = () => {
  return (
    <Column className="buy">
      <Row jc="space-between" className="buy__container">
        {config.map((item, i) => {
          return <BuyItem key={i} src={item.src} link={item.link} />;
        })}
      </Row>
    </Column>
  );
};

export { BuyBlock };
