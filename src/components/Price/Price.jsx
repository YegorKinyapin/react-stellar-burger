import React, { useEffect } from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";

function Price() {
    const ingr = useSelector(state => state.burgerConstructor.constructorElement);
    const buns = useSelector(state => state.burgerConstructor.bun);

    const Sum = () => {
        const summ = ingr.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
        return summ + (buns ? buns.price * 2 : 0);
    }

    return(
        <div>
            <span className="text text_type_digits-medium">{Sum()}</span>
        </div>
    )
}

export default Price;