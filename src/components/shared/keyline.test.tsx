import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Keyline } from 'components/shared/keyline';
import { Layout } from 'article';

configure({ adapter: new Adapter() });

const styles = (component: ShallowWrapper): string => Array.from(component.prop('css'))
    .flat()
    .map(({ styles }: { styles: string }) => styles)
    .reduce((a: string, b: string) => a + b, '')

describe('Keyline component renders as expected', () => {
    it('Renders styles for liveblogs', () => {
        const article = { layout: Layout.Liveblog };
        const keyline = shallow(<Keyline {...article} />);
        expect(styles(keyline)).toContain("background-image: repeating-linear-gradient(#DCDCDC, #DCDCDC 1px, transparent 1px, transparent 3px)")
        expect(styles(keyline)).toContain("opacity: .4;")
    })

    it('Renders styles for opinion articles', () => {
        const article = { layout: Layout.Opinion };
        const keyline = shallow(<Keyline {...article} />);
        expect(styles(keyline)).toContain("background-image: repeating-linear-gradient(#DCDCDC, #DCDCDC 1px, transparent 1px, transparent 3px)")
        expect(styles(keyline)).toContain("height: 24px;")
    })

    it('Renders styles for standard articles', () => {
        const article = { layout: Layout.Standard };
        const keyline = shallow(<Keyline {...article} />);
        expect(styles(keyline)).toContain("background-image: repeating-linear-gradient(#DCDCDC, #DCDCDC 1px, transparent 1px, transparent 3px)")
    })
});