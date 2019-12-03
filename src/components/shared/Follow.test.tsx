import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Follow from 'components/shared/Follow';

configure({ adapter: new Adapter() });

describe('Follow component renders as expected', () => {
    it('Displays title correctly', () => {
        const contributors = [
            { apiUrl: "https://mapi.co.uk/test", webTitle: "George Monbiot" }
        ]
        const follow = shallow(<Follow contributors={contributors} />);
        expect(follow.text()).toBe("Follow George Monbiot")
    })

    it('Renders null if no apiUrl', () => {
        const contributors = [
            { webTitle: "George Monbiot" }
        ]
        const follow = shallow(<Follow contributors={contributors} />);
        expect(follow.html()).toBe(null)
    })

    it('Renders null if more than one contributor', () => {
        const contributors = [
            { webTitle: "Contributor 1", apiUrl: "https://mapi.co.uk/test" },
            { webTitle: "Contributor 2", apiUrl: "https://mapi.co.uk/test" },
        ]
        const follow = shallow(<Follow contributors={contributors} />);
        expect(follow.html()).toBe(null)
    })
});
