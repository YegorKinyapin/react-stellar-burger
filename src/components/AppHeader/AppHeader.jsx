import React from "react"
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import { Link, Outlet } from "react-router-dom";

function AppHeader() {
    return (
        <header className={styles.block}>
            <div className={styles.construc}>
                <Link to={'/'} className={styles.element}>
                    <BurgerIcon type="primary" />
                    <p type="primary" className={`text text_type_main-default ${styles.text}`}>Конструктор</p>
                </Link>
                <Link to={'/orders'} className={styles.element}>
                    <ListIcon type="secondary" />
                    <p type="secondary" className={`text text_type_main-default ${'type'==='primary' ? '' : 'text_color_inactive'} ${styles.link}`}>Лента заказов</p>
                </Link>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div href="#" className={styles.element}>
                <ProfileIcon type="secondary" />
                <Link to='/profile' type="secondary" className={`text text_type_main-default ${'type'==='primary' ? '' : 'text_color_inactive'} ${styles.link}`}>Личный кабинет</Link>
            </div>
        <Outlet />
        </header>
    )
}
export default AppHeader;
