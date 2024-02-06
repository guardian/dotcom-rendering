import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { ok } from '../../lib/result';
import { AbuseReportForm } from './AbuseReportForm';

type Props = Parameters<typeof AbuseReportForm>[0];

export default {
	title: 'Discussion/Abuse Report Form',
	component: AbuseReportForm,
	argTypes: {
		toggleSetShowForm: { action: 'toggleSetShowForm' },
	},
};

const wrapperStyles = css`
	padding: 20px;
	height: 300px;
	width: 400px;
	background-color: blue;
	position: relative;
`;

export const Dialog = (args: Props) => (
	<div css={wrapperStyles}>
		<AbuseReportForm
			toggleSetShowForm={args.toggleSetShowForm}
			commentId={123}
			reportAbuse={() => Promise.resolve(ok(true))}
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
