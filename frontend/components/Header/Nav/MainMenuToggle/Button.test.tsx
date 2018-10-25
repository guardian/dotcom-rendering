import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

describe('Button', () => {
    it('It should render correctly', () => {
        const component = shallow(
            <Button inFocus={false} />
        );

        expect(component).toMatchSnapshot();
    });
});
