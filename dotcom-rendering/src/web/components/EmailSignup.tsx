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
	newsletter: Newsletter;
	elementId: string;
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

const titleStyles = (theme: string) => css`
	${headline.xsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	span {
		color: ${theme === 'news' ? sport[500] : 'inherit'};
	}
`;

const descriptionStyles = css`
	${textSans.medium({ lineHeight: 'tight' })}
	margin-top: ${space[1]}px;
	margin-bottom: ${space[2]}px;
`;

export const EmailSignup = ({ newsletter }: Props) => {
	const {
		identityName,
		name,
		description,
		frequency,
		successDescription,
		theme,
	} = newsletter;

	return (
		<aside css={containerStyles}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(theme)}>
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
