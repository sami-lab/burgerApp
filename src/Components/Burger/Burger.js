import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
const burger = (props)=>{
    let tranformingredients = Object.keys(props.ingredients)
                              .map(igkeys => {
                                  return [...Array(props.ingredients[igkeys])].map((_,i)=>{
                                        return <BurgerIngredient key={igkeys+i} type = {igkeys}/>
                                 });
                               })
                               .reduce((arr, el) => {
                                return arr.concat(el)
                                }, []);
    if (tranformingredients.length === 0) {
        tranformingredients = <p style ={{color: 'red'}}>Please start adding ingredients!</p>;
    }
    return (
         <div className = {classes.Burger}>
             <BurgerIngredient type="bread-top"/>
             {tranformingredients}
             <BurgerIngredient type="bread-bottom"/>
             
         </div>
    );
};
export default burger;