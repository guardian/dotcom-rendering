// ----- Imports ----- //

import { FC, ReactNode } from 'react';
import React, { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';

import { spaceToRem } from 'styles';


// ----- Component ----- //

interface Props {
    children?: ReactNode;
}

const styles = css`
    ${body.medium()}
    overflow-wrap: break-word;
    margin: 0 0 ${spaceToRem(3)};
`;

const Paragraph: FC<Props> = ({ children }) =>
    <p css={styles}>{children}</p>;


// ----- Exports ----- //

export default Paragraph;
