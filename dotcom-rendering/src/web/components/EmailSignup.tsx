import { css } from '@emotion/react';
import {
	from,
	headline,
	neutral,
	space,
	sport,
	textSans,
} from '@guardian/source-foundations';
import { buildTitleText } from '../lib/buildNewsletterSignUpTitleText';
import { NewsletterDetail } from './NewsletterDetail';
import { SecureSignup } from './SecureSignup';

type Props = {
	identityName: string;
	name: string;
	description: string;
	frequency: string;
	successDescription: string;
	theme: string;
	/** You should only set this to true if the privacy message will be shown elsewhere on the page */
	hidePrivacyMessage?: boolean;
};

const containerStyles = css`
	clear: left;
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

// When in a row with the title, the Icon in the NewsletterDetail
// component should not affect the spacing between the title text and
// the description text, which should be 4px (space [1]).
// When stacked below the title, there should be 8px (space[2]) between
// the title and the Icon and then 8px between the Icon and the description
const noHeightFromTabletStyles = css`
	margin-top: ${space[2]}px;

	${from.tablet} {
		margin-top: 0;
		max-height: 0;
		overflow: visible;
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
	hidePrivacyMessage,
}: Props) => {
	return (
		<aside css={containerStyles}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(theme)}>{buildTitleText(name)}</p>
				<div css={noHeightFromTabletStyles}>
					<NewsletterDetail text={frequency} />
				</div>
			</div>
			<p css={descriptionStyles}>{description}</p>
			<SecureSignup
				newsletterId={identityName}
				successDescription={successDescription}
				hidePrivacyMessage={hidePrivacyMessage}
			/>
		</aside>
	);
};
