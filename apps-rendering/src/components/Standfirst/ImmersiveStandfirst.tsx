// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { OptionKind } from '../../../vendor/@guardian/types/index';
import { grid } from 'grid/grid';
import { maybeRender } from 'lib';
import type { Optional } from 'optional';
import { text } from 'palette';
import type { ReactNode } from 'react';
import { renderStandfirstText } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Functions ----- //

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

// ----- Component ----- //

const styles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.centre}
	${headline.xsmall({ fontWeight: 'light' })}
	padding: ${remSpace[2]} ${remSpace[5]} ${remSpace[9]} 0;
	color: ${text.standfirst(format)};
	grid-row: 7/8;

	${from.mobileLandscape} {
		padding-top: ${remSpace[4]};
	}

	${from.tablet} {
		padding-top: ${remSpace[1]};
	}

	${darkModeCss`
		color: ${text.standfirstDark(format)};
	`}
`;

type Props = {
	standfirst: Optional<DocumentFragment>;
	byline: string;
	bylineHtml: Option<DocumentFragment>;
	format: ArticleFormat;
};

const ImmersiveStandfirst: React.FC<Props> = ({
	standfirst,
	format,
	byline,
	bylineHtml,
}) =>
	maybeRender(standfirst.toOption(), (standfirstDoc) => (
		<div css={styles(format)}>
			{renderContent(standfirstDoc, format, byline, bylineHtml)}
		</div>
	));

// ----- Exports ----- //

export default ImmersiveStandfirst;
