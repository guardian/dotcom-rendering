import React, { FC } from 'react';
import Anchor from 'components/anchor';
import { css, SerializedStyles } from '@emotion/core';
import { Logo } from 'capi';
import { Format } from '@guardian/types/Format';
import { darkModeCss } from 'styles';
import { remSpace, text, neutral } from '@guardian/src-foundations';
import { Branding } from '@guardian/apps-rendering-api-models/branding';
import { Item, getFormat } from 'item';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';
import { textSans } from '@guardian/src-foundations/typography';

interface Props {
    branding: Branding;
    format: Format;
}

const styles = (lightModeImage: string, darkModeImage?: string): SerializedStyles => css`
    margin: ${remSpace[9]} 0;
    ${textSans.small()}

    img {
        content: url("${lightModeImage}");
        display: block;
        margin: ${remSpace[2]} 0;
        max-height: 60px;
    }

    label {
        color: ${text.supporting};
    }

    ${darkModeCss`
        img {
            content: url("${darkModeImage ?? lightModeImage}");
        }

        label {
            color: ${neutral[86]};
        }
    `}
`;

const OptionalLogo = (item: Item): JSX.Element => pipe2(
    item.branding,
    map(branding => <Logo branding={branding} format={getFormat(item)} />),
    withDefault(<></>)
)

export const cleanImageUrl = (url: string): string =>
    encodeURI(url)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')

const Logo: FC<Props> = ({ branding, format }: Props) => {
    const lightLogo = cleanImageUrl(branding.logo);
    const darkLogo = cleanImageUrl(branding.altLogo ?? '');

    return (
        <section css={styles(lightLogo, darkLogo)}>
            <label>{branding.label}</label>
            <a href={branding.sponsorUri}>
                <img alt={branding.sponsorName} />
            </a>
            <Anchor href={branding.aboutUri} format={format} >
                About this content
            </Anchor>
        </section>
    )
}

export default OptionalLogo;
