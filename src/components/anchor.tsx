// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/core";
import { css } from "@emotion/core";
import { palette } from "@guardian/src-foundations";
import { neutral } from "@guardian/src-foundations/palette";
import type { Format } from "@guardian/types/Format";
import { Design } from "@guardian/types/Format";
import type { FC, ReactNode } from "react";
import React from "react";
import { darkModeCss } from "styles";
import { getThemeStyles } from "themeStyles";

// ----- Component ----- //

interface Props {
    href: string;
    children?: ReactNode;
    format: Format;
    className?: SerializedStyles;
}

const styles = css`
    text-decoration: none;

    ${darkModeCss`
        color: ${neutral[86]};
        border-color: ${neutral[46]};
    `}
`;

const colour = (format: Format): SerializedStyles => {
    const { kicker, inverted } = getThemeStyles(format.theme);
    switch (format.design) {
        case Design.AdvertisementFeature:
            return css`
                color: ${palette.labs[300]};
                border-bottom: 0.0625rem solid ${neutral[86]};

                ${darkModeCss`
                    color: ${neutral[86]};
                `}
            `;
        case Design.Media:
            return css`
                color: ${inverted};
                border-bottom: 0.0625rem solid ${neutral[20]};
            `;
        default:
            return css`
                color: ${kicker};
                border-bottom: 0.0625rem solid ${neutral[86]};
            `;
    }
};

const Anchor: FC<Props> = ({ format, children, href, className }: Props) => (
    <a css={[styles, colour(format), className]} href={href}>
        {children}
    </a>
);

// ----- Exports ----- //

export default Anchor;
