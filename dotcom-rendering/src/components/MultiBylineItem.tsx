import { css } from '@emotion/react';
import {
	from,
	headlineLightItalic24,
	headlineLightItalic28,
	headlineLightItalic34,
	headlineMediumItalic24,
	headlineMediumItalic28,
	neutral,
	space,
	textSans14,
	textSans24,
	textSans28,
	textSans34,
	textSansItalic17,
} from '@guardian/source/foundations';
import sanitise from 'sanitize-html';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { slugify } from '../model/enhance-H2s';
import { palette } from '../palette';
import type { MultiBylineItem as MultiBylineItemModel } from '../types/content';
import { subheadingStyles } from './Subheading';

const multiBylineItemStyles = css`
	padding-top: 8px;
`;

const labsBylineStyles = css`
	${textSansItalic17};
	line-height: 1.4;
`;

const headingLineStyles = css`
	width: 140px;
	margin: 8px 0 2px 0;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

/** Nesting is necessary in the bio styles because we receive a string of html from the
 * field. This can contain the following tags:
 * Blocks: p, ul, li
 * Inline: strong, em, a
 */
const bioStyles = css`
	${textSans14};
	padding: ${space[1]}px 0;
	color: ${palette('--mini-profiles-text-subdued')};
	p {
		margin-bottom: ${space[2]}px;
	}
	a {
		color: ${palette('--link-kicker-text')};
		text-underline-offset: 3px;
	}
	a:not(:hover) {
		text-decoration-color: ${neutral[86]};
	}
	a:hover {
		text-decoration: underline;
	}
	ul {
		list-style: none;
		margin: 0 0 ${space[2]}px;
		padding: 0;
	}
	ul li {
		padding-left: ${space[5]}px;
	}
	ul li p {
		display: inline-block;
		margin-bottom: 0;
	}
	ul li:before {
		display: inline-block;
		content: '';
		border-radius: 0.375rem;
		height: 10px;
		width: 10px;
		margin: 0 ${space[2]}px 0 -${space[5]}px;
		background-color: ${palette('--bullet-fill')};
	}
	strong {
		font-weight: bold;
	}
`;

const bottomBorderStyles = css`
	border-top: 1px solid ${palette('--article-border')};
	margin-bottom: ${space[2]}px;
`;

const headingMarginStyle = css`
	margin-bottom: ${space[2]}px;
`;

export const nonAnchorHeadlineStyles = ({
	format,
	fontWeight,
}: {
	format: ArticleFormat;
	fontWeight: 'light' | 'medium' | 'bold';
}) => css`
	${format.display === ArticleDisplay.Immersive
		? headlineLightItalic28
		: `
			/**
			 * Typography preset styles should not be overridden.
			 * This has been done because the styles do not directly map to the new presets.
			 * Please speak to your team's designer and update this to use a more appropriate preset.
			 */
			${fontWeight === 'medium' ? headlineMediumItalic24 : headlineLightItalic24};
		`};

	${from.tablet} {
		${format.display === ArticleDisplay.Immersive
			? headlineLightItalic34
			: `
				/**
				 * Typography preset styles should not be overridden.
				 * This has been done because the styles do not directly map to the new presets.
				 * Please speak to your team's designer and update this to use a more appropriate preset.
				 */
				${fontWeight === 'medium' ? headlineMediumItalic28 : headlineLightItalic28};
			`};
	}

	/** Labs uses sans text */
	${format.theme === ArticleSpecial.Labs &&
	css`
		${format.display === ArticleDisplay.Immersive
			? `
				/**
				 * Typography preset styles should not be overridden.
				 * This has been done because the styles do not directly map to the new presets.
				 * Please speak to your team's designer and update this to use a more appropriate preset.
				 */
				${textSans28};
				font-weight: 300;
				line-height: 1.15;
			`
			: `
				/**
				 * Typography preset styles should not be overridden.
				 * This has been done because the styles do not directly map to the new presets.
				 * Please speak to your team's designer and update this to use a more appropriate preset.
				 */
				${textSans24};
				${
					fontWeight === 'light'
						? 'font-weight: 300;'
						: fontWeight === 'medium'
						? 'font-weight: 500;'
						: 'font-weight: 700;'
				};
				line-height: 1.15;
			`};

		${from.tablet} {
			${format.display === ArticleDisplay.Immersive
				? `
					/**
					 * Typography preset styles should not be overridden.
					 * This has been done because the styles do not directly map to the new presets.
					 * Please speak to your team's designer and update this to use a more appropriate preset.
					 */
					${textSans34};
					font-weight: 300;
					line-height: 1.15;
				`
				: `
					/**
					 * Typography preset styles should not be overridden.
					 * This has been done because the styles do not directly map to the new presets.
					 * Please speak to your team's designer and update this to use a more appropriate preset.
					 */
					${textSans28};
					${
						fontWeight === 'light'
							? 'font-weight: 300;'
							: fontWeight === 'medium'
							? 'font-weight: 500;'
							: 'font-weight: 700;'
					};
					line-height: 1.15;
				`};
		}
	`}

	color: ${palette('--subheading-text')};

	/* We don't allow additional font weight inside h2 tags except for immersive articles */
	strong {
		font-weight: ${format.display === ArticleDisplay.Immersive
			? 'bold'
			: 'inherit'};
	}
`;

export const multiBylineBylineStyles = (format: ArticleFormat) => css`
	${nonAnchorHeadlineStyles({ format, fontWeight: 'light' })}
	padding-bottom: 8px;
	font-style: italic !important;
	margin-top: -4px;
	font-weight: 300 !important;
	color: ${neutral[46]};
	a {
		${subheadingStyles(format)}
		color: ${palette('--link-kicker-text')};
		text-decoration: none;
		font-style: normal;
		:hover {
			text-decoration: underline;
		}
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
`;

const bylineImageStyles = css`
	width: 80px;
	border-radius: 50%;
	margin-bottom: -8px;
	height: 80px;
	min-width: 80px;
	// TODO: make this different size based on screen size
	overflow: hidden;
	align-self: flex-end;
	${from.tablet} {
		height: 120px;
		min-width: 120px;
		width: 120px;
		margin-bottom: -12px;
	}
`;

interface MultiBylineItemProps {
	multiBylineItem: MultiBylineItemModel;
	format: ArticleFormat;
	children: React.ReactNode;
}

export const MultiBylineItem = ({
	multiBylineItem,
	format,
	children,
}: MultiBylineItemProps) => {
	return (
		<>
			<li css={multiBylineItemStyles} data-spacefinder-role="nested">
				<Byline
					title={multiBylineItem.title}
					byline={multiBylineItem.byline ?? ''}
					bylineHtml={multiBylineItem.bylineHtml ?? ''}
					contributors={multiBylineItem.contributors ?? []}
					format={format}
				/>
				<Bio html={multiBylineItem.bio} />
				{children}
			</li>
		</>
	);
};

type BylineProps = {
	title: string;
	bylineHtml: string;
	byline: string;
	imageOverrideUrl?: string;
	contributors: BlockContributor[];
	format: ArticleFormat;
};

const Byline = ({
	title,
	bylineHtml,
	byline,
	imageOverrideUrl,
	contributors,
	format,
}: BylineProps) => {
	const sanitizedHtml = sanitise(bylineHtml, {});

	return (
		<div css={bylineWrapperStyles}>
			<div css={bylineTextStyles}>
				<hr css={headingLineStyles} />
				<h3
					id={slugify(title)}
					css={[subheadingStyles(format), headingMarginStyle]}
				>
					{title}
				</h3>
				{bylineHtml ? (
					<h3
						css={[
							multiBylineBylineStyles(format),
							format.theme === ArticleSpecial.Labs &&
								labsBylineStyles,
							format.design === ArticleDesign.LiveBlog,
						]}
						dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
					/>
				) : null}
			</div>
			{imageOverrideUrl ?? contributors[0]?.imageUrl ? (
				<img
					src={imageOverrideUrl ?? contributors[0]?.imageUrl}
					alt={byline}
					css={bylineImageStyles}
				></img>
			) : null}
		</div>
	);
};

const Bio = ({ html }: { html?: string }) => {
	if (!html) return null;
	const sanitizedHtml = sanitise(html, {});
	return (
		<>
			<div
				css={bioStyles}
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
			<div css={bottomBorderStyles} />
		</>
	);
};
