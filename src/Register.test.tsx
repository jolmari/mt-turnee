import React, { FormEvent } from 'react';
import { create, ReactTestInstance } from 'react-test-renderer';
import { Register } from './Register';

describe('Register', () => {

  it('should match the snapshot.', () => {
    const component = create(<Register />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});


