import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold12,
	until,
	width,
} from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { takeFirst } from '../lib/tuple';
import { palette } from '../palette';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';
import { SlideshowCarouselScrollingDots } from './SlideshowCarouselScrollingDots';
import { StorylineSample, Vignette } from './TagPageAI.importable';

const themeButton: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border'),
	textTertiary: palette('--carousel-chevron'),
	backgroundTertiaryHover: palette('--carousel-chevron-hover'),
};

const themeButtonDisabled: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border-disabled'),
	textTertiary: palette('--carousel-chevron-disabled'),
	backgroundTertiaryHover: 'transparent',
};

const carouselStyles = css`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior: contain auto;
	/**
	 * Hide scrollbars
	 * See: https://stackoverflow.com/a/38994837
	 */
	::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	scrollbar-width: none; /* Firefox */
`;

const carouselItemStyles = css`
	position: relative;
	flex: 1 0 100%;
	scroll-snap-align: start;
`;

const captionStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	${textSansBold12}
	color: ${palette('--slideshow-caption')};
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.8) 100%
	);
	padding: ${space[10]}px ${space[2]}px ${space[2]}px;
`;

const navigationStyles = (hasBackgroundColour: boolean) => css`
	display: flex;
	align-items: center;
	padding-top: ${space[2]}px;

	${until.tablet} {
		background-color: ${hasBackgroundColour
			? palette('--slideshow-navigation-background')
			: 'transparent'};
	}
`;

const buttonStyles = css`
	display: none;
	${from.tablet} {
		display: flex;
		gap: ${space[1]}px;
	}
`;

/**
 * Padding is added to the left of the scrolling navigation dots to match the
 * width of the navigation buttons on the right at tablet and above. This allows
 * them to be centred below the slideshow image.
 */
const scrollingDotStyles = css`
	display: flex;
	justify-content: center;
	flex: 1 0 0;
	${from.tablet} {
		padding-left: ${width.ctaSmall * 2 + space[2]}px;
	}
`;

type Props = {
	vignette: Vignette;
};

export const TagPageAIStorylineVignette = ({ vignette }: Props) => {
	const BuildVignette = () => {
		switch (vignette.vignetteType) {
			case 'storySoFar': {
				return (
					<div>
						<h2>{vignette.title}</h2>
						<p>{vignette.description}</p>
					</div>
				);
			}
			case 'timeline': {
				return (
					<div>
						<h2>{vignette.title}</h2>
						<ul>
							{vignette.timeline &&
								vignette.timeline.timelineItems.map(
									(item, index) => (
										<li key={index}>
											<strong>{item.date}</strong>:{' '}
											{item.description}
										</li>
									),
								)}
						</ul>
					</div>
				);
			}
			case 'deeperDive': {
				return (
					<div>
						<h2>{vignette.title}</h2>
						{vignette.description && <p>{vignette.description}</p>}
						{vignette.article && (
							<div>
								<h3>Pivotal Article:</h3>
								<a href={vignette.article.url}>
									<h4>{vignette.article.heading}</h4>
								</a>
								{vignette.article.summary && (
									<p>{vignette.article.summary}</p>
								)}
							</div>
						)}
						{vignette.keyQuote && (
							<blockquote>
								<p>"{vignette.keyQuote}"</p>
							</blockquote>
						)}
					</div>
				);
			}
			case 'views': {
				return (
					<div>
						<h2>{vignette.title}</h2>
						{vignette.description && <p>{vignette.description}</p>}
						{vignette.views && vignette.views.length > 0 && (
							<div>
								{vignette.views.map((view, index) => (
									<div key={index}>
										<blockquote>
											<p>"{view.quote}"</p>
											{view.quoteSource && (
												<cite>
													— {view.quoteSource}
												</cite>
											)}
										</blockquote>
										<a href={view.article.url}>
											<h4>{view.article.heading}</h4>
										</a>
									</div>
								))}
							</div>
						)}
					</div>
				);
			}
			case 'keyQuestion': {
				return (
					<div>
						<h2>{vignette.title}</h2>
						{vignette.description && <p>{vignette.description}</p>}
						{vignette.article && (
							<div>
								<h3>Key Reading:</h3>
								<a href={vignette.article.url}>
									<h4>{vignette.article.heading}</h4>
								</a>
								{vignette.article.summary && (
									<p>{vignette.article.summary}</p>
								)}
							</div>
						)}
					</div>
				);
			}
			case 'opinions': {
				return (
					<div>
						<h2>{vignette.title}</h2>
						{vignette.description && <p>{vignette.description}</p>}
						{vignette.views && vignette.views.length > 0 && (
							<div>
								<h3>Opinion Pieces:</h3>
								{vignette.views.map((opinion, index) => (
									<div key={index}>
										<a href={opinion.article.url}>
											<h4>{opinion.article.heading}</h4>
										</a>
										<blockquote>
											<p>"{opinion.quote}"</p>
											{opinion.quoteSource && (
												<cite>
													— {opinion.quoteSource}
												</cite>
											)}
										</blockquote>
									</div>
								))}
							</div>
						)}
					</div>
				);
			}
			default: {
				return <div>Unsupported vignette type</div>;
			}
		}
	};

	return <BuildVignette />;
};
