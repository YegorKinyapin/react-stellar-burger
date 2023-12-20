import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
// import { useEffect, useState } from "react";
// import { getIngredients } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
// import { getIngrSelector, isLoadingSelector } from "../../services/selectors/selectors";
// import { fetchIngredients } from "../../services/reducers/ingrSlice";
import data from '../../utils/data';
import { addConstructoSelector } from "../../services/selectors/selectors";
import Price from "../Price/Price";



function App() {

  return (
    <div>
      <div className={styles.app}>
        <AppHeader/>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
    </div>  
  );
}

export default App;


