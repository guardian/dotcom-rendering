// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import {
	background,
	border,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import { ArticlePillar } from '@guardian/libs';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import {
	brandAlt,
	from,
	headline,
	remSpace,
	sport,
	textSans,
} from '@guardian/source-foundations';
import type { NewsletterSignUp } from 'bodyElement';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import EmailSignupForm from './EmailSignupForm';
import PrivacyWording from './PrivacyWording';
import SvgNewsletter from './SvgNewsletter';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	element: NewsletterSignUp;
	showByDefault?: boolean;
}

const containerStyles = (
	format: ArticleFormat,
	showByDefault: boolean,
): SerializedStyles => css`
	clear: both;
	border: ${border.newsletterSignUpForm(format)} 0.1875rem dashed;
	color: ${text.newsletterSignUpForm(format)};
	border-radius: ${remSpace[3]};
	margin-bottom: ${remSpace[3]};
	padding: ${remSpace[2]};

	${from.tablet} {
		padding: ${remSpace[2]} ${remSpace[3]};
	}

	${darkModeCss`
		background-color: ${background.newsletterSignUpFormDark(format)};
		border-color: ${border.newsletterSignUpFormDark(format)};
		color: ${text.newsletterSignUpFormDark(format)};
	`}

	display: ${showByDefault ? 'block' : 'none'};
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

const titleStyles = (theme: ArticleTheme): SerializedStyles => css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	flex-grow: 1;
	span {
		color: ${theme === ArticlePillar.News ? sport[500] : 'inherit'};
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
const NewsletterSignup: FC<Props> = ({ format, element, showByDefault = false }) => {
	const {
		name,
		frequency,
		description,
		theme,
		identityName,
		successDescription,
	} = element;
	return (
		<aside
			css={containerStyles(format, showByDefault)}
			className="js-signup-form-container"
		>
			<div css={stackBelowTabletStyles}>
				<p css={titleStyles(theme)}>
					Sign up to <span>{name}</span>
				</p>

				<div css={noHeightFromTabletStyles}>
					<div css={iconHolderStyles}>
						<SvgNewsletter size="small" />
						<b>{frequency}</b>
					</div>
				</div>
			</div>

			<p css={descriptionStyles}>{description}</p>

			<EmailSignupForm
				identityName={identityName}
				format={format}
				successDescription={successDescription}
			/>

			<PrivacyWording useCaptcha={false} format={format} />
		</aside>
	);
};

// ----- Exports ----- //

export default NewsletterSignup;
