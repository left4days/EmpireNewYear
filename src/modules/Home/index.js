import React, { useRef } from "react";
import { Column } from "ui/Layout";
import { VideoBlock } from "./components/VIdeoBlock";
import { PromoInput } from "./components/PromoInput";
import { GuildRating } from "./components/GuildRating";
import { ProBlock } from "./components/ProBlock";
import { ProductsBlock } from "./components/ProductsBlock";
import { Comics } from "./components/Comics";
import { GuildInput } from "./components/GuildInput";
import "./style.scss";

const Home = ({ user }) => {

  return (
    <Column className="home">
      <PromoInput user={user} />
      <VideoBlock />
      <GuildInput user={user}/>
      <Comics />
      <GuildRating />
      <ProBlock />
      <ProductsBlock />
    </Column>
  );
};

export { Home };
