import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/src-icons';
import { css, cx } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { palette, space } from '@guardian/src-foundations';
// import libDebounce from 'lodash/debounce';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { formatAttrString } from '@frontend/web/lib/formatAttrString';
import { pillarPalette } from '@root/src/lib/pillars';
import { CardAge } from '../../Card/components/CardAge';
import { Kicker } from '../../Kicker';
import { headlineBackgroundColour, headlineColour } from './cardColours';

const navIconStyle = css`
	display: inline-block;

	svg {
		height: 32px;
		fill: ${palette.neutral[46]};
	}
`;

const wrapperStyle = css`
	display: flex;
	justify-content: space-between;
	overflow: hidden;
`;

const containerStyles = css`
	display: flex;
	flex-direction: column;
	overflow: hidden;

	margin-top: 6px;
	${from.leftCol} {
		margin-top: 26px;
	}

	margin-bottom: 60px;

	margin-left: 0px;
	margin-right: 0px;

	${from.tablet} {
		/* Shrink the container to remove the leading and
       trailing side margins from the list of cards */
		margin-left: -10px;
		margin-right: -10px;
	}

	${from.leftCol} {
		margin-left: 0px;
		margin-right: -10px;
	}

	${from.wide} {
		margin-right: 70px;
		margin-top: 5px;
	}
`;

const carouselStyle = css`
	min-height: 227px;
	display: flex;
	align-items: stretch;

	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;

	position: relative; /* must set position for offset(Left) calculations of children to be relative to this box */

	overflow-x: scroll; /* Scrollbar is less intrusive visually on non-desktop devices typically */
	${from.tablet} {
		&::-webkit-scrollbar {
			display: none;
		}

		scrollbar-width: none;
	}

	${from.tablet} {
		margin-left: 10px;
	}
`;

const cardWrapperStyle = css`
	position: relative;
	width: 258px;
	flex-shrink: 0;
	margin: 0 ${space[2]}px;

	scroll-snap-align: start;

	:hover {
		filter: brightness(90%);
	}

	display: flex;
	flex-direction: column;
	align-items: stretch;

	text-decoration: none;

	color: inherit;
`;

const cardWrapperFirstStyle = css`
	${cardWrapperStyle};
	margin-left: 0;
`;

const cardImageStyle = css`
	width: 258px;
`;

const headlineWrapperStyle = (
	designType: DesignType,
	pillar: CAPIPillar,
) => css`
	width: 90%;
	min-height: 107px;

	margin-top: -21px;
	${from.desktop} {
		margin-top: -23px;
	}

	flex-grow: 1;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	${headlineBackgroundColour(designType, pillar)}
`;

/* const headlineWrapperFirstStyle = css`
    ${headlineWrapperStyle};
    background-color: ${palette.news.dark};
    color: white;
`;
 */
const headlineStyle = (designType: DesignType, pillar: CAPIPillar) => css`
	${headline.xxxsmall()};
	${from.desktop} {
		${headline.xxsmall()};
	}

	${headlineColour(designType, pillar)};

	display: block;
	padding: ${space[1]}px;
`;

/* const headlineFirstStyle = css`
    ${headlineStyle};
    color: ${palette.neutral[100]};
`;
 */
const dotsStyle = css`
	margin-bottom: ${space[2]}px;

	${from.tablet} {
		margin-left: 10px;
	}
`;

const dotStyle = css`
	cursor: pointer;
	display: inline-block;
	height: ${space[3]}px;
	width: ${space[3]}px;
	background-color: ${palette.neutral[93]};
	border-radius: 100%;
	border: 0 none;
	padding: 0;
	margin-right: ${space[1]}px;

	&:hover,
	&:focus {
		background-color: ${palette.neutral[86]};
		outline: none;
	}
`;

const dotActiveStyle = (pillar: CAPIPillar) => css`
	background-color: ${pillarPalette[pillar][400]};

	&:hover,
	&:focus {
		background-color: ${pillarPalette[pillar].main};
	}
`;

const adjustNumberOfDotsStyle = (index: number, totalStories: number) => css`
	/* This is a bit of a hack for the test, while we think of better UX here.
    The dots can't line up on Desktop because we don't show 1 story per swipe*/
	${from.phablet} {
		display: ${index >= totalStories - 1 ? 'none' : 'auto'};
	}

	${from.desktop} {
		display: ${index >= totalStories - 2 ? 'none' : 'auto'};
	}
`;

const buttonStyle = css`
	border: none;
	background: none;
	cursor: pointer;
	margin: 0;
	padding: 0;

	&:hover,
	&:focus {
		outline: none;
		svg {
			fill: ${palette.neutral[7]};
		}
	}
`;

const verticalLine = css`
	width: 1px;
	background-color: ${palette.neutral[86]};
	flex-shrink: 0;
`;

const navRowStyles = css`
	display: flex;
	justify-content: space-between;
	align-items: center;

	${from.tablet} {
		padding-right: 10px;
	}

	${from.tablet} {
		margin-left: 10px;
	}
`;

const headerStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${palette.text.primary};
	padding-bottom: 6px;
	padding-top: 0;
`;

const titleStyle = (pillar: CAPIPillar) => css`
	color: ${pillarPalette[pillar].main};
`;

export const Title = ({
	title,
	pillar,
}: {
	title: string;
	url?: string;
	pillar: CAPIPillar;
}) => (
	<h2 className={headerStyles}>
		More from <span className={titleStyle(pillar)}>{title}</span>
	</h2>
);

const interleave = <A,>(arr: A[], separator: A): A[] => {
	const separated = arr.map((elem) => [elem, separator]).flat();
	if (separated.length > 0) separated.pop(); // remove separator at end
	return separated;
};

type CardProps = {
	trail: TrailType;
	isFirst?: boolean;
};

const Card: React.FC<CardProps> = ({ trail, isFirst }: CardProps) => {
	const kickerText = trail.designType === 'Live' ? 'Live' : trail.kickerText;

	return (
		<a
			href={trail.url}
			className={isFirst ? cardWrapperFirstStyle : cardWrapperStyle}
			data-link-name="article"
		>
			<img
				className={cardImageStyle}
				src={trail.image}
				alt=""
				role="presentation"
			/>
			<div
				className={headlineWrapperStyle(trail.designType, trail.pillar)}
			>
				<h4 className={headlineStyle(trail.designType, trail.pillar)}>
					{kickerText && (
						<Kicker
							text={kickerText}
							designType={trail.designType}
							pillar={trail.pillar}
							showPulsingDot={trail.isLiveBlog}
							inCard={true}
						/>
					)}
					{trail.headline}
				</h4>
				<CardAge
					webPublicationDate={trail.webPublicationDate}
					showClock={true}
					pillar={trail.pillar}
					designType={trail.designType}
				/>
			</div>
		</a>
	);
};

/* -- Logrocket Carousel stuff --*/

// defines the time for the animation between slides in milliseconds
const transitionTime = 400;
interface CarouselState {
	offset: number;
	desired: number;
	active: number;
}

const initialCarouselState: CarouselState = {
	offset: 0,
	desired: 0,
	active: 0,
};

interface CarouselNextAction {
	type: 'next';
	length: number;
}

interface CarouselPrevAction {
	type: 'prev';
	length: number;
}

interface CarouselJumpAction {
	type: 'jump';
	desired: number;
}

interface CarouselDoneAction {
	type: 'done';
}

interface CarouselScrollAction {
	type: 'scroll';
	offset: number;
}

type CarouselAction =
	| CarouselJumpAction
	| CarouselNextAction
	| CarouselPrevAction
	| CarouselScrollAction
	| CarouselDoneAction;

const previous = (current: number) => {
	return Math.max(current - 1, 0);
};

const next = (current: number, length: number) => {
	return Math.min(current + 1, length - 1);
};

const carouselReducer = (
	state: CarouselState,
	action: CarouselAction,
): CarouselState => {
	switch (action.type) {
		case 'jump':
			return {
				...state,
				desired: action.desired,
			};
		case 'next':
			return {
				...state,
				desired: next(state.active, action.length),
			};
		case 'prev':
			return {
				...state,
				desired: previous(state.active),
			};
		case 'done':
			return {
				...state,
				offset: NaN,
				active: state.desired,
			};
		case 'scroll':
			return {
				...state,
				offset: action.offset,
			};
		default:
			return state;
	}
};

/*-----------------------------*/

export const Carousel: React.FC<OnwardsType> = ({
	heading,
	trails,
	ophanComponentName,
	pillar,
}: OnwardsType) => {
	const cards = trails.map((trail, i) => (
		<Card trail={trail} isFirst={i === 0} />
	));
	const carouselRef = useRef<HTMLDivElement>(null);

	const length = trails.length - 2;

	const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);

	const notPresentation = (el: HTMLElement): boolean =>
		el.getAttribute('role') !== 'presentation';

	const getItems = (): HTMLElement[] => {
		const { current } = carouselRef;
		if (current === null) return [];

		return Array.from(current.children) as HTMLElement[];
	};

	const goToIndex = useCallback((newIndex: number) => {
		const { current } = carouselRef;
		if (current === null) return;

		const offsets = getItems()
			.filter(notPresentation)
			.map((el) => el.offsetLeft);

		current.scrollTo({ left: offsets[newIndex] });
	}, []);

	useEffect(() => {
		goToIndex(state.desired);
		const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime);
		return () => clearTimeout(id);
	}, [state.desired, goToIndex]);

	return (
		<div
			className={wrapperStyle}
			data-link-name={formatAttrString(heading)}
		>
			<LeftColumn showRightBorder={false} showPartialRightBorder={true}>
				<div />
			</LeftColumn>
			<div
				className={containerStyles}
				data-component={ophanComponentName}
				data-link={formatAttrString(heading)}
			>
				<div className={navRowStyles}>
					<Title title={heading} pillar={pillar} />

					<div className={navIconStyle} data-link-name="nav-arrow">
						<button
							onClick={() => dispatch({ type: 'prev', length })}
							aria-label="Move carousel backwards"
							className={buttonStyle}
						>
							<SvgChevronLeftSingle />
						</button>
						<button
							onClick={() => dispatch({ type: 'next', length })}
							aria-label="Move carousel forwards"
							className={buttonStyle}
						>
							<SvgChevronRightSingle />
						</button>
					</div>
				</div>

				<div className={dotsStyle}>
					{trails.map((value, i) => (
						<span
							onClick={() =>
								dispatch({ type: 'jump', desired: i })
							}
							// This button is not particularly useful for keyboard users as the stories
							// are tabb-able themselves so we hide them with aria and make them
							// not available to keyboard
							aria-hidden="true"
							className={cx(
								dotStyle,
								i === state.desired && dotActiveStyle(pillar),
								adjustNumberOfDotsStyle(i, trails.length),
							)}
						/>
					))}
				</div>

				<div className={carouselStyle} ref={carouselRef}>
					{interleave(
						cards,
						<div role="presentation" className={verticalLine} />,
					)}
				</div>
			</div>
		</div>
	);
};
