import {
  Button,
EmailInput,
Input,
PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../utils/api";

function Login() {
const [passwordValue, setPasswordValue] = React.useState("");
const [emailValue, setEmailValue] = React.useState("");
const dispatch = useDispatch();

const onChangePassword = (e) => {
  setPasswordValue(e.target.value);
};
const onChangeEmail = (e) => {
  setEmailValue(e.target.value);
};

const onClickButton = (e) => {
  e.preventDefault();
  dispatch(login(emailValue, passwordValue));
  setPasswordValue('');
  setEmailValue('');
}

return (
  <div className={styles.block}>
    <h2 className="text text_type_main-medium">Вход</h2>
    <div className={styles.input_block}>
      <EmailInput
        onChange={onChangeEmail}
        value={emailValue}
        name={"email"}
        isIcon={false}
      />
      <PasswordInput
        onChange={onChangePassword}
        value={passwordValue}
        name={"password"}
        extraClass="mb-2"
      />
    </div>
    <Button onClick={onClickButton} htmlType="button" type="primary" size="large" extraClass="mb-20">
      Войти
    </Button>
    <p className="text text_type_main-default text_color_inactive">Вы новый пользователь? 
      <Link className={styles.login} to='/register'>
         Зарегистрироваться
      </Link>
    </p>
    <p className="text text_type_main-default text_color_inactive">Забыли пароль? 
      <Link className={styles.login} to='/forgot-password'>
         Восстановиь пароль
      </Link>
    </p>
  </div>
);
}
export default Login;