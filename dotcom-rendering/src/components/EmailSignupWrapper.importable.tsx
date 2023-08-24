import { RenderingTarget } from 'src/types/renderingTarget';
import { useIsBridgetCompatible } from '../lib/getBridgetVersion';
import { InlineSkipToWrapper } from './InlineSkipToWrapper';
import { css } from '@emotion/react';
import {
	neutral,
	space,
	from,
	headline,
	sport,
	textSans,
} from '@guardian/source-foundations';
import { buildDetailText } from '../lib/buildNewsletterSignUpText';
import { NewsletterDetail } from './NewsletterDetail';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { SecureSignupV2 } from './SecureSignupV2';

interface Props extends EmailSignupProps {
	renderingTarget?: RenderingTarget;
	skipToIndex: number;
}

type EmailSignupProps = {
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
		margin-bottom: 6px;
	}
`;

const titleStyles = (theme: string) => css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	span {
		color: ${theme === 'news' ? sport[400] : 'inherit'};
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

// max-width is the wdith of the text field, the button and the margin between them
const descriptionStyles = css`
	${textSans.xsmall({ lineHeight: 'tight' })}
	margin-bottom: ${space[2]}px;
	max-width: ${335 + space[3] + 118}px;
`;

export const EmailSignup = ({
	identityName,
	name,
	description,
	frequency,
	successDescription,
	theme,
	hidePrivacyMessage,
}: EmailSignupProps) => {
	return (
		<aside css={containerStyles} aria-label="newsletter promotion">
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(theme)}>
					Sign up to <span>{name}</span>
				</p>
				<div css={noHeightFromTabletStyles}>
					<NewsletterDetail text={buildDetailText(frequency)} />
				</div>
			</div>
			<p css={descriptionStyles}>{description}</p>

			<SecureSignupV2
				newsletterId={identityName}
				successDescription={successDescription}
			/>
			{!hidePrivacyMessage && <NewsletterPrivacyMessage />}
		</aside>
	);
};

export const EmailSignupWrapper = ({
	renderingTarget,
	skipToIndex,
	...EmailSignUpProps
}: Props) => {
	const isCompatible = useIsBridgetCompatible();

	if (!renderingTarget || (renderingTarget === 'Apps' && !isCompatible)) {
		return null;
	}

	return (
		<InlineSkipToWrapper
			id={`EmailSignup-skip-link-${skipToIndex}`}
			blockDescription="newsletter promotion"
		>
			<EmailSignup {...EmailSignUpProps} />
		</InlineSkipToWrapper>
	);
};
