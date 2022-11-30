import { css } from '@emotion/react';
import { textSans, space } from '@guardian/source-foundations';
import { decidePalette } from '../../lib/decidePalette';

const termsAndConditionsStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
		}
		${textSans.small()}
		padding: ${space[4]}px 0px;
	`;

interface Props {
	format: ArticleFormat;
}

export const CalloutTermsAndConditions = ({ format }: Props) => (
	<div css={termsAndConditionsStyles(format)}>
		Your responses, which can be anonymous, are secure as the form is
		encrypted and only the Guardian has access to your contributions. We
		will only use the data you provide us for the purpose of the feature and
		we will delete any personal data when we no longer require it for this
		purpose. For true anonymity please use our{' '}
		<a href="https://www.theguardian.com/securedrop">SecureDrop</a> service
		instead.
	</div>
);
