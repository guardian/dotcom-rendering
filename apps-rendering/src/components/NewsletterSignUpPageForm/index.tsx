// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { NewsletterFrequency } from '@guardian/common-rendering/src/components/NewsletterFrequency';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import ShareIcon from 'components/editions/shareIcon';
import EmailSignupForm from 'components/NewsletterSignup/EmailSignupForm';
import PrivacyWording from 'components/NewsletterSignup/PrivacyWording';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	newsletter: Newsletter;
}

const shareMessageStyles: SerializedStyles = css`
	display: flex;
	align-items: center;

	span {
		${textSans.medium({ fontWeight: 'bold' })};
		margin-right: ${remSpace[4]};
	}

	svg {
		flex: 0 0 1.875rem;
		padding-top: 0.375rem;
		width: 1.875rem;
		height: 1.875rem;

		circle {
			stroke: ${neutral[7]};
		}

		path {
			fill: ${neutral[7]};
		}
	}
`;

const NewsletterSignUpPageForm: FC<Props> = ({ format, newsletter }: Props) => (
	<>
		<EmailSignupForm
			format={format}
			newsletterId={newsletter.identityName}
		/>
		<NewsletterFrequency frequency={newsletter.frequency} />

		<div css={shareMessageStyles}>
			<span>Tell your friends</span>
			<ShareIcon />
		</div>

		<PrivacyWording format={format} useCaptcha={false} />
	</>
);

// ----- Exports ----- //

export default NewsletterSignUpPageForm;
