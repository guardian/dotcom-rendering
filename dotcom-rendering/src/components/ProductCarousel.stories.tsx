import type { StoryFn } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductCarousel } from './Carousel.importable';
import { FormatBoundary } from './FormatBoundary';
import type { Product } from './ProductCard';

const productData: Product[] = [
	{
		title: 'Best electric toothbrush overall: \n Spotlight Sonic Pro',
		stars: '★★★★☆',
		image: 'https://media.guim.co.uk/c4bcaa96aedca4f161e451ab4d77368223bf4ad8/0_73_1080_1080/500.jpg',
		price: '£400',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fuk.spotlightoralcare.com%2Fproducts%2Fspotlight-sonic-brush&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title:
			'Best value electric toothbrush: \n' +
			' Icy Bear Next-Generation sonic toothbrush',
		stars: '★★★★★',
		image: 'https://media.guim.co.uk/16625f8430a6d48a9085e274fccc9d5dc5414075/881_0_3000_3000/500.jpg',
		price: '£50',
		link: 'https://www.ordolife.com/products/ordo-sonic-toothbrush-charcoal-grey',
	},
	{
		title: 'Best premium electric toothbrush: \n Philips Sonicare Smart 9400',
		stars: '★★★★☆',
		image: 'https://media.guim.co.uk/57d27256109dfc30dc447fbc1db902d82b553af6/1000_0_3000_3000/500.jpg',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.philips.co.uk%2Fc-p%2FHX9992_12%2Fsonicare-9900-prestige-power-toothbrush-with-senseiq&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
		price: '£160',
	},
	{
		title: 'Best oscillating toothbrush: \n Oral-B iO3',
		stars: '★★★☆☆',
		image: 'https://media.guim.co.uk/04d27f52cfa97d4d323d987505343ea30eb648b6/419_316_4043_2426/500.jpg',
		price: '£15',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.boots.com%2Foral-b-io3-electric-toothbrush-matt-black-travel-case--10331465&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title: 'Best electric toothbrush for sustainability: \n Suri sonic toothbrush',
		stars: '★★★★☆',
		image: 'https://media.guim.co.uk/5d3c94613514a653802757f0c3641da52f6d2c8d/896_0_3000_3000/500.jpg',
		price: '£95',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.trysuri.com%2Fproducts%2Fsuri-sustainable-sonic-toothbrush-uv-c-led-case&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title: 'Foreo Issa 3',
		stars: '★★★★★',
		image: 'https://media.guim.co.uk/756c075deb18ec290434920356a067755e851851/956_0_3000_3000/500.jpg',
		price: '£88',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.amazon.co.uk%2FFOREO-Total-Oral-Care-Bundle%2Fdp%2FB0D7HMTFZZ%3Fth%3D1&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title: 'Coulax C8',
		stars: '★★★☆☆',
		image: 'https://media.guim.co.uk/f40dba5a3493699d68515db47143acd4375d7e54/1000_0_3000_3000/500.jpg',
		price: '£29',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.superdrug.com%2Ftoiletries%2Fdental%2Felectrical-toothbrush%2Fsuperdrug-procare-rechargeable-electric-toothbrush-black%2Fp%2F780348&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title: 'Oral-B iO9',
		stars: '★★★★★',
		image: 'https://media.guim.co.uk/26434ce9ce4f7c20bb6e76d67c5e429f2b219360/1000_0_3000_3000/500.jpg',
		price: '£500',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fshop.oralb.co.uk%2Fio6-grey-opal-electric-toothbrush-with-travel-case%2F13525808.html&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title: 'Silk’n SonicYou',
		stars: '★★★★☆',
		image: 'https://media.guim.co.uk/dcc23938f296dcd05ca156ff5ba824cfeae0f415/1139_0_3000_3000/500.jpg',
		price: '£47',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.amazon.co.uk%2FSilkn-SonicYou-Black-Toothbrush-Battery%2Fdp%2FB0B3RMRWPY%3Fth%3D1&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title: 'Whites Beaconsfield sonic LED toothbrush',
		stars: '★★★☆☆',
		image: 'https://media.guim.co.uk/2bf676236f9294687185eae1d5c36250a56d092e/987_0_3000_3000/500.jpg',
		price: '£39',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.superdrug.com%2Ftoiletries%2Fdental%2Felectrical-toothbrush%2Fwhites-beaconsfield-sonic-led-electric-toothbrush%2Fp%2Fmp-00142013&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
	{
		title: 'Philips One',
		stars: '★★★★☆',
		image: 'https://media.guim.co.uk/8416f3f5afe10d002b39cf33b2ff56263aaf3f25/1000_0_3000_3000/500.jpg',
		price: '£33',
		link: 'https://go.skimresources.com/?id=114047X1572903&url=https%3A%2F%2Fwww.amazon.co.uk%2FPhilips-One-Rechargeable-Toothbrush-Electric%2Fdp%2FB0B9H5PNG9%3Fth%3D1&sref=https://www.theguardian.com/thefilter/2024/dec/29/best-electric-toothbrushes.json?dcr=true&',
	},
];

export default {
	component: ProductCarousel,
	title: 'Components/ProductCarousel',
	decorators: [
		(Story: StoryFn) => (
			<FormatBoundary
				format={{
					design: ArticleDesign.Standard,
					display: ArticleDisplay.Standard,
					theme: Pillar.Lifestyle,
				}}
			>
				<Story />
			</FormatBoundary>
		),
	],
};

export const Default = () => <ProductCarousel products={productData} />;
