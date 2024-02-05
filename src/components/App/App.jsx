import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/Forgot-password";
import ResetPassword from "../../pages/Reset-password";
import Profile from "../../pages/Profile";
import IngredientItem from "../IngredientItem/IngredientItem";
import IngredientPage from "../../pages/Ingredient";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import { checkUserAuth } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/reducers/ingrSlice";
import Modal from "../Modal/Modal";
import ingrDetailsSlice, { openIngr } from "../../services/reducers/ingrDetailsSlice";
import { getIngrSelector } from "../../services/selectors/selectors";
import NotFound from "../../pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const background = location.state && location.state?.background;

  const navigate = useNavigate();

  const closeIngr = () => {
    dispatch(ingrDetailsSlice());
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  useEffect(() => {
    if (background) {
       openIngr();
    }
   }, [background]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route  path="/" element={<OnlyAuth component={<Home />} />} />
        <Route path="login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="forgot-password" element={<OnlyUnAuth component={<ForgotPassword />}/>} />
        <Route path="reset-password"element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="profile" element={<OnlyAuth component={<Profile />}/>} />
        <Route path="ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeIngr}>
                <IngredientPage  />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
