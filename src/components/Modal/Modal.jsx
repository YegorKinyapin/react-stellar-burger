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
      const onOverlayClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
      }
      const onClicking = (e) => {
        if (e.target === e.currentTarget) {
          onClose()
      }
      }

    if (!isModalOpen) {
      return null;
    }
    
    return createPortal(
        (
          <div onClick={onClose}>
            <div className={styles.window}>
                <div className={styles.close} onClick={onClicking}>
                    <CloseIcon type="primary" />
                </div>   
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={onOverlayClose}/>
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