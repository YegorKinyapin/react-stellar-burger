import {
    Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { register } from "../utils/api";
import { useDispatch } from "react-redux";
// import { registrationSuccess } from "../services/reducers/userReducer";

function Register() {
  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [nameValue, setNameValue] = React.useState("");

  const dispatch = useDispatch();

  const onChangePassword = (e) => {
    setPasswordValue(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const onChangeName = (e) => {
    setNameValue(e.target.value);
  };

  const onClickButton = (e) => {
    e.preventDefault();

    const data = {
      email: emailValue,
      password: passwordValue,
      name: nameValue
    }
    dispatch(register(data));

    setPasswordValue('');
    setEmailValue('');
    setNameValue('');
  }

  return (
    <div className={styles.block}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <form onSubmit={onClickButton} className={styles.input_block}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChangeName}
          value={nameValue}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
        />
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
        <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
        Зарегистрироваться
      </Button>
      </form>
      {/* <Button htmlType="submit" type="primary" size="large" extraClass="mb-20">
        Зарегистрироваться
      </Button> */}
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link className={styles.login} to='/login'>Войти</Link></p>
    </div>
  );
}
export default Register;


// fetch('https://norma.nomoreparties.space/api/auth/register', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     email: 'test-data@yandex.ru', 
//     password: "password", 
//     name: "Username" 
//   }),
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.error('Error:', err));