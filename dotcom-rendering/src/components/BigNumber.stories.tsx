import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { space } from '@guardian/source-foundations';
import type { Meta } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { palette } from '../palette';
import { BigNumber } from './BigNumber';

const meta: Meta<typeof BigNumber> = {
	title: 'components/BigNumber',
	component: BigNumber,
};

export default meta;

export const AllNumbers = () => (
	<div
		css={css`
			padding: ${space[2]}px;
			font-size: 3rem;
			fill: ${palette('--article-text')};
		`}
	>
		<BigNumber index={0} />
		<br />
		<BigNumber index={1} />
		<br />
		<BigNumber index={2} />
		<br />
		<BigNumber index={3} />
		<br />
		<BigNumber index={4} />
		<br />
		<BigNumber index={5} />
		<br />
		<BigNumber index={6} />
		<br />
		<BigNumber index={7} />
		<br />
		<BigNumber index={8} />
		<br />
		<BigNumber index={9} />
		<br />
		<BigNumber index={10} />
	</div>
);
AllNumbers.decorators = [
	splitTheme([
		{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	]),
];
