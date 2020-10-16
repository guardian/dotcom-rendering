import React, { FC } from 'react';
import Anchor from 'components/anchor';
import { css, SerializedStyles } from '@emotion/core';
import { Format } from '@guardian/types/Format';
import { darkModeCss } from 'styles';
import { remSpace, text, neutral } from '@guardian/src-foundations';
import { Branding } from '@guardian/apps-rendering-api-models/branding';
import { Item, getFormat } from 'item';
import { pipe2 } from 'lib';
import { map, withDefault } from '@guardian/types/option';
import { textSans } from '@guardian/src-foundations/typography';
import { getPillarStyles } from 'pillarStyles';

interface Props {
    branding: Branding;
    format: Format;
}

const styles = (format: Format,
    lightModeImage: string,
    darkModeImage?: string): SerializedStyles => {
    const { kicker, inverted } = getPillarStyles(format.pillar);
    return css`
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

        a {
            color: ${kicker};
        }

        ${darkModeCss`
            img {
                content: url("${darkModeImage ?? lightModeImage}");
            }

            label {
                color: ${neutral[86]};
            }

            a {
                color: ${inverted};
            }
        `}
    `;
}

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
    const darkLogo = cleanImageUrl(branding.altLogo ?? branding.logo);

    return (
        <section css={styles(format, lightLogo, darkLogo)}>
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
