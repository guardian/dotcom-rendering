import { css } from '@emotion/react';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '@guardian/libs';
import {
	from,
	headlineMedium20,
	headlineMedium24,
	headlineMedium28,
	textSans20,
	until,
} from '@guardian/source/foundations';
import { unescapeData } from '../lib/escapeData';
import { palette } from '../palette';
import { QuoteIcon } from './QuoteIcon';

const pullQuoteCss = css`
	color: ${palette('--pullquote-text')};
`;

const fontCss = (role: string, format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) {
		return css`
			${textSans20};
			/**
			 * Typography preset styles should not be overridden.
			 * This has been done because the styles do not directly map to the new presets.
			 * Please speak to your team's designer and update this to use a more appropriate preset.
			 */
			font-weight: 500;
		`;
	}

	switch (role) {
		case 'showcase':
			switch (format.design) {
				case ArticleDesign.Standard:
				case ArticleDesign.Profile:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
				case ArticleDesign.Analysis:
				case ArticleDesign.Feature:
				case ArticleDesign.Interview:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review:
					return css`
						${headlineMedium24};
						${from.tablet} {
							${headlineMedium28};
						}
					`;
				case ArticleDesign.Obituary:
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				default:
					return css`
						${headlineMedium24};
						/**
						 * Typography preset styles should not be overridden.
						 * This has been done because the styles do not directly map to the new presets.
						 * Please speak to your team's designer and update this to use a more appropriate preset.
						 */
						font-weight: 400;
						${from.tablet} {
							${headlineMedium28};
							/**
							 * Typography preset styles should not be overridden.
							 * This has been done because the styles do not directly map to the new presets.
							 * Please speak to your team's designer and update this to use a more appropriate preset.
							 */
							font-weight: 400;
						}
					`;
			}
		case 'supporting':
			switch (format.design) {
				case ArticleDesign.Standard:
				case ArticleDesign.Profile:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
				case ArticleDesign.Analysis:
				case ArticleDesign.Feature:
				case ArticleDesign.Interview:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review:
					return css`
						${headlineMedium20};
					`;
				case ArticleDesign.Obituary:
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				default:
					return css`
						${headlineMedium20};
						/**
						 * Typography preset styles should not be overridden.
						 * This has been done because the styles do not directly map to the new presets.
						 * Please speak to your team's designer and update this to use a more appropriate preset.
						 */
						font-weight: 400;
					`;
			}
		// Inline
		default:
			switch (format.design) {
				case ArticleDesign.Standard:
				case ArticleDesign.Profile:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
				case ArticleDesign.Analysis:
				case ArticleDesign.Feature:
				case ArticleDesign.Interview:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review:
					return css`
						${headlineMedium20};
						${from.tablet} {
							${headlineMedium24};
						}
					`;
				case ArticleDesign.Obituary:
				case ArticleDesign.Editorial:
				case ArticleDesign.Comment:
				default:
					return css`
						${headlineMedium20};
						/**
						 * Typography preset styles should not be overridden.
						 * This has been done because the styles do not directly map to the new presets.
						 * Please speak to your team's designer and update this to use a more appropriate preset.
						 */
						font-weight: 400;
						${from.tablet} {
							${headlineMedium24};
							/**
							 * Typography preset styles should not be overridden.
							 * This has been done because the styles do not directly map to the new presets.
							 * Please speak to your team's designer and update this to use a more appropriate preset.
							 */
							font-weight: 400;
						}
					`;
			}
	}
};

const inlineQuoteCss = css`
	margin-top: 14px;
	margin-bottom: 14px;
	max-width: 90%;

	${from.tablet} {
		max-width: 80%;
	}
`;

const supportingQuoteCss = css`
	position: relative;
	width: 40%;
	background-color: ${palette('--pullquote-background')};
	margin-top: 2px;
	margin-right: 10px;
	margin-bottom: 14px;
	clear: left;
	float: left;

	${from.leftCol} {
		position: relative;
		border: 1px solid ${palette('--pullquote-border')};
		padding: 2px 10px 16px 10px;
		/* Partially left */
		width: 240px;
		margin-left: -100px;
		margin-top: 5px;
	}
`;

const basePhotoEssayQuoteCss = css`
	position: relative;
	padding: 6px 10px 12px 10px;
	margin-bottom: 16px;
`;

const rolePhotoEssayQuoteCss = (role: string) => {
	switch (role) {
		case 'supporting': {
			return css`
				margin-left: -10px;
				margin-right: 10px;
				padding-left: 10px;
				padding-right: 10px;
				clear: left;
				float: left;
				${until.mobileLandscape} {
					width: 100%;
				}
				${from.mobileLandscape} {
					width: 220px;
				}
				${from.leftCol} {
					width: 140px;
					margin-left: -150px;
				}
				${from.wide} {
					width: 200px;
					margin-left: -215px;
				}
			`;
		}
		default: {
			return css`
				margin-left: -10px;
				display: block;
			`;
		}
	}
};

const alignmentCss = (role: string, format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.PhotoEssay:
			return css`
				${basePhotoEssayQuoteCss}
				${rolePhotoEssayQuoteCss(role)}
			`;
		default:
			return css`
				${role === 'supporting' ? supportingQuoteCss : inlineQuoteCss}
			`;
	}
};

const blockquoteCss = css`
	display: inline;
	font-style: italic;
`;

type Props = {
	html?: string;
	format: ArticleFormat;
	role: string;
	attribution?: string;
};

export const PullQuoteBlockComponent = ({
	html,
	format,
	attribution,
	role,
}: Props) => {
	if (!html) return <></>;

	return (
		<aside
			css={[
				pullQuoteCss,
				fontCss(role, format),
				alignmentCss(role, format),
			]}
			data-spacefinder-role={role}
		>
			<QuoteIcon colour={palette('--pullquote-icon')} />
			<blockquote
				css={blockquoteCss}
				dangerouslySetInnerHTML={{
					__html: unescapeData(html),
				}}
			/>
			{!!attribution && (
				<footer>
					<cite>{attribution}</cite>
				</footer>
			)}
		</aside>
	);
};
