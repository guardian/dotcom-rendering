// ----- Imports ----- //

import { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { NewsletterSignUp } from 'bodyElement';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	format: ArticleFormat;
	element: NewsletterSignUp;
}

const styles = (format: ArticleFormat): SerializedStyles => {
	return css`
		border: 3px dashed black;
		padding: 8px;
		border-radius: 4px;
	`;
};

const NewsletterSignupForm: FC<Props> = ({ format, element }) => {
	const {displayName, frequency, description} = element.newsletter
	return (
		<div css={styles(format)}>
			<p>
				SIGN UP FOR {displayName}{' '}
			</p>
			<p>{description}</p>
			<p>It is {frequency}</p>
		</div>
	);
};

// ----- Exports ----- //

export default NewsletterSignupForm;
