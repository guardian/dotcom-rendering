import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints, space } from '@guardian/source-foundations';
import type { Decorator } from '@storybook/react';
import { useRef } from 'react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorators';
import { AdSlot, type Props } from './AdSlot.apps';

const Wrapper: Decorator = (Story) => (
	<div
		css={css`
			/* this matches the negative margin in AdSlot.apps */
			padding: ${space[3]}px;
			width: 100%;
		`}
	>
		<Story />
	</div>
);

export default {
	component: AdSlot,
	title: 'Components/AdSlot.apps',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
		viewport: {
			defaultViewport: 'mobile',
		},
	},
	argTypes: {
		onClickSupportButton: { action: 'clicked' },
	},
	decorators: [
		Wrapper,
		splitTheme(
			[
				{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
				},
			],
			{ orientation: 'vertical' },
		),
	],
};

type Args = Omit<Props, 'ref'>;

export const AdSlotSquare = (args: Args) => {
	const ref = useRef(null);
	return <AdSlot ref={ref} {...args} />;
};
AdSlotSquare.storyName = 'with isFirstAdSlot = true';
AdSlotSquare.args = {
	isFirstAdSlot: true,
};

export const AdSlotNotSquare = (args: Args) => {
	const ref = useRef(null);
	return <AdSlot ref={ref} {...args} />;
};
AdSlotNotSquare.storyName = 'with isFirstAdSlot = false';
AdSlotNotSquare.args = {
	isFirstAdSlot: false,
};
