import React, { Component } from 'react';
import { css } from 'react-emotion';

import { Dropdown } from '@guardian/guui';
import { desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';
import { Link } from '@guardian/guui/components/Dropdown';
import { getCookie } from '../../../../lib/cookie';

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

const uk: Link = {
    url: '/preference/edition/uk',
    title: 'UK edition',
    isActive: true,
};

const us: Link = {
    url: '/preference/edition/us',
    title: 'US edition',
};

const au: Link = {
    url: '/preference/edition/au',
    title: 'Australian edition',
};

const int: Link = {
    url: '/preference/edition/int',
    title: 'International edition',
};

const defaultEdition = 'UK';

const editions: { [key: string]: Link } = {
    UK: uk,
    US: us,
    AU: au,
    INT: int,
};

export default class EditionDropdown extends Component<
    {},
    { edition: string }
> {
    constructor(props: {}) {
        super(props);
        this.state = { edition: defaultEdition };
    }

    public componentDidMount() {
        const selectedEdition = getCookie('GU_EDITION');

        if (selectedEdition && this.state.edition !== selectedEdition) {
            this.setState({ edition: selectedEdition });
        }
    }

    public render() {
        const activeEdition = editions[this.state.edition];
        const links = [uk, us, au, int].filter(
            ed => ed.url !== activeEdition.url,
        );
        links.unshift(activeEdition);

        return (
            <div className={editionDropdown}>
                <Dropdown
                    label={activeEdition.title}
                    links={links}
                    id="edition"
                />
            </div>
        );
    }
}
