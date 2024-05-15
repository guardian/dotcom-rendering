import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	from,
	headlineBold17,
	headlineBold20,
	headlineLight20,
	headlineLight24,
	headlineMedium17,
	space,
	textSans17,
	textSans20,
} from '@guardian/source-foundations';
import sanitise from 'sanitize-html';
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

		p {
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

const standfirstStyles = ({ display, design, theme }: ArticleFormat) => {
	switch (display) {
		case ArticleDisplay.Immersive:
			switch (design) {
				case ArticleDesign.PhotoEssay:
					if (theme === ArticleSpecial.Labs) {
						return css`
							${textSans20};
							margin-top: ${space[2]}px;
							margin-bottom: ${space[3]}px;
							line-height: 22px;
							max-width: 540px;
							color: ${palette('--standfirst-text')};
						`;
					}
					return css`
						${headlineMedium17};
						margin-top: ${space[2]}px;
						margin-bottom: ${space[3]}px;
						line-height: 22px;
						max-width: 540px;
						color: ${palette('--standfirst-text')};
					`;
				default:
					return css`
						${theme === ArticleSpecial.Labs
							? textSans17
							: headlineLight24};
						padding-top: ${space[4]}px;

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
				${headlineBold20};
				margin-bottom: ${space[3]}px;
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
						${headlineLight20};
						margin-bottom: ${space[3]}px;
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
						${headlineBold17};
						margin-top: ${space[1]}px;
						margin-bottom: ${space[3]}px;
						max-width: 540px;
						color: ${palette('--standfirst-text')};
					`;
				case ArticleDesign.Analysis:
					return css`
						${headlineMedium17};
						margin-bottom: ${space[3]}px;
						max-width: 540px;
						color: ${palette('--standfirst-text')};
					`;
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return css`
						${headlineBold17};
						margin-bottom: ${space[3]}px;
						color: ${palette('--standfirst-text')};
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
								${headlineBold17};
								margin-bottom: ${space[3]}px;
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
	return (
		<>
			<div
				css={[
					nestedStyles(format),
					standfirstStyles(format),
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
