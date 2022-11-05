import { css } from '@emotion/react';
import { CalloutMessenger } from './CalloutMessenger';
import { CalloutTermsAndConditions } from './CalloutTermsAndConditions';

const formStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 10px;
	padding-right: 10px;
`;

export const CalloutMessageUs = () => {
	return (
		<div css={formStyles}>
			<CalloutTermsAndConditions />
			<CalloutMessenger />
		</div>
	);
};
