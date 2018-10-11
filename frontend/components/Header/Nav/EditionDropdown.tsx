import React from 'react';
import { css } from 'react-emotion';

import { Dropdown } from '@guardian/guui';
import { until, wide } from '@guardian/pasteup/breakpoints';
import { Link } from '@guardian/guui/components/Dropdown';

const editionDropdown = css`
    position: absolute;
    right: 15px;
    z-index: 1072;
    ${until.desktop} {
        display: none;
    }

    ${wide} {
        margin-right: 90px;
    }
`;

const EditionDropdown: React.SFC = () => {
    const links: Link[] = [
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
        <div className={editionDropdown}>
            <Dropdown label="UK Edition" links={links} id="edition" />
        </div>
    );
};

export default EditionDropdown;
