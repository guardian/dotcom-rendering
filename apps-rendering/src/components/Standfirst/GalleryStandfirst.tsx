// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { body, from, neutral, remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import type { ReactNode } from 'react';
import { renderStandfirstText } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const styles = css`
	${grid.span('centre-column-start', 3)}
	${body.medium({ fontWeight: 'bold', lineHeight: 'tight' })}
	color: ${neutral[100]};
	grid-row: 5/6;
	padding-bottom: ${remSpace[2]};

	${from.tablet} {
		${grid.span('centre-column-start', 8)}
	}

	${from.desktop} {
		${grid.span('centre-column-start', 6)}
	}

	${darkModeCss`
		color: ${neutral[86]};
	`}
`;

const bylineStyles = css`
	padding-top: ${remSpace[2]};
`;

const renderContent = (
	standfirst: DocumentFragment,
	format: ArticleFormat,
	byline: string,
	bylineHtml: Option<DocumentFragment>,
): ReactNode => {
	const rendered = renderStandfirstText(standfirst, format);
	const bylineInStandfirst =
		byline !== '' && standfirst.textContent?.includes(byline);

	// Immersives append the byline to the standfirst.
	// Sometimes CAPI includes this within the standfirst HTML,
	// sometimes we have to add it ourselves from the byline HTML.
	if (!bylineInStandfirst && bylineHtml.kind === OptionKind.Some) {
		return (
			<>
				{rendered}
				<address css={bylineStyles}>
					<p>by {renderStandfirstText(bylineHtml.value, format)}</p>
				</address>
			</>
		);
	}

	return rendered;
};

type Props = {
	standfirst: Option<DocumentFragment>;
	byline: string;
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
};

const GalleryStandfirst: React.FC<Props> = ({
	standfirst,
	format,
	byline,
	bylineHtml,
}) =>
	maybeRender(standfirst, (standfirstDoc) => (
		<div css={styles}>
			{renderContent(standfirstDoc, format, byline, bylineHtml)}
		</div>
	));

// ----- Exports ----- //

export default GalleryStandfirst;
