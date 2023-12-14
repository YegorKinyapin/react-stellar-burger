import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/api";
import Modal from "../Modal/Modal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";


function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredients(data);
        setLoading(false);
      }) 
      .catch((error) => {
        console.log(error);
        setLoading(false);

      });
  }, []);
  
  if (ingredients === null || ingredients===undefined) {
    return null;
   }

   if (loading) {
    return <div>Loading...</div>;
   }

  console.log(ingredients);

  return (
    <div>
      <div className={styles.app}>
        <AppHeader/>
        <main className={styles.main}>
          <BurgerIngredients data={ingredients}/>
          <BurgerConstructor data={ingredients}/>
        </main>
      </div>
    </div>  
  );
}

export default App;