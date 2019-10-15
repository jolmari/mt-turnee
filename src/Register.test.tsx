import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';

import { Register } from './Register';

configure({ adapter: new Adapter() });

describe('Register', () => {

  it('should handle update first and last name on input change.', () => {

    // Arrange
    const component = shallow(<Register />);
    const firstNameInput = component.find('input[name="firstName"]');
    const lastNameInput = component.find('input[name="lastName"]');
    const emailInput = component.find('input[name="email"]');

    // Act
    firstNameInput.simulate('change', { currentTarget: { value: 'Matti' } });
    lastNameInput.simulate('change', { currentTarget: { value: 'Meikäläinen' } });
    emailInput.simulate('change', { currentTarget: { value: 'matti.meikalainen@finland.fi' } });
    component.update();

    // Assert
    const paragraph = component.find('p#output');
    expect(paragraph.text()).toBe('Matti Meikäläinen - matti.meikalainen@finland.fi');
  });
});
