// ----- Imports ----- //

import { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	headline,
	space,
	sport,
	textSans,
	brandAlt,
	neutral,
	from,
} from '@guardian/source-foundations';
import {
	SvgEnvelope,
} from '@guardian/source-react-components';
import { NewsletterSignUp } from 'bodyElement';
import type { FC } from 'react';
import EmailSignupForm from './EmailSignupForm';
import PrivacyWording from './PrivacyWording';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	element: NewsletterSignUp;
}

const containerStyles = (format: ArticleFormat): SerializedStyles => css`
	clear: both;
	border: ${neutral[0]} 3px dashed;
	border-radius: ${space[3]}px;
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

const iconHolderStyles = css`
	display: flex;
	align-items: center;
	svg {
		background-color: ${brandAlt[400]};
		border-radius: 50%;
		margin-right: ${space[2]}px;
	}

	b {
		${textSans.xsmall({ fontWeight: 'bold' })}
	}
`;

// When in a row with the title, the Icon in the NewsletterFrequency
// component should not affect the spaceing between the title text and
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

const NewsletterSignup: FC<Props> = ({ format, element }) => {
	const { displayName, frequency, description, theme } = element.newsletter;
	return (
		<aside css={containerStyles(format)}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(theme)}>
					Sign up to <span>{displayName}</span>
				</p>

				<div css={noHeightFromTabletStyles}>
					<div css={iconHolderStyles}>
						<SvgEnvelope size="small" />
						<b>{frequency}</b>
					</div>
				</div>
			</div>

			<p css={descriptionStyles}>{description}</p>

			<EmailSignupForm newsletter={element.newsletter} />
			<PrivacyWording notUsingCaptcha={false}/>
		</aside>
	);
};

// ----- Exports ----- //

export default NewsletterSignup;
