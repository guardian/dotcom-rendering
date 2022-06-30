import { css } from '@emotion/react';
import {
	from,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import type { NewsletterResponse } from 'NewsletterResponse';
import { NewsletterFrequency } from './NewsletterFrequency';
import { SecureSignup } from './SecureSignup';

type Props = {
	newsletter: NewsletterResponse;
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

export const EmailSignup = ({ newsletter }: Props) => {
	const { identityName, name, description, frequency } = newsletter;
	const { successDescription } = newsletter.emailEmbed;

	return (
		<aside css={containerStyles}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles}>Sign up to {name} today</p>
				<NewsletterFrequency frequency={frequency} />
			</div>
			<p css={descriptionStyles}>{description}</p>
			<SecureSignup
				newsletterId={identityName}
				successDescription={successDescription}
			/>
		</aside>
	);
};
