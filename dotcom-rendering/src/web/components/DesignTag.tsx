import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';

const decideText = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Analysis:
			return 'Analysis';
		case ArticleDesign.Explainer:
			return 'Explainer';
		case ArticleDesign.Audio:
			return 'Audio';
		case ArticleDesign.Comment:
			return 'Comment';
		case ArticleDesign.Correction:
			return 'Correction';
		case ArticleDesign.DeadBlog:
			return 'DeadBlog';
		case ArticleDesign.Editorial:
			return 'Editorial';
		case ArticleDesign.Feature:
			return 'Feature';
		case ArticleDesign.Gallery:
			return 'Gallery';
		case ArticleDesign.Interview:
			return 'Interview';
		case ArticleDesign.Letter:
			return 'Letter';
		case ArticleDesign.LiveBlog:
			return 'LiveBlog';
		case ArticleDesign.MatchReport:
			return 'MatchReport';
		case ArticleDesign.NewsletterSignup:
			return 'NewsletterSignup';
		case ArticleDesign.Obituary:
			return 'Obituary';
		case ArticleDesign.PhotoEssay:
			return 'PhotoEssay';
		case ArticleDesign.PrintShop:
			return 'PrintShop';
		case ArticleDesign.Quiz:
			return 'Quiz';
		case ArticleDesign.Recipe:
			return 'Recipe';
		case ArticleDesign.Review:
			return 'Review';
		case ArticleDesign.Video:
			return 'Video';
		default:
			return 'Article';
	}
};
export const DesignTag = ({ format }: { format: ArticleFormat }) => {
	const palette = decidePalette(format);
	return (
		<div
			css={css`
				background-color: ${palette.background.designTag};
				color: ${palette.text.designTag};
				display: inline-block;
				padding-left: ${space[2]}px;
				padding-right: ${space[2]}px;
				padding-bottom: ${space[1]}px;
				margin-top: ${space[2]}px;
				margin-bottom: ${space[1]}px;
				${headline.xxsmall({ fontWeight: 'bold' })}
			`}
		>
			{decideText(format)}
		</div>
	);
};
