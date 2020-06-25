// ----- Imports ----- //

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { none, Option } from 'types/option';
import HeaderImage from 'components/headerImage';
import { Image } from 'image';
import { Pillar, Design, Display } from 'format';


// ----- Setup ----- //

configure({ adapter: new Adapter() });


// ----- Tests ----- //

describe('HeaderImage component renders as expected', () => {
    it('Renders null if no block element', () => {
        const image: Option<Image> = none;
        const format = {
            pillar: Pillar.News,
            design: Design.Article,
            display: Display.Standard,
        }
        const headerImage = shallow(
            <HeaderImage image={image} format={format} />
        )

        expect(headerImage.html()).toBe(null);
    })
});