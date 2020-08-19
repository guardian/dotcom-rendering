import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Avatar from 'components/liveblog/avatar';
import { Contributor } from 'contributor';
import { none, some } from '@guardian/types/option';
import { isObject } from 'lib';

configure({ adapter: new Adapter() });

describe('Avatar component renders as expected', () => {
    const contributors: Contributor[] = [{
        name: "Web Title",
        id: "test",
        apiUrl: 'test',
        image: some({
            src: '',
            srcset: '',
            dpr2Srcset: '',
            height: 192,
            width: 192,
            credit: none,
            caption: none,
            alt: none,
            role: none,
            nativeCaption: none,
        }),
    }]
    it('Adds correct alt attribute', () => {
        const avatar = shallow(<Avatar contributors={contributors} bgColour="" />);
        expect(avatar.find('img').prop('alt')).toBe("Web Title")
    })

    it('Uses background colour prop', () => {
        const avatar = shallow<typeof Avatar>(<Avatar contributors={contributors} bgColour="pink" />);
        const cssProp = avatar.prop('css');

        if (isObject(cssProp)) {
            expect(cssProp.styles).toContain("background-color: pink");
        } else {
            fail('No styles found');
        }
    })

    it('Renders null if more than one contributor', () => {
        const contributors: Contributor[] = [
            { name: "Contributor 1", id: "test", apiUrl: 'test', image: none },
            { name: "Contributor 2", id: "test", apiUrl: 'test', image: none },
        ]
        const avatar = shallow(<Avatar contributors={contributors} bgColour="" />);
        expect(avatar.html()).toBe(null)
    })
});
