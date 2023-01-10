import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette/background';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { from, headline, remSpace } from '@guardian/source-foundations';
import type { FC } from 'react';
import { articleWidthStyles, darkModeCss } from '../../styles';

const designTagWrapper = css`
	${articleWidthStyles};
	margin-bottom: ${remSpace[1]};
`;

const designTagStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.designTag(format)};
	${headline.xxxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	color: ${text.designTag(format)};
	display: inline-block;
	box-decoration-break: clone;
	padding: 0 0.375rem 0.125rem;
	${from.tablet} {
		${headline.xxsmall({ fontWeight: 'bold', lineHeight: 'loose' })}
	}
	${darkModeCss`
		background-color: ${background.designTagDark(format)};
		color: ${text.designTagDark(format)};
	`}
`;

type Props = {
	format: ArticleFormat;
};

const DesignTag: FC<Props> = ({ format }) => {
	switch (format.design) {
		case ArticleDesign.Analysis:
			return (
				<div css={designTagWrapper}>
					<span css={designTagStyles(format)}>Analysis</span>
				</div>
			);
		case ArticleDesign.Explainer:
			return (
				<div css={designTagWrapper}>
					<span css={designTagStyles(format)}>Explainer</span>
				</div>
			);
		case ArticleDesign.Letter:
			return (
				<div css={designTagWrapper}>
					<span css={designTagStyles(format)}>Letters</span>
				</div>
			);
		case ArticleDesign.Obituary:
			return (
				<div css={designTagWrapper}>
					<span css={designTagStyles(format)}>Obituary</span>
				</div>
			);
		case ArticleDesign.Review:
			return (
				<div css={designTagWrapper}>
					<span css={designTagStyles(format)}>Review</span>
				</div>
			);
		case ArticleDesign.Interview:
			return <span css={designTagStyles(format)}>Interview</span>;
		default:
			return null;
	}
};

// ----- Exports ----- //

export default DesignTag;
