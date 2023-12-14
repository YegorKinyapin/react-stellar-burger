import React from "react"
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

function AppHeader() {
    return (
        <header className={styles.block}>
            <div className={styles.construc}>
                <a href="#" className={styles.element}>
                    <BurgerIcon type="primary" />
                    <p type="primary" className={`text text_type_main-default ${styles.text}`}>Конструктор</p>
                </a>
                <a href="#" className={styles.element}>
                    <ListIcon type="secondary" />
                    <p type="secondary" className={`text text_type_main-default ${'type'==='primary' ? '' : 'text_color_inactive'}`}>Лента заказов</p>
                </a>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <a href="#" className={styles.element}>
                <ProfileIcon type="secondary" />
                <p type="secondary" className={`text text_type_main-default ${'type'==='primary' ? '' : 'text_color_inactive'}`}>Личный кабинет</p>
            </a>
        </header>
    )
}
export default AppHeader;
