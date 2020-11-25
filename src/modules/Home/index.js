import React, { useRef } from "react";
import { Column } from "ui/Layout";
import { ProductsBlock } from "./components/ProductsBlock";
import { FormBlock } from "./components/FormBlock";
import { PrizeBlock } from "./components/PrizeBlock";
import { StoryBlock } from "./components/StoryBlock";
import "./style.scss";

const Home = ({ actionState, stories }) => {
  return (
    <Column className="home">
      <ProductsBlock />
      <FormBlock />
      <PrizeBlock />
      <StoryBlock stories={stories} />
    </Column>
  );
};

export { Home };
