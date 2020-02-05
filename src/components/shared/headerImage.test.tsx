import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { None, Option } from 'types/option';
import HeaderImage from 'components/shared/headerImage';
import { Image } from 'article';

configure({ adapter: new Adapter() });

describe('HeaderImage component renders as expected', () => {
    it('Renders null if no block element', () => {
        const image: Option<Image> = new None;
        const headerImage = shallow(<HeaderImage image={image} imageSalt=""/>)
        expect(headerImage.html()).toBe(null);
    })
});