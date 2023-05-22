// ----- Imports ----- //

import { css } from '@emotion/react';
import { palette } from '../../../src/palette';
import { headline } from '@guardian/source-foundations';

// ----- Component ----- //

export const HeadlineExample = ({ text }: { text: string }) => {
    const styles = css`
        color: ${palette('--headline-colour')};
        background-color: ${palette('--headline-background-colour')};
        ${headline.large()}
    `
    return <h1 css={styles}>{text}</h1>;
}
