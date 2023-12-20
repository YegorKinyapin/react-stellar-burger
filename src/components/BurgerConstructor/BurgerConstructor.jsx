import React, { Children, useEffect, useState } from "react";
import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { addConstructoSelector } from "../../services/selectors/selectors";
import { useDrop } from "react-dnd";
import { addIngr, setBun } from "../../services/reducers/constructorSlice";
import BunConstructor from "../BunConstructor/BunConstructor";
import InteriorConstructor from "../InteriorConstructor/InteriorConstructor";
import Price from "../Price/Price";

function BurgerConstructor() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addElement = useSelector(addConstructoSelector);
    const dispatch = useDispatch();
    const constructorBun = useSelector(state => state.burgerConstructor.bun);
    const constructorIngredients = useSelector(state => state.burgerConstructor.constructorElement);
    // const orderNumber = useSelector((state) => state.orderDetails.order.number);

    const [, drop] = useDrop({
        accept: 'INGREDIENT',
        drop: (item) => {
            console.log(item.ingredient)
          if (item.ingredient && item.ingredient.type === 'bun') {
            dispatch(setBun(item.ingredient));
          } else if (item.ingredient) {
            dispatch(addIngr(item.ingredient))
          }
        },
     });

    const onOpen = () => {
        setIsModalOpen(true);
    }
    const onClose = () => {
        setIsModalOpen(false);
    }
     
    const filterdData = addElement.filter(item => {
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
            <div className={styles.block} ref={drop}>
                
                {constructorBun && (<BunConstructor
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                />)}
                {
                    (<div className={styles.ingredients + ' custom-scroll'}>
                        {constructorIngredients.map((element, index) => (
                        <InteriorConstructor key={element.uuid} element={element} index={index}/>
                        ))}
                    </div>)
                 }
                {constructorBun && (<BunConstructor
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                />)}

            </div>
            <div className={`${styles.info} mt-10`}>
                <div className={styles.price}>
                    <Price />
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={onOpen} htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            {
            isModalOpen &&
            <div>
                <Modal isModalOpen={isModalOpen} onClose={onClose}>
                    <OrderDetails />
                </Modal>
            </div> 
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.object
  }; 

export default BurgerConstructor;