import { css } from '@emotion/react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import preview from '../../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import { GuardianContributor, GuardianPick, GuardianStaff } from './Badges';

const meta = preview.meta({
	title: 'Discussion/Badges',

	decorators: splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
	]),
});

export const Badges = meta.story(() => (
	<div
		css={css`
			padding: 6px;
		`}
	>
		<GuardianStaff />
		<GuardianContributor />
		<GuardianPick />
	</div>
));
