import React, { Component } from 'react';
import { css } from 'emotion';

import { Hide } from '@frontend/web/components/Hide';
import { getCookie } from '@frontend/web/browser/cookie';

import { Logo } from './Logo';
import { Links } from './Links/Links';

const headerStyles = css`
    /* Ensure header height contains it's children */
    overflow: auto;
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
        const { isSignedIn } = this.state;

        return (
            <header className={headerStyles}>
                <Hide when="below" breakpoint="desktop">
                    <div id="edition-dropdown-portal" />
                </Hide>
                <Logo />
                {/*
                    TODO: The properties of the Links component
                    have been hardcoded to false. At some point
                    these need to be dynamic.
                */}
                <div id="reader-revenue-links-header-portal" />
                <Links isSignedIn={isSignedIn} />
            </header>
        );
    }
}
