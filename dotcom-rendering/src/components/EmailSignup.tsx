import { css } from '@emotion/react';
import {
	from,
	headline,
	neutral,
	space,
	sport,
	textSans,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
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

const titleAndIconStyles = css`
	display: inline-flex;
	align-items: center;
	flex-grow: 1;
`;

const detailsStyles = css`
	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}

	summary {
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		flex-direction: column;

		${from.tablet} {
			flex-direction: row;
			margin-bottom: 6px;
		}
	}

	&:not([open]) summary {
		margin-bottom: 0;
	}
`;

const arrowPosition = css`
	position: relative;
	top: ${space[1]}px;
`;

const titleStyles = (theme: string) => css`
	${headline.xxsmall({ fontWeight: 'bold' })}
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

// max-width is the width of the text field, the button and the margin between them
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
}: Props) => {
	return (
		<aside css={containerStyles} aria-label="newsletter promotion">
			<details css={detailsStyles}>
				<summary aria-label={`open sign up form for ${name}`}>
					<div css={titleAndIconStyles}>
						<span className="is-off" css={arrowPosition}>
							<SvgChevronRightSingle size="xsmall" />
						</span>
						<span className="is-on" css={arrowPosition}>
							<SvgChevronDownSingle size="xsmall" />
						</span>
						<span css={titleStyles(theme)}>
							Sign up to <span>{name}</span>
						</span>
					</div>
				</summary>
				<div>
					<p css={descriptionStyles}>{description}</p>
					<SecureSignup
						name={name}
						newsletterId={identityName}
						successDescription={successDescription}
						hidePrivacyMessage={hidePrivacyMessage}
					/>
				</div>
			</details>
		</aside>
	);
};
