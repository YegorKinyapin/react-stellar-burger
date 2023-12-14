import React, { Children, useEffect, useState } from "react";
import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import done from '../../images/done.png';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
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
     
    let ingr = Object.values(props.data)[1];
    console.log(ingr)
    const filterdData = ingr.filter(item => {
        return item.type!=='bun'
    });

    const elements = filterdData.map(item => {
        return (
            <li key={item._id}>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />
            </li>
        )
    })
    
    return (
        <section className="pt-25">
            <div style={{ display: 'flex', flexDirection: 'column', 
            gap: '16px', paddingLeft: '48px' }}>
                
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/meat-03.png'
                />
                <ul className={`${styles.custom_scroll} ${styles.ingredients}`}>{elements}</ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/meat-03.png'
                />

            </div>
            <div className={`${styles.info} mt-10`}>
                <div className={styles.price}>
                    <span className="text text_type_digits-medium">345</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={onOpen} htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            {
            isModalOpen &&
            <div>
                <Modal onClose={onClose}>
                    <h3 className="text text_type_digits-large mt-30 mb-8">034536</h3>
                    <p className="text text_type_main-medium mb-15">
                        идентификатор заказа
                    </p>
                    <img src={done} alt="Галочка" className="mb-15"></img>
                    <p className="text text_type_main-default">
                        Ваш заказ начали готовить
                    </p>
                    <p className="text text_type_main-default text_color_inactive mb-30">
                        Дождитесь готовности из орбитальной станции
                    </p>
                </Modal>
                <ModalOverlay onClose={onClose}/>
            </div> 
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.object
  }; 

export default BurgerConstructor;