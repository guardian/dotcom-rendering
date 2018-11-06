import React from 'react';
import { shallow } from 'enzyme';
import { SubMetaLinksList } from './SubMetaLinksList';

describe('SubMetaLinksList', () => {
    const links: SimpleLinkType[] = [
        {
            url: '/test/1',
            title: 'Test 1',
        },
        {
            url: '/test/2',
            title: 'Test 2',
        },
    ];
    const isSectionLinkList: boolean = false;
    const pillar: Pillar = 'news';

    describe('snapshots', () => {
        it('It should render correctly if isSectionLinkList true', () => {
            const component = shallow(
                <SubMetaLinksList
                    links={links}
                    isSectionLinkList={true}
                    pillar={pillar}
                />,
            );

            expect(component).toMatchSnapshot();
        });

        it('It should render correctly if isSectionLinkList false', () => {
            const component = shallow(
                <SubMetaLinksList
                    links={links}
                    isSectionLinkList={false}
                    pillar={pillar}
                />,
            );

            expect(component).toMatchSnapshot();
        });
    });

    it('It should render correct amount of links', () => {
        const component = shallow(
            <SubMetaLinksList
                links={links}
                isSectionLinkList={isSectionLinkList}
                pillar={pillar}
            />,
        );

        expect(component.find('li').length).toBe(2);
    });
});
