// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { FC } from 'react';
import { body } from '@guardian/source-foundations';
import { LinkButton } from '@guardian/source-react-components';
import { background, border, hover, text } from 'palette';
import type { ArticleFormat } from '@guardian/libs';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
    padding: 1rem 0;
    color: ${text.paragraph(format)};

    ${darkModeCss`
        color: ${text.paragraphDark(format)};
    `}
`;

const hrStyles = (format: ArticleFormat): SerializedStyles => css`
    margin: 0 0 0.5rem 0;
    border: none;
    border-top: 1px solid ${border.specialReportAltAtom(format)};

    ${darkModeCss`
        border-color: ${border.specialReportAltAtomDark(format)};
    `}
`;

const headingStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
    text-transform: uppercase;
`;

const textStyles = css`
    ${body.medium()}
    padding-bottom: 0.5rem;
`;

const buttonStyles = (format: ArticleFormat): SerializedStyles => css`
    color: ${text.specialReportAltButton(format)};
    background-color: ${background.specialReportAltButton(format)};
    margin-bottom: 1rem;

    &:hover {
        background-color: ${hover.specialReportAltButton(format)};
    }

    ${darkModeCss`
        color: ${text.specialReportAltButtonDark(format)};
        background-color: ${background.specialReportAltButtonDark(format)};
        border: 1px solid ${border.specialReportAltButtonDark(format)};

        &:hover {
            background-color: ${hover.specialReportAltButtonDark(format)};
        }
    `}
`;

type Props = {
    format: ArticleFormat;
}

const SpecialReportAltAtom: FC<Props> = ({ format }) => (
    <aside css={styles(format)}>
        <hr css={hrStyles(format)} />
        <h2 css={headingStyles}>What is the Special Report Alt?</h2>
        <p css={textStyles}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
            sit eveniet autem nemo magnam esse nostrum repudiandae dolorem, ab
            delectus explicabo voluptatibus dolores reiciendis voluptas aliquam
            illo maxime? Debitis, molestias?
        </p>
        <LinkButton
            href="https://www.theguardian.com"
            size="small"
            priority="secondary"
            cssOverrides={buttonStyles(format)}
        >
            Find out more
        </LinkButton>
        <hr css={hrStyles(format)} />
    </aside>
);

// ----- Exports ----- //

export default SpecialReportAltAtom;
