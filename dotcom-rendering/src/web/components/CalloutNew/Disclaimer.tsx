import { css } from '@emotion/react';
import { neutral, textSans } from '@guardian/source-foundations';

const fieldLabelStyles = css`
	${textSans.medium({ fontWeight: 'bold' })}
`;

export const Disclaimer = () => (
	<label css={fieldLabelStyles}>
		<div>
			{`(You must be 18 or over to fill in this form. Only the Guardian
can see your contributions and one of our journalists may
contact you to discuss further. For more information please see
our terms of service and privacy policy.)`}
		</div>
	</label>
);
