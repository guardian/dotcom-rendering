import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { MoreGalleries as MoreGalleriesComponent } from './MoreGalleries';
import { getDataLinkNameCard } from 'src/lib/getDataLinkName';

const meta = {
	title: 'Components/MoreGalleries',
	component: MoreGalleriesComponent,
} satisfies Meta<typeof MoreGalleriesComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MoreGalleries = {
	args: {
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Gallery,
			display: ArticleDisplay.Standard,
		},
		absoluteServerTimes: false,
		discussionApiUrl:
			'https://discussion.code.dev-theguardian.com/discussion-api',
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
				webPublicationDate: '2025-08-22T06:00:25.000Z',
				headline:
					'Week in wildlife: a clumsy fox, a swinging orangutan and a rescued jaguarundi cub',
				shortUrl: 'https://www.theguardian.com/p/x32n89',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x32n89',
				},
				dataLinkName: getDataLinkNameCard(
					{
						theme: Pillar.News,
						design: ArticleDesign.Gallery,
						display: ArticleDisplay.Standard,
					},
					'0',
					0,
				),
			},
			{
				url: 'http://localhost:9000/money/gallery/2025/aug/22/characterful-cottages-for-sale-in-england-in-pictures',
				linkText:
					'Characterful cottages for sale in England – in pictures',
				showByline: false,
				byline: 'Anna White',
				masterImage:
					'https://media.guim.co.uk/58cd9356e6d68e8efa6028162bb959f9798307d5/515_0_5000_4000/master/5000.jpg',
				image: 'https://i.guim.co.uk/img/media/58cd9356e6d68e8efa6028162bb959f9798307d5/515_0_5000_4000/master/5000.jpg?width=300&quality=85&auto=format&fit=max&s=35fb647440143717424928ec795146e7',
				carouselImages: {
					300: 'https://i.guim.co.uk/img/media/58cd9356e6d68e8efa6028162bb959f9798307d5/515_0_5000_4000/master/5000.jpg?width=300&quality=85&auto=format&fit=max&s=35fb647440143717424928ec795146e7',
					460: 'https://i.guim.co.uk/img/media/58cd9356e6d68e8efa6028162bb959f9798307d5/515_0_5000_4000/master/5000.jpg?width=460&quality=85&auto=format&fit=max&s=372ea9d012b1d9d96d0ab0a74aa9f4cf',
				},
				isLiveBlog: false,
				pillar: 'lifestyle',
				designType: 'Media',
				format: {
					design: 'GalleryDesign',
					theme: 'LifestylePillar',
					display: 'StandardDisplay',
				},
				webPublicationDate: '2025-08-22T06:00:24.000Z',
				headline:
					'Characterful cottages for sale in England – in pictures',
				mediaType: 'Gallery',
				shortUrl: 'https://www.theguardian.com/p/x32gqj',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x32gqj',
				},
			},
			{
				url: 'http://localhost:9000/news/gallery/2025/aug/22/sunsets-aid-parachutes-and-giant-pandas-photos-of-the-day-friday',
				linkText:
					'Sunsets, aid parachutes and giant pandas: photos of the day – Friday ',
				showByline: false,
				byline: 'Eithne Staunton',
				masterImage:
					'https://media.guim.co.uk/4ce0b080206fe9b65b976c1acf219d81072cc814/0_0_2113_1690/master/2113.png',
				image: 'https://i.guim.co.uk/img/media/4ce0b080206fe9b65b976c1acf219d81072cc814/0_0_2113_1690/master/2113.png?width=300&quality=85&auto=format&fit=max&s=0fe5f2cd010943be553fef6725d4b617',
				carouselImages: {
					300: 'https://i.guim.co.uk/img/media/4ce0b080206fe9b65b976c1acf219d81072cc814/0_0_2113_1690/master/2113.png?width=300&quality=85&auto=format&fit=max&s=0fe5f2cd010943be553fef6725d4b617',
					460: 'https://i.guim.co.uk/img/media/4ce0b080206fe9b65b976c1acf219d81072cc814/0_0_2113_1690/master/2113.png?width=460&quality=85&auto=format&fit=max&s=966e5c2a61465aa333a1e3efa4851bfc',
				},
				isLiveBlog: false,
				pillar: 'news',
				designType: 'Media',
				format: {
					design: 'GalleryDesign',
					theme: 'NewsPillar',
					display: 'StandardDisplay',
				},
				webPublicationDate: '2025-08-22T12:49:42.000Z',
				headline:
					'Sunsets, aid parachutes and giant pandas: photos of the day – Friday ',
				mediaType: 'Gallery',
				shortUrl: 'https://www.theguardian.com/p/x3359z',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x3359z',
				},
			},
			{
				url: 'http://localhost:9000/fashion/gallery/2025/aug/22/what-to-wear-to-notting-hill-carnival',
				linkText: 'On parade: what to wear to Notting Hill carnival',
				showByline: false,
				byline: 'Melanie Wilkinson',
				masterImage:
					'https://media.guim.co.uk/49a9656cd10c4f64f8bdd54380afb915c7a3648b/207_0_1500_1200/master/1500.jpg',
				image: 'https://i.guim.co.uk/img/media/49a9656cd10c4f64f8bdd54380afb915c7a3648b/207_0_1500_1200/master/1500.jpg?width=300&quality=85&auto=format&fit=max&s=552a5c40f2dbe4ec5e41eb7ce38cc51b',
				carouselImages: {
					300: 'https://i.guim.co.uk/img/media/49a9656cd10c4f64f8bdd54380afb915c7a3648b/207_0_1500_1200/master/1500.jpg?width=300&quality=85&auto=format&fit=max&s=552a5c40f2dbe4ec5e41eb7ce38cc51b',
					460: 'https://i.guim.co.uk/img/media/49a9656cd10c4f64f8bdd54380afb915c7a3648b/207_0_1500_1200/master/1500.jpg?width=460&quality=85&auto=format&fit=max&s=92465638ffbcf894d49bdcb033b9ddfd',
				},
				isLiveBlog: false,
				pillar: 'lifestyle',
				designType: 'Media',
				format: {
					design: 'GalleryDesign',
					theme: 'LifestylePillar',
					display: 'StandardDisplay',
				},
				webPublicationDate: '2025-08-22T05:00:23.000Z',
				headline: 'On parade: what to wear to Notting Hill carnival',
				mediaType: 'Gallery',
				shortUrl: 'https://www.theguardian.com/p/x32mte',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x32mte',
				},
			},
			{
				url: 'http://localhost:9000/artanddesign/gallery/2025/aug/21/psychedelic-rock-glass-mountain-michael-lundgren',
				linkText:
					'Psychedelic rock! Formations that mess with your mind – in pictures ',
				showByline: false,
				masterImage:
					'https://media.guim.co.uk/2810af61b2d2d2d5f71ec01e56e6555e0a6d4635/55_0_2813_2250/master/2813.jpg',
				image: 'https://i.guim.co.uk/img/media/2810af61b2d2d2d5f71ec01e56e6555e0a6d4635/55_0_2813_2250/master/2813.jpg?width=300&quality=85&auto=format&fit=max&s=3105a2cb22c9aa1c4247cb1d373c449d',
				carouselImages: {
					300: 'https://i.guim.co.uk/img/media/2810af61b2d2d2d5f71ec01e56e6555e0a6d4635/55_0_2813_2250/master/2813.jpg?width=300&quality=85&auto=format&fit=max&s=3105a2cb22c9aa1c4247cb1d373c449d',
					460: 'https://i.guim.co.uk/img/media/2810af61b2d2d2d5f71ec01e56e6555e0a6d4635/55_0_2813_2250/master/2813.jpg?width=460&quality=85&auto=format&fit=max&s=59f834675fd82a57db4d61ffe76ac759',
				},
				isLiveBlog: false,
				pillar: 'culture',
				designType: 'Media',
				format: {
					design: 'GalleryDesign',
					theme: 'CulturePillar',
					display: 'StandardDisplay',
				},
				webPublicationDate: '2025-08-21T06:01:01.000Z',
				headline:
					'Psychedelic rock! Formations that mess with your mind – in pictures ',
				mediaType: 'Gallery',
				shortUrl: 'https://www.theguardian.com/p/x2p663',
				discussion: {
					isCommentable: false,
					isClosedForComments: true,
					discussionId: '/p/x2p663',
				},
			},
		],
	},
} satisfies Story;
