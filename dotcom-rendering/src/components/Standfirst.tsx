import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '@guardian/libs';
import {
	from,
	headlineLight17,
	headlineLight20,
	headlineLight24,
	headlineMedium17,
	headlineMedium20,
	headlineMedium24,
	space,
	textSans17,
	textSans20,
	textSans24,
} from '@guardian/source/foundations';
import sanitise from 'sanitize-html';
import { grid } from '../grid';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { palette } from '../palette';

type Props = {
	format: ArticleFormat;
	standfirst: string;
};

const nestedStyles = (format: ArticleFormat) => {
	const offset = format.display === ArticleDisplay.Immersive ? space[6] : 19;
	return css`
		li {
			margin-bottom: 6px;
			padding-left: ${offset}px;

			p {
				display: inline;
			}
		}

		li:before {
			display: inline-block;
			content: '';
			border-radius: 50%;
			height: 0.7em;
			width: 0.7em;
			margin-right: 7px;
			background-color: ${palette('--standfirst-bullet')};
			margin-left: -${offset}px;
		}

		p:not(:last-child) {
			margin-bottom: 8px;
		}

		strong {
			font-weight: bold;
		}

		[data-dcr-style='bullet'] {
			display: inline-block;
			content: '';
			border-radius: 50%;
			height: 13px;
			width: 13px;
			margin-right: 2px;
			background-color: ${palette('--standfirst-bullet')};
		}

		a {
			color: ${palette('--standfirst-link-text')};
			text-decoration: none;
			border-bottom: 1px solid ${palette('--standfirst-link-border')};
			transition: border-color 0.15s ease-out;
		}
	`;
};

const decideFont = ({ display, design, theme }: ArticleFormat) => {
	const isLabs = theme === ArticleSpecial.Labs;
	switch (design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial: {
			switch (display) {
				case ArticleDisplay.Immersive:
					if (isLabs) {
						return css`
							${textSans20};
							${from.tablet} {
								${textSans24};
							}
						`;
					}
					return css`
						${headlineLight20};
						${from.tablet} {
							${headlineLight24};
						}
					`;
				case ArticleDisplay.Showcase:
				default: {
					if (isLabs) {
						return css`
							${textSans17};
							${from.tablet} {
								${textSans20};
							}
						`;
					}
					return css`
						${headlineLight17};
						${from.tablet} {
							${headlineLight20};
						}
					`;
				}
			}
		}
		default: {
			switch (display) {
				case ArticleDisplay.Immersive: {
					if (isLabs) {
						return css`
							${textSans20};
							${from.tablet} {
								${textSans24};
							}
						`;
					}
					return css`
						${headlineMedium20};
						${from.tablet} {
							${headlineMedium24};
						}
					`;
				}
				case ArticleDisplay.Showcase:
				default: {
					if (isLabs) {
						return css`
							${textSans17};
							${from.tablet} {
								${textSans20};
							}
						`;
					}
					return css`
						${headlineMedium17};

						${from.tablet} {
							${headlineMedium20};
						}
					`;
				}
			}
		}
	}
};

const decidePadding = ({ display, design }: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial: {
			switch (display) {
				case ArticleDisplay.Immersive:
					return css`
						padding-bottom: 18px;
						padding-top: 0;
						${from.tablet} {
							padding-bottom: 0;
						}
					`;
				case ArticleDisplay.Showcase:
				default:
					return css`
						padding-bottom: ${space[2]}px;
						${from.tablet} {
							padding-bottom: 12px;
						}
					`;
			}
		}
		case ArticleDesign.Interview: {
			switch (display) {
				case ArticleDisplay.Showcase: {
					return css`
						padding-bottom: 8px;
						${from.tablet} {
							padding-bottom: ${space[0]}px;
						}
					`;
				}
				case ArticleDisplay.Immersive:
					return css`
						padding-bottom: 0;
						padding-top: ${space[2]}px;

						${from.tablet} {
							padding-bottom: 0;
						}
					`;
				default:
					return css`
						padding-bottom: ${space[2]}px;
					`;
			}
		}
		default: {
			switch (display) {
				case ArticleDisplay.Showcase:
					return css`
						padding-bottom: ${space[2]}px;

						${from.tablet} {
							padding-bottom: 14px;
						}
					`;
				case ArticleDisplay.Immersive:
					return css`
						padding-bottom: 0;
						padding-top: ${space[2]}px;

						${from.tablet} {
							padding-bottom: 0;
						}
					`;
				default:
					return css`
						padding-bottom: ${space[2]}px;
						${from.tablet} {
							padding-bottom: 14px;
						}
					`;
			}
		}
	}
};

const standfirstStyles = ({ display, design, theme }: ArticleFormat) => {
	switch (display) {
		case ArticleDisplay.Immersive:
			switch (design) {
				case ArticleDesign.PhotoEssay:
					return css`
						line-height: 22px;
						max-width: 540px;
						color: ${palette('--standfirst-text')};
					`;
				default:
					return css`
						max-width: 280px;
						${from.tablet} {
							max-width: 460px;
						}
						color: ${palette('--standfirst-text')};
						li:before {
							height: 17px;
							width: 17px;
						}
					`;
			}

		case ArticleDisplay.NumberedList:
			return css`
				max-width: 540px;
				color: ${palette('--standfirst-text')};
			`;

		case ArticleDisplay.Showcase:
		case ArticleDisplay.Standard:
		default: {
			switch (design) {
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
				case ArticleDesign.Comment:
				case ArticleDesign.Feature:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review:
				case ArticleDesign.NewsletterSignup:
				case ArticleDesign.Explainer:
				case ArticleDesign.Timeline:
				case ArticleDesign.Profile:
					return css`
						max-width: 540px;
						color: ${palette('--standfirst-text')};
						li:before {
							height: 15px;
							width: 15px;
						}
					`;
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return css`
						margin-top: ${space[1]}px;
						max-width: 540px;
						color: ${palette('--standfirst-text')};
					`;
				case ArticleDesign.Analysis:
					return css`
						max-width: 540px;
						color: ${palette('--standfirst-text')};
					`;
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return css`
						color: ${palette('--standfirst-text')};
					`;
				case ArticleDesign.Gallery:
					return css`
						color: ${palette('--standfirst-text')};
						${grid.span('centre-column-start', 3)}

						${from.tablet} {
							${grid.span('centre-column-start', 7)}
						}
					`;
				default:
					switch (theme) {
						case ArticleSpecial.Labs:
							return css`
								${textSans17};
								/**
								 * Typography preset styles should not be overridden.
								 * This has been done because the styles do not directly map to the new presets.
								 * Please speak to your team's designer and update this to use a more appropriate preset.
								 */
								line-height: 1.15;
								margin-bottom: ${space[3]}px;
								max-width: 540px;
								color: ${palette('--standfirst-text')};
								a {
									color: ${palette('--standfirst-link-text')};
									border-bottom: 1px solid
										${palette('--standfirst-link-border')};
								}
							`;
						default:
							return css`
								max-width: 540px;
								color: ${palette('--standfirst-text')};
							`;
					}
			}
		}
	}
};

const hoverStyles = css`
	a:hover {
		border-bottom: solid 1px ${palette('--standfirst-link-border')};
	}
`;

export const Standfirst = ({ format, standfirst }: Props) => {
	if (standfirst.trim() === '') return null;
	return (
		<>
			<div
				css={[
					nestedStyles(format),
					standfirstStyles(format),
					decideFont(format),
					decidePadding(format),
					hoverStyles,
				]}
				className={
					format.design === ArticleDesign.Interactive
						? interactiveLegacyClasses.standFirst
						: ''
				}
				dangerouslySetInnerHTML={{
					__html: sanitise(standfirst, {
						// We allow all tags, which includes script & style which are potentially vulnerable
						// `allowVulnerableTags: true` suppresses this warning
						allowVulnerableTags: true,
						allowedTags: false, // Leave tags from CAPI alone
						allowedAttributes: false, // Leave attributes from CAPI alone
						transformTags: {
							a: (tagName, attribs) => ({
								tagName, // Just return anchors as is
								attribs: {
									...attribs, // Merge into the existing attributes
									'data-link-name': 'in standfirst link', // Add the data-link-name for Ophan to anchors
								},
							}),
						},
					}),
				}}
			/>
		</>
	);
};
