import React from 'react';
import { Column} from "ui/Layout";
import { VideoBlock } from "./components/VIdeoBlock";
import { InfoBlock } from "./components/InfoBlock";
import { GuildRating } from "./components/GuildRating";
import { ProBlock } from "./components/ProBlock";
import { ProductsBlock } from "./components/ProductsBlock";
import { Comics } from "./components/Comics";

class Home extends React.Component {
    render() {
        return (
            <Column>
                <VideoBlock />
                <InfoBlock />
                <Comics />
                <GuildRating />
                <ProBlock />
                <ProductsBlock />
            </Column>
        )
    }
}

export { Home };
