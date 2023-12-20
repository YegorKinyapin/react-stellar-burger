import React, { useEffect, useMemo, useState } from "react";
import Price from "../Price/Price";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from './BurgerOrder.module.css';
import { addConstructoSelector, bunConstructorSelector } from "../../services/selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectShowOrder, setShowOrder } from "../../services/reducers/orderSlice";
import { getOrderNumber } from "../../utils/api";

function BurgerOrder() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [message, setMessage] = useState('');
    const notBunsCart = useSelector(addConstructoSelector);
    const bunsCart = useSelector(bunConstructorSelector);
    const isShowOrder = useSelector(selectShowOrder)
    const dispatch = useDispatch();
    console.log(bunsCart)

    const orderData = useMemo(
        () => ({
            ingredients: []
                .concat(bunsCart?._id)
                .concat(notBunsCart?.map(({ _id }) => _id))
                .concat(bunsCart?._id),
        }),
        [bunsCart, notBunsCart]
    );

    useEffect(() => {
        if (isShowOrder || isShowOrder?.payload) {
            getOrderNumber(orderData)
                .then((data) => {
                    setOrderNumber(data)
                })
                .then(
                    setMessage(`идентификатор заказа
             Ваш заказ начали готовить
             Дождитесь готовности на орбитальной станции
             Cумма к оплате:`)
                )
                .catch((err) => {
                    setOrderNumber(`  ошибка  - ${err}`).then(setMessage('извините, ошибка'))
                })

                .finally(console.log('data api ops finished!'))
        }
        return () => {}
    }, [orderData, message])

    return(
        <div>
            <div className={`${styles.info} mt-10`}>
                <div className={styles.price}>
                    <Price />
                    <CurrencyIcon type="primary"/>
                </div>
                <Button 
                onClick={() => {
                    if (bunsCart || notBunsCart && (bunsCart.length > 0 || notBunsCart.length > 0)) {
                        dispatch(setShowOrder())
                        setMessage('Приступили к работе ...')
                    }
                }} 
                htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            {
                isShowOrder && Boolean(orderNumber?.order.number) &&
                <div>
                    <Modal title="&nbsp;" isModalOpen={isShowOrder} onClose={() => dispatch(setShowOrder())}>
                        <OrderDetails number={orderNumber.order.number} message={message}/>
                    </Modal>
                </div> 
            }
        </div>    
    )
}

export default BurgerOrder;