import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Keyline } from 'components/shared/keyline';
import { Design } from '@guardian/types/Format';
import { SerializedStyles } from '@emotion/core';

configure({ adapter: new Adapter() });

const styles = (component: ShallowWrapper): string => Array.from(component.prop<SerializedStyles[]>('css'))
    .flat()
    .map(({ styles }: { styles: string }) => styles)
    .reduce((a: string, b: string) => a + b, '')

describe('Keyline component renders as expected', () => {
    it('Renders styles for liveblogs', () => {
        const article = { design: Design.Live };
        const keyline = shallow(<Keyline {...article} />);
        expect(styles(keyline)).toContain("background-image: repeating-linear-gradient(#DCDCDC, #DCDCDC 1px, transparent 1px, transparent 3px)")
        expect(styles(keyline)).toContain("opacity: .4;")
    })

    it('Renders styles for comment articles', () => {
        const article = { design: Design.Comment };
        const keyline = shallow(<Keyline {...article} />);
        expect(styles(keyline)).toContain("background-image: repeating-linear-gradient(#DCDCDC, #DCDCDC 1px, transparent 1px, transparent 3px)")
        expect(styles(keyline)).toContain("height: 24px;")
    })

    it('Renders styles for standard articles', () => {
        const article = { design: Design.Article };
        const keyline = shallow(<Keyline {...article} />);
        expect(styles(keyline)).toContain("background-image: repeating-linear-gradient(#DCDCDC, #DCDCDC 1px, transparent 1px, transparent 3px)")
    })
});