import React, { useEffect, useMemo, useState } from "react";
import Price from "../Price/Price";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from './BurgerOrder.module.css';
import { addConstructoSelector, bunConstructorSelector } from "../../services/selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectShowOrder, sendOrder, setShowOrder } from "../../services/reducers/orderSlice";
import { getOrderNumber } from "../../utils/api";

function BurgerOrder() {
    const [orderNumber, setOrderNumber] = useState(null);
    const [message, setMessage] = useState('');
    const notBunsCart = useSelector(addConstructoSelector);
    const bunsCart = useSelector(bunConstructorSelector);
    const isShowOrder = useSelector(selectShowOrder)
    const dispatch = useDispatch();

    const orderData = useMemo(
        () => ({
            ingredients: []
                .concat(bunsCart?._id)
                .concat(notBunsCart?.map(({ _id }) => _id))
                .concat(bunsCart?._id),
        }),
        [bunsCart, notBunsCart]
    );


    const handleSubmitOrder = () => {
        if (
          bunsCart ||
          (notBunsCart && bunsCart.length > 0) ||
          notBunsCart.length > 0
        ) {
          dispatch(setShowOrder());
    
          dispatch(sendOrder(orderData))
            .unwrap()
            .then((data) => {
              setOrderNumber(data);
            })
            .catch((err) => {
              setOrderNumber(` ошибка - ${err}`);
            })
            .finally(() => console.log("data api ops finished!"));
        }
      };

    return(
        <div>
            <div className={`${styles.info} mt-10`}>
                <div className={styles.price}>
                    <Price />
                    <CurrencyIcon type="primary"/>
                </div>
                <Button 
                onClick={handleSubmitOrder}
                htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            {
                isShowOrder && Boolean(orderNumber?.order.number) &&
                <Modal title="&nbsp;" isModalOpen={isShowOrder} onClose={() => dispatch(setShowOrder())}>
                    <OrderDetails number={orderNumber.order.number} message={message}/>
                </Modal>

            }
        </div>    
    )
}

export default BurgerOrder;