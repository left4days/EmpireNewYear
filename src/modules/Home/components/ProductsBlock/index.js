import React from "react";
import { Column, Row } from "ui/Layout";
import { Description } from "ui/Description";
import { Title } from "ui/Title";
import { BuyBlock } from "../BuyBlock";
import product1 from "statics/product1.png";
import product2 from "statics/product2.png";
import product3 from "statics/product3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

const config = [
  {
    productName: "FireCuda® 520",
    image: product1,
    items: [
      {
        name: "Форм-фактор:",
        value: "Двусторонний M.2 2280"
      },
      {
        name: "Интерфейс:",
        value: "PCle Gen4 x4, NVMe 1.3"
      },
      {
        name: "Форм-фактор:",
        value: "Двусторонний M.2 2280"
      },
      {
        name: "Ёмкость:",
        value: "2 ТБ, 1 ТБ, 500 ГБ"
      },
      {
        name: "Ограниченная гарантия:",
        value: "5 лет"
      }
    ]
  },
  {
    productName: "FireCuda® 510",
    image: product2,
    items: [
      {
        name: "Форм-фактор:",
        value: "Двусторонний M.2 2280"
      },
      {
        name: "Интерфейс:",
        value: "PCle Gen3 x4, NVMe 1.3"
      },
      {
        name: "Форм-фактор:",
        value: "Двусторонний M.2 2280"
      },
      {
        name: "Ёмкость:",
        value: "2 ТБ, 1 ТБ, 500 ГБ"
      },
      {
        name: "Ограниченная гарантия:",
        value: "5 лет"
      }
    ]
  },
  {
    productName: "FireCuda® 120",
    image: product3,
    items: [
      {
        name: "Форм-фактор:",
        value: "2,5 дюйма"
      },
      {
        name: "Интерфейс:",
        value: "6 Гбит/с (SATA)"
      },
      {
        name: "Форм-фактор:",
        value: "Двусторонний M.2 2280"
      },
      {
        name: "Ёмкость:",
        value: "4 ТБ, 2 ТБ, 1 ТБ, 500 ГБ"
      },
      {
        name: "Ограниченная гарантия:",
        value: "5 лет"
      }
    ]
  }
];

const ProductItem = ({ data }) => {
  const { productName, image, items } = data;
  return (
    <Column className="product">
      <Title>{productName}</Title>
      <div className="product__image_container">
        <img src={image} alt="product-image" className="product__image" />
      </div>
      {items.map((item, i) => {
        return (
          <Column key={i} className="product__item">
            <Description className="product__item_name">
              {item.name}
            </Description>
            <Description>{item.value}</Description>
          </Column>
        );
      })}
    </Column>
  );
};

const ProductsBlock = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Column className="products">
      <Column className="products__container">
        <Row className="products__line" jc="space-between">
          {config.map((item, i) => {
            return <ProductItem data={item} key={i} />;
          })}
        </Row>
        <Column className="products__line_mobile" jc="space-between">
          <Slider {...settings}>
            {config.map((item, i) => {
              return <ProductItem data={item} key={i} />;
            })}
          </Slider>
        </Column>
        <BuyBlock />
      </Column>
    </Column>
  );
};

export { ProductsBlock };
