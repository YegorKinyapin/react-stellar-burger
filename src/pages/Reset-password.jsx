import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import styles from "./Register.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../utils/api";

function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate  ();

  useEffect(() => {
    if (!location?.state?.back) {
      navigate("/forgot-password");
    }
  }, [location]);

  const resultTrue = useSelector((state) => state.user.changePasswordRequest);

  const [passwordValue, setPasswordValue] = React.useState("");
  const [codeValue, setCodeValue] = React.useState("");

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const onChangeCode = (e) => {
    setCodeValue(e.target.value);
  };

  const onClickButton = (e) => {
    e.preventDefault();
    dispatch(reset(passwordValue, codeValue))
      // .then(() => {
      //   if (resultTrue) {
      //     return navigate('/login')
      //   };
      // })
    setPasswordValue("");
    setCodeValue("");
  };

  // if (resultTrue) {
  //   return <Navigate to="/login" />;
  // };

  return (
    <div className={styles.block}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <div className={styles.input_block}>
        <PasswordInput
          onChange={onChangePassword}
          value={passwordValue}
          name={"password"}
          extraClass="mb-2"
          placeholder={"Введите новый пароль"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChangeCode}
          value={codeValue}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
        />
      </div>
      <Button
        onClick={onClickButton}
        htmlType="button"
        type="primary"
        size="large"
        extraClass="mb-20"
      >
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link className={styles.login} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
export default ResetPassword;
