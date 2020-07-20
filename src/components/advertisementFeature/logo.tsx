import React, { FC } from 'react';
import { css } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { darkModeCss } from 'styles';
import { remSpace, neutral, text, palette } from '@guardian/src-foundations';
import { Logo } from 'capi';

interface Props {
    logo: Logo;
}

const styles = css`
    display: flex;
    justify-content: space-between;
    ${textSans.medium()}
    color: ${text.supporting};

    a {
        color: ${palette.labs[300]};
    }

    ${darkModeCss`
        color: ${neutral[60]};
        img {
            padding: ${remSpace[2]};
            background: ${neutral[86]};
        }

        a {
            color: ${neutral[7]};
        }
    `}
`;

const Logo: FC<Props> = ({ logo }: Props) =>
    <section css={styles}>
        <span>Paid for by</span>
        <span>
            <a href={logo.url}>
                <img src={logo.src} alt={logo.alt} />
            </a>
        </span>
    </section>


export default Logo;
