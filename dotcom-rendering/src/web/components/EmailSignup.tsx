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
	identityName: string;
	name: string;
	description: string;
	frequency: string;
	successDescription: string;
	theme: string;
};

const containerStyles = css`
	clear: both;
	border: ${neutral[0]} 3px dashed;
	border-radius: 12px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;

	${from.tablet} {
		padding: ${space[2]}px ${space[3]}px;
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
	${headline.xxsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	span {
		color: ${theme === 'news' ? sport[500] : 'inherit'};
	}
`;

const descriptionStyles = css`
	${textSans.xsmall({ lineHeight: 'tight' })}
	margin-bottom: ${space[2]}px;
`;

export const EmailSignup = ({
	identityName,
	name,
	description,
	frequency,
	successDescription,
	theme,
}: Props) => {
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
