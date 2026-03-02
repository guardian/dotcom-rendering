import { css } from '@emotion/react';
import {
	headlineBold24,
	space,
	textSans15,
} from '@guardian/source/foundations';
import { ArticleDesign, ArticleSpecial } from '../lib/articleFormat';
import { palette as schemePalette } from '../palette';
import type { TrailType } from '../types/trails';
import { AgeWarning } from './AgeWarning';
import { BigNumber } from './BigNumber';
import { FormatBoundary } from './FormatBoundary';
import { LinkHeadline } from './LinkHeadline';

const containerStyles = css`
	padding-top: ${space[2]}px;
	display: flex;
	flex-direction: column;
	gap: ${space[8]}px;
`;

const headingStyles = css`
	padding-left: 80px;
	${headlineBold24};
	color: ${schemePalette('--slim-homepage-most-viewed-header')};
	overflow-wrap: break-word;
`;

const gridItem = css`
	position: relative;
	border-top: 1px solid ${schemePalette('--article-section-border')};
	min-height: 52px;

	&:hover {
		cursor: pointer;
	}

	&:hover,
	:focus {
		background: ${schemePalette('--most-viewed-footer-hover')};
	}
`;

const bigNumber = css`
	position: absolute;
	top: 6px;
	left: 10px;
	fill: ${schemePalette('--slim-homepage-most-viewed-big-number')};
	svg {
		height: 40px;
	}
`;

const headlineLink = css`
	display: block; /* To ensure focus outline works okay */
	padding: 3px 10px 18px 80px;
	${textSans15};
	text-decoration: none;
	color: ${schemePalette('--slim-homepage-most-viewed-headline')};
	font-weight: 500;
	word-wrap: break-word;
	overflow: hidden;
`;

const ageWarningStyles = css`
	padding-left: 75px;
	margin-top: -16px;
	margin-bottom: 16px;
`;

type Props = {
	heading: 'Most viewed' | 'Deeply read';
	trails: TrailType[];
};

/**
 * Renders the Most Viewed or Deeply Read component, often seen at the bottom of the page on
 * network front, into a newly created right column high up on a front page. This component is
 * only used as a part of an ongoing AB test and should not be used outside of this AB test.
 */
export const MostPopularFrontRight = ({ heading, trails }: Props) => {
	if (trails.length === 0) return null;

	return (
		<section
			data-component="most-popular-front-right"
			css={containerStyles}
		>
			<h3 css={headingStyles}>{heading}</h3>
			<ol>
				{trails.slice(0, 10).map((trail: TrailType, index: number) => {
					const { url, format, headline, ageWarning } = trail;

					return (
						<li css={gridItem} key={url}>
							<a
								css={headlineLink}
								href={url}
								data-link-name={`article | ${index + 1}`}
							>
								<span css={bigNumber}>
									<BigNumber index={index + 1} />
								</span>
								<FormatBoundary format={format}>
									{format.design ===
									ArticleDesign.LiveBlog ? (
										<LinkHeadline
											headlineText={headline}
											isLabs={
												format.theme ===
												ArticleSpecial.Labs
											}
											size="small"
											kickerText="Live"
											hasInlineKicker={false}
											showPulsingDot={true}
											showQuotes={false}
											isInSlimHomepageAbTest={true}
										/>
									) : (
										<LinkHeadline
											headlineText={headline}
											isLabs={
												format.theme ===
												ArticleSpecial.Labs
											}
											size="small"
											showQuotes={
												format.design ===
													ArticleDesign.Comment ||
												format.design ===
													ArticleDesign.Letter
											}
											isInSlimHomepageAbTest={true}
										/>
									)}
								</FormatBoundary>
								{!!ageWarning && (
									<div css={ageWarningStyles}>
										<AgeWarning
											age={ageWarning}
											size="small"
										/>
									</div>
								)}
							</a>
						</li>
					);
				})}
			</ol>
		</section>
	);
};
