import React from 'react';
import { css, cx } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { pillarPalette } from '@root/src/lib/pillars';
import { neutral } from '@guardian/src-foundations/palette';
import { CardAge } from '../../Card/components/CardAge';
import { Kicker } from '../../Kicker';

const cardWrapperStyle = (pillar: CAPIPillar) => css`
	position: relative;
	width: 258px;
	flex-shrink: 0;
	margin: 0 ${space[2]}px;
	border-top: 4px solid ${pillarPalette[pillar].main};

	scroll-snap-align: start;

	:hover {
		filter: brightness(90%);
	}

	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: flex-end;

	text-decoration: none;

	color: inherit;
	margin-bottom: -4px;
`;

const cardBackgroundImageStyle = (imageUrl: string | undefined) => css`
	background: transparent url(${imageUrl}) no-repeat center / cover;
`;

const cardWrapperFirstStyle = css`
	margin-left: 0;
`;

// const cardImageStyle = css`
// 	width: 258px;
// `;

const headlineWrapperStyle = css`
	width: 100%;
	/* min-height: 107px; */
	max-height: fit-content;

	margin-top: -21px;
	${from.desktop} {
		margin-top: -23px;
	}

	flex-grow: 0;

	display: flex;
	flex-direction: row;
	align-content: flex-end;
	margin-left: ${space[1]}px;
	margin-bottom: ${space[1]}px;
	/* {headlineBackgroundColour(designType, pillar)} */
`;

const headlineStyle = css`
	${headline.xxxsmall()};

	color: ${neutral[100]};

	display: inline;

	max-width: 75%;
`;

const headlineTextStyle = css`
	background-color: rgba(0, 0, 0, 0.75);
	box-shadow: -${space[1]}px 0 0 rgba(0, 0, 0, 0.75);
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
	line-height: 1.25;
	white-space: pre-wrap;
`;

type CardProps = {
	trail: TrailType;
	isFirst?: boolean;
};

export const CarouselCard: React.FC<CardProps> = ({
	trail,
	isFirst,
}: CardProps) => {
	const kickerText = trail.designType === 'Live' ? 'Live' : trail.kickerText;

	return (
		<a
			href={trail.url}
			className={cx(
				isFirst
					? cx(cardWrapperStyle(trail.pillar), cardWrapperFirstStyle)
					: cardWrapperStyle(trail.pillar),
				cardBackgroundImageStyle(trail.image),
			)}
			data-link-name="article"
		>
			{/* <img
				className={cardImageStyle}
				src={trail.image}
				alt=""
				role="presentation"
			/> */}
			<div className={headlineWrapperStyle}>
				<h4 className={headlineStyle}>
					<span className={headlineTextStyle}>
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
					</span>
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
