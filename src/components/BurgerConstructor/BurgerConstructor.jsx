import React, { Children, useEffect, useState } from "react";
import styles from './BurgerConstructor.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngr, setBun } from "../../services/reducers/constructorSlice";
import BunConstructor from "../BunConstructor/BunConstructor";
import InteriorConstructor from "../InteriorConstructor/InteriorConstructor";
import BurgerOrder from "../BurgerOrder/BurgerOrder";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const constructorBun = useSelector(state => state.burgerConstructor.bun);
    const constructorIngredients = useSelector(state => state.burgerConstructor.constructorElement);

    const [, drop] = useDrop({
        accept: 'INGREDIENT',
        drop: (item) => {
          if (item.ingredient && item.ingredient.type === 'bun') {
            dispatch(setBun(item.ingredient));
          } else if (item.ingredient) {
            dispatch(addIngr(item.ingredient))
          }
        },
     });
     
    
    return (
        <section className="pt-25">
            <div className={styles.block} ref={drop}>
                
                {constructorBun && (<BunConstructor
                    type="top"/>)}
                {
                    (<div className={styles.ingredients + ' custom-scroll'}>
                        {constructorIngredients.map((element, index) => (
                        <InteriorConstructor key={element.uuid} element={element} index={index}/>
                        ))}
                    </div>)
                 }
                {constructorBun && (<BunConstructor
                    type="bottom"/>)}
            </div>
            <BurgerOrder />
        </section>
    )
}

export default BurgerConstructor;