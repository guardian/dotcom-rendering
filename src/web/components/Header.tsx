import React, { useState, useEffect } from 'react';
import { css } from 'emotion';

import { EditionDropdown } from '@frontend/web/components/EditionDropdown';
import { Hide } from '@root/src/web/components/Hide';
import { Logo } from '@frontend/web/components/Logo';
import { Links } from '@frontend/web/components/Links';

import { getCookie } from '@root/src/web/browser/cookie';

const headerStyles = css`
    /* Ensure header height contains it's children */
    overflow: auto;
    /* Prevent a scrollbar appearing here on IE/Edge */
    -ms-overflow-style: none;
`;

type Props = {
    edition: Edition;
};

export const Header = ({ edition }: Props) => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsSignedIn(!!getCookie('GU_U'));
    }, []);

    return (
        <header className={headerStyles}>
            <Hide when="below" breakpoint="desktop">
                <div data-island="edition-root">
                    <EditionDropdown
                        edition={edition}
                        dataLinkName="nav2 : topbar : edition-picker: toggle"
                    />
                </div>
            </Hide>
            <Logo />
            <div data-island="reader-revenue-links-header" />
            <Links isSignedIn={isSignedIn} />
        </header>
    );
};
