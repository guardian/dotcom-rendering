import { extractHeadingText } from '../../src/model/enhanceProductElement';
import type { ProductBlockElement } from '../../src/types/content';
import { productImage } from './productImage';

export const exampleProduct: ProductBlockElement = {
	_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
	elementId: 'b1f6e8e2-3f3a-4f0c-8d1e-5f3e3e3e3e3e',
	primaryHeadingHtml: 'Best Kettle Overall',
	primaryHeadingText: extractHeadingText('Best Kettle Overall'),
	secondaryHeadingHtml: 'Bosch Sky Kettle',
	secondaryHeadingText: extractHeadingText('Best Kettle Overall'),
	brandName: 'Bosch',
	productName: 'Sky Kettle',
	image: productImage,
	displayType: 'InlineWithProductCard',
	lowestPrice: '£39.99',
	customAttributes: [
		{ name: 'What we love', value: 'It pours well and looks great' },
		{
			name: "What we don't love",
			value: 'The handle feels a bit cheap compared to the rest of it',
		},
	],
	productCtas: [
		{
			url: 'https://www.johnlewis.com/bosch-twk7203gb-sky-variable-temperature-kettle-1-7l-black/p3228625',
			text: '',
			retailer: 'John Lewis',
			price: '£45.99',
		},
		{
			url: 'https://www.amazon.co.uk/Bosch-TWK7203GB-Sky-Variable-Temperature/dp/B07Z8VQ2V6',
			text: '',
			retailer: 'Amazon',
			price: '£39.99',
		},
	],
	starRating: 'none-selected',
	content: [
		{
			displayCredit: true,
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
			role: 'inline',
			media: {
				allImages: [
					{
						index: 0,
						fields: {
							height: '3213',
							width: '3213',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/3213.jpg',
					},
					{
						index: 1,
						fields: {
							isMaster: 'true',
							height: '3213',
							width: '3213',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
					},
					{
						index: 2,
						fields: {
							height: '2000',
							width: '2000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/2000.jpg',
					},
					{
						index: 3,
						fields: {
							height: '1000',
							width: '1000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/1000.jpg',
					},
					{
						index: 4,
						fields: {
							height: '500',
							width: '500',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/500.jpg',
					},
					{
						index: 5,
						fields: {
							height: '140',
							width: '140',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/140.jpg',
					},
				],
			},
			elementId: '76686aa1-2e47-4616-b4ed-a88d0afe07ed',
			imageSources: [
				{
					weighting: 'inline',
					srcSet: [
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 620,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1240,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 605,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1210,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 445,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 890,
						},
					],
				},
				{
					weighting: 'thumbnail',
					srcSet: [
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 140,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 280,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 120,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 240,
						},
					],
				},
				{
					weighting: 'supporting',
					srcSet: [
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 380,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 760,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 300,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 600,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 620,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1240,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 605,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 1210,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 445,
						},
						{
							src: 'https://media.guimcode.co.uk/bacede2d976c26d6a224ede074d5634a3f1d304f/0_0_3213_3213/master/3213.jpg',
							width: 890,
						},
					],
				},
			],
			data: {
				alt: 'Testing Bosch Sky Kettle',
				credit: 'Photograph: Rachel Ogden/The Guardian',
			},
		},
		{
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://www.johnlewis.com/bosch-twk7203gb-sky-variable-temperature-kettle-1-7l-black/p3228625',
			label: '£79.99 at John Lewis',
			linkType: 'ProductButton',
		},
		{
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://www.amazon.co.uk/Bosch-TWK7203GB-Sky-Variable-Temperature/dp/B07Z8VQ2V6',
			label: '£79.99 at Amazon',
			linkType: 'ProductButton',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>Offering variable temperatures and a double-walled stainless-steel housing, the 3kW Sky is a brilliant blend of robust form and function. It boasts a low minimum boil (300ml), a keep-warm setting and touch controls.</p>',
			elementId: '4a27eb68-6a03-4e82-a7d0-e4f1ef3ccb6f',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>Why we love it<br></strong>I found it difficult to select a best kettle from so many that performed well, but the Bosch Sky clinched it because it’s such a good all-rounder that will suit most people. It pours well, has a button that’s within easy reach of the handle so it’s simple to open the lid without touching it, and it’s insulated so the exterior doesn’t become too hot to touch. From a design perspective, it has a more industrial feel than many others – no frippery here – but not too modern that it wouldn’t fit into most kitchens. Its display is thoughtfully designed, easy to keep clean and lights up as it heats.</p>',
			elementId: 'f48f03d4-bece-4763-874b-4027a311643e',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>The exterior doesn’t get too hot (up to 40C), and while it wasn’t the fastest to boil in testing, it was only seconds behind the Dualit below. It clicked off at boiling point, and the water was still a toasty 78C 30 minutes later. At the hour point, it was 66C, and two hours 52C, meaning you’ll spend less time and energy reboiling.</p>',
			elementId: 'df571922-33b1-416a-8b3d-ee756b638cc1',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>It’s a shame that … </strong> its premium look ends at the handle, which seems cheap and plasticky next to the sleek aesthetic of the rest of it.</p>',
			elementId: 'd98fc724-8908-46e2-acc6-4739ad4d5719',
		},
	],
};

export const exampleAtAGlanceProductArray: ProductBlockElement[] = [
	{
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		elementId: 'b85ec38b-091b-40c2-8902-a9114df3cfe3',
		primaryHeadingHtml: '<em>Best running watch for beginners:</em>',
		primaryHeadingText: extractHeadingText(
			'<em>Best running watch for beginners:</em>',
		),
		secondaryHeadingHtml: 'Garmin Forerunner 55',
		secondaryHeadingText: extractHeadingText('Garmin Forerunner 55'),
		brandName: 'Garmin',
		productName: 'Forerunner 55',
		image: {
			url: 'https://media.guim.co.uk/7bf8bdea17b8d7e3f0b9aef1aa88d94737d4bdf3/0_0_725_725/725.jpg',
			caption:
				'Garmin Forerunner 55 GPS 42mm Running Smartwatch, Easy to use, Lightweight, Training Guidance, Safety & Tracking Features, Black',
			height: 725,
			width: 725,
			alt: '',
			credit: 'Photograph: PR Image',
			displayCredit: false,
		},
		displayType: 'InlineWithProductCard',
		customAttributes: [],
		productCtas: [
			{
				url: 'https://www.decathlon.co.uk/p/garmin-forerunner-55-gps-watch-black/341619/m8758300',
				text: '',
				retailer: 'Decathlon',
				price: '£179.99',
			},
			{
				url: 'https://www.amazon.co.uk/Garmin-Forerunner-Lightweight-Smartwatch-Training/dp/B0953X73TP?th=1',
				text: '',
				retailer: 'Amazon',
				price: '£122.49',
			},
		],
		starRating: 'none-selected',
		content: [],
	},
	{
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		elementId: '1cb32565-86fa-4d95-a944-de49a065e71e',
		primaryHeadingHtml: '<em>Best budget running watch:</em>',
		primaryHeadingText: extractHeadingText(
			'<em>Best budget running watch:</em>',
		),
		secondaryHeadingHtml: 'Suunto Run',
		secondaryHeadingText: extractHeadingText('Suunto Run'),
		brandName: 'Suunto',
		productName: 'Run',
		image: {
			url: 'https://media.guim.co.uk/ecc054be145a6e5b3c6fca3694f9b4cbea5078b1/0_0_725_725/725.jpg',
			caption: 'SUUNTO RUN All Black GPS Sport and Running Watch',
			height: 725,
			width: 725,
			alt: '',
			credit: 'Photograph: PR Image',
			displayCredit: false,
		},
		displayType: 'InlineWithProductCard',
		customAttributes: [],
		productCtas: [
			{
				url: 'https://www.sportsshoes.com/product/suu151/suunto-run-gps-watch',
				text: '',
				retailer: 'SportsShoes',
				price: '£174.99',
			},
			{
				url: 'https://www.suunto.com/en-gb/Products/sports-watches/suunto-run/suunto-run-all-black-with-silicone-strap',
				text: '',
				retailer: 'Suunto',
				price: '£199',
			},
		],
		starRating: 'none-selected',
		content: [],
	},
	{
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		elementId: '43670bc5-00f2-460d-853e-3e6e0bf205c5',
		primaryHeadingHtml: '<em>Best mid-range running watch:</em>',
		primaryHeadingText: extractHeadingText(
			'<em>Best mid-range running watch:</em>',
		),
		secondaryHeadingHtml: 'Coros Pace Pro',
		secondaryHeadingText: extractHeadingText('Coros Pace Pro'),
		brandName: 'Coros',
		productName: 'Pace Pro',
		image: {
			url: 'https://media.guim.co.uk/33599323a25a435d3a5647cc9906d2b011f6763e/0_0_725_725/725.jpg',
			caption: 'COROS PACE Pro GPS Sport Watch Black',
			height: 725,
			width: 725,
			alt: '',
			credit: 'Photograph: PR Image',
			displayCredit: false,
		},
		displayType: 'InlineWithProductCard',
		customAttributes: [],
		productCtas: [
			{
				url: 'https://healf.com/en-uk/products/coros-coros-pace-pro-gps-sport-watch-black',
				text: '',
				retailer: 'Healf',
				price: '£299',
			},
			{
				url: 'https://www.myprotein.com/p/sports-accessories/coros-pace-pro-gps-sport-watch-black-one-size/16889572/',
				text: '',
				retailer: 'Myprotein',
				price: '£299',
			},
		],
		starRating: 'none-selected',
		content: [],
	},
	{
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		elementId: '830b3256-bd3a-4fc2-a4a3-6d42fcf0467f',
		primaryHeadingHtml: '<em>Best-looking mid-range running watch:</em>',
		primaryHeadingText: extractHeadingText(
			'<em>Best-looking mid-range running watch:</em>',
		),
		secondaryHeadingHtml: 'Suunto Race 2',
		secondaryHeadingText: extractHeadingText('Suunto Race 2'),
		brandName: 'Suunto',
		productName: 'Race 2',
		image: {
			url: 'https://media.guim.co.uk/c9f1e864f353555555af61c83f4fe5acf01be95b/0_0_725_725/725.jpg',
			caption: 'Suunto Race 2',
			height: 725,
			width: 725,
			alt: '',
			credit: 'Photograph: PR Image',
			displayCredit: false,
		},
		displayType: 'InlineWithProductCard',
		customAttributes: [],
		productCtas: [
			{
				url: 'https://www.sportsshoes.com/product/suu123/suunto-race-2-gps-watch---ss26',
				text: '',
				retailer: 'SportsShoes',
				price: '£429',
			},
			{
				url: 'https://www.suunto.com/en-gb/Products/sports-watches/suunto-race-2/suunto-race-2-all-black/',
				text: '',
				retailer: 'Suunto',
				price: '£429',
			},
		],
		starRating: 'none-selected',
		content: [],
	},
	{
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		elementId: '407575ba-5898-4995-a94b-f7ab624c60de',
		primaryHeadingHtml: '<em>The best running watch money can buy:</em>',
		primaryHeadingText: extractHeadingText(
			'<em>The best running watch money can buy:</em>',
		),
		secondaryHeadingHtml: 'Garmin Forerunner 970',
		secondaryHeadingText: extractHeadingText('Garmin Forerunner 970'),
		brandName: 'Garmin',
		productName: 'Forerunner 970',
		image: {
			url: 'https://media.guim.co.uk/5d6f01a3ac82c8f4208e47f6645034b7155c704b/0_0_725_725/725.jpg',
			caption: 'Forerunner 970 GPS Smartwatch',
			height: 725,
			width: 725,
			alt: '',
			credit: 'Photograph: PR Image',
			displayCredit: false,
		},
		displayType: 'InlineWithProductCard',
		customAttributes: [],
		productCtas: [
			{
				url: 'https://www.blacks.co.uk/19695870/garmin-forerunner-970-gps-watch-19695870/6206138',
				text: '',
				retailer: 'Blacks',
				price: '£579',
			},
			{
				url: 'https://www.cotswoldoutdoor.com/p/garmin-forerunner-970-gps-smartwatch-B3BG3B0054.html',
				text: '',
				retailer: 'Cotswold Outdoor',
				price: '£629.99',
			},
		],
		starRating: 'none-selected',
		content: [],
	},
	{
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		elementId: 'd7de82bb-fd1c-4efb-a54d-9844156db9e5',
		primaryHeadingHtml: '<em>Best running watch for battery life:</em>',
		primaryHeadingText: extractHeadingText(
			'<em>Best running watch for battery life:</em>',
		),
		secondaryHeadingHtml: 'Garmin Enduro 3',
		secondaryHeadingText: extractHeadingText('Garmin Enduro 3'),
		brandName: 'Garmin',
		productName: 'Enduro 3',
		image: {
			url: 'https://media.guim.co.uk/4ca5935158967c6b2d1a91fabca27ec20a52ef96/0_0_725_725/725.jpg',
			caption: 'Garmin Enduro 3 DLC Titanium GPS Watch',
			height: 725,
			width: 725,
			alt: '',
			credit: 'Photograph: PR Image',
			displayCredit: false,
		},
		displayType: 'InlineWithProductCard',
		customAttributes: [],
		productCtas: [
			{
				url: 'https://www.sportsshoes.com/product/gar340/garmin-enduro-3-sapphire-gps-watch',
				text: '',
				retailer: 'SportsShoes',
				price: '£615.99',
			},
			{
				url: 'https://www.millets.co.uk/19656651/garmin-enduro-3-gps-smartwatch-19656651/5930679/',
				text: '',
				retailer: 'Millets',
				price: '£649',
			},
		],
		starRating: 'none-selected',
		content: [],
	},
	{
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		elementId: 'c75a0b5a-929e-4550-a146-ccc080c76655',
		primaryHeadingHtml: '<em>Best running watch with LTE/satellite:</em>',
		primaryHeadingText: extractHeadingText(
			'<em>Best running watch with LTE/satellite:</em>',
		),
		secondaryHeadingHtml: 'Garmin Fenix 8 Pro',
		secondaryHeadingText: extractHeadingText('Garmin Fenix 8 Pro'),
		brandName: 'Garmin',
		productName: 'Fenix 8 Pro',
		image: {
			url: 'https://media.guim.co.uk/719acb5d276ed7d64f889ee5a031cfd8d945db67/0_0_725_725/725.jpg',
			caption:
				'Garmin\nfēnix 8 Pro AMOLED GPS Multisport Smartwatch, Graphite, 47mm',
			height: 725,
			width: 725,
			alt: '',
			credit: 'Photograph: PR Image',
			displayCredit: false,
		},
		displayType: 'InlineWithProductCard',
		customAttributes: [],
		productCtas: [
			{
				url: 'https://www.sportsshoes.com/product/gar354/garmin-fenix-8-pro-amoled-sapphire--(47mm)-gps-watch---aw25',
				text: '',
				retailer: 'SportsShoes',
				price: '£875.49',
			},
			{
				url: 'https://www.johnlewis.com/garmin-fenix-8-pro-amoled-gps-multisport-smartwatch-graphite/p114305025',
				text: '',
				retailer: 'John Lewis',
				price: '£991.57',
			},
		],
		starRating: 'none-selected',
		content: [],
	},
];
