import React from 'react';
import { css, cx } from 'emotion';

import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';

import CommentIcon from '@frontend/static/icons/comment.svg';
import { decidePillarLight } from '@root/src/web/lib/decidePillarLight';
import { pillarPalette } from '@frontend/lib/pillars';

type Props = {
	designType: DesignType;
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

const colourStyles = (designType: DesignType, pillar: CAPIPillar) => {
	switch (designType) {
		case 'Live':
			return css`
				color: ${decidePillarLight(pillar)};
				svg {
					fill: ${decidePillarLight(pillar)};
				}
			`;
		case 'Feature':
		case 'Interview':
		case 'Media':
		case 'PhotoEssay':
		case 'Analysis':
		case 'Article':
		case 'Review':
		case 'Recipe':
		case 'MatchReport':
		case 'GuardianView':
		case 'Quiz':
		case 'AdvertisementFeature':
		case 'Comment':
		default:
			return css`
				color: ${neutral[60]};
				svg {
					fill: ${neutral[46]};
				}
			`;
	}
};

export const CardCommentCount = ({
	designType,
	pillar,
	short,
	long,
}: Props) => {
	return (
		<div
			className={cx(
				containerStyles,
				designType === 'Media'
					? mediaStyles(pillar)
					: colourStyles(designType, pillar),
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
