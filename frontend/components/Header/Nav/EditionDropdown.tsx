import React from 'react';
import { css } from 'react-emotion';

import { Dropdown } from '@guardian/guui';
import { desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { Link } from '@guardian/guui/components/Dropdown';

const editionDropdown = css`
    display: none;
    position: absolute;
    right: 11px;
    z-index: 1072;
    ${desktop} {
        display: block;
    }
    ${leftCol} {
        right: 24px;
    }
    ${wide} {
        right: 14px;
        margin-right: 90px;
    }
`;

const EditionDropdown: React.SFC = () => {
    const links: Link[] = [
        {
            url: '/preference/edition/uk',
            title: 'UK edition',
            isActive: true,
        },
        {
            url: '/preference/edition/us',
            title: 'US edition',
        },
        {
            url: '/preference/edition/au',
            title: 'Australian edition',
        },
        {
            url: '/preference/edition/int',
            title: 'International edition',
        },
    ];

    return (
        <div className={editionDropdown}>
            <Dropdown label="UK edition" links={links} id="edition" />
        </div>
    );
};

export default EditionDropdown;
