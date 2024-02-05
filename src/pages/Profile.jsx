import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, update } from "../utils/api";
import { userNameValue } from "../services/selectors/selectors";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNameValue = useSelector((state) => state.user.user.name);
  const userEmailValue = useSelector((state) => state.user.user.email);

  const [nameValue, setNameValue] = useState(userNameValue);
  const [emailValue, setEmailValue] = useState(userEmailValue);
  const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setNameValue(userNameValue);
    setEmailValue(userEmailValue);
    setPasswordValue("");
  }, [userNameValue, userEmailValue]);

  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const logoutButtonClick = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => {
      navigate("/login");
   });
    console.log('нажалось');
  };

  const updateForm = (e) => {
    e.preventDefault();
    dispatch(update(nameValue, emailValue, passwordValue))
      .then(() => {
      dispatch(getUser());
      })
      .then(() => {
      setNameValue(userNameValue);
      setEmailValue(userEmailValue);
      setPasswordValue("");
      })
  };

  const clearClick = () => {
    setNameValue(userNameValue);
    setEmailValue(userEmailValue);
    setPasswordValue("");
  };

  const isActiveClass = ({ isActive }) =>
    `${styles.link} ${!isActive ? styles.inactive : ""}`;
  const linkClass = isActiveClass({ isActive: true });

  return (
    <div className={`pl-6 ${styles.profile}`}>
      <div className={styles.link_block}>
        <NavLink
          to="/profile"
          className={`text text_type_main-medium ${styles.link}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`text text_type_main-medium text_color_inactive ${styles.link_inactive}`}
        >
          История заказов
        </NavLink>
        {/* <NavLink
          to={'/login'}
          className={`text text_type_main-medium text_color_inactive ${styles.link_inactive}`}
          onClick={logoutButtonClick}
        >
          Выход
        </NavLink> */}
        <NavLink to="/login" className={linkClass}>
          <p
            onClick={logoutButtonClick}
            className="text text_type_main-medium mt-5 mb-4"
          >
            Выход
          </p>
        </NavLink>

        <div className="mt-15">
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            В этом разделе вы можете
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            изменить свои персональные данные
          </p>
        </div>
      </div>
      <form onSubmit={updateForm} className={styles.input_block}>
        <Input
          type="text"
          onChange={onChangeName}
          value={nameValue}
          // name={"name"}
          placeholder="Имя"
          // isIcon={true}
          extraClass="mb-2"
          icon={"EditIcon"}
          onBlur
        />
        <EmailInput
          onChange={onChangeEmail}
          value={emailValue}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-2"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={passwordValue}
          name={"password"}
          icon="EditIcon"
        />
        <div className={styles.buttons}>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Сохранить
          </Button>
          <Button
            onClick={clearClick}
            htmlType="reset"
            type="primary"
            size="medium"
            extraClass="ml-2"
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
export default Profile;
