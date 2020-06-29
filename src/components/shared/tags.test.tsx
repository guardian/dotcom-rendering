import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tags from 'components/shared/tags';
import { SerializedStyles } from '@emotion/core';

configure({ adapter: new Adapter() });

const tagsProps = [{
    webTitle: "Tag title",
    webUrl: "https://mapi.co.uk/tag"
}];

const styles = (component: ShallowWrapper): string => Array.from(component.prop<SerializedStyles[]>('css'))
    .flat()
    .map(({ styles }: { styles: string }) => styles)
    .reduce((a: string, b: string) => a + b, '')

describe('Keyline component renders as expected', () => {
    it('Renders link to tag', () => {
        const tags = shallow(<Tags tags={tagsProps} />)
        const link = tags.find('a')
        expect(link.prop('href')).toBe('https://mapi.co.uk/tag')
    })

    it('Renders tag title', () => {
        const tags = shallow(<Tags tags={tagsProps} />)
        expect(tags.find('li').text()).toBe("Tag title")
    })

    it('Renders correct number of tags', () => {
        const tags = shallow(<Tags tags={[...tagsProps, ...tagsProps]} />)
        expect(tags.find('li').length).toBe(2)
    })

    it('Uses background prop in styles', () => {
        const tags = shallow(<Tags tags={tagsProps} background={"pink"}/>)
        expect(styles(tags)).toContain("background-color: pink;")
    })
});