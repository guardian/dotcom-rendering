import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tags from 'components/shared/Tags';
import { Tag, TagType } from 'capiThriftModels';

configure({ adapter: new Adapter() });

describe('Keyline component renders as expected', () => {
    const tagsProps: Tag[] = [{
        id: "",
        type: TagType.KEYWORD,
        sectionId: "",
        sectionName: "",
        webTitle: "Tag title",
        webUrl: "https://mapi.co.uk/tag",
        apiUrl: "",
        references: [{ id: "", type: "" }],
        description: "",
        bio: "",
        bylineImageUrl: "",
        bylineLargeImageUrl: "",
        podcast: {
            linkUrl: "",
            copyright: "",
            author: "",
            subscriptionUrl: "",
            explicit: false,
            image: "",
            categories: [],
            podcastType: "",
            googlePodcastsUrl: "",
            spotifyUrl: ""
        },
        firstName: "",
        lastName: "",
        emailAddress: "",
        twitterHandle: "",
        activeSponsorships: [],
        paidContentType: "",
        paidContentCampaignColour: "",
        rcsId: "",
        r2ContributorId: "",
        tagCategories: [""],
        entityIds: [""],
        campaignInformationType: "",
        internalName: "",
    }]

    it('Renders link to tag', () => {
        const tags = shallow(<Tags tags={tagsProps} />)
        expect(tags.find('li').html()).toBe('<li><a href="https://mapi.co.uk/tag">Tag title</a></li>')
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
        expect(tags.props().css.styles).toContain("background-color:pink;")
    })
});