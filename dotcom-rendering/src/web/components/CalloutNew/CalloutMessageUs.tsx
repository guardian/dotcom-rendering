import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { CalloutMessenger } from './CalloutContactMethod';
import { CalloutTermsAndConditions } from './CalloutTermsAndConditions';

const formStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
`;

export const CalloutMessageUs = () => {
	return (
		<div css={formStyles}>
			<CalloutTermsAndConditions />
			<CalloutMessenger />
		</div>
	);
};
