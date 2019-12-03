import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderImageCaption from 'components/shared/HeaderImageCaption';

configure({ adapter: new Adapter() });

describe('HeaderImageCaption component renders as expected', () => {
    it('Caption formatted correctly', () => {
        const headerImageCaption = shallow(<HeaderImageCaption caption="Here is a caption." credit="Photograph: cameraman"/>)
        expect(headerImageCaption.find('#header-image-caption').text()).toBe("Here is a caption. Photograph: cameraman")
    })
});