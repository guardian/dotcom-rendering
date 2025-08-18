import type { Meta, StoryFn } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { Product } from './ProductElement';
import { ProductElement } from './ProductElement';

const product: Product = {
	primaryHeadline: '<em><strong>Best fan overall:<br></strong></em>',
	secondaryHeadline: '<strong>AirCraft Lume</strong>',
	brandName: 'AirCraft',
	productName: 'Lume',
	image: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg',
	url: 'https://www.aircraft.com/lume',
	price: '£199.99',
	retailer: 'AirCraft',
	statistics: [
		{
			name: 'Rating',
			value: '4.9/5',
		},
		{
			name: 'Features',
			value: 'Smart controls, energy-efficient, quiet operation',
		},
	],
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
							aspectRatio: '1:1',
							height: '3000',
							width: '3000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/3000.jpg',
					},
					{
						index: 1,
						fields: {
							aspectRatio: '1:1',
							isMaster: 'true',
							height: '3000',
							width: '3000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg',
					},
					{
						index: 2,
						fields: {
							aspectRatio: '1:1',
							height: '2000',
							width: '2000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/2000.jpg',
					},
					{
						index: 3,
						fields: {
							aspectRatio: '1:1',
							height: '1000',
							width: '1000',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/1000.jpg',
					},
					{
						index: 4,
						fields: {
							aspectRatio: '1:1',
							height: '500',
							width: '500',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/500.jpg',
					},
					{
						index: 5,
						fields: {
							aspectRatio: '1:1',
							height: '140',
							width: '140',
						},
						mediaType: 'Image',
						mimeType: 'image/jpeg',
						url: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/140.jpg',
					},
				],
			},
			elementId: '080282cc-33a4-4114-a5ee-b97b63ac51bf',
			imageSources: [
				{
					weighting: 'inline',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=f7e3a2e8c13b193540c8ae42d9dea333',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9cf84257cf5c6cfa04fbfde83dacf666',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=773c2392e25264e7972d2b630463a17e',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=5e275875a24721a6193bda0aec92e343',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=09a1b939ac71389be24d1fc14e3a9948',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=9b2caa94ed0906fdc84ed7cb2bbdb027',
							width: 890,
						},
					],
				},
				{
					weighting: 'thumbnail',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=140&quality=85&auto=format&fit=max&s=113846f24c7151138c5574ccdb944305',
							width: 140,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=3e4284bcdafd196b93d87357fc4cf8a1',
							width: 280,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=120&quality=85&auto=format&fit=max&s=704af97f121b57063a33624ae4db883b',
							width: 120,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=c6b991e368a19fb5def4307978ad5795',
							width: 240,
						},
					],
				},
				{
					weighting: 'supporting',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=380&quality=85&auto=format&fit=max&s=1b1657aa27762ca98fa3bee3864b41e7',
							width: 380,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=338d07b846956f2cc52ebb96d8d2e2b2',
							width: 760,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=300&quality=85&auto=format&fit=max&s=b78e29df91a4f09fefb77fb859b34a9c',
							width: 300,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=2fb46c78776a2fa19c61cfd9f0501d88',
							width: 600,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=f7e3a2e8c13b193540c8ae42d9dea333',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9cf84257cf5c6cfa04fbfde83dacf666',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=773c2392e25264e7972d2b630463a17e',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=5e275875a24721a6193bda0aec92e343',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=09a1b939ac71389be24d1fc14e3a9948',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=9b2caa94ed0906fdc84ed7cb2bbdb027',
							width: 890,
						},
					],
				},
				{
					weighting: 'showcase',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=860&quality=85&auto=format&fit=max&s=b610c55994b1dd7cf8af561317afdb77',
							width: 860,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2da421bcc9ebb0867101ecf2e237b545',
							width: 1720,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=780&quality=85&auto=format&fit=max&s=634de1870d9f9edcaca6e406b236f6cc',
							width: 780,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=8ca2912c78c722dc08b067bee110983e',
							width: 1560,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=f7e3a2e8c13b193540c8ae42d9dea333',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9cf84257cf5c6cfa04fbfde83dacf666',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=773c2392e25264e7972d2b630463a17e',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=5e275875a24721a6193bda0aec92e343',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=09a1b939ac71389be24d1fc14e3a9948',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=9b2caa94ed0906fdc84ed7cb2bbdb027',
							width: 890,
						},
					],
				},
				{
					weighting: 'halfwidth',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=f7e3a2e8c13b193540c8ae42d9dea333',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=9cf84257cf5c6cfa04fbfde83dacf666',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=773c2392e25264e7972d2b630463a17e',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=5e275875a24721a6193bda0aec92e343',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=09a1b939ac71389be24d1fc14e3a9948',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=9b2caa94ed0906fdc84ed7cb2bbdb027',
							width: 890,
						},
					],
				},
				{
					weighting: 'immersive',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=1900&quality=85&auto=format&fit=max&s=04fc8464f7adc070d493971e596dd1b0',
							width: 1900,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=1900&quality=45&auto=format&fit=max&dpr=2&s=069ff9cf30b65771aacb6a500d6a2b30',
							width: 3800,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=1300&quality=85&auto=format&fit=max&s=143abf482708dad17207c61f778b2299',
							width: 1300,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=1300&quality=45&auto=format&fit=max&dpr=2&s=e82acf4c43793f7ab898e3bd59bdf245',
							width: 2600,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=1140&quality=85&auto=format&fit=max&s=09df21398496d0e973217fd17f1a596a',
							width: 1140,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=1140&quality=45&auto=format&fit=max&dpr=2&s=71989a2384c0ee81da93e3c3c9a61e90',
							width: 2280,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=980&quality=85&auto=format&fit=max&s=daaa86aff0048afffb22dd37c5d3a790',
							width: 980,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=980&quality=45&auto=format&fit=max&dpr=2&s=b16dc64073e83b5d1bbe4c49ae29d53f',
							width: 1960,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=740&quality=85&auto=format&fit=max&s=0c006a9886134157111c288b3ea262bd',
							width: 740,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=740&quality=45&auto=format&fit=max&dpr=2&s=9727ebc350b7d9209eba8bcd0ffbd477',
							width: 1480,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=660&quality=85&auto=format&fit=max&s=63faff5989a938f0e4eb5e0242f42939',
							width: 660,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=660&quality=45&auto=format&fit=max&dpr=2&s=70d09944cc01dce3c367f081064ccd40',
							width: 1320,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=480&quality=85&auto=format&fit=max&s=5cf16379711fb436e20774155c87e98b',
							width: 480,
						},
						{
							src: 'https://i.guim.co.uk/img/media/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg?width=480&quality=45&auto=format&fit=max&dpr=2&s=3c5641138614f64f6be03faa224963b9',
							width: 960,
						},
					],
				},
			],
			data: {
				alt: 'AirCraft reshot',
				credit: 'Photograph: Caramel Quin/The Guardian',
			},
		},
		{
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Faircraftvacuums.com%2Fproduct%2Flume-fan-air-circulator%2F%23buynow&sref=https://www.theguardian.com/thefilter/2025/jun/17/best-fans-uk.json?dcr',
			label: '£149 at AirCraft',
			elementId: 'f9b3e7a9-788b-4ada-bd99-f7c40b843db7',
			linkType: 'ProductButton',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><em>Preorder now for delivery during week commencing </em><em>22 September</em></p>',
			elementId: 'a55f8c48-4be4-4e14-92f8-483ecf0c75fc',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>This pedestal fan was hard to fault, with an elegant design that boasts a dimmable backlight (three brightness levels or you can turn it off, all with the remote control). It’s billed as height adjustable, but rather than scooting up and down, you can remove the bottom pole to convert it into a 63cm desk fan. There’s an LED display and touch controls on the front, and other features include a 12-hour timer and a sleep mode.</p>',
			elementId: 'd9ae99e6-8131-431c-a692-3c96769b8aff',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>Of all I tested, this is probably the best fan for sleeping: it’s the best for low noise relative to wind speed. Pick a lower setting for silent cooling, a higher setting if you’re happy to doze off to the white noise, or use the sleep button if you’d like it to gradually reduce power in the night. I found the lower settings cooling enough to get to sleep on a hot night during a heatwave.</p>',
			elementId: 'b03cb827-c743-4b21-9999-5ab8ae707bcb',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>Why we love it<br></strong>When I’m working from home or relaxing (I can’t say chilling out when it’s 30C+), the AirCraft Lume is the fan that I reach for. I love it for many reasons. It’s light but with a reassuringly heavy base, giving it Weeble-like stability: it’s difficult to knock over. It packs away pretty small for the winter because the pole comes apart. I also liked that the packaging is almost plastic-free.</p>',
			elementId: 'c8e237ad-68a1-4b85-8f18-b823cca792ec',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>It oscillates both horizontally and vertically, so it can circulate air nicely around a whole room. Most importantly of all, this fan can really shift air – its 5.9m/s (metres a second) result was the best on test, and you can really feel it. During a recent heatwave, I found the powerful breeze genuinely cooling. And it’s quiet: in fact, I can’t hear it at all on levels 1-5, so I need to be careful that I remember to turn off the fan when I step away. All for a reasonable price, too.</p>',
			elementId: 'b395e534-5a28-4562-a529-9a623acfedf0',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>It’s a shame that … </strong>there’s nowhere to stow the remote control when it’s not in use.</p>',
			elementId: 'dfdb1862-d836-4950-ac8c-14dd4a446e1c',
		},
	],
};

const meta = {
	component: ProductElement,
	title: 'Components/ProductElement',
	parameters: {
		layout: 'padded',
		formats: [
			{
				design: ArticleDesign.Review,
				display: ArticleDesign.Review,
				theme: Pillar.Lifestyle,
			},
		],
	},
	args: {
		product,
		format: {
			design: ArticleDesign.Review,
			display: ArticleDisplay.Showcase,
			theme: Pillar.Lifestyle,
		},
		editionId: 'UK',
	},
} satisfies Meta<typeof ProductElement>;

export default meta;

export const Default = {};

export const MultipleProducts: StoryFn = () => {
	return (
		<>
			<ProductElement
				product={product}
				editionId="UK"
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
			/>
			<ProductElement
				product={product}
				editionId="UK"
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
			/>
			<ProductElement
				product={product}
				editionId="UK"
				format={{
					design: ArticleDesign.Review,
					display: ArticleDisplay.Showcase,
					theme: Pillar.Lifestyle,
				}}
			/>
		</>
	);
};
