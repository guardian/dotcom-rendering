import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Keyline } from 'components/shared/Keyline';
import { Pillar } from 'pillar';

configure({ adapter: new Adapter() });

describe('Keyline component renders as expected', () => {
    it('Renders styles for liveblogs', () => {
        const keyline = shallow(<Keyline pillar={Pillar.opinion} type="liveblog"/>)
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("opacity:.4;")
    })

    it('Renders styles for opinion pillar articles', () => {
        const keyline = shallow(<Keyline pillar={Pillar.opinion} type="article"/>)
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("height:24px;")
    })

    it('Renders styles for news pillar articles', () => {
        const keyline = shallow(<Keyline pillar={Pillar.news} type="article"/>)
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
    })
});