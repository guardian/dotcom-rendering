import { css } from '@emotion/react';
import {
	brandAltBackground,
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgEnvelope } from '@guardian/source-react-components';
import { SecureSignup } from './SecureSignup';

type Props = {
	newsletterId: string;
	name: string;
	description: string;
	frequency: string;
	successText: string;
};

const containerStyles = css`
	border: ${neutral[0]} 3px dashed;
	border-radius: 12px;
	padding: 10px;
	margin-bottom: ${space[3]}px;
`;

const stackBelowTabletStyles = css`
	display: flex;
	flex-direction: column;
	${from.tablet} {
		flex-direction: row;
	}
`;

const titleStyles = css`
	${headline.xsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
`;

const descriptionStyles = css`
	${textSans.medium({ lineHeight: 'tight' })}
	margin-top: ${space[1]}px;
	margin-bottom: ${space[2]}px;
`;

const Frequency = ({ frequency }: { frequency: string }) => {
	return (
		<div
			css={css`
				display: flex;
				margin-top: ${space[2]}px;
				${from.tablet} {
					margin-top: 0;
				}
			`}
		>
			<div
				css={css`
					svg {
						background: ${brandAltBackground.primary};
						border-radius: 50%;
						height: 28px;
						padding: 2px;
						margin-right: ${space[1]}px;
					}
				`}
			>
				<SvgEnvelope />
			</div>
			<div
				css={css`
					${textSans.medium({ fontWeight: 'bold' })}
				`}
			>
				{frequency}
			</div>
		</div>
	);
};

export const EmailSignup = ({
	newsletterId,
	name,
	description,
	frequency,
	successText,
}: Props) => {
	return (
		<aside css={containerStyles}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles}>Sign up to {name} today</p>
				<Frequency frequency={frequency} />
			</div>
			<p css={descriptionStyles}>{description}</p>
			<SecureSignup
				newsletterId={newsletterId}
				successText={successText}
			/>
		</aside>
	);
};
