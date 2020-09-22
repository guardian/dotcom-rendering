import React from 'react';
import Avatar from 'components/liveblog/avatar';
import { Contributor } from 'contributor';
import { none, some } from '@guardian/types/option';
import renderer from 'react-test-renderer';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

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
        const avatar = renderer.create(<Avatar contributors={contributors} bgColour="" />);
        expect(avatar.root.findByType('img').props.alt).toBe("Web Title")
    })

    it('Uses background colour prop', () => {
        const avatar = renderer.create(<Avatar contributors={contributors} bgColour="pink" />);

        expect(avatar.toJSON()).toHaveStyleRule('background-color', 'pink')
    })

    it('Renders null if more than one contributor', () => {
        const contributors: Contributor[] = [
            { name: "Contributor 1", id: "test", apiUrl: 'test', image: none },
            { name: "Contributor 2", id: "test", apiUrl: 'test', image: none },
        ]

        const avatar = renderer.create(<Avatar contributors={contributors} bgColour="" />);

        expect(avatar.root.children).toHaveLength(0);
    })
});