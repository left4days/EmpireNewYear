import React from 'react';
import cx from 'classnames';
import { Column, Row } from "ui/Layout";
import { Title } from "ui/Title";
import { Description } from "ui/Description";
import correctImage from 'statics/correct.svg';
import Formsy from "formsy-react";
import { Input } from "widgets/fields";
import './style.scss';

const NoGuid = ({ valid, onSubmit, handleModal }) => {
    return (
        <Column className="guild__inner">
            <Title>Укажите свой тег гильдии для участия в основном розыгрыше</Title>
            <Column className="guild__widget">
                <Input
                    required
                    type="text"
                    id="guild"
                    placeholder="Тег гильдии"
                    name="guild"
                />
                <button onClick={() => onSubmit} className={cx('guild__button', valid && 'guild__button_valid')}>
                    <img src={correctImage} alt="correct"/>
                </button>
            </Column>
            <button onClick={() => handleModal('info')} className="guild__info">Как узнать тег гильдии?</button>
        </Column>
    )
};

const WithGuid = ({ guildName }) => {
    return (
        <Column className="guild__inner">
            <Title>Вы состоите в гильдии "{guildName}"</Title>
        </Column>
    )
};

class GuildInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            error: '',
        };

    }

    formRef = ref => (this.form = ref);

    onValid = () => {
        this.setState({ valid: true });
    };

    onInvalid = () => {
        this.setState({ valid: false });
    };

    onSubmit = () => {
        const model = this.form.getModel();
        console.log(model);
    };

    render() {
        const { isAuth, guildName, handleModal } = this.props;
        if(!isAuth) {
            return null;
        }
        return (
            <Column className="guild">
                <Column className="guild__container">
                    <Formsy
                        onValidSubmit={this.onSubmit}
                        ref={this.formRef}
                        onValid={this.onValid}
                        onInvalid={this.onInvalid}
                    >
                        {!guildName ? <NoGuid valid={this.state.valid} onSubmit={this.onSubmit} handleModal={handleModal} /> : <WithGuid guildName={guildName} />}
                    </Formsy>
                </Column>
            </Column>
        )
    }
};

export { GuildInput };
