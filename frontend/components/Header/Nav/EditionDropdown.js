// @flow
import Dropdown from '@guardian/guui/components/Dropdown';
import type { Link } from '@guardian/guui/components/Dropdown';

import styled from 'react-emotion';

const EditionDropdown = styled('div')({
    position: 'absolute',
    right: '15px',
    zIndex: 1072,
});

export default () => {
    const links: Array<Link> = [
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
            <Dropdown label="UK Edition" links={links} id="edition" />
        </EditionDropdown>
    );
};
