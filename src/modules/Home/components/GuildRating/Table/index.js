import React from 'react';
import { Column, Row } from "ui/Layout";
import './style.scss';

const Table = (props) => {
    const { data = [] } = props;
    return (
        <Column className="table">
            {data.map(({ idx, name }) => <RowItem key={idx} idx={idx} name={name} />)}
        </Column>
    )
};

const RowItem = ({ idx, name }) => {
    return (
        <Row className="table__row">
            <p className="table__number">#{idx}</p>
            <Row ai="center">
                <p className="table__name">{name}</p>
            </Row>
        </Row>
    )
};

export { Table };