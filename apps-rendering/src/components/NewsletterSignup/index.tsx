// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	brandAlt,
	from,
	headline,
	neutral,
	space,
	sport,
	textSans,
} from '@guardian/source-foundations';
import type { NewsletterSignUp } from 'bodyElement';
import type { FC } from 'react';
import EmailSignupForm from './EmailSignupForm';
import PrivacyWording from './PrivacyWording';
import SvgNewsletter from './SvgNewsletter';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	element: NewsletterSignUp;
}

const containerStyles = (format: ArticleFormat): SerializedStyles => css`
	clear: both;
	border: ${neutral[0]} 0.1875rem dashed;
	border-radius: ${remSpace[3]};
	margin-bottom: ${remSpace[3]};
	padding: ${remSpace[2]};

	${from.tablet} {
		padding: ${remSpace[2]} ${remSpace[3]};
	}
`;

const stackBelowTabletStyles = css`
	display: flex;
	flex-direction: column;
	margin-bottom: ${remSpace[2]};

	${from.tablet} {
		flex-direction: row;
		margin-bottom: ${remSpace[1]};
	}
`;

const titleStyles = (theme: string): SerializedStyles => css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	span {
		color: ${theme === 'news' ? sport[500] : 'inherit'};
	}
`;

const descriptionStyles = css`
	${textSans.xsmall({ lineHeight: 'tight' })}
	margin-bottom: ${remSpace[2]};
`;

const iconHolderStyles = css`
	display: flex;
	align-items: center;
	svg {
		background-color: ${brandAlt[400]};
		border-radius: 50%;
		margin-right: ${remSpace[2]};
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
	margin-top: ${remSpace[2]};

	${from.tablet} {
		margin-top: 0;
		max-height: 0;
		overflow: visible;
	}
`;

/**
 * NOTE: this component is non functional and is for demonstration only.
 */
const NewsletterSignup: FC<Props> = ({ format, element }) => {
	const { displayName, frequency, description, theme, id } = element;
	return (
		<aside css={containerStyles(format)}>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(theme)}>
					Sign up to <span>{displayName}</span>
				</p>

				<div css={noHeightFromTabletStyles}>
					<div css={iconHolderStyles}>
						<SvgNewsletter size="small" />
						<b>{frequency}</b>
					</div>
				</div>
			</div>

			<p css={descriptionStyles}>{description}</p>

			<EmailSignupForm newsletterId={id} />
			<PrivacyWording notUsingCaptcha={false} />
		</aside>
	);
};

// ----- Exports ----- //

export default NewsletterSignup;
