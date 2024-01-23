import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { TrailType } from '../../src/types/trails';

export const trails: [
	TrailType,
	TrailType,
	TrailType,
	TrailType,
	TrailType,
	TrailType,
	TrailType,
	TrailType,
	TrailType,
] = [
	{
		url: 'https://www.theguardian.com/sport/athletics',
		headline: 'Athletics',
		image: {
			src: 'http://media.guim.co.uk/49c197838ba04557dbdd6f5077a7a98afe5bd299/0_133_3275_1964/master/3275.jpg',
			altText: 'Athletics',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@1',
	},
	{
		url: 'https://www.theguardian.com/sport/olympic-games-2020',
		headline: 'Olympic Games',
		image: {
			src: 'https://media.guim.co.uk/690a725111db015304868628774a70aa1e2b18c5/702_902_2735_1640/master/2735.jpg',
			altText: 'Olympic Rings',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@2',
	},
	{
		url: 'https://www.theguardian.com/sport/motorsports',
		headline: 'Motor sports',
		image: {
			src: 'https://media.guim.co.uk/503c85b6cd242a8a79bea3fb6a6d5545fa33a903/3_59_1393_835/master/1393.jpg',
			altText: 'Motor sports',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@3',
	},
	{
		url: 'https://www.theguardian.com/sport/chess',
		headline: 'Chess',
		image: {
			src: 'https://media.guim.co.uk/5c41d87e7155700711aef81c2034b0d9f2818e3b/0_268_4992_2995/master/4992.jpg',
			altText: 'Chess',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@4',
	},
	{
		url: 'https://www.theguardian.com/sport/australia-sport',
		headline: 'Australia Sport',
		image: {
			src: 'https://media.guim.co.uk/56b2199f0d43210a106d45f1a6510995c7999cb4/261_0_3683_2210/master/3683.jpg',
			altText: 'Australia Sport',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@5',
	},
	{
		url: 'https://www.theguardian.com/sport/sailing',
		headline: 'Sailing',
		image: {
			src: 'https://media.guim.co.uk/1121e6cddc5de615c739575f102b2ffd709b2912/173_248_3208_1925/master/3208.jpg',
			altText: 'Sailing',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@6',
	},
	{
		url: 'https://www.theguardian.com/sport/snooker',
		headline: 'Snooker',
		image: {
			src: 'https://media.guim.co.uk/a5f620941b6c1ddfbf6f8fe6fbb2e9f9da2a79c9/101_119_3399_2039/master/3399.jpg',
			altText: 'Snooker',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@7',
	},
	{
		url: 'https://www.theguardian.com/sport/darts',
		headline: 'Darts',
		image: {
			src: 'https://media.guim.co.uk/049a6192c14f31032d3f42313051903eea55ae18/213_51_4717_2830/master/4717.jpg',
			altText: 'Darts',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@8',
	},
	{
		url: 'https://www.theguardian.com/sport/disability-sport',
		headline: 'Disability Sport',
		image: {
			src: 'https://media.guim.co.uk/cfdbb1d5668fdefac1166f3e445e58c2afdebc58/246_20_4893_2935/master/4893.jpg',
			altText: 'Disability Sport',
		},
		format: {
			theme: Pillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		},
		dataLinkName: 'news | group-0 | card-@9',
	},
];
