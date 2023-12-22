import React from "react";
import styles from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";

function IngredientDetails() {
    
    const currentIngredient = useSelector(state => state.ingredientDetails.currentIngredient);

    return (
        <div className={styles.block}>
            <h3 className="text text_type_main-large mt-10 ml-10">
                Детали ингредиента
            </h3>
            <img src={currentIngredient.image_large} alt={currentIngredient.name}></img>
            <p className="text text_type_main-medium mt-4 mb-8">
                {currentIngredient.name}
            </p>
            <div className={styles.compound}>
                <div className={styles.compound_item}>
                <p className="text text_type_main-default text_color_inactive">
                    Калории,ккал
                </p>
                <span className="text text_type_digits-default text_color_inactive">
                    {currentIngredient.calories}
                </span>
                </div>
                <div className={styles.compound_item}>
                <p className="text text_type_main-default text_color_inactive">
                    Белки, г
                </p>
                <span className="text text_type_digits-default text_color_inactive">
                    {currentIngredient.proteins}
                </span>
                </div>
                <div className={styles.compound_item}>
                <p className="text text_type_main-default text_color_inactive">
                    Жиры, г
                </p>
                <span className="text text_type_digits-default text_color_inactive">
                    {currentIngredient.fat}
                </span>
                </div>
                <div className={styles.compound_item}>
                <p className="text text_type_main-default text_color_inactive">
                    Углеводы, г
                </p>
                <span className="text text_type_digits-default text_color_inactive">
                    {currentIngredient.carbohydrates}
                </span>
                </div>
            </div>
        </div>
  );
}

export default IngredientDetails;
