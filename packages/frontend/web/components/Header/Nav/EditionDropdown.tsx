import React from 'react';
import { css } from 'emotion';

import { Dropdown } from '@guardian/guui';
import { desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { Link } from '@guardian/guui/components/Dropdown/Dropdown';
import { palette } from '@guardian/pasteup/palette';

const editionDropdown = css`
    display: none;
    position: absolute;
    right: 11px;
    z-index: 1072;
    transform: translateX(100%);

    :before {
        content: '';
        border-left: 1px solid ${palette.brand.pastel};
        display: block;
        float: left;
        height: 24px;
    }

    ${desktop} {
        display: block;
        right: 121px;
        width: 110px;
    }
    ${wide} {
        right: 198px;
        width: 197px;
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
