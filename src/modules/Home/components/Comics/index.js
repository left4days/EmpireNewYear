import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { Column, Row } from "ui/Layout";
import axe from "statics/comics/axe.png";
import bg from "statics/comics/background.png";
import meepo from "statics/comics/meepo.png";
import mipo from "statics/comics/mipo.png";
import aksSay from "statics/comics/ask_say.png";
import meepoSay from "statics/comics/meepo_say.png";
import { SmokeWidget } from "widgets/Smoke";
import { Light } from "widgets/Light";
import "./style.scss";

const Comics = () => {
  return (
    <Column className="comics">
      {/*<SmokeWidget />*/}
      <Light />
      <ScrollAnimation animateIn="comics_animate" animateOnce={true}>
        <Column className="comics__container">
          <img src={bg} alt="comics-bg" className="comics__bg" />
          <img src={axe} alt="comics-axe" className="comics__axe" />
          <img src={aksSay} alt="comics-axe-say" className="comics__axe_say" />
          <img src={meepo} alt="comics-meepo" className="comics__meepo" />
          <img src={mipo} alt="comics-mipo" className="comics__mipo" />
          <img
            src={meepoSay}
            alt="comics-meepo-say"
            className="comics__mipo_say"
          />
        </Column>
      </ScrollAnimation>
    </Column>
  );
};

export { Comics };
