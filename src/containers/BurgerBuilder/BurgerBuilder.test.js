import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { BurgerBuilder } from './BurgerBuilder';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import React from 'react';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});