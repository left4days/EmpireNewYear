import React from 'react';
import { Button } from 'ui/Button';
import { Row } from 'ui/Layout';
import { Loader } from 'ui/Loader';
import { HeaderAuthAuthorized } from './AuthorizedHeader';
import menuImage from 'statics/menu.svg';
import style from './style.scss';

function HeaderAuth({ handleModal, user, signOutUser }) {
    if (user === 'loading') {
        return (
            <Row jc="flex-end" ai="center">
                <Loader />
            </Row>
        );
    }
    if (user) {
        return <HeaderAuthAuthorized user={user} signOutUser={signOutUser} />;
    }
    return (
        <Row jc="flex-end" ai="center" className={style.header__mobile}>
            <Button size="s" style="fill" margin="right_x2" onClick={() => handleModal('login')}>
                Войти
            </Button>
            <Button size="l" onClick={() => handleModal('auth')}>
                Регистрация
            </Button>
            <button className={style.header__mobile_btn} onClick={() => handleModal('auth')}>
                <img src={menuImage} alt="menu"/>
            </button>
        </Row>
    );
}

export { HeaderAuth };
