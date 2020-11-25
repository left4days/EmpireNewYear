import React from 'react';
import Modal from "react-modal";
import {customStyles} from "../Form";
import { Column } from "ui/Layout";
import { Description } from "ui/Description";
import { Title } from "ui/Title";
import "./style.scss";
import {Link} from "react-router-dom";

const PromoModal = () => {
    return (
        <Column className="promo__modal">
            <Title>Условия участия</Title>
            <Description>
                Тег гильдии можно узнать зайдя в игру (стрелка вниз) профиль гильдии
                (стрелка вниз) Вкладка “данные”, где указан тег гильдии. Также, когда вы
                играете, тег вашей гильдии указывается перед игровым именем.
            </Description>
        </Column>
    );
};

class PromoInfo extends React.Component {
    state = { isModalOpen: false };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleModal = () => {
        this.setState({ isModalOpen: true });
    };

    render() {
        const { isModalOpen } = this.state;
        return (
            <div className="rules">
                <Link to="/terms">ⓘ Условия участия</Link>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={this.handleCloseModal}
                    style={customStyles}
                    contentLabel="Title"
                >
                    <PromoModal />
                </Modal>
            </div>
        )
    }
}

export  { PromoInfo };