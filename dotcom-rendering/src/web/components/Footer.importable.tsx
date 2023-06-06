// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { navigationClient, userClient } from '../lib/bridget/index';
import { Palette } from 'src/types/palette';
import { space, textSans } from '@guardian/source-foundations';

// ----- Component ----- //

const privacyPolicyLink = "https://www.theguardian.com/help/privacy-policy";
const privacySettingsLink = "https://www.theguardian.com/help/privacy-settings";

const styles = (palette: Palette): SerializedStyles => css`
    color: ${palette.text.footer};
    ${textSans.small()}
    padding-top: ${space[3]}px;
    padding-bottom: ${space[3]}px;
`;

const linkStyles = (palette: Palette): SerializedStyles => css`
    color: ${palette.text.footer};
`;

interface Props {
    year: number;
    palette: Palette;
}

const openPrivacyPolicy: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    void navigationClient.openPrivacyPolicy();
};

const openPrivacySettings: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    void navigationClient.openPrivacySettings();
};

export const Footer: FC<Props> = ({ palette, year }) => {
    const [isCcpa, setIsCcpa] = useState(false);

    useEffect(() => {
        void userClient.doesCcpaApply().then(setIsCcpa);
    }, []);

    return (
        <div css={styles(palette)}>
            &#169; {year} Guardian News and Media Limited or its
            affiliated companies. All rights reserved. (modern)
            <br />
            <a
                onClick={openPrivacySettings}
                href={isCcpa ? privacyPolicyLink : privacySettingsLink}
                css={linkStyles(palette)}
            >
                {isCcpa
                    ? "California Residents - Do Not Sell"
                    : "Privacy Settings"
                }
            </a>
            &nbsp;&#183;&nbsp;
            <a
                onClick={openPrivacyPolicy}
                href={privacyPolicyLink}
                css={linkStyles(palette)}
            >
                Privacy Policy
            </a>
        </div>
    );
};
