import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Column, Row } from 'ui/Layout';
import axe from 'statics/comics/axe.png';
import bg from 'statics/comics/background.png';
import meepo from 'statics/comics/meepo.png';
import mipo from 'statics/comics/mipo.png';
import { LightningWidget } from "widgets/Lightning";
import { SmokeWidget } from "widgets/Smoke";
import './style.scss';


const Comics = () => {
    return (
        <Column className="comics">
            <LightningWidget />
            <SmokeWidget />
            <ScrollAnimation animateIn="comics_animate" animateOnce={true}>
                <Column className="comics__container">
                        <img src={bg} alt="comics-bg" className="comics__bg"/>
                        <img src={axe} alt="comics-axe" className="comics__axe"/>
                        <img src={meepo} alt="comics-meepo" className="comics__meepo"/>
                        <img src={mipo} alt="comics-mipo" className="comics__mipo"/>
                </Column>
            </ScrollAnimation>
        </Column>
    )
};

export { Comics };