import { css } from '@emotion/react';
import {
	space,
	textSans14,
	textSansBold14,
} from '@guardian/source/foundations';
import { SvgClock } from '@guardian/source/react-components';

type Props = {
	frequency: string;
};

const mainStyles = css`
	display: flex;
	margin-top: ${space[1]}px;
`;

const spanStyles = css`
	margin-left: ${space[1]}px;
	${textSans14}
	strong {
		${textSansBold14}
	}
`;

export const NewsletterFrequency = ({ frequency }: Props) => {
	// SIGNPOST: This may need to be updated depending on possible values of `frequency`
	const freq = frequency.toLowerCase();

	return (
		<div css={mainStyles}>
			<SvgClock size="xsmall" />

			<span css={spanStyles}>
				You'll receive this newsletter <strong>{freq}</strong>
			</span>
		</div>
	);
};
