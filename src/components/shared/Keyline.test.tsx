import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Keyline } from 'components/shared/keyline';
import { Pillar } from 'pillar';
import { Layout } from 'article';

configure({ adapter: new Adapter() });

describe('Keyline component renders as expected', () => {
    it('Renders styles for liveblogs', () => {
        const article = { pillar: Pillar.opinion, layout: Layout.Liveblog };
        const keyline = shallow(<Keyline article={article}/>);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("opacity:.4;")
    })

    it('Renders styles for opinion pillar articles', () => {
        const article = { pillar: Pillar.opinion, layout: Layout.Default };
        const keyline = shallow(<Keyline article={article}/>);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
        expect(keyline.props().css.styles).toContain("height:24px;")
    })

    it('Renders styles for news pillar articles', () => {
        const article = { pillar: Pillar.news, layout: Layout.Default };
        const keyline = shallow(<Keyline article={article}/>);
        expect(keyline.props().css.styles).toContain("background-image:repeating-linear-gradient(#dcdcdc,#dcdcdc 1px,transparent 1px,transparent 3px)")
    })
});