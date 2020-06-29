import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Logo } from 'capi';
import { Format } from '@guardian/types/Format';
import { Branding } from '../../../api-models/ts/target/scala-2.12/src_managed/main/thrift/@guardian/apps-rendering-api-models/branding';
import Anchor from 'components/anchor';
import { darkModeCss } from 'styles';
import { remSpace, text, neutral } from '@guardian/src-foundations';

interface Props {
    branding: Branding;
    format: Format;
}

const styles = (lightModeImage: string, darkModeImage?: string) => css`
    margin-bottom: ${remSpace[6]};

    .image img {
        content: url(${lightModeImage});
    }

    img {
        display: block;
        margin: ${remSpace[2]} 0;
    }

    label {
        color: ${text.supporting};
    }

    ${darkModeCss`
        .image img {
            content: url(${darkModeImage ?? lightModeImage});
        }

        label {
            color: ${neutral[86]};
        }
    `}
`;

const Logo: FC<Props> = ({ branding, format }: Props) => {
    return (
        <section css={styles(branding.logo, branding.altLogo)}>
            <label>{branding.label}</label>
            <a href={branding.sponsorUri} className="image">
                <img alt={branding.sponsorName} />
            </a>
            <Anchor href={branding.aboutUri} format={format} >
                About this content
            </Anchor>
        </section>
    )
}

export default Logo;
