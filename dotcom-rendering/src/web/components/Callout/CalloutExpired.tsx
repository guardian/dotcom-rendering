import { css } from '@emotion/react';
import { palette, textSans } from '@guardian/source-foundations';

const expiredStyles = css`
	${textSans.small()};
	color: ${palette.brand};
	background-color: ${palette.brandAlt[400]};
	width: fit-content;
`;

export const CalloutExpired = () => {
	return (
		<div css={expiredStyles}>
			This form has been deactivated and is closed to any further
			submissions.
		</div>
	);
};
