import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	brandAlt,
	from,
	headline,
	neutral,
	space,
	text,
	until,
} from '@guardian/source-foundations';
import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { decidePalette } from '../lib/decidePalette';
import { formatAttrString } from '../lib/formatAttrString';
import { getZIndex } from '../lib/getZIndex';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { FetchCommentCounts } from './FetchCommentCounts.importable';
import { Hide } from './Hide';
import { LeftColumn } from './LeftColumn';

type Props = {
	heading: string;
	trails: TrailType[];
	description?: string;
	url?: string;
	ophanComponentName: OphanComponentName;
	format: ArticleFormat;
	isCuratedContent?: boolean;
};

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

const wrapperStyle = (length: number) => css`
	display: flex;
	/* Remove space-between where there is a single item, so that it is left-aligned */
	${length > 1 && 'justify-content: space-between'}
	overflow: hidden;
	${from.desktop} {
		padding-right: 40px;
	}
`;

// For desktop and above, are we at the last card. Is one less than the dots style equivalent
const isLastCardShowing = (index: number, totalStories: number) =>
	index >= totalStories - 4;

const containerMargins = css`
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

const containerStyles = css`
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden; /* Needed for scrolling to work */
`;

const carouselStyle = css`
	min-height: 227px;
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

const adjustNumberOfDotsStyle = (index: number, totalStories: number) => {
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
	${getZIndex('onwardsCarousel')}
	height: 100%;
	padding-bottom: 36px; /* Align buttons centrally with cards */

	${until.leftCol} {
		display: none;
	}
`;
const prevButtonContainerStyle = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			return css`
				${from.leftCol} {
					left: 205px;
				}
			`;
		}
		default: {
			return css`
				${from.leftCol} {
					left: 120px;
				}

				${from.wide} {
					left: 205px;
				}
			`;
		}
	}
};

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
	cursor: ${index !== 0 ? 'pointer' : 'default'};

	&:hover,
	&:focus {
		background-color: ${index !== 0 ? brandAlt[400] : neutral[60]};

		svg {
			fill: ${neutral[100]};
		}
	}
`;

const nextButtonStyle = (index: number, totalStories: number) => css`
	padding-left: 5px; /* Fix centering of SVG*/
	margin-left: 10px;
	background-color: ${!isLastCardShowing(index, totalStories)
		? neutral[0]
		: neutral[60]};
	cursor: ${!isLastCardShowing(index, totalStories) ? 'pointer' : 'default'};

	&:hover,
	&:focus {
		background-color: ${!isLastCardShowing(index, totalStories)
			? brandAlt[400]
			: neutral[60]};

		svg {
			fill: ${neutral[100]};
		}
	}
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

type CarouselCardProps = {
	isFirst: boolean;
	format: ArticleFormat;
	linkTo: string;
	headlineText: string;
	webPublicationDate: string;
	kickerText?: string;
	imageUrl?: string;
	dataLinkName?: string;
	discussionId?: string;
	/** Only used on Labs cards */
	branding?: Branding;
};

export const CarouselCard: React.FC<CarouselCardProps> = ({
	format,
	linkTo,
	imageUrl,
	headlineText,
	webPublicationDate,
	kickerText,
	isFirst,
	dataLinkName,
	discussionId,
	branding,
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
			showAge={true}
			imagePositionOnMobile="top"
			minWidthInPixels={220}
			showQuotes={
				format.design === ArticleDesign.Comment ||
				format.design === ArticleDesign.Letter
			}
			dataLinkName={dataLinkName}
			discussionId={discussionId}
			branding={branding}
		/>
	</LI>
);

type HeaderAndNavProps = {
	heading: string;
	trails: TrailType[];
	palette: Palette;
	index: number;
	isCuratedContent?: boolean;
	goToIndex: (newIndex: number) => void;
};

const HeaderAndNav: React.FC<HeaderAndNavProps> = ({
	heading,
	trails,
	palette,
	index,
	isCuratedContent,
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
						adjustNumberOfDotsStyle(i, trails.length),
					]}
					data-link-name={`carousel-small-nav-dot-${i}`}
				/>
			))}
		</div>
	</div>
);

export const Carousel = ({
	heading,
	trails,
	ophanComponentName,
	format,
	isCuratedContent,
}: Props) => {
	const palette = decidePalette(format);
	const carouselRef = useRef<HTMLUListElement>(null);

	const [index, setIndex] = useState(0);
	const [maxIndex, setMaxIndex] = useState(0);

	const arrowName = 'carousel-small-arrow';

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

	return (
		<div
			css={wrapperStyle(trails.length)}
			data-link-name={formatAttrString(heading)}
		>
			<FetchCommentCounts />
			<LeftColumn
				borderType="partial"
				size={
					format.design === ArticleDesign.LiveBlog ||
					format.design === ArticleDesign.DeadBlog
						? 'wide'
						: 'compact'
				}
			>
				<HeaderAndNav
					heading={heading}
					trails={trails}
					palette={palette}
					index={index}
					isCuratedContent={isCuratedContent}
					goToIndex={goToIndex}
				/>
			</LeftColumn>
			<div css={[buttonContainerStyle, prevButtonContainerStyle(format)]}>
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
				css={[containerStyles, containerMargins]}
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
					css={carouselStyle}
					ref={carouselRef}
					data-component={`carousel-small | maxIndex-${maxIndex}`}
				>
					{trails.map((trail, i) => {
						const {
							url: linkTo,
							headline: headlineText,
							webPublicationDate,
							format: trailFormat,
							image,
							kickerText,
							shortUrl,
							branding,
						} = trail;
						// Don't try to render cards that have no publication date. This property is technically optional
						// but we rarely if ever expect it not to exist
						if (!webPublicationDate) return null;
						const discussionId =
							shortUrl && new URL(shortUrl).pathname;

						return (
							<CarouselCard
								key={`${trail.url}${i}`}
								isFirst={i === 0}
								format={trailFormat}
								linkTo={linkTo}
								headlineText={headlineText}
								webPublicationDate={webPublicationDate}
								imageUrl={image}
								kickerText={kickerText}
								dataLinkName={`carousel-small-card-position-${i}`}
								discussionId={discussionId}
								branding={branding}
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
