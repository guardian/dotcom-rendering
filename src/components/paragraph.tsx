// ----- Imports ----- //

import { FC, ReactNode } from 'react';
import React, { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { remSpace } from '@guardian/src-foundations';


// ----- Component ----- //

interface Props {
    children?: ReactNode;
}

const styles = css`
    ${body.medium()}
    overflow-wrap: break-word;
    margin: 0 0 ${remSpace[3]};
`;

const Paragraph: FC<Props> = ({ children }: Props) =>
    <p css={styles}>{children}</p>;


// ----- Exports ----- //

export default Paragraph;
