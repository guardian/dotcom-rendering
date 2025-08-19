import type { Meta, StoryFn } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { Product } from './ProductElement';
import { ProductElement } from './ProductElement';

const product2: Product = {
	primaryHeadline: 'Best budget fan and best desk fan',
	secondaryHeadline: 'Devola desk fan',
	brandName: 'Devola',
	productName: 'Devola 16" Desk Fan',
	image: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&dpr=2&s=none&crop=none',
	url: 'https://www.amazon.co.uk/Devola-16-Inch-Desk-Fan/dp/B0B3Z9K5XH?tag=theguardianbookshop-21&ascsubtag=trd-10001-1b2f-00000-00000-a0000-00000-00000-00000',
	price: '£29.99',
	retailer: 'Amazon',
	statistics: [
		{ name: 'Style', value: 'desk' },
		{ name: 'Dimensions', value: '30 x 21 x 31cm (WDH)' },
		{ name: 'Number of speeds', value: '9' },
		{ name: 'Remote control', value: 'Yes' },
		{ name: 'Peak noise level on test', value: '50dB' },
		{ name: 'Power use on top setting', value: '16W' },
		{ name: 'Air speed on top setting', value: '4m/s' },
	],
	content: [
		{
			displayCredit: false,
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
						url: 'https://media.guim.co.uk/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/3000.jpg',
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
						url: 'https://media.guim.co.uk/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg',
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
						url: 'https://media.guim.co.uk/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/2000.jpg',
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
						url: 'https://media.guim.co.uk/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/1000.jpg',
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
						url: 'https://media.guim.co.uk/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/500.jpg',
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
						url: 'https://media.guim.co.uk/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/140.jpg',
					},
				],
			},
			elementId: 'a8972d53-14d4-4f1e-b214-2f1126186f93',
			imageSources: [
				{
					weighting: 'inline',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=94b15cb73822f6450c9556ee21b39885',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3fb897a4ad672c9506ccdfe843d1ce35',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=3a7141cc24c707484c56abe9083267d8',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=11db25fb3e45d0ee5e0deaa517dcb125',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=586236add61e8d012a17038507b5f054',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0a2cfd97212e4c4bdbbecf04ec78a8ce',
							width: 890,
						},
					],
				},
				{
					weighting: 'thumbnail',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=140&quality=85&auto=format&fit=max&s=826eed61bf3fa16a530965efa94ec882',
							width: 140,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=140&quality=45&auto=format&fit=max&dpr=2&s=bd99c0a43ce7112679869951d7f5c5fe',
							width: 280,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=120&quality=85&auto=format&fit=max&s=65a408a7da7bf1ecab905063db5161b4',
							width: 120,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=d9c0356b3126adfd53cbf678c91bdafb',
							width: 240,
						},
					],
				},
				{
					weighting: 'supporting',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=380&quality=85&auto=format&fit=max&s=6e2cc924d35b0bb6a8b631dc5e4bbe03',
							width: 380,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=380&quality=45&auto=format&fit=max&dpr=2&s=48734a8b007cb61681374d8a3a13c0ac',
							width: 760,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=300&quality=85&auto=format&fit=max&s=9d65148760356c3fe9156bf7a62300bc',
							width: 300,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=25089b34810a5174892dbcf96484a722',
							width: 600,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=94b15cb73822f6450c9556ee21b39885',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3fb897a4ad672c9506ccdfe843d1ce35',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=3a7141cc24c707484c56abe9083267d8',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=11db25fb3e45d0ee5e0deaa517dcb125',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=586236add61e8d012a17038507b5f054',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0a2cfd97212e4c4bdbbecf04ec78a8ce',
							width: 890,
						},
					],
				},
				{
					weighting: 'showcase',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=860&quality=85&auto=format&fit=max&s=9914580fa4ff89a54ca61d3c79bd0c6f',
							width: 860,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=f083a36969388f1d6b767fc9ad082cb9',
							width: 1720,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=780&quality=85&auto=format&fit=max&s=3dea1bf30cefafdd6a2995ef4ea57721',
							width: 780,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=780&quality=45&auto=format&fit=max&dpr=2&s=ba1fa045e1b8ff6ded56ee5c09638099',
							width: 1560,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=94b15cb73822f6450c9556ee21b39885',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3fb897a4ad672c9506ccdfe843d1ce35',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=3a7141cc24c707484c56abe9083267d8',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=11db25fb3e45d0ee5e0deaa517dcb125',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=586236add61e8d012a17038507b5f054',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0a2cfd97212e4c4bdbbecf04ec78a8ce',
							width: 890,
						},
					],
				},
				{
					weighting: 'halfwidth',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=85&auto=format&fit=max&s=94b15cb73822f6450c9556ee21b39885',
							width: 620,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=3fb897a4ad672c9506ccdfe843d1ce35',
							width: 1240,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=85&auto=format&fit=max&s=3a7141cc24c707484c56abe9083267d8',
							width: 605,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=605&quality=45&auto=format&fit=max&dpr=2&s=11db25fb3e45d0ee5e0deaa517dcb125',
							width: 1210,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=85&auto=format&fit=max&s=586236add61e8d012a17038507b5f054',
							width: 445,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=0a2cfd97212e4c4bdbbecf04ec78a8ce',
							width: 890,
						},
					],
				},
				{
					weighting: 'immersive',
					srcSet: [
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=1900&quality=85&auto=format&fit=max&s=4cb3549e0f18dea40ef3fa36b8507723',
							width: 1900,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=1900&quality=45&auto=format&fit=max&dpr=2&s=e680fa4686461aa8642cb7f94ae9b34b',
							width: 3800,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=1300&quality=85&auto=format&fit=max&s=9fc78c0deca343fb211ee1ded4eef856',
							width: 1300,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=1300&quality=45&auto=format&fit=max&dpr=2&s=bc1af46e7bac75e412fe3eb0ffc17fe4',
							width: 2600,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=1140&quality=85&auto=format&fit=max&s=c07010ce3881649b77e97e4d6fbaa020',
							width: 1140,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=1140&quality=45&auto=format&fit=max&dpr=2&s=cd3d021679c3db10c7f4cef1d57ba4ad',
							width: 2280,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=980&quality=85&auto=format&fit=max&s=b40e9bf4e65baedc530f594b12eb9533',
							width: 980,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=980&quality=45&auto=format&fit=max&dpr=2&s=ee21173ffdd423cbf601e58f5cab2e59',
							width: 1960,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=740&quality=85&auto=format&fit=max&s=e7be37c8dc3d3849bcbb2c29095667c1',
							width: 740,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=740&quality=45&auto=format&fit=max&dpr=2&s=c97b8fb6c7ba351fe57ec40fc22d66bc',
							width: 1480,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=660&quality=85&auto=format&fit=max&s=35b1f4996bb7dfd5088a228c545f9419',
							width: 660,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=660&quality=45&auto=format&fit=max&dpr=2&s=0cf9cc3595f603f8a77a30f92a074811',
							width: 1320,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=480&quality=85&auto=format&fit=max&s=c10ea33301cbc74a408faa7d4c1beef4',
							width: 480,
						},
						{
							src: 'https://i.guim.co.uk/img/media/52cb96deaf8a5dc676bc5cf8cc50a94a5cadcb66/1000_0_3000_3000/master/3000.jpg?width=480&quality=45&auto=format&fit=max&dpr=2&s=d29fedb2ca3915b519d241206efddeb1',
							width: 960,
						},
					],
				},
			],
			data: {
				alt: 'Devola Low Noise DC 9inch Air Circulator Fan with remote control',
				credit: 'Photograph: PR IMAGE',
			},
		},
		{
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.devola.co.uk%2Fproducts%2Fdevola-low-noise-dc-9-air-circulator-fan-white-dvf9dcfan&sref=https://www.theguardian.com/thefilter/2025/jun/17/best-fans-uk.json?dcr',
			label: '£59.95 at Devola',
			elementId: '0da2674c-838e-40a0-91b9-4a57ab563e33',
			linkType: 'ProductButton',
		},
		{
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.airconcentre.co.uk%2Fproducts%2Fdevola-low-noise-dc-9-air-circulator-fan-white-dvf9dcfan&sref=https://www.theguardian.com/thefilter/2025/jun/17/best-fans-uk.json?dcr',
			label: '£59.95 at AirconCentre',
			elementId: '14bd9780-cea4-4d11-a4c6-67906c7c0e39',
			linkType: 'ProductButton',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><em>Currently out of stock</em></p>',
			elementId: 'f90bc940-ade5-452d-b369-85c38d257e5f',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>This affordable desk fan punches well above its weight, with good features and powerful airflow. It has a display, touch controls, a remote, a timer and sleep mode. You can choose vertical oscillation (90 degrees), horizontal oscillation (80 degrees) or use both to circulate the air in a room. Not bad for a humble desk fan.</p>',
			elementId: '83c41f24-d857-4e58-8537-0e53384a170d',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>Why we love it<br></strong>It’s a bargain powerhouse, producing a substantial wind. I measured an air speed of 4m/s, which was among the best on test. It certainly felt cooling.</p>',
			elementId: '22ef5fcd-d3c0-4e61-b8cd-36d42ef2656e',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>I couldn’t hear the Devola on the first three of its nine speeds, despite being powerfully cooling, and even when the noise got louder on higher settings, it wasn’t too annoying. In fact, while the AirCraft Lume is my favourite bedside fan, the Devola perched on a bedside table does a good job on a budget. It’s powerfully cooling, inaudible on lower settings (1-3 out of 9) and on high settings, the white noise is OK to go to sleep to. Just don’t use the sleep setting: it’s noisier than it should be, so picking a medium setting worked best. Even the high settings provide a level of white noise I could go to sleep to.</p>',
			elementId: '1a06f538-86e4-4253-aecf-3868c974cc44',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p><strong>It’s a shame that … </strong>the display is on the base facing upwards, so you can’t see it unless you’re nearby. There was no instruction manual in the box, either, although I found it straightforward to use.</p>',
			elementId: '04014382-8855-4fcd-bd13-8d2fcfbad3a4',
		},
		{
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: '<p>***</p>',
			elementId: '56aa88ea-bffa-499e-8572-43b1753ab4ea',
		},
	],
};
const product: Product = {
	primaryHeadline: 'Best fan overall',
	secondaryHeadline: 'AirCraft Lume',
	brandName: 'AirCraft',
	productName: 'Lume',
	image: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg',
	url: 'https://www.aircraft.com/lume',
	price: '£199.99',
	retailer: 'AirCraft',
	statistics: [
		{ name: 'Style', value: 'Pedestal (or desk)' },
		{ name: 'Dimensions', value: '37 x 28 x 95cm (WDH)' },
		{ name: 'Number of speeds', value: '12' },
		{ name: 'Remote control', value: 'Yes' },
		{ name: 'Peak noise level on test', value: '55dB' },
		{ name: 'Power use on top setting', value: '18W' },
		{
			name: 'Air speed on top setting',
			value: '5.9 metres a second (m/s)',
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
		{
			_type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
			prefix: 'Related: ',
			text: 'Beat the heat: 14 expert tips for keeping cool in hot weather',
			elementId: '4ec187b3-d93b-4878-9f9d-96d2378b196f',
			role: 'thumbnail',
			url: 'https://www.theguardian.com/thefilter/2025/jun/19/how-to-keep-cool-hot-weather',
		},
	],
};

const meta = {
	component: ProductElement,
	title: 'Components/ProductElement',
	parameters: {
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
				product={product2}
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
