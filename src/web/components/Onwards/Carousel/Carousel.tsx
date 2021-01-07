import React, { useRef, useState, useEffect } from 'react';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/src-icons';
import { css, cx } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { palette, space } from '@guardian/src-foundations';
import libDebounce from 'lodash/debounce';
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

const headlineWrapperStyle = (design: Design, pillar: CAPIPillar) => css`
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

	${headlineBackgroundColour(design, pillar)}
`;

/* const headlineWrapperFirstStyle = css`
    ${headlineWrapperStyle};
    background-color: ${palette.news.dark};
    color: white;
`;
 */
const headlineStyle = (design: Design, pillar: CAPIPillar) => css`
	${headline.xxxsmall()};
	${from.desktop} {
		${headline.xxsmall()};
	}

	${headlineColour(design, pillar)};

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
	const kickerText = trail.design === 'Live' ? 'Live' : trail.kickerText;

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
			<div className={headlineWrapperStyle(trail.design, trail.pillar)}>
				<h4 className={headlineStyle(trail.design, trail.pillar)}>
					{kickerText && (
						<Kicker
							text={kickerText}
							design={trail.design}
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
					design={trail.design}
				/>
			</div>
		</a>
	);
};

export const Carousel: React.FC<OnwardsType> = ({
	heading,
	trails,
	ophanComponentName,
	pillar,
}: OnwardsType) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const [index, setIndex] = useState(0);

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
		if (carouselRef.current) {
			carouselRef.current.addEventListener(
				'scroll',
				libDebounce(getSetIndex, 100),
			);
		}
	});

	const cards = trails.map((trail, i) => (
		<Card trail={trail} isFirst={i === 0} />
	));

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
							onClick={prev}
							aria-label="Move carousel backwards"
							className={buttonStyle}
						>
							<SvgChevronLeftSingle />
						</button>
						<button
							onClick={next}
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
							onClick={() => goToIndex(i)}
							// This button is not particularly useful for keyboard users as the stories
							// are tabb-able themselves so we hide them with aria and make them
							// not available to keyboard
							aria-hidden="true"
							className={cx(
								dotStyle,
								i === index && dotActiveStyle(pillar),
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
