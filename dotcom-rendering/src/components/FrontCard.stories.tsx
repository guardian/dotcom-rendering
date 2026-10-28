import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { CustomSubnav } from '../types/customSubnav';
import type { DCRFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

const miniNavData: CustomSubnav = {
	id: 'environment-mini-nav',
	header: {
		headerText: 'Environment',
		dotcomPath: '/environment',
		copy: 'Environment navigation',
		showHeaderText: true,
	},
	format: 'compact',
	links: [
		{
			linkText: 'Climate crisis and the changing planet',
			dotcomPath: '/environment/climate-crisis',
		},
		{
			linkText: 'The transition to a greener economy',
			dotcomPath: '/environment/green-economy',
		},
		{
			linkText: 'Wildlife and biodiversity conservation',
			dotcomPath: '/environment/wildlife',
		},
		{
			linkText: 'Renewable energy and clean technology',
			dotcomPath: '/environment/energy',
		},
		{
			linkText: 'Air pollution and public health',
			dotcomPath: '/environment/pollution',
		},
		{
			linkText: 'Protecting our oceans and marine life',
			dotcomPath: '/environment/oceans',
		},
		{
			linkText: 'Sustainable food and farming',
			dotcomPath: '/environment/farming',
		},
	],
	pages: [],
};

const trail: DCRFrontCard = {
	format: {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: Pillar.News,
	},
	url: '/environment/2022/jan/01/communities-restore-woodland',
	headline: 'Communities lead the way in restoring native woodland',
	trailText:
		'Local projects are bringing trees and wildlife back to the landscape, with volunteers at the heart of the work.',
	image: {
		src: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
		altText: 'Woodland landscape',
	},
	byline: 'Environment correspondent',
	showByline: false,
	showQuotedHeadline: false,
	isExternalLink: false,
	isImmersive: false,
	showLivePlayable: false,
	dataLinkName: 'environment | mini nav story',
	discussionApiUrl: '',
	webPublicationDate: '2022-01-01T10:00:00.000Z',
	showMiniNav: true,
	boostLevel: 'boost',
	miniNavData,
};

const meta = {
	component: FrontCard,
	title: 'Components/FrontCard/MiniNav',
	args: {
		trail,
		containerType: 'flexible/general',
		trailText: trail.trailText,
		mediaPositionOnMobile: 'left',
		mediaPositionOnDesktop: 'right',
		mediaSize: 'small',
		imageLoading: 'eager',
		serverTime: 1641038400000,
	},
	decorators: [
		(Story) => (
			<div
				css={css`
					max-width: 620px;
					margin: 20px;
				`}
			>
				<UL>
					<LI>
						<Story />
					</LI>
					<LI>
						<FrontCard
							trail={{
								...trail,
								url: '/environment/2022/jan/01/urban-wildlife',
								headline:
									'How cities are making more room for wildlife',
								showMiniNav: false,
								miniNavData: undefined,
							}}
							trailText="New green spaces are helping nature thrive in urban neighbourhoods."
							imageLoading="eager"
							mediaPositionOnMobile="left"
							mediaPositionOnDesktop="right"
							mediaSize="small"
							serverTime={1641038400000}
						/>
					</LI>
				</UL>
			</div>
		),
	],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const miniNavs = canvasElement.querySelectorAll(
			'[data-component-id="environment-mini-nav"]',
		);
		await expect(miniNavs.length).toBeGreaterThan(0);
		for (const miniNav of miniNavs) {
			const card = miniNav.parentElement?.parentElement;
			await expect(card).not.toBeNull();
			if (!card) throw new Error('Mini nav has no containing card');
			const headline = within(card).getByText(trail.headline);
			await expect(
				miniNav.getBoundingClientRect().bottom,
			).toBeLessThanOrEqual(headline.getBoundingClientRect().top);
			await expect(miniNav.getBoundingClientRect().top).toBeGreaterThan(
				card.getBoundingClientRect().top,
			);
			await expect(
				miniNav.getBoundingClientRect().right,
			).toBeLessThanOrEqual(card.getBoundingClientRect().right);
			await expect(miniNav.scrollWidth).toBeGreaterThan(
				miniNav.clientWidth,
			);
			const firstItem = miniNav.firstElementChild;
			if (!firstItem) throw new Error('Mini nav has no content');
			const initialLeft = firstItem.getBoundingClientRect().left;
			miniNav.scrollLeft = 100;
			await expect(firstItem.getBoundingClientRect().left).toBeLessThan(
				initialLeft,
			);
			miniNav.scrollLeft = 0;
		}
		for (const { linkText, dotcomPath } of miniNavData.links) {
			for (const link of canvas.getAllByRole('link', {
				name: linkText,
			})) {
				await expect(link).toBeVisible();
				await expect(link).toHaveAttribute('href', dotcomPath);
			}
		}
	},
} satisfies Meta<typeof FrontCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BelowBoostedLevel = {
	args: {
		trail: {
			...trail,
			boostLevel: 'default',
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText(trail.headline)).toBeVisible();
		await expect(
			canvasElement.querySelector(
				'[data-component-id="environment-mini-nav"]',
			),
		).toBeNull();
	},
} satisfies Story;

export const HeaderIsLink = {
	play: async (context) => {
		await meta.play(context);
		const canvas = within(context.canvasElement);
		for (const header of canvas.getAllByRole('link', {
			name: 'Environment',
		})) {
			await expect(header).toBeVisible();
			await expect(header).toHaveAttribute('href', '/environment');
			await expect(header).toHaveStyle('text-decoration: underline');
			await expect(header).toHaveStyle('border-right-style: none');
		}
	},
} satisfies Story;

export const HeaderIsNotLink = {
	args: {
		trail: {
			...trail,
			miniNavData: {
				...miniNavData,
				header: {
					...miniNavData.header,
					dotcomPath: undefined,
				},
			},
		},
	},
	play: async (context) => {
		await meta.play(context);
		const canvas = within(context.canvasElement);
		for (const header of canvas.getAllByText('Environment')) {
			await expect(header).toBeVisible();
			await expect(header.closest('a')).toBeNull();
		}
		await expect(
			canvas.queryByRole('link', { name: 'Environment' }),
		).not.toBeInTheDocument();
	},
} satisfies Story;

export const HiddenHeader = {
	args: {
		trail: {
			...trail,
			miniNavData: {
				...miniNavData,
				header: {
					...miniNavData.header,
					showHeaderText: false,
				},
			},
		},
	},
	play: async (context) => {
		await meta.play(context);
		const canvas = within(context.canvasElement);
		await expect(canvas.queryByText('Environment')).not.toBeInTheDocument();
		await expect(
			canvas.queryByRole('link', { name: 'Environment' }),
		).not.toBeInTheDocument();
	},
} satisfies Story;
