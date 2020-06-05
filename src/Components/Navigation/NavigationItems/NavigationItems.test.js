import React from 'react'

import {configure,shallow} from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
//Adaptor is used to Connect enzyme with react version
configure({adapter:new Adaptor()});

describe('<NavigationItems/>',()=>{
    let wrapper ;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>);
    })
    it('It Should return mininmum two Navation Item If not Authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('It Should return mininmum three Navigation Item If Authenticated',()=>{
       // wrapper= shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('It Should render three <NavigationItems/> if authenticated ',()=>{
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
     });
});