import React from 'react';
import { Column, Row } from "ui/Layout";
import './style.scss';

const config = ['guild1', 'guild2', 'guild3'];

const RowItem = ({ index, name }) => {
    return (
        <Row className="table__row">
            <p className="table__number">#{index}</p>
            <p className="table__name">{name}</p>
        </Row>
    )
};

const Table = () => {
    return (
        <Column className="table">
            {config.map((name, i) => <RowItem key={i} index={++i} name={name} />)}
        </Column>
    )
};

export { Table };