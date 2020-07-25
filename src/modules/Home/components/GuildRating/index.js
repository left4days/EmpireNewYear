import React from 'react';
import { Column, Row } from 'ui/Layout';
import { Title } from 'ui/Title';
import { Table } from 'widgets/Table';
import mainImage from 'statics/main.png';
import './style.scss';

const GuildRating = () => {
    return (
        <Column className="rating">
            <Column className="rating__container">
                <img src={mainImage} alt="main-image" className="rating__image"/>
                <Title>Рейтинг гильдий</Title>
                <Table />
            </Column>
        </Column>
    )
};

export { GuildRating };