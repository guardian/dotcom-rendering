import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Keyline } from 'components/shared/keyline';
import { Layout } from 'article';

configure({ adapter: new Adapter() });

describe('Keyline component renders as expected', () => {
    it('Renders styles for liveblogs', () => {
        const article = { layout: Layout.Liveblog };
        const keyline = shallow(<Keyline {...article} />);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("opacity:.4;")
    })

    it('Renders styles for opinion articles', () => {
        const article = { layout: Layout.Opinion };
        const keyline = shallow(<Keyline {...article} />);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("height:24px;")
    })

    it('Renders styles for standard articles', () => {
        const article = { layout: Layout.Standard };
        const keyline = shallow(<Keyline {...article} />);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
    })
});