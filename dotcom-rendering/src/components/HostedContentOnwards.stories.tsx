import type { TrailType } from '../types/trails';
import { HostedContentOnwards } from './HostedContentOnwards';

const trails: TrailType[] = [
	{
		url: 'https://www.theguardian.com/money/gallery/2026/mar/27/loft-style-apartments-for-sale-in-england-in-pictures',
		headline: 'Loft-style apartments for sale in England – in pictures',
		format: { design: 27, display: 1, theme: 6 },
		dataLinkName: 'media | group-0 | card-@1',
		image: {
			src: 'https://media.guim.co.uk/276ed08e0380a9a3045a779ea1ca8c93f7c1b51e/500_0_5000_4000/2000.jpg',
			altText:
				'Loft-style apartment interior in Clapton, east London with industrial design elements',
		},
	},
	{
		url: 'https://www.theguardian.com/books/2026/apr/01/under-water-by-tara-menon-review-love-loss-and-a-longing-for-the-ocean',
		headline:
			'Under Water by Tara Menon review – love, loss and a longing for the ocean',
		format: { design: 27, display: 1, theme: 6 },
		dataLinkName: 'media | group-0 | card-@2',
		image: {
			src: 'https://media.guim.co.uk/95d6b3df9e3471344dc19a32d94bb3d5ff6f5016/205_5_2978_2382/2000.jpg',
			altText: 'Tropical fish',
		},
	},
	{
		url: 'https://www.theguardian.com/money/gallery/2026/feb/27/homes-a-short-walk-from-the-sea-in-england-and-scotland-in-pictures',
		headline:
			'Homes a short walk from the sea in England and Scotland – in pictures',
		format: { design: 27, display: 1, theme: 6 },
		dataLinkName: 'media | group-0 | card-@3',
		image: {
			src: 'https://media.guim.co.uk/9879e5d3275b5dae8c8bfd8e1ac700332e2de8c4/237_0_3750_3000/2000.jpg',
			altText: 'Craster, Northumberland',
		},
	},
];

export default {
	component: HostedContentOnwards,
	title: 'Components/HostedContentOnwards',
};

export const Default = () => {
	return <HostedContentOnwards trails={trails} brandName="TrendAI" />;
};

Default.storyName = 'default';

export const WithAccentColour = () => {
	return (
		<HostedContentOnwards
			trails={trails}
			brandName="TrendAI"
			accentColor="#FF0000"
		/>
	);
};

WithAccentColour.storyName = 'with accent colour';
