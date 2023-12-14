import React from "react"
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ChapterIngredients from "./ChapterIngredients/ChapterIngredients";
import PropTypes from 'prop-types';

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('Булки');
    return (
        <section>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <nav style={{ display: 'flex' }} className="mb-10">
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <div className={`${styles.custom_scroll} ${styles.block}`}>
                <ChapterIngredients 
                header='Булки' 
                type='bun'
                data={props.data} 
                />
                <ChapterIngredients 
                header='Соусы' 
                type='sauce'
                data={props.data} 
                />
                <ChapterIngredients 
                header='Начинки' 
                type='main' 
                data={props.data}
                />
            </div>
            
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.object
  }; 

export default BurgerIngredients;