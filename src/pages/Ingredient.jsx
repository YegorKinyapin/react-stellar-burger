import React, { useEffect, useState } from "react";
import styles from "./Ingredient.module.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { getIngrSelector } from "../services/selectors/selectors";

function IngredientPage() {
  const { id } = useParams();
  console.log(id);

  const ingredients = useSelector(getIngrSelector);
  console.log(ingredients);
  if (ingredients === null || ingredients===undefined) {
    return null;
}
if (!ingredients || !ingredients.data) {
  return null;
 }
 const el = ingredients.data.filter(item => item._id === id && item.image_large);
 console.log(el[0])
 const currentIngredient = el[0];

  return (
    <div className={styles.container}>
      {el && (
        <>
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
        </>
      )}
    </div>
  );
}


export default IngredientPage;
