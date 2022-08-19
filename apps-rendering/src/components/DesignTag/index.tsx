import { ArticleDesign, ArticleFormat} from '@guardian/libs';
import {headline, remSpace} from '@guardian/source-foundations';
import { background, text } from '@guardian/common-rendering/src/editorialPalette';
import {FC} from "react";
import {css} from "@emotion/react";
import {articleWidthStyles} from "../../styles";

type Props = {
	format: ArticleFormat;
};

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

export const DesignTag: FC<Props> = ({ format }) => {
	return (
		<div css={css`${articleWidthStyles}`}>
			<div css={css`
				background-color: ${background.headlineTag(format)};
				color: ${text.headlineTag(format)};
				display: inline-block;
				padding-left: ${remSpace[2]};
				padding-right: ${remSpace[2]};
				padding-bottom: ${remSpace[1]};
				${headline.xxsmall({fontWeight: 'bold'})}
			`}>
				{decideText(format)}
			</div>
		</div>
	)
};
