// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import type { FC } from 'react';
import { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import EmailSignupForm from 'components/NewsletterSignup/EmailSignupForm';
import PrivacyWording from 'components/NewsletterSignup/PrivacyWording';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	newsletter: Newsletter;
}

const NewsletterSignUpPageForm: FC<Props> = ({ format, newsletter }: Props) => (
	<>
		<EmailSignupForm
			format={format}
			newsletterId={newsletter.identityName}
		/>
		<PrivacyWording format={format} useCaptcha={false} />
	</>
);

// ----- Exports ----- //

export default NewsletterSignUpPageForm;
