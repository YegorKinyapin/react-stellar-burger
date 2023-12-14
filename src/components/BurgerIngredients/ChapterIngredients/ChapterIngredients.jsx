import React, { Children, useEffect, useState } from "react";
import styles from './ChapterIngredients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../../Modal/Modal";
import ModalOverlay from "../../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';

function ChapterIngredients(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onOpen = () => {
        setIsModalOpen(true);
    }
    const onClose = () => {
        setIsModalOpen(false);
    }
    useEffect(() => {
        const handleEscapePress = (event) => {
          if (event.key === 'Escape' && isModalOpen) {
            onClose();
          }
        };
     
        window.addEventListener('keydown', handleEscapePress);
     
        return () => {
          window.removeEventListener('keydown', handleEscapePress);
        };
      }, [isModalOpen, onClose]);

    let ingr = Object.values(props)[2];
    const elements = ingr.data.map(item => {
        if (props.type===item.type) {
            return (
                <li onClick={onOpen} key={item._id} className={styles.list}>
                    <Counter count={1} size="default" extraClass="m-1" />
                    <img src={item.image} alt="ddd"></img>
                    <div className={`${styles.price_block} pb-1 pt-1`}>
                        <span className="text_type_digits-default">
                            {item.price}
                        </span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
                    {
                        isModalOpen && 
                        <div>
                            <Modal onClose={onClose}>
                                <h3 className="text text_type_main-large mt-10 ml-10">
                                    Детали ингредиента
                                </h3>
                                <img src={item.image} alt="ddd"></img>
                                <p className="text text_type_main-medium mt-4 mb-8">
                                    {item.name}
                                </p>
                                <div className={styles.compound}>
                                    <div className={styles.compound_item}>
                                        <p className="text text_type_main-default text_color_inactive">
                                            Калории,ккал
                                        </p>
                                        <span className="text text_type_digits-default text_color_inactive">
                                            {item.calories}
                                        </span>
                                    </div>
                                    <div className={styles.compound_item}>
                                        <p className="text text_type_main-default text_color_inactive">
                                            Белки, г
                                        </p>
                                        <span className="text text_type_digits-default text_color_inactive">
                                            {item.proteins}
                                        </span>
                                    </div>
                                    <div className={styles.compound_item}>
                                        <p className="text text_type_main-default text_color_inactive">
                                            Жиры, г
                                        </p>
                                        <span className="text text_type_digits-default text_color_inactive">
                                            {item.fat}
                                        </span>
                                    </div>
                                    <div className={styles.compound_item}>
                                        <p className="text text_type_main-default text_color_inactive">
                                            Углеводы, г
                                        </p>
                                        <span className="text text_type_digits-default text_color_inactive">
                                            {item.carbohydrates}
                                        </span>
                                    </div>
                                </div>
                            </Modal>
                            <ModalOverlay onClose={onClose}/>
                        </div>
                    }
                </li>
                
            )
        }
    });

    return (
        <div>
            <h3 className="text text_type_main-medium mb-6">{props.header}</h3>
            <ul className={`${styles.block} mb-10`}>{elements}</ul>
            
        </div>
    )
}

ChapterIngredients.propType = {
    data: PropTypes.object,
    header: PropTypes.string
  }; 

export default ChapterIngredients;