import React, { Children, useCallback, useEffect, useState } from "react"
import styles from './Modal.module.css'
import { Typography, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalElement = document.getElementById('modal');

function Modal({children, onClose, isModalOpen}) {

    useEffect(() => {
        const handleEscapePress = (event) => {
          if (event.key === 'Escape' && isModalOpen) {
            onClose();
          }
        };
     
        window.addEventListener('keydown', handleEscapePress);
     
        return () => {
          window.removeEventListener('keydown', handleEscapePress);
        };
      }, [isModalOpen, onClose]);

    if (!isModalOpen) {
      return null;
    }
    
    return createPortal(
        (
          <div>
            <div className={styles.window}>
                <div className={styles.close} onClick={onClose}>
                    <CloseIcon type="primary" />
                </div>   
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onClose}/>
          </div>  
        ),
        modalElement
    )
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node,
    isModalOpen: PropTypes.bool,
  }; 

export default Modal;