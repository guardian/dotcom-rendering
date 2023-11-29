import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	from,
	headline,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source-foundations';
import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { formatAttrString } from '../lib/formatAttrString';
import { getSourceImageUrl } from '../lib/getSourceImageUrl_temp_fix';
import { getZIndex } from '../lib/getZIndex';
import { palette as themePalette } from '../palette';
import type { Branding } from '../types/branding';
import type { DCRContainerPalette, DCRContainerType } from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import type { OnwardsSource } from '../types/onwards';
import type { TrailType } from '../types/trails';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import type { Loading } from './CardPicture';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';
import { Hide } from './Hide';
import { LeftColumn } from './LeftColumn';

type Props = {
	heading: string;
	trails: TrailType[];
	description?: string;
	url?: string;
	onwardsSource: OnwardsSource;
	leftColSize: LeftColSize;
	discussionApiUrl: string;
};

type ArticleProps = Props & {
	format: ArticleFormat;
	isOnwardContent?: true;
};

type FrontProps = Props & {
	palette: DCRContainerPalette;
	containerType?: DCRContainerType;
	hasPageSkin?: boolean;
	isOnwardContent?: false;
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

const CarouselColours = ({
	props,
	children,
}: {
	props: { format: ArticleFormat } | { palette: DCRContainerPalette };
	children: React.ReactElement;
}): React.ReactElement => {
	if ('palette' in props) {
		return (
			<ContainerOverrides
				containerPalette={props.palette}
				isDynamo={false}
			>
				{children}
			</ContainerOverrides>
		);
	}
	if ('format' in props) {
		return (
			<FormatBoundary format={props.format}>{children}</FormatBoundary>
		);
	}
	return children;
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
const isLastCardShowing = (
	index: number,
	totalStories: number,
	totalCardsShowing: number,
) => index >= totalStories - totalCardsShowing;

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
`;

const videoContainerMargins = css`
	margin-bottom: 0;
	min-height: 0;
`;

const containerMarginsFromLeftCol = css`
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

const videoContainerHeight = css`
	min-height: 0;
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

const dotsSmallMargin = css`
	margin-bottom: ${space[2]}px;
`;

const dotsLargeMargin = css`
	margin-bottom: ${space[3]}px;
`;

const dotStyle = css`
	cursor: pointer;
	display: inline-block;
	height: ${space[3]}px;
	width: ${space[3]}px;
	background-color: ${themePalette('--carousel-dot')};
	border-radius: 100%;
	border: 0 none;
	padding: 0;
	margin-right: ${space[1]}px;

	&:hover,
	&:focus {
		background-color: ${themePalette('--carousel-dot-hover')};
		outline: none;
	}
`;

const activeDotStyles = css`
	background-color: ${themePalette('--carousel-active-dot')};

	&:hover,
	&:focus {
		background-color: ${themePalette('--carousel-active-dot')};
	}
`;

const adjustNumberOfDotsStyle = (
	index: number,
	totalStories: number,
	containerType?: DCRContainerType,
) => {
	switch (containerType) {
		case 'fixed/video':
			return css`
				display: ${index >= totalStories ? 'none' : 'auto'};
			`;
		default:
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
	}
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

const buttonContainerStyleWithPageSkin = css`
	display: none;
`;

const prevButtonContainerStyle = (leftColSize: LeftColSize) => {
	switch (leftColSize) {
		case 'wide':
			return css`
				${from.leftCol} {
					left: 205px;
				}
			`;
		case 'compact': {
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
	background-color: ${themePalette('--carousel-arrow-background')};

	&:active,
	&:hover {
		outline: none;
		background-color: ${themePalette('--carousel-arrow-background-hover')};
		svg {
			fill: ${sourcePalette.neutral[7]};
		}
	}

	&:focus {
		outline: none;
	}

	svg {
		fill: ${themePalette('--carousel-arrow')};
		height: 34px;
	}
`;

const linkStyles = css`
	text-decoration: none;
`;

const headerStylesWithUrl = css`
	:hover {
		text-decoration: underline;
	}
`;

const prevButtonStyle = (index: number) => css`
	background-color: ${index !== 0
		? themePalette('--carousel-arrow-background')
		: sourcePalette.neutral[46]};
	cursor: ${index !== 0 ? 'pointer' : 'default'};

	&:hover,
	&:focus {
		background-color: ${index !== 0
			? themePalette('--carousel-arrow-background-hover')
			: sourcePalette.neutral[46]};

		svg {
			fill: ${themePalette('--carousel-arrow')};
		}
	}
`;

const nextButtonStyle = (
	index: number,
	totalStories: number,
	totalCardsShowing: number,
) => css`
	padding-left: 5px; /* Fix centering of SVG*/
	margin-left: 10px;
	background-color: ${!isLastCardShowing(
		index,
		totalStories,
		totalCardsShowing,
	)
		? themePalette('--carousel-arrow-background')
		: sourcePalette.neutral[46]};
	cursor: ${!isLastCardShowing(index, totalStories, totalCardsShowing)
		? 'pointer'
		: 'default'};

	&:hover,
	&:focus {
		background-color: ${!isLastCardShowing(
			index,
			totalStories,
			totalCardsShowing,
		)
			? themePalette('--carousel-arrow-background-hover')
			: sourcePalette.neutral[46]};

		svg {
			fill: ${themePalette('--carousel-arrow')};
		}
	}
`;

const headerRowStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	${from.tablet} {
		padding-right: 10px;
		margin-left: 10px;
	}
`;

const headerStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${sourcePalette.neutral[7]};
	${headline.xsmall({ fontWeight: 'bold' })};
	padding-bottom: ${space[2]}px;
	padding-top: ${space[1]}px;
	margin-left: 0;
`;

const titleStyle = (isCuratedContent?: boolean) => css`
	color: ${isCuratedContent
		? themePalette('--carousel-title-highlight')
		: themePalette('--carousel-text')};
	display: inline-block;
	&::first-letter {
		text-transform: capitalize;
	}
`;

const getDataLinkNameCarouselButton = (
	direction: string,
	arrowName: string,
	isVideoContainer: boolean,
): string => {
	return `${isVideoContainer ? 'video-container' : arrowName}-${direction}`;
};

const Title = ({
	title,
	isCuratedContent,
	url,
}: {
	title: string;
	isCuratedContent?: boolean;
	url?: string;
}) =>
	url ? (
		<a
			css={[linkStyles]}
			href={url}
			data-link-name={
				title === 'Videos'
					? 'video-container-title Videos'
					: 'section heading'
			}
		>
			<h2 css={headerStyles}>
				<span css={[headerStylesWithUrl, titleStyle(isCuratedContent)]}>
					{title}
				</span>
			</h2>
		</a>
	) : (
		<h2 css={headerStyles}>
			{isCuratedContent ? 'More from ' : ''}
			<span css={titleStyle(isCuratedContent)}>{title}</span>
		</h2>
	);
type CarouselCardProps = {
	isFirst: boolean;
	format: ArticleFormat;
	linkTo: string;
	headlineText: string;
	webPublicationDate: string;
	imageLoading: Loading;
	kickerText?: string;
	imageUrl?: string;
	dataLinkName?: string;
	discussionApiUrl: string;
	isOnwardContent?: boolean;
	discussionId?: string;
	/** Only used on Labs cards */
	branding?: Branding;
	mainMedia?: MainMedia;
	onwardsSource?: string;
	containerType?: DCRContainerType;
};

const CarouselCard = ({
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
	mainMedia,
	onwardsSource,
	containerType,
	imageLoading,
	discussionApiUrl,
	isOnwardContent,
}: CarouselCardProps) => {
	const isVideoContainer = containerType === 'fixed/video';
	const cardImagePosition = isOnwardContent ? 'bottom' : 'top';
	return (
		<LI
			percentage="25%"
			showDivider={!isFirst && !isVideoContainer && !isOnwardContent}
			padSides={true}
			padSidesOnMobile={true}
			snapAlignStart={true}
			verticalDividerColour={themePalette('--carousel-border')}
			{...(isOnwardContent && {
				padSidesMobileOverride: space[2],
				padSidesOverride: space[2],
			})}
		>
			<Card
				linkTo={linkTo}
				format={format}
				headlineText={headlineText}
				webPublicationDate={webPublicationDate}
				kickerText={kickerText}
				imageUrl={imageUrl}
				imageSize={'small'}
				showClock={true}
				showAge={true}
				pauseOffscreenVideo={isVideoContainer}
				showQuotedHeadline={format.design === ArticleDesign.Comment}
				dataLinkName={dataLinkName}
				discussionId={discussionId}
				branding={branding}
				isExternalLink={false}
				mainMedia={mainMedia}
				minWidthInPixels={220}
				isPlayableMediaCard={isVideoContainer}
				onwardsSource={onwardsSource}
				containerType={containerType}
				imageLoading={imageLoading}
				discussionApiUrl={discussionApiUrl}
				isOnwardContent={isOnwardContent}
				imagePosition={cardImagePosition}
				imagePositionOnMobile={cardImagePosition}
			/>
		</LI>
	);
};

type HeaderAndNavProps = {
	heading: string;
	trails: TrailType[];
	index: number;
	goToIndex: (newIndex: number) => void;
	isCuratedContent?: boolean;
	containerType?: DCRContainerType;
	url?: string;
	isOnwardContent?: boolean;
};

const HeaderAndNav = ({
	heading,
	trails,
	index,
	goToIndex,
	isCuratedContent,
	containerType,
	url,
	isOnwardContent,
}: HeaderAndNavProps) => {
	return (
		<div>
			<Title
				title={heading}
				isCuratedContent={isCuratedContent}
				url={url}
			/>
			<div css={isOnwardContent ? dotsLargeMargin : dotsSmallMargin}>
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
							i === index && activeDotStyles,
							adjustNumberOfDotsStyle(
								i,
								trails.length,
								containerType,
							),
						]}
						data-link-name={`carousel-small-nav-dot-${i}`}
					/>
				))}
			</div>
		</div>
	);
};

const Header = ({
	heading,
	trails,
	index,
	goToIndex,
	prev,
	next,
	arrowName,
	isCuratedContent,
	containerType,
	hasPageSkin,
	url,
	isOnwardContent,
}: {
	heading: string;
	trails: TrailType[];
	index: number;
	goToIndex: (newIndex: number) => void;
	prev: () => void;
	next: () => void;
	arrowName: string;
	isCuratedContent: boolean;
	containerType?: DCRContainerType;
	hasPageSkin: boolean;
	url?: string;
	isOnwardContent?: boolean;
}) => {
	const isVideoContainer = containerType === 'fixed/video';
	const header = (
		<div css={headerRowStyles}>
			<HeaderAndNav
				heading={heading}
				trails={trails}
				index={index}
				isCuratedContent={isCuratedContent}
				goToIndex={goToIndex}
				containerType={containerType}
				url={url}
				isOnwardContent={isOnwardContent}
			/>
			<Hide when="below" breakpoint="desktop">
				<button
					type="button"
					onClick={prev}
					aria-label="Move carousel backwards"
					css={[buttonStyle, prevButtonStyle(index)]}
					data-link-name={getDataLinkNameCarouselButton(
						'prev',
						arrowName,
						isVideoContainer,
					)}
				>
					<SvgChevronLeftSingle />
				</button>
				<button
					type="button"
					onClick={next}
					aria-label="Move carousel forwards"
					css={[
						buttonStyle,
						nextButtonStyle(
							index,
							trails.length,
							isVideoContainer ? 1 : 4,
						),
					]}
					data-link-name={getDataLinkNameCarouselButton(
						'next',
						arrowName,
						isVideoContainer,
					)}
				>
					<SvgChevronRightSingle />
				</button>
			</Hide>
		</div>
	);
	/**
	 * When there is a page skin we constrain to a desktop layout
	 * So don't hide the header past leftcol as normal
	 */
	if (hasPageSkin) {
		return header;
	}
	return (
		<Hide when="above" breakpoint="leftCol">
			{header}
		</Hide>
	);
};

const InlineChevrons = ({
	trails,
	index,
	prev,
	next,
	arrowName,
	isVideoContainer,
	leftColSize,
	hasPageSkin,
}: {
	trails: TrailType[];
	index: number;
	prev: () => void;
	next: () => void;
	arrowName: string;
	isVideoContainer: boolean;
	leftColSize: LeftColSize;
	hasPageSkin: boolean;
}) => (
	<>
		<div
			css={[
				buttonContainerStyle,
				hasPageSkin && buttonContainerStyleWithPageSkin,
				!hasPageSkin && prevButtonContainerStyle(leftColSize),
			]}
		>
			<button
				type="button"
				onClick={prev}
				aria-label="Move carousel backwards"
				css={[buttonStyle, prevButtonStyle(index)]}
				data-link-name={getDataLinkNameCarouselButton(
					'prev',
					arrowName,
					isVideoContainer,
				)}
			>
				<SvgChevronLeftSingle />
			</button>
		</div>
		<div
			css={[
				buttonContainerStyle,
				hasPageSkin && buttonContainerStyleWithPageSkin,
				nextButtonContainerStyle,
			]}
		>
			<button
				type="button"
				onClick={next}
				aria-label="Move carousel forwards"
				css={[
					buttonStyle,
					nextButtonStyle(
						index,
						trails.length,
						isVideoContainer ? 1 : 4,
					),
				]}
				data-link-name={getDataLinkNameCarouselButton(
					'next',
					arrowName,
					isVideoContainer,
				)}
			>
				<SvgChevronRightSingle />
			</button>
		</div>
	</>
);

/**
 * A carousel of cards, mainly used in onward journeys,
 * at the bottom of articles
 *
 * ## Why does this need to be an Island?
 *
 * Data is fetched from an API client-side.
 *
 * ---
 *
 * [`Carousel` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-carousel)
 */
export const Carousel = ({
	heading,
	trails,
	onwardsSource,
	leftColSize,
	discussionApiUrl,
	isOnwardContent = true,
	...props
}: ArticleProps | FrontProps) => {
	const carouselRef = useRef<HTMLUListElement>(null);

	const [index, setIndex] = useState(0);
	const [maxIndex, setMaxIndex] = useState(0);

	const arrowName = 'carousel-small-arrow';

	const isCuratedContent = onwardsSource === 'curated-content';
	const containerType =
		'containerType' in props ? props.containerType : undefined;

	const isVideoContainer = containerType === 'fixed/video';

	const hasPageSkin = 'hasPageSkin' in props && (props.hasPageSkin ?? false);

	const notPresentation = (el: HTMLElement): boolean =>
		el.getAttribute('role') !== 'presentation';

	const getItems = (): HTMLElement[] => {
		const { current } = carouselRef;
		if (current === null) return [];

		return Array.from(current.children) as HTMLElement[];
	};

	const getIndex = (): number => {
		const { current } = carouselRef;
		const offsets = getItems()
			.filter(notPresentation)
			.map((el) => el.offsetLeft);
		const [offset] = offsets;
		if (current === null || offset === undefined) return 0;

		const scrolled = current.scrollLeft + offset;
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
		const offsets = getItems()
			.filter(notPresentation)
			.map(({ offsetLeft }) => offsetLeft);
		const [offset] = offsets;

		if (current === null || offset === undefined) return;

		const scrolled = current.scrollLeft + offset;

		const nextOffset = offsets.reverse().find((o) => o < scrolled);

		if (nextOffset !== undefined && nextOffset !== 0) {
			current.scrollTo({ left: nextOffset });
		} else {
			current.scrollTo({ left: 0 });
		}
		getSetIndex();
	};

	const next = () => {
		const { current } = carouselRef;
		const offsets = getItems()
			.filter(notPresentation)
			.map(({ offsetLeft }) => offsetLeft);
		const [offset] = offsets;

		if (current === null || offset === undefined) return;

		const scrolled = current.scrollLeft + offset;
		const nextOffset = offsets.find((currOffset) => currOffset > scrolled);

		if (nextOffset !== undefined && nextOffset !== 0) {
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
		<CarouselColours props={props}>
			<div
				css={wrapperStyle(trails.length)}
				data-link-name={formatAttrString(heading)}
				data-component={isVideoContainer ? 'video-playlist' : undefined}
			>
				<LeftColumn
					size={leftColSize}
					borderColour={themePalette('--carousel-border')}
					hasPageSkin={hasPageSkin}
				>
					<HeaderAndNav
						heading={heading}
						trails={trails}
						index={index}
						isCuratedContent={isCuratedContent}
						goToIndex={goToIndex}
						url={props.url}
					/>
				</LeftColumn>
				<InlineChevrons
					trails={trails}
					index={index}
					prev={prev}
					next={next}
					arrowName={arrowName}
					isVideoContainer={isVideoContainer}
					leftColSize={leftColSize}
					hasPageSkin={hasPageSkin}
				/>
				<div
					css={[
						containerStyles,
						containerMargins,
						!hasPageSkin && containerMarginsFromLeftCol,
						isVideoContainer && videoContainerMargins,
					]}
					data-component={onwardsSource}
					data-link={formatAttrString(heading)}
				>
					<Header
						heading={heading}
						trails={trails}
						index={index}
						goToIndex={goToIndex}
						prev={prev}
						next={next}
						arrowName={arrowName}
						isCuratedContent={isCuratedContent}
						containerType={containerType}
						hasPageSkin={hasPageSkin}
						url={props.url}
						isOnwardContent={isOnwardContent}
					/>
					<ul
						css={[
							carouselStyle,
							isVideoContainer && videoContainerHeight,
						]}
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
								branding,
								discussion,
								mainMedia,
							} = trail;

							// Don't try to render cards that have no publication date. This property is technically optional
							// but we rarely if ever expect it not to exist
							if (!webPublicationDate) return null;

							const imageUrl = image && getSourceImageUrl(image);

							const imageLoading = i > 3 ? 'lazy' : 'eager';

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
									dataLinkName={`carousel-small-card-position-${i}`}
									discussionId={
										discussion?.isCommentable
											? discussion.discussionId
											: undefined
									}
									branding={branding}
									mainMedia={mainMedia}
									onwardsSource={onwardsSource}
									containerType={containerType}
									imageLoading={imageLoading}
									discussionApiUrl={discussionApiUrl}
									isOnwardContent={isOnwardContent}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		</CarouselColours>
	);
};
