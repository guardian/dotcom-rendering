import React from 'react';
import Tags from 'components/shared/tags';
import { Design, Display, Format, Pillar } from '@guardian/types/Format';
import renderer from 'react-test-renderer';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

const tagsProps = [{
    webTitle: "Tag title",
    webUrl: "https://mapi.co.uk/tag"
}];

const mockFormat: Format = {
    pillar: Pillar.News,
    design: Design.Comment,
    display: Display.Standard,
};

describe('Tags component renders as expected', () => {
    it('Renders link to tag', () => {
        const tags = renderer.create(<Tags tags={tagsProps} format={mockFormat}/>)
        const link = tags.root.findByType("a")
        expect(link.props.href).toBe('https://mapi.co.uk/tag')
    })

    it('Renders tag title', () => {
        const tags = renderer.create(<Tags tags={tagsProps} format={mockFormat} />)
        expect(tags.root.findByType('a').children.includes("Tag title")).toBe(true)
    })

    it('Renders correct number of tags', () => {
        const tags = renderer.create(
            <Tags tags={[...tagsProps, ...tagsProps]} format={mockFormat} />
        )
        expect(tags.root.findAllByType('li').length).toBe(2)
    })

    it('Renders correct background color', () => {
        const tags = renderer.create(<Tags tags={tagsProps} format={mockFormat}/>)
        expect(tags.toJSON()).toHaveStyleRule("background-color","#DCDCDC",{ target: 'li a' })
    })
});
