import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Avatar from 'components/shared/avatar';

configure({ adapter: new Adapter() });

describe('Avatar component renders as expected', () => {
    it('Adds correct alt attribute', () => {
        const contributors = [{
            bylineLargeImageUrl: "https://mapi.co.uk/test",
            webTitle: "Web Title"
        }]
        const avatar = shallow(<Avatar contributors={contributors} bgColour="" imageSalt="" />);
        expect(avatar.find('img').prop('alt')).toBe("Web Title")
    })

    it('Uses background colour prop', () => {
        const contributors = [{
            bylineLargeImageUrl: "https://mapi.co.uk/test",
            webTitle: "Web Title"
        }];
        const avatar = shallow(<Avatar contributors={contributors} bgColour="pink" imageSalt="" />);
        expect(avatar.props().css.styles).toContain("background-color:pink")
    })

    it('Generates correct image url', () => {
        const contributors = [{
            bylineLargeImageUrl: "https://mapi.co.uk/test",
            webTitle: "Web Title"
        }]
        const avatar = shallow(<Avatar contributors={contributors} bgColour="" imageSalt="SALT" />);
        expect(avatar.find('img').prop('src')).toBe("https://i.guim.co.uk/img/mapi/test?width=204&quality=85&fit=bounds&sig-ignores-params=true&s=06e5f420e98c9153b66fc0f7383a60f7")
    })

    it('Renders null if more than one contributor', () => {
        const contributors = [
            { webTitle: "Contributor 1" },
            { webTitle: "Contributor 2" }
        ]
        const avatar = shallow(<Avatar contributors={contributors} bgColour="" imageSalt="" />);
        expect(avatar.html()).toBe(null)
    })
});
