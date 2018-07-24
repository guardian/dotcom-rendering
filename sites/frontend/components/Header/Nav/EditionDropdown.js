// @flow
import Dropdown from '@guardian/guui/dropdown';

import { styled } from '@guardian/guui';

const EditionDropdown = styled('div')({
    position: 'absolute',
    right: '15px',
    zIndex: 1072,
});

export default () => {
    const links = [
        {
            url: '/preference/edition/uk',
            title: 'UK Edition',
            isActive: true,
        },
        {
            url: '/preference/edition/us',
            title: 'US Edition',
        },
        {
            url: '/preference/edition/au',
            title: 'Australian Edition',
        },
        {
            url: '/preference/edition/int',
            title: 'International Edition',
        },
    ];

    return (
        <EditionDropdown>
            <Dropdown label="UK Edition" links={links} />
        </EditionDropdown>
    );
};
