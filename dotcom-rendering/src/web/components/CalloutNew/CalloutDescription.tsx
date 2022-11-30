import { css } from '@emotion/react';
import { textSans, space, body } from '@guardian/source-foundations';
import { decidePalette } from '../../lib/decidePalette';

const descriptionStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
			border-bottom: 1px solid ${decidePalette(format).text.richLink};
			text-decoration: none;
		}
		${textSans.small()}
		padding-bottom: ${space[4]}px;
		${body.medium()}

		p {
			margin-bottom: ${space[3]}px;
		}
	`;

interface Props {
	description: string;
	format: ArticleFormat;
}

export const CalloutDescription = ({ description, format }: Props) => (
	<div css={descriptionStyles(format)}>
		<div dangerouslySetInnerHTML={{ __html: description }}></div>
		<div>
			Please share your story if you are 18 or over, anonymously if you
			wish. For more information please see our{' '}
			<a href="https://www.theguardian.com/help/terms-of-service">
				terms of service
			</a>{' '}
			and{' '}
			<a href="https://www.theguardian.com/help/privacy-policy">
				privacy policy
			</a>
		</div>
	</div>
);
