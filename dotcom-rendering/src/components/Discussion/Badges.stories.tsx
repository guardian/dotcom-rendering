import { css } from '@emotion/react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/format';
import { GuardianContributor, GuardianPick, GuardianStaff } from './Badges';

export default {
	title: 'Discussion/Badges',
	decorators: splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
	]),
};

export const Badges = () => (
	<div
		css={css`
			padding: 6px;
		`}
	>
		<GuardianStaff />
		<GuardianContributor />
		<GuardianPick />
	</div>
);
