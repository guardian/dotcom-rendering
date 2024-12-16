import { css } from '@emotion/react';
import {
	from,
	headlineLightItalic24,
	headlineLightItalic28,
	headlineLightItalic34,
	headlineMediumItalic24,
	headlineMediumItalic28,
	headlineMediumItalic34,
	space,
	textSansItalic24,
	textSansItalic28,
	textSansItalic34,
} from '@guardian/source/foundations';
import sanitise, { defaults } from 'sanitize-html';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { slugify } from '../model/enhance-H2s';
import { palette } from '../palette';
import type { MultiByline as MultiBylineModel } from '../types/content';
import { Avatar } from './Avatar';
import { Bio } from './Bio';
import { EndNote } from './EndNote';
import { subheadingStyles } from './Subheading';

const multiBylineStyles = css`
	padding-top: 8px;
`;

const headingLineStyles = css`
	width: 140px;
	margin: 8px 0 2px 0;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

const headingMarginStyle = css`
	margin-bottom: ${space[2]}px;
`;

const fontStyles = ({
	format,
	fontWeight,
}: {
	format: ArticleFormat;
	fontWeight: 'light' | 'medium';
}) => css`
	${format.display === ArticleDisplay.Immersive
		? fontWeight === 'light'
			? headlineLightItalic28
			: headlineMediumItalic28
		: fontWeight === 'light'
		? headlineLightItalic24
		: headlineMediumItalic24};

	${from.tablet} {
		${format.display === ArticleDisplay.Immersive
			? fontWeight === 'light'
				? headlineLightItalic34
				: headlineMediumItalic34
			: fontWeight === 'light'
			? headlineLightItalic28
			: headlineMediumItalic28}
	}

	/** Labs uses sans text */
	${format.theme === ArticleSpecial.Labs &&
	css`
		${format.display === ArticleDisplay.Immersive
			? textSansItalic28
			: textSansItalic24}

		${from.tablet} {
			${format.display === ArticleDisplay.Immersive
				? textSansItalic34
				: textSansItalic28}
		}
	`}
`;

const nonAnchorHeadlineStyles = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			return fontStyles({ format, fontWeight: 'light' });

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
			return fontStyles({ format, fontWeight: 'medium' });

		default:
			return fontStyles({ format, fontWeight: 'medium' });
	}
};

const bylineStyles = (format: ArticleFormat) => css`
	${nonAnchorHeadlineStyles(format)}
	margin-top: -4px;
	color: ${palette('--multi-byline-non-linked-text')};
	a {
		${subheadingStyles(format)}
		color: ${palette('--link-kicker-text')};
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
	span[data-contributor-rel='author'] {
		${subheadingStyles(format)}
		color: ${palette('--multi-byline-non-linked-text')};
	}
`;

const bylineWrapperStyles = css`
	display: flex;
	width: 100%;
	overflow: hidden;
	border-bottom: 1px solid ${palette('--article-border')};
	margin-bottom: ${space[2]}px;
`;

const bylineTextStyles = css`
	flex-grow: 1;
	margin-bottom: ${space[6]}px;
	${from.tablet} {
		margin-bottom: ${space[9]}px;
	}
`;

const bylineImageStyles = css`
	width: 80px;
	border-radius: 50%;
	margin-left: 10px;
	margin-bottom: -8px;
	height: 80px;
	min-width: 80px;
	overflow: hidden;
	align-self: flex-end;
	${from.tablet} {
		height: 120px;
		min-width: 120px;
		width: 120px;
		margin-bottom: -12px;
	}
`;

interface Props {
	multiByline: MultiBylineModel;
	format: ArticleFormat;
	children: React.ReactNode;
}

export const MultiByline = ({ multiByline, format, children }: Props) => {
	return (
		<div css={multiBylineStyles} data-spacefinder-role="nested">
			<Byline
				title={multiByline.title}
				byline={multiByline.byline}
				bylineHtml={multiByline.bylineHtml}
				imageUrl={multiByline.imageUrl}
				format={format}
			/>
			<Bio html={multiByline.bio} />
			{children}
			{multiByline.endNote ? (
				<EndNote text={multiByline.endNote} />
			) : null}
		</div>
	);
};

type BylineProps = {
	title: string;
	bylineHtml: string;
	byline: string;
	imageUrl?: string;
	format: ArticleFormat;
};

const Byline = ({
	title,
	bylineHtml,
	byline,
	imageUrl,
	format,
}: BylineProps) => {
	const sanitizedHtml = sanitise(bylineHtml, {
		allowedAttributes: {
			...defaults.allowedAttributes,
			span: ['data-contributor-rel'],
		},
	});

	return (
		<div css={bylineWrapperStyles}>
			<div css={bylineTextStyles}>
				<hr css={headingLineStyles} />
				<hgroup>
					<h2
						id={slugify(title)}
						css={[subheadingStyles(format), headingMarginStyle]}
					>
						{title}
					</h2>
					<p
						css={bylineStyles(format)}
						dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
					/>
				</hgroup>
			</div>
			{!!imageUrl && (
				<div css={bylineImageStyles}>
					<Avatar src={imageUrl} alt={byline} />
				</div>
			)}
		</div>
	);
};
