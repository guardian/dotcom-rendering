import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import { Some } from 'types/option';

configure({ adapter: new Adapter() });

describe('HeaderImageCaption component renders as expected', () => {
    it('Caption formatted correctly', () => {
        const headerImageCaption = shallow(
            <HeaderImageCaption
                caption={new Some('Here is a caption.')}
                credit={new Some('Photograph: cameraman')}
            />
        );
        expect(headerImageCaption.find(`#${captionId}`).text()).toBe("Here is a caption. Photograph: cameraman")
    })
});