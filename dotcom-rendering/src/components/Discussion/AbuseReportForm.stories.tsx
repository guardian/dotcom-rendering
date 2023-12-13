import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
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
			commentId={123}
			authStatus={undefined}
		/>
	</div>
);
Dialog.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
		},
	]),
];
