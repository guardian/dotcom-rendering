// ----- Imports ----- //

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Follow from './follow';
import { Pillar, Design, Display } from 'format';


// ----- Setup ----- //

configure({ adapter: new Adapter() });

const followFormat = {
    pillar: Pillar.News,
    design: Design.Article,
    display: Display.Standard,
};


// ----- Tests ----- //

describe('Follow component renders as expected', () => {
    it('Displays title correctly', () => {
        const contributors = [
            {
                apiUrl: "https://mapi.co.uk/test",
                webTitle: "George Monbiot",
                id: "test",
            },
        ];
        const follow = shallow(
            <Follow contributors={contributors} {...followFormat} />
        );

        expect(follow.text()).toBe("Follow George Monbiot");
    })

    it('Renders null if no apiUrl', () => {
        const contributors = [
            { webTitle: "George Monbiot", id: "test", apiUrl: "" },
        ];
        const follow = shallow(
            <Follow contributors={contributors} {...followFormat} />
        );

        expect(follow.html()).toBe(null);
    })

    it('Renders null if more than one contributor', () => {
        const contributors = [
            {
                webTitle: "Contributor 1",
                apiUrl: "https://mapi.co.uk/test",
                id: "test",
            },
            {
                webTitle: "Contributor 2",
                apiUrl: "https://mapi.co.uk/test",
                id: "test",
            },
        ];
        const follow = shallow(
            <Follow contributors={contributors} {...followFormat} />
        );

        expect(follow.html()).toBe(null);
    })
});
