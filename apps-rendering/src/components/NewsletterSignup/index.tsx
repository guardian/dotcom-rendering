// ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { ArticlePillar } from '@guardian/libs';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import {
	brandAlt,
	from,
	headlineBold20,
	remSpace,
	sport,
	textSans14,
	textSansBold14,
} from '@guardian/source-foundations';
import { SvgNewsletter } from '@guardian/source-react-components';
import type { NewsletterSignUp } from 'bodyElement';
import { background, border, text } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import EmailSignupForm from '../EmailSignupForm';
import InlineSkipToWrapper from '../InlineSkipToWrapper';
import PrivacyWording from './PrivacyWording';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	element: NewsletterSignUp;
	showByDefault?: boolean;
	skipLinkIdSuffix?: string;
}

const containerStyles = (showByDefault: boolean): SerializedStyles => css`
	display: ${showByDefault ? 'block' : 'none'};
	clear: both;
`;

const frameStyles = (format: ArticleFormat): SerializedStyles => css`
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
	${headlineBold20};
	flex-grow: 1;
	span {
		color: ${theme === ArticlePillar.News ? sport[500] : 'inherit'};
	}
`;

const descriptionStyles = css`
	${textSans14};
	/**
	 * @TODO (2) Typography preset styles should not be overridden.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	*/
	line-height: 1.15;
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
		${textSansBold14}
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

const NewsletterSignup: FC<Props> = ({
	format,
	element,
	showByDefault = false,
	skipLinkIdSuffix = '',
}) => {
	const {
		name,
		frequency,
		description,
		theme,
		identityName,
		successDescription,
	} = element;
	return (
		<div
			role="none"
			className="js-signup-form-container"
			css={containerStyles(showByDefault)}
		>
			<InlineSkipToWrapper
				id={`newsletter-promotion-for-${identityName}${skipLinkIdSuffix}`}
				blockDescription="newsletter promotion"
			>
				<aside
					css={frameStyles(format)}
					aria-label="newsletter promotion"
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
			</InlineSkipToWrapper>
		</div>
	);
};

// ----- Exports ----- //

export default NewsletterSignup;
