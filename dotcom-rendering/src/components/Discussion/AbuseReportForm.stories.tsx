import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { AbuseReportForm } from './AbuseReportForm';

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
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.Sport,
			}}
			commentId={123}
			authStatus={undefined}
		/>
	</div>
);
