import React from 'react';
import cx from 'classnames';
import { Column } from 'ui/Layout';
import { Description } from 'ui/Description';
import './style.scss';

const InfoModal = () => {
    return (
        <Column className="info__modal">
            <Description>Тег гильдии можно узнать зайдя в игру (стрелка вниз) профиль гильдии (стрелка вниз) Вкладка “данные”, где указан тег гильдии.
                Также, когда вы играете, тег вашей гильдии указывается перед игровым именем.
            </Description>
        </Column>
    )
};

export { InfoModal };