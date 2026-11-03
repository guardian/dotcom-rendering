import { css, type SerializedStyles } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold20,
	headlineMedium17,
	space,
	textSans17,
	textSans20,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import type { LayoutType } from '../layouts/lib/articleArrangements';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { palette as themePalette } from '../palette';
import type { TagType } from '../types/tag';
import { Hide } from './Hide';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.island';

type Props = {
	format: ArticleFormat;
	layoutType?: LayoutType;
	tags: TagType[];
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
	isMatch?: boolean;
};

const sectionLabelLink = css`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

const rowBelowLeftCol = (format: ArticleFormat) => {
	if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return css`
			display: inline-block;
			flex-direction: column;

			${from.tablet} {
				display: flex;
				flex-direction: row;
			}

			${from.desktop} {
				display: flex;
				flex-direction: column;
			}
		`;
	}

	return css`
		flex-direction: column;
		display: inline-block;

		${until.leftCol} {
			display: flex;
			flex-direction: row;
		}
	`;
};

const marginBottom = css`
	margin-bottom: 5px;
`;

const marginRight = css`
	${until.leftCol} {
		margin-right: ${space[2]}px;
	}
`;

const invertedStyle = (format: ArticleFormat) => css`
	/* Handle text wrapping onto a new line */
	white-space: pre-wrap;
	box-decoration-break: clone;
	line-height: 28px;
	padding-right: ${space[1]}px;
	padding-top: ${space[1]}px;
	padding-bottom: ${space[2]}px;
	${format.display === ArticleDisplay.Immersive ? from.leftCol : from.wide} {
		line-height: 28px;
	}
`;

const fontStyles = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return css`
						${textSansBold17};
						line-height: 36px;
						${from.desktop} {
							${textSansBold20};
							/* Overrides the line-height from the font preset */
							line-height: 36px;
						}
					`;
				default:
					return css`
						${headlineBold17}
						line-height: 36px;

						${from.desktop} {
							${headlineBold20}
							/* Overrides the line-height from the font preset */
							line-height: 36px;
						}
					`;
			}
		default:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					switch (format.display) {
						case ArticleDisplay.Immersive:
							return css`
								${textSansBold20};
								line-height: 23px;
								${from.leftCol} {
									line-height: 20px;
								}
							`;
						default:
							return css`
								${textSans20};
								line-height: 23px;
								${from.leftCol} {
									line-height: 20px;
								}
							`;
					}
				default:
					return css`
						${headlineBold17}
						${from.wide} {
							${headlineBold20}
						}
					`;
			}
	}
};

const secondaryFontStyles = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) {
		return css`
			${textSans17}
		`;
	}
	return css`
		${headlineMedium17};
		/**
		 * Typography preset styles should not be overridden.
		 * This has been done because the styles do not directly map to the new presets.
		 * Please speak to your team's designer and update this to use a more appropriate preset.
		 */
		font-weight: 400;
	`;
};

const displayBlock = css`
	display: block;
`;

const breakWord = css`
	word-break: break-word;
`;

const sectionPadding = css`
	padding-left: 10px;
	${from.mobileLandscape} {
		padding-left: 18px;
	}
	${from.tablet} {
		padding-left: ${space[1]}px;
	}
`;

const immersiveGridTitleBelowDesktop = css`
	${until.desktop} {
		color: white;
		padding: 3px 6px 4px 6px;
		box-shadow: none;
	}
`;

const immersiveLandscapeTitle = css`
	${from.tablet} {
		margin-left: -29px;
	}
	${from.desktop} {
		margin-left: -10px;
	}
	${from.leftCol} {
		margin-left: 0;
	}

	span {
		${from.tablet} {
			padding-left: 10px;
		}
		${from.leftCol} {
			padding-left: 0;
		}
	}
`;

const immersiveGridTitleWrapperBelowDesktop = css`
	${until.desktop} {
		padding-left: 9px;
		padding-right: 9px;
	}
`;

const seriesTitleBackground = css`
	background-color: ${themePalette('--series-title-background')};
	box-shadow:
		-6px 0 0 0 ${themePalette('--series-title-background')},
		6px 0 0 0 ${themePalette('--series-title-background')};
`;

const sectionTitleBackground = css`
	background-color: ${themePalette('--section-title-background')};
	box-shadow:
		-6px 0 0 0 ${themePalette('--series-title-background')},
		6px 0 0 0 ${themePalette('--series-title-background')};
`;

// Temporary until top hat has a format display hint
const topHatTitleBackground = css`
	padding: 3px 6px 4px 6px;
	background-color: ${themePalette('--series-title-text')};
`;

type LinkProps = {
	href: string;
	format: ArticleFormat;
	colour: string;
	fontCss?: SerializedStyles;
	extraCss?: (SerializedStyles | false)[];
	className?: string;
	'data-component': string;
	'data-link-name': string;
	children: React.ReactNode;
};

const TitleLink = ({
	href,
	format,
	colour,
	fontCss = fontStyles(format),
	extraCss = [],
	className,
	children,
	...dataProps
}: LinkProps) => (
	<a
		href={href}
		className={className}
		css={[
			sectionLabelLink,
			fontCss,
			breakWord,
			css`
				color: ${colour};
			`,
			...extraCss,
		]}
		{...dataProps}
	>
		<span>{children}</span>
	</a>
);

const LiveBlogPulsingDot = ({ format }: { format: ArticleFormat }) => (
	<Hide when="above" breakpoint="desktop">
		{format.design === ArticleDesign.LiveBlog && (
			<span
				css={[
					fontStyles(format),
					css`
						color: ${themePalette('--series-title-text')};
					`,
				]}
			>
				<Island priority="enhancement" defer={{ until: 'visible' }}>
					<PulsingDot />
				</Island>
			</span>
		)}
	</Hide>
);

export const SeriesSectionLink = ({
	format,
	layoutType,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	isMatch,
}: Props) => {
	const observerTag = tags.find(
		(tag) => tag.type === 'Publication' && tag.title === 'The Observer',
	);
	const isCommentIsFree = tags.some(
		(tag) => tag.id === 'commentisfree/commentisfree',
	);
	const seriesTag = tags.find(
		(tag) =>
			tag.type === 'Blog' ||
			tag.type === 'Series' ||
			(tag.type === 'Publication' && tag.title === 'The Observer'),
	);

	const tag = observerTag && isCommentIsFree ? observerTag : seriesTag;
	const hasSeriesTag = tag?.type === 'Series';
	const isLabs = format.theme === ArticleSpecial.Labs;
	const isWeekendEssay = format.design === ArticleDesign.WeekendEssay;
	const isInteractiveTopHat = layoutType === 'interactiveTopHat';

	const titleColour = isMatch
		? themePalette('--series-title-match-text')
		: isInteractiveTopHat
			? '#ffffff'
			: themePalette('--series-title-text');
	const sectionTitleColour = isMatch
		? themePalette('--series-title-match-text')
		: isInteractiveTopHat
			? '#ffffff'
			: themePalette('--article-section-link-text');

	const isImmersive = format.display === ArticleDisplay.Immersive;
	const isImmersiveOpinion =
		isImmersive &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Editorial ||
			format.design === ArticleDesign.Letter ||
			isWeekendEssay);
	const isGallery = format.design === ArticleDesign.Gallery;

	// Immersive opinion articles get a distinct treatment: highlighted links
	// with both series and section shown (or just section if no tag).
	if (isImmersiveOpinion || isInteractiveTopHat) {
		if (tag) {
			return (
				<div css={rowBelowLeftCol(format)}>
					<TitleLink
						href={`${guardianBaseURL}/${tag.id}`}
						format={format}
						colour={titleColour}
						extraCss={[
							marginRight,
							isWeekendEssay
								? css`
										color: ${themePalette(
											'--series-title-background',
										)};
									`
								: isInteractiveTopHat
									? topHatTitleBackground
									: seriesTitleBackground,
						]}
						data-component="series"
						data-link-name="article series"
					>
						{tag.title}
					</TitleLink>
					<Hide when="below" breakpoint="tablet">
						<TitleLink
							href={`${guardianBaseURL}/${sectionUrl}`}
							format={format}
							colour={sectionTitleColour}
							extraCss={[
								displayBlock,
								isWeekendEssay
									? css`
											${headlineMedium17};
											color: ${themePalette(
												'--series-title-background',
											)};
										`
									: isInteractiveTopHat
										? topHatTitleBackground
										: seriesTitleBackground,
							]}
							data-component="section"
							data-link-name="article section"
						>
							{sectionLabel}
						</TitleLink>
					</Hide>
				</div>
			);
		}

		return (
			<div css={marginBottom}>
				<TitleLink
					href={`${guardianBaseURL}/${sectionUrl}`}
					format={format}
					colour={sectionTitleColour}
					extraCss={[
						marginRight,
						isInteractiveTopHat
							? topHatTitleBackground
							: sectionTitleBackground,
					]}
					data-component="section"
					data-link-name="article section"
				>
					{sectionLabel}
				</TitleLink>
			</div>
		);
	}

	// Other immersives and galleries show an inverted title block,
	// but only when there's a series tag or it's a Labs article.
	if (isImmersive || isGallery) {
		if (!hasSeriesTag && !isLabs) return null;

		const title = tag?.title ?? sectionLabel;
		const linkExt = tag?.id ?? sectionUrl;
		const hasLayoutType = isImmersive && layoutType !== undefined;

		return (
			<div
				css={
					hasLayoutType
						? immersiveGridTitleWrapperBelowDesktop
						: undefined
				}
			>
				<TitleLink
					href={`${guardianBaseURL}/${linkExt}`}
					format={format}
					colour={titleColour}
					extraCss={[
						invertedStyle(format),
						sectionPadding,
						css`
							background-color: ${themePalette(
								'--series-title-background',
							)};
						`,
						hasLayoutType && immersiveGridTitleBelowDesktop,
						layoutType === 'immersiveLandscape' &&
							immersiveLandscapeTitle,
						isGallery &&
							css`
								position: relative;
							`,
						isImmersive &&
							css`
								box-shadow:
									-6px 0 0 0
										${themePalette(
											'--series-title-background',
										)},
									6px 0 0 0
										${themePalette(
											'--series-title-background',
										)};
							`,
					].filter(Boolean)}
					data-component="series"
					data-link-name="article series"
				>
					{title}
				</TitleLink>
			</div>
		);
	}

	// Standard layout: series tag + section label, or just section label.
	if (tag) {
		return (
			<div css={rowBelowLeftCol(format)}>
				<LiveBlogPulsingDot format={format} />
				<TitleLink
					href={`${guardianBaseURL}/${tag.id}`}
					format={format}
					colour={titleColour}
					extraCss={[marginRight, seriesTitleBackground]}
					data-component="series"
					data-link-name="article series"
				>
					{tag.title}
				</TitleLink>
				<Hide when="below" breakpoint="tablet">
					<TitleLink
						href={`${guardianBaseURL}/${sectionUrl}`}
						format={format}
						colour={sectionTitleColour}
						fontCss={secondaryFontStyles(format)}
						extraCss={[
							displayBlock,
							css`
								background-color: ${themePalette(
									'--section-title-background',
								)};
							`,
						]}
						data-component="section"
						data-link-name="article section"
					>
						{sectionLabel}
					</TitleLink>
				</Hide>
			</div>
		);
	}

	return (
		<>
			<LiveBlogPulsingDot format={format} />
			<TitleLink
				href={`${guardianBaseURL}/${sectionUrl}`}
				format={format}
				colour={sectionTitleColour}
				extraCss={[marginRight]}
				className={interactiveLegacyClasses.labelLink}
				data-component="section"
				data-link-name="article section"
			>
				{sectionLabel}
			</TitleLink>
		</>
	);
};
