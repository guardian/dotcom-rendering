import React, { useRef, useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import libDebounce from 'lodash/debounce';

import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/src-icons';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { palette, space } from '@guardian/src-foundations';
import { Display } from '@guardian/types';

import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { formatAttrString } from '@frontend/web/lib/formatAttrString';
import { Card } from '@frontend/web/components/Card/Card';
import { LI } from '@frontend/web/components/Card/components/LI';
import { pillarPalette } from '@root/src/lib/pillars';

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

const carouselStyle = (isFullCardImage?: boolean) => css`
	min-height: ${!isFullCardImage && '227px'};
	position: relative; /* must set position for offset(Left) calculations of children to be relative to this box */

	display: flex;
	flex-direction: row;
	align-items: stretch;

	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto; /* Scrollbar is less intrusive visually on non-desktop devices typically */
	${from.tablet} {
		&::-webkit-scrollbar {
			display: none;
		}

		scrollbar-width: none;
	}

	margin-left: -5px; /* Align leftmost card correctly */
`;

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

const dotActiveStyle = (pillar: Theme) => css`
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

const titleStyle = (pillar: Theme) => css`
	color: ${pillarPalette[pillar].main};
`;

const Title = ({
	title,
	pillar,
}: {
	title: string;
	url?: string;
	pillar: Theme;
}) => (
	<h2 className={headerStyles}>
		More from <span className={titleStyle(pillar)}>{title}</span>
	</h2>
);

export const Carousel: React.FC<OnwardsType> = ({
	heading,
	trails,
	ophanComponentName,
	pillar,
	isFullCardImage,
}: OnwardsType) => {
	const carouselRef = useRef<HTMLUListElement>(null);
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
					{trails.map((_, i) => (
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

				<ul
					className={carouselStyle(isFullCardImage)}
					ref={carouselRef}
				>
					{trails.map((trail, i) => (
						<LI
							stretch={true}
							percentage="100%"
							showDivider={i !== 0}
							padSides={true}
							padSidesOnMobile={true}
						>
							<Card
								linkTo={trail.url}
								format={trail.format}
								headlineText={trail.headline}
								webPublicationDate={trail.webPublicationDate}
								kickerText={trail.kickerText || ''}
								imageUrl={trail.image || ''}
								showClock={true}
								alwaysVertical={true}
								minWidthInPixels={258}
								isFullCardImage={isFullCardImage}
							/>
						</LI>
					))}
				</ul>
			</div>
		</div>
	);
};
