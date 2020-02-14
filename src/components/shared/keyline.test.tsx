import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Keyline } from 'components/shared/keyline';
import { Design } from 'item';

configure({ adapter: new Adapter() });

describe('Keyline component renders as expected', () => {
    it('Renders styles for liveblogs', () => {
        const article = { design: Design.Live };
        const keyline = shallow(<Keyline {...article} />);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#DCDCDC,#DCDCDC 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("opacity:.4;")
    })

    it('Renders styles for comment articles', () => {
        const article = { design: Design.Comment };
        const keyline = shallow(<Keyline {...article} />);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#DCDCDC,#DCDCDC 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("height:24px;")
    })

    it('Renders styles for standard articles', () => {
        const article = { design: Design.Article };
        const keyline = shallow(<Keyline {...article} />);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#DCDCDC,#DCDCDC 1px,transparent 1px,transparent 3px)")
    })
});