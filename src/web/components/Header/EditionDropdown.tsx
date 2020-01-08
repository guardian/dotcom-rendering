import React from 'react';
import { css } from 'emotion';

import { Dropdown, Link } from '@root/src/web/components/Dropdown';
import { palette } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const editionDropdown = css`
    display: flex;
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

    ${from.desktop} {
        right: 121px;
        width: 110px;
    }
    ${from.wide} {
        right: 198px;
        width: 197px;
    }
`;

const editionPickerDataLinkName = 'nav2 : topbar : edition-picker: ';

const ukEditionLink: Link = {
    url: '/preference/edition/uk',
    title: 'UK edition',
    isActive: true,
    dataLinkName: `${editionPickerDataLinkName}UK`,
};

const usEditionLink: Link = {
    url: '/preference/edition/us',
    title: 'US edition',
    dataLinkName: `${editionPickerDataLinkName}US`,
};

const auEditionLink: Link = {
    url: '/preference/edition/au',
    title: 'Australian edition',
    dataLinkName: `${editionPickerDataLinkName}AU`,
};

const intEditionLink: Link = {
    url: '/preference/edition/int',
    title: 'International edition',
    dataLinkName: `${editionPickerDataLinkName}INT`,
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

export const EditionDropdown: React.FC<{
    edition: Edition;
    dataLinkName: string;
}> = ({ edition, dataLinkName }) => {
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
            <div
                className={css`
                    padding-top: 7px;
                `}
            >
                <Dropdown
                    label={activeEditionLink.title}
                    links={links}
                    id="edition"
                    dataLinkName={dataLinkName}
                />
            </div>
        </div>
    );
};
