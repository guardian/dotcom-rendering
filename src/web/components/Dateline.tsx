import React from 'react';

import { css, cx } from 'emotion';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

const captionFont = css`
	${textSans.xxsmall()};
	color: ${text.supporting};
`;

const dateline = css`
	${captionFont};

	padding-top: 2px;
	margin-bottom: 6px;
`;

// We use the 'Checkbox Hack' for the show-hide functionality of the secondary date line.
// https://css-tricks.com/the-checkbox-hack/
const toggleClass = css`
	input[type='checkbox'] {
		display: none;
	}

	input[type='checkbox']:checked ~ p {
		max-height: 80px;
	}
`;

const pStyle = css`
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.4s ease;
	${from.leftCol} {
		width: 90%;
	}
`;

const labelStyles = css`
	cursor: pointer;

	:hover {
		text-decoration: underline;
	}
`;

// At the moment the 'First published on' / 'Last modified on' is passed through on
// the secondaryDateline (this will be refactored). The current logic checks if the primary
// date is in the secondary to avoid duplicate dates being shown
export const Dateline: React.FC<{
	primaryDateline: string;
	secondaryDateline: string;
}> = ({ primaryDateline, secondaryDateline }) => {
	return (
		<div className={dateline}>
			{secondaryDateline &&
			!secondaryDateline.includes(primaryDateline) ? (
				<div className={cx(toggleClass, dateline)}>
					<label className={labelStyles} htmlFor="dateToggle">
						{primaryDateline}
					</label>

					<input
						className={toggleClass}
						type="checkbox"
						id="dateToggle"
					/>
					<p className={pStyle}>{secondaryDateline}</p>
				</div>
			) : (
				primaryDateline
			)}
		</div>
	);
};
