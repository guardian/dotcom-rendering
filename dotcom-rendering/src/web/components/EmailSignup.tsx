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
	clearFromLeftCol?: boolean;
};

const containerStyles = (clearFromLeftCol?: boolean) => css`
	clear: both;
	border: ${neutral[0]} 3px dashed;
	border-radius: 12px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;

	${from.tablet} {
		padding: ${space[2]}px ${space[3]}px;
	}

	${from.leftCol} {
		clear: ${clearFromLeftCol ? 'clear' : 'none'};
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

const titleStyles = (theme: string) => css`
	${headline.xsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	span {
		color: ${theme === 'news' ? sport[500] : 'inherit'};
	}
`;

const descriptionStyles = css`
	${textSans.medium({ lineHeight: 'tight' })}
	margin-bottom: ${space[2]}px;
`;

export const EmailSignup = ({ newsletter, clearFromLeftCol }: Props) => {
	const {
		identityName,
		name,
		description,
		frequency,
		successDescription,
		theme,
	} = newsletter;

	return (
		<aside css={containerStyles(clearFromLeftCol)}>
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
