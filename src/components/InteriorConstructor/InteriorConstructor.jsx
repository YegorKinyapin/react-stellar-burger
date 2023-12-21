import React from 'react';
import styles from "./InteriorConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngr, swapIngredients} from "../../services/reducers/constructorSlice";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";

function InteriorConstructor({element, index}) {
  const dispatch = useDispatch();

  const burgerIngredients = useSelector(state => state.burgerConstructor.constructorElement);
  const findIndex = (item) => burgerIngredients.indexOf(item);

  const [{isDragging}, dragRef] = useDrag({
    type: 'SWAP_INGREDIENT',
    item: {ingredient: element},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: 'SWAP_INGREDIENT',
    hover({ingredient}) {
      if (ingredient.uuid === element.uuid) return;

      dispatch(swapIngredients({
        indexFrom: findIndex(ingredient),
        indexTo: index,
        ingredient: ingredient,
      }))
    }
  });

  return (
    <div className={`${isDragging ? styles.block + ' ' + styles.dragging : styles.block}`}
         ref={node => dropRef(dragRef(node))}>

        <DragIcon type="primary" />
        <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image_mobile}
            handleClose={() => {
            dispatch(removeIngr({'uuid': element.uuid}))
            }}
        />
    </div>
  );
}

InteriorConstructor.propTypes = {
  element: PropTypes.object,
  index: PropTypes.number,
}

export default InteriorConstructor;
