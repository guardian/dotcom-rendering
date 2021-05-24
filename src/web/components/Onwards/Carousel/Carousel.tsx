import { useRef, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import libDebounce from 'lodash/debounce';

import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { neutral, brandAlt, text } from '@guardian/src-foundations/palette';
import { Design, Display } from '@guardian/types';

import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Hide } from '@frontend/web/components/Hide';
import { formatAttrString } from '@frontend/web/lib/formatAttrString';
import { Card } from '@frontend/web/components/Card/Card';
import { LI } from '@frontend/web/components/Card/components/LI';

import { decidePalette } from '@root/src/web/lib/decidePalette';

// Carousel icons - need replicating from source for centring

const SvgChevronLeftSingle = () => {
	return (
		<svg
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18.4 4L8 14.4V15.45L18.4 25.8499L19.375 24.8999L11.05 14.925L19.375 4.95L18.4 4Z"
			/>
		</svg>
	);
};

const SvgChevronRightSingle = () => {
	return (
		<svg
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.975 4L9 4.95L17.325 14.925L9 24.8999L9.975 25.8499L20.375 15.45V14.4L9.975 4Z"
			/>
		</svg>
	);
};

const wrapperStyle = css`
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	${from.tablet} {
		padding-right: 40px;
	}
`;

// For desktop and above, are we at the last card. Is one less than the dots style equivalent
const isLastCardShowing = (index: number, totalStories: number) =>
	index >= totalStories - 4;

const containerStyles = css`
	display: flex;
	flex-direction: column;
	position: relative;

	overflow: hidden; /* Needed for scrolling to work */

	margin-top: 6px;
	margin-bottom: 24px;

	margin-left: 0px;
	margin-right: 0px;

	${from.tablet} {
		/* Shrink the container to remove the leading and
       trailing side margins from the list of cards */
		margin-left: -10px;
		margin-right: -10px;
	}

	${from.leftCol} {
		margin-left: -1px;
		margin-right: -10px;
		margin-top: 6px;
	}
`;

const carouselStyle = (isFullCardImage?: boolean) => css`
	min-height: ${!isFullCardImage && '227px'};
	position: relative; /* must set position for offset(Left) calculations of children to be relative to this box */

	display: flex;
	flex-direction: row;
	align-items: stretch;

	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto; /* Scrollbar is less intrusive visually on non-desktop devices typically */
	overflow-y: hidden; /*Fixes small problem with 1px vertical scroll on immersive due to top bar */
	${from.tablet} {
		&::-webkit-scrollbar {
			display: none;
		}

		scrollbar-width: none;
	}

	${until.tablet} {
		margin-left: -10px; /* Align firstcard on mobile devices */
	}
`;

const dotsStyle = css`
	margin-bottom: ${space[2]}px;
`;

const dotStyle = css`
	cursor: pointer;
	display: inline-block;
	height: ${space[3]}px;
	width: ${space[3]}px;
	background-color: ${neutral[93]};
	border-radius: 100%;
	border: 0 none;
	padding: 0;
	margin-right: ${space[1]}px;

	&:hover,
	&:focus {
		background-color: ${neutral[86]};
		outline: none;
	}
`;

const dotActiveStyle = (palette: Palette) => css`
	background-color: ${palette.background.carouselDot};

	&:hover,
	&:focus {
		background-color: ${palette.background.carouselDotFocus};
	}
`;

const adjustNumberOfDotsStyle = (
	index: number,
	totalStories: number,
	isFullCardImage?: boolean,
) => {
	/* This is a bit of a hack for the test, while we think of better UX here.
    The dots can't line up on Desktop because we don't show 1 story per swipe */
	if (isFullCardImage) {
		return css`
			${from.desktop} {
				display: ${index >= totalStories - 1 ? 'none' : 'auto'};
			}
		`;
	}
	return css`
		${from.phablet} {
			display: ${index >= totalStories - 1 ? 'none' : 'auto'};
		}

		${from.tablet} {
			display: ${index >= totalStories - 2 ? 'none' : 'auto'};
		}

		${from.desktop} {
			display: ${index >= totalStories - 3 ? 'none' : 'auto'};
		}
	`;
};

// Not used for buttons above carousel
const buttonContainerStyle = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	z-index: 20;
	height: 100%;
	padding-bottom: 36px; /* Align buttons centrally with cards */

	${until.leftCol} {
		display: none;
	}
`;
const prevButtonContainerStyle = css`
	${from.leftCol} {
		left: 120px;
	}

	${from.wide} {
		left: 205px;
	}
`;

const nextButtonContainerStyle = css`
	right: 10px;
`;

const buttonStyle = css`
	border: 0 none;
	border-radius: 100%;
	height: 34px;
	width: 34px;
	cursor: pointer;
	margin-top: 10px;
	padding: 0;
	background-color: ${neutral[0]};

	&:active,
	&:hover {
		outline: none;
		background-color: ${brandAlt[400]};
		svg {
			fill: ${neutral[7]};
		}
	}

	&:focus {
		outline: none;
	}

	svg {
		fill: ${neutral[100]};
		height: 34px;
	}
`;

const prevButtonStyle = (index: number) => css`
	background-color: ${index !== 0 ? neutral[0] : neutral[60]};
`;

const nextButtonStyle = (index: number, totalStories: number) => css`
	padding-left: 5px; /* Fix centering of SVG*/
	margin-left: 10px;
	background-color: ${!isLastCardShowing(index, totalStories)
		? neutral[0]
		: neutral[60]};
`;

const headerRowStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	${from.tablet} {
		padding-right: 10px;
	}

	${from.tablet} {
		margin-left: 10px;
	}
`;

const headerStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${text.primary};
	${headline.xsmall({ fontWeight: 'bold' })};
	padding-bottom: ${space[2]}px;
	padding-top: ${space[1]}px;
	margin-left: 0;
`;

const titleStyle = (palette: Palette, isCuratedContent?: boolean) => css`
	color: ${isCuratedContent ? palette.text.carouselTitle : text.primary};
`;

const Title = ({
	title,
	palette,
	isCuratedContent,
}: {
	title: string;
	palette: Palette;
	isCuratedContent?: boolean;
}) => (
	<h2 css={headerStyles}>
		{isCuratedContent ? 'More from ' : ''}
		<span css={titleStyle(palette, isCuratedContent)}>{title}</span>
	</h2>
);

const convertToImmersive = (trails: TrailType[]): TrailType[] => {
	return trails.map((trail) => {
		const format = {
			...trail.format,
			display: Display.Immersive,
		};
		return {
			...trail,
			format,
			palette: decidePalette(format),
		};
	});
};

type CarouselCardProps = {
	isFirst: boolean;
	format: Format;
	linkTo: string;
	headlineText: string;
	webPublicationDate: string;
	kickerText?: string;
	imageUrl?: string;
	isFullCardImage?: boolean;
	dataLinkName?: string;
};

export const CarouselCard: React.FC<CarouselCardProps> = ({
	format,
	linkTo,
	imageUrl,
	headlineText,
	webPublicationDate,
	kickerText,
	isFirst,
	isFullCardImage,
	dataLinkName,
}: CarouselCardProps) => (
	<LI
		stretch={true}
		percentage="25%"
		showDivider={!isFirst}
		padSides={true}
		padSidesOnMobile={true}
		snapAlignStart={true}
	>
		<Card
			linkTo={linkTo}
			format={format}
			headlineText={headlineText}
			webPublicationDate={webPublicationDate}
			kickerText={kickerText || ''}
			imageUrl={imageUrl || ''}
			showClock={true}
			alwaysVertical={true}
			minWidthInPixels={220}
			isFullCardImage={isFullCardImage}
			showQuotes={
				format.design === Design.Comment ||
				format.design === Design.Letter
			}
			dataLinkName={dataLinkName}
		/>
	</LI>
);

type HeaderAndNavProps = {
	heading: string;
	trails: TrailType[];
	palette: Palette;
	index: number;
	isCuratedContent?: boolean;
	isFullCardImage?: boolean;
	goToIndex: (newIndex: number) => void;
};

const HeaderAndNav: React.FC<HeaderAndNavProps> = ({
	heading,
	trails,
	palette,
	index,
	isCuratedContent,
	isFullCardImage,
	goToIndex,
}) => (
	<div>
		<Title
			title={heading}
			palette={palette}
			isCuratedContent={isCuratedContent}
		/>
		<div css={dotsStyle}>
			{trails.map((_, i) => (
				<span
					onClick={() => goToIndex(i)}
					// This button is not particularly useful for keyboard users as the stories
					// are tabb-able themselves so we hide them with aria and make them
					// not available to keyboard
					aria-hidden="true"
					key={`dot-${i}`}
					css={[
						dotStyle,
						i === index && dotActiveStyle(palette),
						adjustNumberOfDotsStyle(
							i,
							trails.length,
							isFullCardImage,
						),
					]}
					data-link-name={`${
						isFullCardImage ? 'carousel-large' : 'carousel-small'
					}-nav-dot-${i}`}
				/>
			))}
		</div>
	</div>
);

export const Carousel: React.FC<OnwardsType> = ({
	heading,
	trails,
	ophanComponentName,
	format,
	isFullCardImage,
	isCuratedContent,
}: OnwardsType) => {
	const palette = decidePalette(format);
	const carouselRef = useRef<HTMLUListElement>(null);

	const [index, setIndex] = useState(0);
	const [maxIndex, setMaxIndex] = useState(0);

	const variantComponentName = isFullCardImage
		? 'carousel-large'
		: 'carousel-small';

	const arrowName = `${variantComponentName}-arrow`;

	const notPresentation = (el: HTMLElement): boolean =>
		el.getAttribute('role') !== 'presentation';

	const getItems = (): HTMLElement[] => {
		const { current } = carouselRef;
		if (current === null) return [];

		return Array.from(current.children) as HTMLElement[];
	};

	const getIndex = (): number => {
		const { current } = carouselRef;
		if (current === null) return 0;

		const offsets = getItems()
			.filter(notPresentation)
			.map((el) => el.offsetLeft);

		const scrolled = (current.scrollLeft || 0) + offsets[0];
		const active = offsets.findIndex((el) => el >= scrolled);

		return Math.max(0, active);
	};

	const getSetIndex = () => {
		setIndex(getIndex());
	};

	const goToIndex = (newIndex: number) => {
		const { current } = carouselRef;
		if (current === null) return;

		const offsets = getItems()
			.filter(notPresentation)
			.map((el) => el.offsetLeft);

		current.scrollTo({ left: offsets[newIndex] });

		getSetIndex();
	};

	const prev = () => {
		const { current } = carouselRef;
		if (current === null) return;

		const offsets = getItems()
			.filter(notPresentation)
			.map((el) => el.offsetLeft);

		const scrolled = (current.scrollLeft || 0) + offsets[0];

		const nextOffset = offsets
			.reverse()
			.find((offset) => offset < scrolled);

		if (nextOffset) {
			current.scrollTo({ left: nextOffset });
		} else {
			current.scrollTo({ left: 0 });
		}
		getSetIndex();
	};

	const next = () => {
		const { current } = carouselRef;
		if (current === null) return;

		const offsets = getItems()
			.filter(notPresentation)
			.map((el) => el.offsetLeft);

		const scrolled = (current.scrollLeft || 0) + offsets[0];
		const nextOffset = offsets.find((offset) => offset > scrolled);

		if (nextOffset) {
			current.scrollTo({ left: nextOffset });
		}

		getSetIndex();
	};

	useEffect(() => {
		const carousel = carouselRef.current;
		if (carousel) {
			carousel.addEventListener('scroll', libDebounce(getSetIndex, 100));
			return carousel.removeEventListener(
				'scroll',
				libDebounce(getSetIndex, 100),
			);
		}
	});

	// No idea if this is the best approach but it prevents issues with libDebounce
	// using old data to determine the max index. Instead we say update maxIndex
	// when index changes and compare it against the prior maxIndex only.
	useEffect(() => setMaxIndex((m) => Math.max(index, m)), [index]);

	if (isFullCardImage) trails = convertToImmersive(trails);

	return (
		<div css={wrapperStyle} data-link-name={formatAttrString(heading)}>
			<LeftColumn showRightBorder={false} showPartialRightBorder={true}>
				<HeaderAndNav
					heading={heading}
					trails={trails}
					palette={palette}
					index={index}
					isCuratedContent={isCuratedContent}
					isFullCardImage={isFullCardImage}
					goToIndex={goToIndex}
				/>
			</LeftColumn>
			<div css={[buttonContainerStyle, prevButtonContainerStyle]}>
				<button
					onClick={prev}
					aria-label="Move carousel backwards"
					css={[buttonStyle, prevButtonStyle(index)]}
					data-link-name={`${arrowName}-prev`}
				>
					<SvgChevronLeftSingle />
				</button>
			</div>

			<div css={[buttonContainerStyle, nextButtonContainerStyle]}>
				<button
					onClick={next}
					aria-label="Move carousel forwards"
					css={[buttonStyle, nextButtonStyle(index, trails.length)]}
					data-link-name={`${arrowName}-next`}
				>
					<SvgChevronRightSingle />
				</button>
			</div>
			<div
				css={containerStyles}
				data-component={ophanComponentName}
				data-link={formatAttrString(heading)}
			>
				<Hide when="above" breakpoint="leftCol">
					<div css={headerRowStyles}>
						<HeaderAndNav
							heading={heading}
							trails={trails}
							palette={palette}
							index={index}
							isCuratedContent={isCuratedContent}
							isFullCardImage={isFullCardImage}
							goToIndex={goToIndex}
						/>
						<Hide when="below" breakpoint="desktop">
							<button
								onClick={prev}
								aria-label="Move carousel backwards"
								css={[buttonStyle, prevButtonStyle(index)]}
								data-link-name={`${arrowName}-prev`}
							>
								<SvgChevronLeftSingle />
							</button>
							<button
								onClick={next}
								aria-label="Move carousel forwards"
								css={[
									buttonStyle,
									nextButtonStyle(index, trails.length),
								]}
								data-link-name={`${arrowName}-next`}
							>
								<SvgChevronRightSingle />
							</button>
						</Hide>
					</div>
				</Hide>

				<ul
					css={carouselStyle(isFullCardImage)}
					ref={carouselRef}
					data-component={`${variantComponentName} | maxIndex-${maxIndex}`}
				>
					{trails.map((trail, i) => {
						const {
							url: linkTo,
							headline: headlineText,
							format: trailFormat,
							webPublicationDate,
							image: fallbackImageUrl,
							carouselImages,
							kickerText,
						} = trail;
						const imageUrl =
							isFullCardImage && carouselImages
								? carouselImages['460']
								: fallbackImageUrl;
						return (
							<CarouselCard
								key={`${trail.url}${i}`}
								isFirst={i === 0}
								format={trailFormat}
								linkTo={linkTo}
								headlineText={headlineText}
								webPublicationDate={webPublicationDate}
								imageUrl={imageUrl}
								kickerText={kickerText}
								isFullCardImage={isFullCardImage}
								dataLinkName={`${variantComponentName}-card-position-${i}`}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
