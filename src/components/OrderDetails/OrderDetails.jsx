import React from "react";
import styles from './OrderDetails.module.css';
import done from '../../images/done.png';
import PropTypes from "prop-types";


function OrderDetails({ number }) {

    return (
        <div className={styles.order}>
            <h3 className="text text_type_digits-large mt-30 mb-8">{number}</h3>
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
        </div>
    )
}

OrderDetails.propTypes = {
    number: PropTypes.number,
}

export default OrderDetails;