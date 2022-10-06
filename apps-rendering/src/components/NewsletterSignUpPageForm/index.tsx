// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import type { FC } from 'react';
import { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import EmailSignupForm from 'components/NewsletterSignup/EmailSignupForm';
import PrivacyWording from 'components/NewsletterSignup/PrivacyWording';
import { wideContentWidth } from 'styles';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	newsletter: Newsletter;
}

const style = (format: ArticleFormat): SerializedStyles => css`
	margin: 0 auto;
	max-width: ${wideContentWidth}px;
`;

const NewsletterSignUpPageForm: FC<Props> = ({ format, newsletter }: Props) => (
	<section css={style(format)}>
		<EmailSignupForm
			format={format}
			newsletterId={newsletter.identityName}
		/>
		<PrivacyWording format={format} useCaptcha={false} />
	</section>
);

// ----- Exports ----- //

export default NewsletterSignUpPageForm;
