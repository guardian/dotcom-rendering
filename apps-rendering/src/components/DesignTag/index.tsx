import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import {
	from,
	headlineBold17,
	headlineBold20,
	remSpace,
} from '@guardian/source-foundations';
import { background, text } from 'palette';
import type { FC } from 'react';
import { articleWidthStyles, darkModeCss } from '../../styles';

const designTagWrapper = css`
	${articleWidthStyles};
	margin-bottom: ${remSpace[1]};
`;

const designTagStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.designTag(format)};
	${headlineBold17};
	/**
	 * @TODO (2) Typography preset styles should not be overridden.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	*/
	line-height: 1.4;
	color: ${text.designTag(format)};
	display: inline-block;
	box-decoration-break: clone;
	padding: 0 0.375rem 0.125rem;
	${from.tablet} {
		${headlineBold20};
		/**
		 * @TODO (2) Typography preset styles should not be overridden.
		 * Please speak to your team's designer and update this to use a more appropriate preset.
		*/
		line-height: 1.4;
	}
	${darkModeCss`
		background-color: ${background.designTagDark(format)};
		color: ${text.designTagDark(format)};
	`}
`;

const interviewStyles = css`
	padding-left: 0;
	margin-bottom: 0;
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
			return (
				<div css={[designTagWrapper, interviewStyles]}>
					<span css={designTagStyles(format)}>Interview</span>
				</div>
			);
		case ArticleDesign.Timeline:
			return (
				<div css={designTagWrapper}>
					<span css={designTagStyles(format)}>Timeline</span>
				</div>
			);
		case ArticleDesign.Profile:
			return (
				<div css={designTagWrapper}>
					<span css={designTagStyles(format)}>Profile</span>
				</div>
			);
		default:
			return null;
	}
};

// ----- Exports ----- //

export default DesignTag;
