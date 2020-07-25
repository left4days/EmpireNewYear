import React from 'react';
import { Column, Row } from "ui/Layout";
import { Title } from "ui/Title";
import buy1 from 'statics/buy1.png';
import buy2 from 'statics/buy2.png';
import buy3 from 'statics/buy3.png';
import buy4 from 'statics/buy4.png';
import buy5 from 'statics/buy5.png';
import buy6 from 'statics/buy6.png';
import './style.scss';

const config = [
    {
        title: "Купить в России",
        data: [
            {
                src: buy1,
                link: '#',
            },
            {
                src: buy2,
                link: '#',
            },
            {
                src: buy3,
                link: '#',
            },
            {
                src: buy4,
                link: '#',
            },
        ]
    },
    {
        title: "Купить в Украине",
        data: [
            {
                src: buy5,
                link: '#',
            }
        ]
    },
    {
        title: "Купить в Беларуси",
        data: [
            {
                src: buy6,
                link: '#',
            },
        ]
    }
];

const BuyItem = ({ src, link }) => {
    return (
        <Column className="buy__item">
            <a href={link} className="buy__link">
                <img src={src} alt="buy-image"/>
            </a>
        </Column>
    )
};

const BuyBlock = () => {
    return (
        <Column className="buy">
            <Row jc="space-between">
                {config.map((item, i) => {
                    return (
                        <Column key={i} className="buy__column">
                            <Title>{item.title}</Title>
                            <Row className="buy__products">
                                {item.data.map((data, i) => <BuyItem key={i} src={data.src} link={data.link}/> )}
                            </Row>
                        </Column>
                    )}
                )}
            </Row>
        </Column>
    )
};

export { BuyBlock };