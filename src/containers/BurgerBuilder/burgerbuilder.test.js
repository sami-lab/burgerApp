import React from 'react';
import {Burgerbuilder} from './burgerbuilder';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControl from '../../Components/Burger/BuildControl/BuildControl'
configure({adapter:new Adapter()});

describe('<BurgerBuilder/>',()=>{
    let wrapper;  
    beforeEach(()=>{
         wrapper= shallow(<Burgerbuilder OnInitIngredients={()=>{}}/>)
      })
    it('it should render <BuildControl/>',()=>{
        wrapper.setProps({ings:{salad:0}})
        expect(wrapper.find(BuildControl)).toHaveLength(1);
    })
})