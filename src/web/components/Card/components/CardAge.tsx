import React from 'react';
import { css } from 'emotion';

import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import ClockIcon from '@frontend/static/icons/clock.svg';

import { makeRelativeDate } from '@root/src/web/lib/dateTime';
import { space } from '@guardian/src-foundations';

const ageStyles = (designType: DesignType) => css`
	${textSans.xsmall()};
	color: ${neutral[100]};
	min-width: 25%;
	align-self: flex-end;
	text-align: end;

	/* Provide side padding for positioning and also to keep spacing
    between any sibings (like GuardianLines) */
	padding-left: ${space[1]}px;
	padding-right: ${space[1]}px;
	line-height: 1.25;
	svg {
		fill: ${neutral[100]};
		margin-bottom: -1px;
		height: 11px;
		width: 11px;
		margin-right: 2px;
	}

	> time {
		${textSans.xsmall({
			fontWeight: designType === `Media` ? `bold` : `regular`,
		})};
	}
`;

const ageTextStyles = css`
	background-color: rgba(0, 0, 0, 0.75);
	white-space: pre-wrap;
	box-shadow: -${space[1]}px 0 0 rgba(0, 0, 0, 0.75);
	/* Box decoration is required to push the box shadow out on Firefox */
	box-decoration-break: clone;
`;

type Props = {
	designType: DesignType;
	pillar: CAPIPillar;
	webPublicationDate: string;
	showClock?: boolean;
};

export const CardAge = ({
	designType,
	webPublicationDate,
	showClock,
}: Props) => {
	const displayString = makeRelativeDate(
		new Date(webPublicationDate).getTime(),
		{
			format: 'med',
		},
	);

	if (!displayString) {
		return null;
	}

	return (
		<span className={ageStyles(designType)}>
			<span className={ageTextStyles}>
				{showClock && <ClockIcon />}
				<time dateTime={webPublicationDate}>{displayString}</time>
			</span>
		</span>
	);
};
