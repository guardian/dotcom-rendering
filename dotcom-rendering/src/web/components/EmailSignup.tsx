import { css } from '@emotion/react';
import {
	from,
	headline,
	neutral,
	space,
	sport,
	textSans,
} from '@guardian/source-foundations';
import { NewsletterFrequency } from './NewsletterFrequency';
import { SecureSignup } from './SecureSignup';

type Props = {
	newsletter: NewsletterResponse;
};

const containerStyles = css`
	border: ${neutral[0]} 3px dashed;
	border-radius: 12px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px ${space[2]}px;

	${from.tablet} {
		padding: ${space[2]}px ${space[4]}px;
	}
`;

const stackBelowTabletStyles = css`
	display: flex;
	flex-direction: column;
	margin-bottom: ${space[2]}px;
	${from.tablet} {
		flex-direction: row;
		margin-bottom: ${space[1]}px;
	}
`;

const titleStyles = (newsletter: NewsletterResponse) => css`
	${headline.xsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	margin-bottom: ${space[2]}px;
	${from.tablet} {
		margin-bottom: 0;
	}

	span {
		color: ${newsletter.theme === 'news' ? sport[500] : 'inherit'};
	}
`;

const descriptionStyles = css`
	${textSans.medium({ lineHeight: 'tight' })}
	margin-bottom: ${space[2]}px;
`;

export const EmailSignup = ({ newsletter }: Props) => {
	const { identityName, name, description, frequency } = newsletter;
	const { successDescription } = newsletter.emailEmbed;

	return (
		<aside css={containerStyles}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(newsletter)}>
					Sign up to <span>{name}</span> today
				</p>
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
