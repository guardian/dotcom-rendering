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

const ukEditionLink: Link = {
    url: '/preference/edition/uk',
    title: 'UK edition',
    isActive: true,
};

const usEditionLink: Link = {
    url: '/preference/edition/us',
    title: 'US edition',
};

const auEditionLink: Link = {
    url: '/preference/edition/au',
    title: 'Australian edition',
};

const intEditionLink: Link = {
    url: '/preference/edition/int',
    title: 'International edition',
};

const lookUpEditionLink = (edition: Edition): Link => {
    const mapping = {
        UK: ukEditionLink,
        US: usEditionLink,
        AU: auEditionLink,
        INT: intEditionLink,
    };
    return mapping[edition];
};

const EditionDropdown: React.SFC<{
    edition: Edition;
}> = ({ edition }) => {
    const activeEditionLink = lookUpEditionLink(edition);
    const links = [
        ukEditionLink,
        usEditionLink,
        auEditionLink,
        intEditionLink,
    ].filter(ed => ed.url !== activeEditionLink.url);
    links.unshift(activeEditionLink);
    return (
        <div className={editionDropdown}>
            <Dropdown
                label={activeEditionLink.title}
                links={links}
                id="edition"
            />
        </div>
    );
};

export default EditionDropdown;
