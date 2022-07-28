import { css } from '@emotion/react';
import {
	brandAltBackground,
	from,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgEnvelope } from '@guardian/source-react-components';

type Props = {
	frequency: string;
};

const mainStyles = css`
	display: flex;
	margin-top: ${space[2]}px;
	${from.tablet} {
		margin-top: 0;
	}
`;
const iconStyles = css`
	height: 28px;
	svg {
		background: ${brandAltBackground.primary};
		border-radius: 50%;
		height: 100%;
		padding: 2px;
		margin-right: ${space[1]}px;
	}
`;

const frequencyStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

export const NewsletterFrequency = ({ frequency }: Props) => {
	return (
		<div css={mainStyles}>
			<div css={iconStyles}>
				<SvgEnvelope />
			</div>
			<div css={frequencyStyles}>{frequency}</div>
		</div>
	);
};
