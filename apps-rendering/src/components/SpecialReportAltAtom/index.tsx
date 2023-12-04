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
};

const SpecialReportAltAtom: FC<Props> = ({ format }) => (
	<aside css={styles(format)}>
		<hr css={hrStyles(format)} />
		<h2 css={headingStyles}>WHAT IS THE COTTON CAPITAL SERIES?</h2>
		<p css={textStyles}>
			Cotton Capital explores how transatlantic slavery shaped the
			Guardian, Manchester, Britain and the world. Stemming from an
			investigation into the Guardian founders&#39; own links to slavery,
			this continuing series explores our history and its enduring
			legacies today.
		</p>
		<LinkButton
			href="https://www.theguardian.com/p/njenc"
			size="small"
			priority="secondary"
			cssOverrides={buttonStyles(format)}
		>
			Read more about the series
		</LinkButton>
		<hr css={hrStyles(format)} />
	</aside>
);

// ----- Exports ----- //

export default SpecialReportAltAtom;
