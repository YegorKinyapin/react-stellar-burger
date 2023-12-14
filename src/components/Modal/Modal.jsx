import React, { Children, useState } from "react"
import styles from './Modal.module.css'
import { Typography, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

const modalElement = document.getElementById('modal');

function Modal({children, onClose}) {
    
    return createPortal(
        (
            <div className={styles.window}>
                <button className={styles.close}
                onClick={() => onClose()}>
                    <CloseIcon type="primary" />
                </button>   
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        ),
        modalElement
    )
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node
  }; 

export default Modal;