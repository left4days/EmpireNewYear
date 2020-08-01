import React from "react";
import { Column } from "ui/Layout";
import { VideoBlock } from "./components/VIdeoBlock";
import { InfoBlock } from "./components/InfoBlock";
import { GuildRating } from "./components/GuildRating";
import { ProBlock } from "./components/ProBlock";
import { ProductsBlock } from "./components/ProductsBlock";
import { Comics } from "./components/Comics";
import { GuildInput } from "./components/GuildInput";

class Home extends React.Component {
  render() {
    const { handleModal, user } = this.props;

    return (
      <Column>
        <VideoBlock />
        <InfoBlock />
        <GuildInput
          handleModal={handleModal}
          user={user}
        />
        <Comics />
        <GuildRating />
        <ProBlock />
        <ProductsBlock />
      </Column>
    );
  }
}

export { Home };
