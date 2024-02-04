import React, { useCallback, useEffect, useRef, useState } from "react"
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/reducers/ingrSlice";
import { getIngrSelector, isLoadingSelector } from "../../services/selectors/selectors";
import IngredientItem from "../IngredientItem/IngredientItem";
import { clearIng, openIngr } from "../../services/reducers/ingrDetailsSlice";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { Link, useLocation, useNavigate } from "react-router-dom";



export const getIngredientCount = (selectedIngredients, ingredientId) => {
        return selectedIngredients.filter((ingredient) => ingredient._id === ingredientId).length;
    };

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('Булки');
    const [modalOpen, setModalOpen] = useState(false);
    const ingredients = useSelector(getIngrSelector);
    const loading = useSelector(isLoadingSelector);
    const dispatch = useDispatch();
    const location = useLocation();

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const fillingsRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();
    const currentIngr = useSelector(state => state.ingredientDetails.currentIngredient)

    const ingrClick = useCallback((item) => {
        dispatch(openIngr(item));
        },
        [dispatch]
      );

    const scrollToRef = (ref) => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer && ref.current) {
          scrollContainer.scrollTop = ref.current.offsetTop - scrollContainer.offsetTop;
        }
    };

    const handleTabClick = (tab) => {
        setCurrent(tab);
        switch (tab) {
          case 'Булки':
            scrollToRef(bunsRef);
            break;
          case 'Соусы':
            scrollToRef(saucesRef);
            break;
          case 'Начинки':
            scrollToRef(fillingsRef);
            break;
          default:
            break;
        }
    };

    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current;
        const bunsDistance = Math.abs(bunsRef.current.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top);
        const saucesDistance = Math.abs(saucesRef.current.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top);
        const fillingsDistance = Math.abs(fillingsRef.current.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top);
    
        const closest = Math.min(bunsDistance, saucesDistance, fillingsDistance);
    
        if (closest === bunsDistance) {
          setCurrent('Булки');
        } else if (closest === saucesDistance) {
          setCurrent('Соусы');
        } else {
          setCurrent('Начинки');
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
          scrollContainer.addEventListener('scroll', handleScroll);
        }
    
        return () => {
          if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);

    const openModal = (element) => {
        dispatch(openIngr(element));
        setModalOpen(true);
        navigate(`/ingredients/${element._id}`, { state: { background: location } });
    }
    const closeModal = () => {
        setModalOpen(false);
        dispatch(clearIng());
        navigate('/');
    }

    const ingrArray = useSelector(
        (state) => state.burgerConstructor.constructorElement
      );
    const bunArray = useSelector(
        (state) => state.burgerConstructor.bun
    );

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch]);

    console.log(ingredients.data.filter(item => item.name === 'Краторная булка N-200i'))
    if (ingredients === null || ingredients===undefined) {
        return null;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const { data } = ingredients;

    const bunIngr = data.filter(item => item.type==='bun');
    const sauceIngr = data.filter(item => item.type==='sauce');
    const mainIngr = data.filter(item => item.type==='main');

    const getBunsCount = (selectedIngredients, id) => {
        
        return selectedIngredients && selectedIngredients._id ===id ? 2 : 0;
    }

    return (
        <section>
            <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
            <nav className={`mb-10 ${styles.tab_block}`}>
                <Tab value="Булки" active={current === 'Булки'} 
                onClick={() => handleTabClick('Булки')}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} 
                onClick={() => handleTabClick('Соусы')}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} 
                onClick={() => handleTabClick('Начинки')}>
                    Начинки
                </Tab>
            </nav>
            <div className={`${styles.custom_scroll} ${styles.block}`} 
            onScroll={handleScroll}
            ref={scrollContainerRef}>
                <div id='buns' ref={bunsRef}>
                    <h3 className="text text_type_main-medium mb-6">Булки</h3>
                    <div className={styles.chapter}>
                        {bunIngr.map((ingredient) => (
                            <Link
                            className={styles.link}
                            key={ingredient._id}
                            to={`/ingredients/${ingredient._id}`}
                            state={{ background: location }}
                            >   
                                <IngredientItem
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    onClick={() => {
                                        openModal(ingredient);
                                        ingrClick(ingredient);
                                    }}
                                    count={getBunsCount(bunArray, ingredient._id)}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div id='sauces' ref={saucesRef}>
                    <h3 className="text text_type_main-medium mb-6">Соусы</h3>
                    <div className={styles.chapter}>
                        {sauceIngr.map((ingredient) => (
                            <Link
                            className={styles.link}
                            key={ingredient._id}
                            to={`/ingredients/${ingredient._id}`}
                            state={{ background: location }}
                            >
                                <IngredientItem
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    onClick={() => {
                                        openModal(ingredient);
                                        ingrClick(ingredient);
                                    }}
                                    count={getIngredientCount(ingrArray, ingredient._id)}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div id='mains' ref={fillingsRef}>
                    <h3 className="text text_type_main-medium mb-6">Начинки</h3>
                    <div className={styles.chapter}>
                        {mainIngr.map((ingredient) => (
                            <Link
                            className={styles.link}
                            key={ingredient._id}
                            to={`/ingredients/${ingredient._id}`}
                            state={{ background: location }}
                            >
                                <IngredientItem
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    onClick={() => {
                                        openModal(ingredient);
                                        ingrClick(ingredient);
                                    }}
                                    count={getIngredientCount(ingrArray, ingredient._id)}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Modal 
                isModalOpen={modalOpen}
                onClose={closeModal}>
                <IngredientDetails onClose={closeModal}/>
            </Modal>
            
            
            
        </section>
    )
}

export default BurgerIngredients;