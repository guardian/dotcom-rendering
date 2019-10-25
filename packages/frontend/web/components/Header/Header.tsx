import React, { Component } from 'react';
import { css } from 'emotion';

import { Hide } from '@frontend/web/components/Hide';
import { getCookie } from '@frontend/web/browser/cookie';

import { Logo } from './Logo';
import { EditionDropdown } from './EditionDropdown';
import { Links } from './Links/Links';
import { ReaderRevenueLinks } from './ReaderRevenueLinks';
import { Nav } from './Nav/Nav';

const headerStyles = css`
    position: static;
`;

interface Props {
    nav: NavType;
    pillar: Pillar;
    edition: Edition;
}

export class Header extends Component<Props, { isSignedIn: boolean }> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isSignedIn: false,
        };
    }

    public componentDidMount() {
        this.setState({
            isSignedIn: !!getCookie('GU_U'),
        });
    }

    public render() {
        const { nav, pillar, edition } = this.props;
        const { isSignedIn } = this.state;

        return (
            <header className={headerStyles}>
                <Hide when="below" breakpoint="desktop">
                    <EditionDropdown
                        edition={edition}
                        dataLinkName={'nav2 : topbar : edition-picker: toggle'}
                    />
                </Hide>
                <Logo />
                {/*
                        TODO: The properties of the Links component
                        have been hardcoded to false. At some point
                        these need to be dynamic.
                    */}

                <ReaderRevenueLinks
                    urls={nav.readerRevenueLinks.header}
                    edition={edition}
                    dataLinkNamePrefix={'nav2 : '}
                    noResponsive={false}
                />
                <Links isSignedIn={isSignedIn} />
                <Nav pillar={pillar} nav={nav} />
            </header>
        );
    }
}
