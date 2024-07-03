import { css } from '@emotion/react';
import {
	from,
	textSans12,
	textSans17,
	visuallyHidden,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import ClockIcon from '../static/icons/clock.svg';

type Props = {
	age: string;
	isScreenReader?: boolean;
	size?: 'small' | 'medium';
};

const ageWarningStyles = (isSmall: boolean) => css`
	${isSmall ? textSans12 : textSans17};
	color: ${palette('--age-warning-text')};
	background-color: ${palette('--age-warning-background')};
	display: inline-block;

	> strong {
		font-weight: bold;
	}

	padding: ${isSmall ? '3px 5px' : '6px 10px'};

	${from.mobileLandscape} {
		padding-left: ${isSmall ? '6px' : '12px'};
	}

	${from.leftCol} {
		padding-left: ${isSmall ? '5px' : '10px'};
	}
`;

const ageWarningScreenReader = css`
	${visuallyHidden};
`;

const ensureOldText = (age: string) =>
	age.endsWith('old') ? age : `${age} old`;

export const AgeWarning = ({ age, isScreenReader, size = 'medium' }: Props) => {
	const warningPrefix = 'This article is more than ';
	const isSmall = size === 'small';
	const ageOld = ensureOldText(age);

	if (isScreenReader) {
		return <div css={ageWarningScreenReader}>{warningPrefix + age}</div>;
	}

	return (
		<div css={ageWarningStyles(isSmall)} aria-hidden="true">
			<ClockIcon /> {warningPrefix}
			<strong>{ageOld}</strong>
		</div>
	);
};
