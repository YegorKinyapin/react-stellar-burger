import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./Forgot-password.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgot } from "../utils/api";

function ForgotPassword() {
  const resultTrue = useSelector((state) => state.user.forgotSuccess);
  const [emailValue, setEmailValue] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const onClickButton = (e) => {
    e.preventDefault();
    dispatch(forgot(emailValue));
  };

  if (resultTrue) {
    return (
      <Navigate to="/reset-password" state={{ back: "forgot-password" }} />
    );
  }

  return (
    <div className={styles.block}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <form onSubmit={onClickButton} className={styles.form}>
        <div className={styles.input_block}>
          <EmailInput
            onChange={onChangeEmail}
            value={emailValue}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
            required
          />
        </div>
        <Button
          // onClick={onClickButton}
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link className={styles.login} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
export default ForgotPassword;
