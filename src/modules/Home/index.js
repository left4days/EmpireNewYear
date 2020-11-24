import React, { useRef } from "react";
import { Column } from "ui/Layout";
import { ProductsBlock } from "./components/ProductsBlock";
import { FormBlock } from "./components/FormBlock";
import "./style.scss";

const Home = ({ actionState }) => {
  return (
    <Column className="home">
      <ProductsBlock />
      <FormBlock />
    </Column>
  );
};

export { Home };
