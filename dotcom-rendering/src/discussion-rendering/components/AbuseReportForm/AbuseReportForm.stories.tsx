import { css } from '@emotion/react';
import { ArticlePillar } from '@guardian/libs';
import { AbuseReportForm } from './AbuseReportForm';

export default { title: 'Abuse Report Form' };

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
			pillar={ArticlePillar.Sport}
			commentId={123}
		/>
	</div>
);
