import React from "react";
import axios from "axios";
import { Column } from "ui/Layout";
import { Title } from "ui/Title";
import mainImage from "statics/main.png";
import { Table } from './Table';

import "./style.scss";

export class GuildRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guilds: []
    };
  }
  componentDidMount() {
    axios.get("/api/v1/guilds/top/10").then(res => {
      this.setState({ guilds: res.data.data });
    });
  }

  render() {
    const { guilds } = this.state;

    return (
      <Column className="rating">
        <Column className="rating__container">
          <img src={mainImage} alt="main-image" className="rating__image" />
          <Title>Рейтинг гильдий</Title>
          <Table data={guilds} />
        </Column>
      </Column>
    );
  }
}
