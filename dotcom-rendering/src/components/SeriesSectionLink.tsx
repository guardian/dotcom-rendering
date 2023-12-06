import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	headline,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { palette as themePalette } from '../palette';
import type { DCRBadgeType } from '../types/badge';
import type { TagType } from '../types/tag';
import { Badge } from './Badge';
import { Hide } from './Hide';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';

type Props = {
	format: ArticleFormat;
	tags: TagType[];
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
	badge?: DCRBadgeType;
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

const invertedStyle = css`
	/* Handle text wrapping onto a new line */
	white-space: pre-wrap;
	box-decoration-break: clone;
	line-height: 28px;
	${from.leftCol} {
		line-height: 28px;
	}

	padding-right: ${space[1]}px;
	padding-top: ${space[1]}px;
	padding-bottom: ${space[3]}px;
`;

const fontStyles = (format: ArticleFormat) => {
	switch (format.theme) {
		case ArticleSpecial.Labs:
			switch (format.display) {
				case ArticleDisplay.Immersive:
					return css`
						${textSans.large({ fontWeight: 'bold' })}
						line-height: 23px;
						${from.leftCol} {
							line-height: 20px;
						}
					`;
				default:
					return css`
						${textSans.large()}
						line-height: 23px;
						${from.leftCol} {
							line-height: 20px;
						}
					`;
			}
		default:
			return css`
				${headline.xxxsmall({ fontWeight: 'bold' })}
				${from.wide} {
					${headline.xxsmall({ fontWeight: 'bold' })}
				}
			`;
	}
};

const secondaryFontStyles = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) {
		return css`
			${textSans.medium({ fontWeight: 'regular' })}
		`;
	}
	return css`
		${headline.xxxsmall({ fontWeight: 'regular' })}
		line-height: 20px;
	`;
};

const displayBlock = css`
	display: block;
`;

const breakWord = css`
	word-break: break-word;
`;

const titleBadgeWrapper = css`
	margin-bottom: ${space[1]}px;
	margin-top: ${space[1]}px;
	margin-right: ${space[2]}px;
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

const immersiveTitleBadgeStyle = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-bottom: 0px;
	max-width: max-content;
	line-height: 1.15;
	/* Offset parent container margins when Immersive */
	margin-bottom: -10px;
	background-color: ${themePalette('--series-title-background')};
	box-shadow:
		-6px 0 0 0 ${themePalette('--series-title-background')},
		6px 0 0 0 ${themePalette('--series-title-background')};
`;

export const SeriesSectionLink = ({
	format,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	badge,
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

	// If we have a tag, use it to show 2 section titles
	// Observer opinion (commentisfree) articles should prioritise
	// the publication tag over the commentisfree tag.
	const tag = observerTag && isCommentIsFree ? observerTag : seriesTag;

	const hasSeriesTag = tag && tag.type === 'Series';

	const isLabs = format.theme === ArticleSpecial.Labs;

	const titleColour = isMatch
		? themePalette('--series-title-match-text')
		: themePalette('--series-title-text');

	switch (format.display) {
		case ArticleDisplay.Immersive: {
			switch (format.design) {
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter: {
					if (tag) {
						// We have a tag, we're not immersive, show both series and section titles
						return (
							// Sometimes the tags/titles are shown inline, sometimes stacked
							<div css={!badge && rowBelowLeftCol(format)}>
								<a
									href={`${guardianBaseURL}/${tag.id}`}
									css={[
										sectionLabelLink,
										marginRight,
										fontStyles(format),
										breakWord,
										css`
											color: ${titleColour};
											background-color: ${themePalette(
												'--series-title-background',
											)};
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
									]}
									data-component="series"
									data-link-name="article series"
								>
									<span>{tag.title}</span>
								</a>

								<Hide when="below" breakpoint="tablet">
									<a
										href={`${guardianBaseURL}/${sectionUrl}`}
										css={[
											sectionLabelLink,
											fontStyles(format),
											displayBlock,
											breakWord,
											css`
												color: ${themePalette(
													'--series-title-text',
												)};
												background-color: ${themePalette(
													'--section-title-background',
												)};
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
										]}
										data-component="section"
										data-link-name="article section"
									>
										<span>{sectionLabel}</span>
									</a>
								</Hide>
							</div>
						);
					}
					// There's no tag so fallback to section title
					return (
						<div css={marginBottom}>
							<a
								href={`${guardianBaseURL}/${sectionUrl}`}
								css={[
									sectionLabelLink,
									marginRight,
									fontStyles(format),
									breakWord,
									css`
										color: ${titleColour};
										background-color: ${themePalette(
											'--section-title-background',
										)};
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
								]}
								data-component="section"
								data-link-name="article section"
							>
								<span>{sectionLabel}</span>
							</a>
						</div>
					);
				}
				default: {
					if (hasSeriesTag || isLabs) {
						const title = tag?.title ? tag.title : sectionLabel;
						const linkExt = tag?.id ? tag.id : sectionUrl;
						return (
							<div css={badge && immersiveTitleBadgeStyle}>
								{badge && (
									<div
										css={[
											titleBadgeWrapper,
											sectionPadding,
										]}
									>
										<Badge
											imageSrc={badge.imageSrc}
											href={badge.href}
										/>
									</div>
								)}

								<a
									css={[
										sectionLabelLink,
										fontStyles(format),
										invertedStyle,
										breakWord,
										!badge && sectionPadding,
										css`
											color: ${titleColour};
											background-color: ${themePalette(
												'--series-title-background',
											)};
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
									]}
									href={`${guardianBaseURL}/${linkExt}`}
									data-component="series"
									data-link-name="article series"
								>
									<span>{title}</span>
								</a>
							</div>
						);
					}
					// Immersives show nothing at all if there's no series tag
					return null;
				}
			}
		}
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
		default: {
			if (tag) {
				// We have a tag, we're not immersive, show both series and section titles
				return (
					// Sometimes the tags/titles are shown inline, sometimes stacked
					<div css={!badge && rowBelowLeftCol(format)}>
						<Hide when="above" breakpoint="desktop">
							{format.design === ArticleDesign.LiveBlog && (
								<span
									css={[
										fontStyles(format),
										css`
											color: ${titleColour};
										`,
									]}
								>
									<Island
										priority="enhancement"
										defer={{ until: 'visible' }}
									>
										<PulsingDot />
									</Island>
								</span>
							)}
						</Hide>
						<a
							href={`${guardianBaseURL}/${tag.id}`}
							css={[
								sectionLabelLink,
								css`
									color: ${titleColour};
									background-color: ${themePalette(
										'--series-title-background',
									)};
								`,
								marginRight,
								fontStyles(format),
								breakWord,
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
							]}
							data-component="series"
							data-link-name="article series"
						>
							<span>{tag.title}</span>
						</a>

						<Hide when="below" breakpoint="tablet">
							<a
								href={`${guardianBaseURL}/${sectionUrl}`}
								css={[
									sectionLabelLink,
									secondaryFontStyles(format),
									displayBlock,
									breakWord,
									css`
										color: ${titleColour};
										background-color: ${themePalette(
											'--section-title-background',
										)};
									`,
								]}
								data-component="section"
								data-link-name="article section"
							>
								<span>{sectionLabel}</span>
							</a>
						</Hide>
					</div>
				);
			}
			// There's no tag so fallback to section title
			return (
				<>
					<Hide when="above" breakpoint="desktop">
						{format.design === ArticleDesign.LiveBlog && (
							<span
								css={[
									fontStyles(format),
									css`
										color: ${titleColour};
									`,
								]}
							>
								<Island
									priority="enhancement"
									defer={{ until: 'visible' }}
								>
									<PulsingDot />
								</Island>
							</span>
						)}
					</Hide>
					<a
						href={`${guardianBaseURL}/${sectionUrl}`}
						css={[
							sectionLabelLink,
							css`
								color: ${titleColour};
								background-color: ${themePalette(
									'--section-title-background',
								)};
							`,
							marginRight,
							fontStyles(format),
							breakWord,
						]}
						data-component="section"
						data-link-name="article section"
						className={interactiveLegacyClasses.labelLink}
					>
						<span>{sectionLabel}</span>
					</a>
				</>
			);
		}
	}
};
