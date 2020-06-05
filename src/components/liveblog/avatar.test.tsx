import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Avatar from 'components/liveblog/avatar';
import { Contributor } from 'contributor';
import { None, Some } from 'types/option';

configure({ adapter: new Adapter() });

describe('Avatar component renders as expected', () => {
    const contributors: Contributor[] = [{
        name: "Web Title",
        id: "test",
        apiUrl: 'test',
        image: new Some({
            src: '',
            srcset: '',
            dpr2Srcset: '',
            height: 192,
            width: 192,
            credit: new None(),
            caption: new None(),
            alt: new None(),
            role: new None(),
            nativeCaption: new None(),
            launchSlideshow: false
        }),
    }]
    it('Adds correct alt attribute', () => {
        const avatar = shallow(<Avatar contributors={contributors} bgColour="" />);
        expect(avatar.find('img').prop('alt')).toBe("Web Title")
    })

    it('Uses background colour prop', () => {
        const avatar = shallow(<Avatar contributors={contributors} bgColour="pink" />);
        expect(avatar.props().css.styles).toContain("background-color: pink")
    })

    it('Renders null if more than one contributor', () => {
        const contributors: Contributor[] = [
            { name: "Contributor 1", id: "test", apiUrl: 'test', image: new None() },
            { name: "Contributor 2", id: "test", apiUrl: 'test', image: new None() },
        ]
        const avatar = shallow(<Avatar contributors={contributors} bgColour="" />);
        expect(avatar.html()).toBe(null)
    })
});
