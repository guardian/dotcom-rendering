import { css } from '@emotion/react';
import { Pillar } from '@guardian/libs';
import { AbuseReportForm } from './AbuseReportForm.tsx';

export default { title: 'Discussion/Abuse Report Form' };

const wrapperStyles = css`
	padding: 20px;
	height: 300px;
	width: 400px;
	background-color: blue;
	position: relative;
`;

export const Dialog = () => (
	<div css={wrapperStyles}>
		<AbuseReportForm
			toggleSetShowForm={() => {}}
			pillar={Pillar.Sport}
			commentId={123}
			authStatus={undefined}
		/>
	</div>
);
