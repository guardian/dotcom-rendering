import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ArticleContainer } from './ArticleContainer';
import type { InlineProductCardProps } from './InlineProductCard';
import { InlineProductCard } from './InlineProductCard';
import { Section as SectionComponent } from './Section';

const meta = {
	component: InlineProductCard,
	title: 'Components/InlineProductCard',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},

		formats: [
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
		],
	},
	decorators: [
		(Story) => (
			<SectionComponent
				shouldCenter={true}
				showSideBorders={true}
				centralBorder={'full'}
				css={css`
					strong {
						font-weight: bold;
					}
				`}
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
			>
				<ArticleContainer
					format={{
						design: ArticleDesign.Review,
						display: ArticleDisplay.Showcase,
						theme: Pillar.Lifestyle,
					}}
				>
					<Story />
				</ArticleContainer>
			</SectionComponent>
		),
	],
} satisfies Meta<typeof InlineProductCard>;

export default meta;

const sampleProductCard: InlineProductCardProps = {
	format: {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: Pillar.Lifestyle,
	},
	image: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg',
	primaryUrl: 'https://www.aircraft.com/lume',
	primaryCTA: 'Buy at AirCraft',
	primaryPrice: '£199.99',
	secondaryCTA: '£199.99 at Amazon',
	secondaryUrl:
		'https://www.amazon.co.uk/AirCraft-Home-Backlight-Oscillating-Circulator/dp/B0D8QNGB3M',
	brandName: 'AirCraft',
	productName: 'Lume',
	altText: 'A small fan on a table',
	credit: 'AirCraft Photography by John Smith',
	displayCredit: false,
	statistics: [
		{ name: 'What we love', value: 'It packs away pretty small' },
		{
			name: 'What we don\t love',
			value: 'there’s nowhere to stow the remote control',
		},
	],
	isCardOnly: false,
};

export const Default = () => <InlineProductCard {...sampleProductCard} />;

export const productCardOnly = () => (
	<InlineProductCard {...sampleProductCard} isCardOnly={true} />
);

export const productCardOnlyDisplayCredit = () => (
	<InlineProductCard
		{...sampleProductCard}
		isCardOnly={true}
		displayCredit={true}
	/>
);
