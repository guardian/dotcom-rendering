import { css } from '@emotion/react';
import {
	from,
	headline,
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { buildDetailText } from '../lib/buildNewsletterSignUpText';
import { palette as themePalette } from '../palette';
import { NewsletterDetail } from './NewsletterDetail';

export type EmailSignUpProps = {
	name: string;
	description: string;
	frequency: string;
	theme: string;
	children?: React.ReactNode;
};

const containerStyles = css`
	clear: left;
	border: ${themePalette('--recaptcha-border')} 3px dashed;
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
		color: ${theme === 'news' ? sourcePalette.sport[400] : 'inherit'};
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
	name,
	description,
	frequency,
	theme,
	children,
}: EmailSignUpProps) => {
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
			{children}
		</aside>
	);
};
