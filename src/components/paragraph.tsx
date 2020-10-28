// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/core";
import { css } from "@emotion/core";
import { remSpace } from "@guardian/src-foundations";
import { body, textSans } from "@guardian/src-foundations/typography";
import type { Format } from "@guardian/types/Format";
import { Design } from "@guardian/types/Format";
import React from "react";
import type { FC, ReactNode } from "react";

// ----- Component ----- //

interface Props {
    children?: ReactNode;
    format: Format;
}

const styles = (design: Design): SerializedStyles => {
    const advertisementFeature =
        design === Design.AdvertisementFeature ? textSans.medium() : null;

    return css`
        ${body.medium()}
        overflow-wrap: break-word;
        margin: 0 0 ${remSpace[3]};

        ${advertisementFeature}
    `;
};

const Paragraph: FC<Props> = ({ children, format }: Props) => (
    <p css={styles(format.design)}>{children}</p>
);

// ----- Exports ----- //

export default Paragraph;
