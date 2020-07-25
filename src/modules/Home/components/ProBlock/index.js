import React from 'react';
import { Column, Row } from "ui/Layout";
import { Title } from "ui/Title";
import { Description } from "ui/Description";
import firecudaLogo from 'statics/firecude_col.svg';
import empireSmallLogo from 'statics/empireSmallLogo.png';
import seagateLogo from 'statics/seagate_logo.png';
import './style.scss';

const ProBlock = () => {
    return (
        <Column className="pro">
            <Column className="pro__container">
                <Column className="pro__text">
                    <img className="pro__logo" src={firecudaLogo} alt="firecuda-logo"/>
                    <Title>Играй как PRO*</Title>
                    <Description>Загрузка быстрее. Доминация сильнее.</Description>
                </Column>
                <Row className="pro__footer">
                    <Row ai="center">
                        <img src={seagateLogo} alt="seagate-logo"/>
                        <img src={empireSmallLogo} alt="empire-small-logo"/>
                    </Row>
                    <Description>* профессионал</Description>
                </Row>
            </Column>
        </Column>
    )
};

export { ProBlock };
