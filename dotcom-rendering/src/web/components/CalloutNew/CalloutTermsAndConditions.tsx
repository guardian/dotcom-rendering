import { css } from '@emotion/react';
import { neutral, textSans, space } from '@guardian/source-foundations';

const fieldLabelStyles = css`
	${textSans.small()}
	color: ${neutral[46]};
	padding-bottom: ${space[4]}px;
`;

export const CalloutTermsAndConditions = () => (
	<label css={fieldLabelStyles}>
		<div>
			You must be 18 or over to fill in this form. Only the Guardian can
			see your contributions and one of our journalists may contact you to
			discuss further. For more information please see our{' '}
			<a href="https://www.theguardian.com/help/terms-of-service">
				terms of service
			</a>
			and
			<a href="https://www.theguardian.com/help/privacy-policy">
				privacy policy
			</a>
			.
		</div>
	</label>
);
