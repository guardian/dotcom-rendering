import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import { ScrollableSmallOnwards } from './ScrollableSmallOnwards';

const meta = {
	title: 'Components/ScrollableSmallOnwards',
	component: ScrollableSmallOnwards,
} satisfies Meta<typeof ScrollableSmallOnwards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ScrollableSmallOnwardsStory = {
	args: {
		absoluteServerTimes: false,
		discussionApiUrl:
			'https://discussion.code.dev-theguardian.com/discussion-api',
		heading: 'More on this story',
		headingUrl: 'http://localhost:9000/more-galleries',
		onwardsSource: 'more-galleries',
		trails: [
			{
				url: 'http://localhost:9000/environment/gallery/2025/aug/22/week-in-wildlife-a-clumsy-fox-swinging-orangutang-and-rescued-jaguarundi-cub',
				linkText:
					'Week in wildlife: a clumsy fox, a swinging orangutan and a rescued jaguarundi cub',
				showByline: false,
				byline: 'Pejman Faratin',
				image: {
					src: 'https://media.guim.co.uk/a81e974ffee6c8c88fa280c2d02eaf5dc2af863e/151_292_1020_816/master/1020.jpg',
					altText: '',
				},
				format: {
					theme: Pillar.News,
					design: ArticleDesign.Gallery,
					display: ArticleDisplay.Standard,
				},
				webPublicationDate: '2022-01-01T06:00:25.000Z',
				headline:
					'Week in wildlife: a clumsy fox, a swinging orangutan and a rescued jaguarundi cub',
				shortUrl: 'https://www.theguardian.com/p/x32n89',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x32n89',
				},
				discussionId: 'zHoBy6HNKsk',
				dataLinkName: getDataLinkNameCard(
					{
						theme: Pillar.News,
						design: ArticleDesign.Gallery,
						display: ArticleDisplay.Standard,
					},
					'0',
					0,
				),
				trailText:
					'Guinness World Records is looking back at the extraordinary feats achieved since its inception - as well as unveiling 70 whacky and unclaimed records ',
				kickerText: 'Politics', // Get data for this
				mainMedia: { type: 'Gallery', count: '6' }, // TODO: get data for this
			},
			{
				url: 'http://localhost:9000/money/gallery/2025/aug/22/characterful-cottages-for-sale-in-england-in-pictures',
				linkText:
					'Characterful cottages for sale in England – in pictures',
				showByline: false,
				byline: 'Anna White',
				image: {
					src: 'https://media.guim.co.uk/58cd9356e6d68e8efa6028162bb959f9798307d5/515_0_5000_4000/master/5000.jpg',
					altText: '',
				},
				format: {
					design: ArticleDesign.Gallery,
					theme: Pillar.Lifestyle,
					display: ArticleDisplay.Standard,
				},
				webPublicationDate: '2022-01-01T06:00:24.000Z',
				headline:
					'Characterful cottages for sale in England – in pictures',
				shortUrl: 'https://www.theguardian.com/p/x32gqj',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x32gqj',
				},
				dataLinkName: getDataLinkNameCard(
					{
						design: ArticleDesign.Gallery,
						theme: Pillar.Lifestyle,
						display: ArticleDisplay.Standard,
					},
					'0',
					1,
				),
				trailText:
					'Picked from a record 60,636 entries, the first images from the Natural History Museum’s wildlife photographer of the year competition have been released. The photographs, which range from a lion facing down a cobra to magnified mould spores, show the diversity, beauty and complexity of the natural world and humanity’s relationship with it',
				mainMedia: { type: 'Gallery', count: '6' }, // TODO: get data for this
			},
			{
				url: 'http://localhost:9000/news/gallery/2025/aug/22/sunsets-aid-parachutes-and-giant-pandas-photos-of-the-day-friday',
				linkText:
					'Sunsets, aid parachutes and giant pandas: photos of the day – Friday ',
				showByline: false,
				byline: 'Eithne Staunton',
				image: {
					src: 'https://media.guim.co.uk/4ce0b080206fe9b65b976c1acf219d81072cc814/0_0_2113_1690/master/2113.png',
					altText: '',
				},
				format: {
					design: ArticleDesign.Gallery,
					theme: Pillar.News,
					display: ArticleDisplay.Standard,
				},
				webPublicationDate: '2022-01-01T08:49:42.000Z',
				headline:
					'Sunsets, aid parachutes and giant pandas: photos of the day – Friday ',
				shortUrl: 'https://www.theguardian.com/p/x3359z',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x3359z',
				},
				dataLinkName: getDataLinkNameCard(
					{
						design: ArticleDesign.Gallery,
						theme: Pillar.News,
						display: ArticleDisplay.Standard,
					},
					'0',
					2,
				),
				trailText:
					'From the mock-Tudor fad of the 1920s to drivers refuelling on a roundabout, each era produces its own distinctive petrol stations – as photographer Philip Butler discovered',
				mainMedia: { type: 'Gallery', count: '6' }, // TODO: get data for this
			},
			{
				url: 'http://localhost:9000/fashion/gallery/2025/aug/22/what-to-wear-to-notting-hill-carnival',
				linkText: 'On parade: what to wear to Notting Hill carnival',
				showByline: false,
				byline: 'Melanie Wilkinson',
				image: {
					src: 'https://media.guim.co.uk/49a9656cd10c4f64f8bdd54380afb915c7a3648b/207_0_1500_1200/master/1500.jpg',
					altText: '',
				},
				format: {
					design: ArticleDesign.Gallery,
					theme: Pillar.Lifestyle,
					display: ArticleDisplay.Standard,
				},
				webPublicationDate: '2025-08-22T05:00:23.000Z',
				headline: 'On parade: what to wear to Notting Hill carnival',
				shortUrl: 'https://www.theguardian.com/p/x32mte',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x32mte',
				},
				dataLinkName: getDataLinkNameCard(
					{
						design: ArticleDesign.Gallery,
						theme: Pillar.Lifestyle,
						display: ArticleDisplay.Standard,
					},
					'0',
					1,
				),
				trailText:
					'The Guardian’s picture editors select photographs from around the world',
				mainMedia: { type: 'Gallery', count: '6' }, // TODO: get data for thismainMedia: { type: 'Gallery', count: '6' }, // TODO: get data for this
			},
		],
	},
} satisfies Story;
