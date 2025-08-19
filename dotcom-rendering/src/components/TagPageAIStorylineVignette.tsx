import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold12,
	until,
	width,
} from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import { palette } from '../palette';
import { Vignette } from './TagPageAI.importable';

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

const headlineStyle = css`
	font-size: 18px;
	line-height: 24px;
	font-weight: 700;
	margin-bottom: ${space[3]}px;
	font-family: 'Guardian Headline'
	color: black !important;
`;

const timelineStyle = css`
	position: relative;
	padding-left: 2rem;
	list-style: none;
	margin: 0;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0.6rem;
		width: 2px;
		height: 100%;
		background-color: #dcdcdc;
	}
`;

const itemStyle = css`
	position: relative;
	padding: 0.75rem 0;
	display: flex;
	flex-direction: column;

	&::before {
		content: '';
		position: absolute;
		left: -1.7rem;
		top: 1rem;
		width: 12px;
		height: 12px;
		background-color: #c00; /* red dot */
		border-radius: 50%;
		border: 2px solid #c00;
		box-shadow: 0 0 0 2px #c00;
	}
`;

const dateStyle = css`
	font-weight: bold;
	font-size: 0.95rem;
	margin-bottom: 0.25rem;
`;

const descriptionStyle = css`
	color: #0056a3;
	cursor: pointer;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

const quoteContainer = css`
	border-left: 4px solid #c00;
	padding-left: 0.75rem;
	margin-top: 0.5rem;
	font-style: italic;
	color: #333;
`;

const viewContainer = css`
	padding-left: 0.75rem;
	margin-top: 0.5rem;
	margin-bottom: 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	background-color: #f0f0f0;
`;

export const TagPageAIStorylineVignette = ({ vignette }: Props) => {
	const BuildVignette = () => {
		switch (vignette.vignetteType) {
			case 'storySoFar': {
				return (
					<div>
						<h2 css={headlineStyle}>{vignette.title}</h2>
						<p
							css={css`
								margin-bottom: 1rem;
							`}
						>
							{vignette.description}
						</p>
						<p css={headlineStyle}>If you read one thing</p>
						<div
							css={css`
								display: flex;
								flex-direction: row;
								gap: ${space[2]}px;
								align-items: center;
							`}
						>
							<p>image todo</p>
							<div
								css={css`
									display: flex;
									flex-direction: column;
									gap: ${space[2]}px;
								`}
							>
								<p css={headlineStyle}>
									{vignette.article?.heading}
								</p>
								<p>{vignette.article?.summary}</p>
								<a
									href={vignette.article?.url}
									css={css`
										text-decoration: none;
									`}
								>
									Read the definitive story -&gt;
								</a>
							</div>
						</div>
					</div>
				);
			}
			case 'timeline': {
				return (
					<div>
						<h2 css={headlineStyle}>{vignette.title}</h2>
						<ul css={timelineStyle}>
							{vignette.timeline?.timelineItems.map(
								(item, index) => (
									<li key={index} css={itemStyle}>
										<span css={dateStyle}>{item.date}</span>
										<span css={descriptionStyle}>
											{item.description}
										</span>
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
						<h2 css={headlineStyle}>{vignette.title}</h2>
						<div
							css={
								//background grey
								css`
									background-color: #f0f0f0;
									padding: ${space[3]}px;
									border-radius: 4px;
								`
							}
						>
							<h3 css={headlineStyle}>Key Quote</h3>

							<p css={quoteContainer}> {vignette.keyQuote}</p>

							<h3 css={headlineStyle}>Pivotal Article</h3>

							<div
								css={css`
									display: flex;
									flex-direction: row;
									gap: ${space[2]}px;
									align-items: center;
								`}
							>
								<p>image todo</p>
								<div
									css={css`
										display: flex;
										flex-direction: column;
										gap: ${space[2]}px;
									`}
								>
									<p css={headlineStyle}>
										{vignette.article?.heading}
									</p>
									<p>{vignette.article?.summary}</p>
									<a
										href={vignette.article?.url}
										css={css`
											text-decoration: none;
										`}
									>
										Read the analysis -&gt;{' '}
									</a>
								</div>
							</div>
						</div>
					</div>
				);
			}
			case 'views': {
				return (
					<div>
						<h2 css={headlineStyle}>{vignette.title}</h2>
						{vignette.views && vignette.views.length > 0 && (
							<div>
								{vignette.views.map((view, index) => (
									<div key={index} css={viewContainer}>
										<p
											css={css`
												margin-bottom: 0.5rem;
											`}
										>
											{view.quote}
										</p>
										{/* {view.quoteSource && (
												<cite>
													— {view.quoteSource}
												</cite>
											)} */}

										<h4 css={headlineStyle}>
											Opinion: {view.article.heading}
										</h4>

										<a
											href={view.article.url}
											css={descriptionStyle}
										>
											Read the full article -&gt;
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
						<h2 css={headlineStyle}>{vignette.title}</h2>
						<h1
							css={css`
								margin-bottom: 0.5rem;
								font-size: 22px;
								font-family: 'Guardian Headline';
								font-weight: 700;
							`}
						>
							{vignette.keyQuestion}
						</h1>
						{vignette.description && (
							<p
								css={css`
									margin-bottom: 1rem;
								`}
							>
								{vignette.description}
							</p>
						)}
						{vignette.article && (
							<div>
								<h3 css={headlineStyle}>
									{vignette.article.heading}
								</h3>
								<a
									href={vignette.article.url}
									css={descriptionStyle}
								>
									Read our explainer -&gt;
								</a>
							</div>
						)}
					</div>
				);
			}
			case 'opinions': {
				return (
					<div>
						<h2 css={headlineStyle}>{vignette.title}</h2>
						{vignette.views && vignette.views.length > 0 && (
							<div>
								{vignette.views.map((view, index) => (
									<>
										<div key={index} css={viewContainer}>
											<p
												css={css`
													margin-bottom: 0.5rem;
												`}
											>
												{view.quote}
											</p>
											{view.quoteSource && (
												<p
													css={css`
														margin-bottom: 0.5rem;
														text-align: right;
													`}
												>
													— {view.quoteSource}
												</p>
											)}
										</div>
										<div>
											<h4 css={headlineStyle}>
												Opinion: {view.article.heading}
											</h4>

											<a
												href={view.article.url}
												css={descriptionStyle}
											>
												Read the full story -&gt;
											</a>
										</div>
									</>
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
