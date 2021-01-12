import React from 'react';
import { css, cx } from 'emotion';

import { Design } from '@guardian/types';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import CommentIcon from '@frontend/static/icons/comment.svg';
import { decidePillarLight } from '@root/src/web/lib/decidePillarLight';
import { pillarPalette } from '@frontend/lib/pillars';

type Props = {
	design: Design;
	pillar: CAPIPillar;
	short: string;
	long: string;
};

const containerStyles = css`
	display: flex;
	flex-direction: row;
	${textSans.xsmall()};
	padding-left: 5px;
	padding-right: 5px;
`;

const svgStyles = css`
	svg {
		margin-bottom: -5px;
		height: 14px;
		width: 14px;
		margin-right: 2px;
	}
`;

const longStyles = css`
	display: block;

	${between.leftCol.and.wide} {
		display: none;
	}
`;

const shortStyles = css`
	display: none;

	${between.leftCol.and.wide} {
		display: block;
	}
`;

const mediaStyles = (pillar: CAPIPillar) => css`
	/* Below we force the colour to be bright if the pillar is news (because it looks better) */
	color: ${pillar === 'news'
		? pillarPalette[pillar].bright
		: pillarPalette[pillar].main};

	svg {
		fill: ${pillar === 'news'
			? pillarPalette[pillar].bright
			: pillarPalette[pillar].main};
	}
`;

const colourStyles = (design: Design, pillar: CAPIPillar) => {
	switch (design) {
		case Design.Live:
			return css`
				color: ${decidePillarLight(pillar)};
				svg {
					fill: ${decidePillarLight(pillar)};
				}
			`;
		case Design.Feature:
		case Design.Interview:
		case Design.Media:
		case Design.PhotoEssay:
		case Design.Analysis:
		case Design.Article:
		case Design.Review:
		case Design.Recipe:
		case Design.MatchReport:
		case Design.GuardianView:
		case Design.Quiz:
		case Design.AdvertisementFeature:
		case Design.Comment:
		default:
			return css`
				color: ${neutral[60]};
				svg {
					fill: ${neutral[46]};
				}
			`;
	}
};

export const CardCommentCount = ({ design, pillar, short, long }: Props) => {
	return (
		<div
			className={cx(
				containerStyles,
				design === Design.Media
					? mediaStyles(pillar)
					: colourStyles(design, pillar),
			)}
			aria-label={`${short} Comments`}
		>
			<div className={svgStyles}>
				<CommentIcon />
			</div>
			<div className={longStyles} aria-hidden="true">
				{long}
			</div>
			<div className={shortStyles} aria-hidden="true">
				{short}
			</div>
		</div>
	);
};
