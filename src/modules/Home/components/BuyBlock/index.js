import React from "react";
import { Column, Row } from "ui/Layout";
import buy1 from "statics/buy1.png";
import buy2 from "statics/buy2.png";
import buy3 from "statics/buy3.svg";
import buy4 from "statics/buy4.png";
import buy5 from "statics/buy5.png";
import buy6 from "statics/buy6.svg";
import "./style.scss";

const config = [
  {
    src: buy1,
    link: "https://www.dns-shop.ru/search/?q=firecuda&order=popular&category=8a9ddfba20724e77-dd58148920724e77&stock=all"
  },
  {
    src: buy2,
    link: "https://www.citilink.ru/products/5fb63f237020c"
  },
  {
    src: buy3,
    link: "https://www.onlinetrade.ru/sitesearch.html?query=firecuda&cat_id=294&archive=0&force_items=1"
  },
  {
    src: buy4,
    link: "https://www.regard.ru/catalog/?query=firecuda+ssd&group=5001"
  },
  {
    src: buy5,
    link: "https://new.ogo1.ru/market/ssd/?SECTION_CODE=ssd&PAGESIZE=&SORT=&ORDER=&ONLY_AVAILABLE=1&EXACT_SEARCH=1&set_filter=Y&view=plate&arrFilter%5BOSNOVNOE_PROIZVODITEL%5D%5B%5D=26459&arrFilter%5BGLAVNOE_FORM_FAKTOR%5D%5B%5D=15944&utm_source=teamempire&utm_medium=referral&utm_campaign=ssd_firecuda_seagate"
  },
  {
    src: buy6,
    link: "https://brain.com.ua/ukr/search/category/SSD_dysky-c1484/?Search=Firecuda",
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
