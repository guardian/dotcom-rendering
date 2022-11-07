import { css } from '@emotion/react';
import {
	from,
	palette,
	textSans,
	visuallyHidden,
} from '@guardian/source-foundations';
import ClockIcon from '../../../static/icons/clock.svg';

type Props = {
	age: string;
	isScreenReader?: boolean;
};

const deadlineStyles = css`
	${textSans.xxsmall()};
	color: ${palette.brand};
	background-color: ${palette.brandAlt[400]};
	display: inline-block;

	> strong {
		font-weight: bold;
	}

	padding: ${'3px 5px'};

	${from.mobileLandscape} {
		padding-left: ${'6px'};
	}

	${from.leftCol} {
		padding-left: ${'5px'};
	}
`;

const deadlineScreenReader = css`
	${visuallyHidden};
`;

export const Deadline = ({ age, isScreenReader }: Props) => {
	const warningPrefix = 'This article is more than ';

	if (isScreenReader) {
		return <div css={deadlineScreenReader}>{warningPrefix + age}</div>;
	}

	return (
		<div css={deadlineStyles} aria-hidden="true">
			<ClockIcon /> {warningPrefix}
			<strong>{age}</strong>
		</div>
	);
};
