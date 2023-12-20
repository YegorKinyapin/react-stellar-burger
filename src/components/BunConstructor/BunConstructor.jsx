import React from 'react';
import styles from "./BunConstructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function BunConstructor({extraClass, type}) {
  const bun = useSelector(state => state.burgerConstructor.bun)

  return (
    <div className={styles.block}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
    </div>
  );
}

BunConstructor.propTypes = {
  extraClass: PropTypes.string,
  type: PropTypes.string.isRequired
}
export default BunConstructor;
