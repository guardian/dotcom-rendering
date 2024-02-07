import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { Timestamp } from './Timestamp';

type Props = Parameters<typeof Timestamp>[0];

export default {
	component: Timestamp,
	title: 'Discussion/Timestamp',
	argTypes: {
		onPermalinkClick: { action: 'onPermalinkClick' },
		webUrl: { text: '' },
		commentId: { number: 123 },
	},
	decorators: [
		splitTheme([
			{
				theme: Pillar.Opinion,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
			},
		]),
	],
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div style={{ padding: '12px' }}>{children}</div>
);

// Date is mocked to "Fri March 27 2020 12:00:00 GMT+0000 (Greenwich Mean Time)" in config

export const TwoMonths = (args: Props) => (
	<Wrapper>
		<Timestamp {...args} isoDateTime={'2021-10-31T14:22:39Z'} />
	</Wrapper>
);
TwoMonths.storyName = 'Two months';

export const OneHour = (args: Props) => (
	<Wrapper>
		<Timestamp {...args} isoDateTime={'2022-01-01T11:00:00Z'} />
	</Wrapper>
);
OneHour.storyName = 'One Hour';

export const TwentyThreeHours = (args: Props) => (
	<Wrapper>
		<Timestamp {...args} isoDateTime={'2021-12-31T13:00:00Z'} />
	</Wrapper>
);
TwentyThreeHours.storyName = 'Twenty three hours';

export const TwentyFiveHours = (args: Props) => (
	<Wrapper>
		<Timestamp {...args} isoDateTime={'2021-12-31T11:00:00Z'} />
	</Wrapper>
);
TwentyFiveHours.storyName = 'Twenty five hours';
