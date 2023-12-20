import React, { Children, useEffect, useState } from "react";
import styles from './IngredientItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { countSelector } from "../../services/selectors/selectors";

function IngredientItem(props) {
    const { onClick } = props;
    // const count = useSelector(countSelector(props))

    // console.log(count)

    const [, drag] = useDrag({
        type: 'INGREDIENT',
        item: props,
        collect: (monitor) => ({
          isDragging: monitor.isDragging()
        })
      })

    return (
        <div ref={drag}
        draggable 
        onClick={onClick} 
        key={props.ingredient._id} 
        className={styles.list}>
                    <Counter count={props.count} size="default" extraClass="m-1" />
                    <img src={props.ingredient.image} alt={props.ingredient.name}></img>
                    <div className={`${styles.price_block} pb-1 pt-1`}>
                        <span className="text_type_digits-default">
                            {props.ingredient.price}
                        </span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <p className={`${styles.name} text text_type_main-default`}>{props.ingredient.name}</p>
        </div>
    )
}

export default IngredientItem;