import { ProductCarousel } from './Carousel.importable';
import type { Product } from './ProductCard';

const productData: Product[] = [
	{
		image: 'https://i.guim.co.uk/img/media/573fa06acafa609143dded6ce92d008179af6933/1000_0_3000_3000/master/3000.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=b91e0f1de5736b508b02d376aeb62199',
		title: 'Best all-rounder: Ollie’s kimchi',
		price: '£6.50',
		stars: '★★★★★',
		description:
			'Bold and punchy, with a bright red colour and chunky cut, this is slow-fermented for extra depth and complexity. It’s vegan and boosted with umami from soy sauce and miso, which add balanced sweetness alongside the carrots. Full and well-rounded: tangy, savoury and umami-rich, with a satisfying, medium-hot heat. Even with the longer fermentation, the texture holds up well, offering a decent bite. This is well seasoned, has big flavour and hits that sweet spot between funk and freshness. A big, full-flavoured jar that delivers. I’ve named it the best all-rounder because it’s the cheapest of the well-fermented local varieties.',
	},
	{
		image: 'https://i.guim.co.uk/img/media/86ba9bd149eb5b719d27ed3fd78aa14e67aec9be/223_1332_2288_1372/master/2288.png?width=120&quality=45&auto=format&fit=max&dpr=2&s=c2faa3a270ecfcb47939eee1e5a4f1e5',
		title: 'Best splurge:\n' + 'The Cultured Collective classic kimchi',
		price: '£5.00',
		stars: '★★★★★',
		description:
			'A vivid, glossy kimchi with serious crunch and a bright lactic fizz that makes it one of the most satisfying and flavourful out there. This UK-made non-vegan one includes fish sauce and rice flour, lending it a deeper umami complexity and a gentle sweetness that sets it apart. Well-structured and vibrant, with a satisfying bite throughout, especially in the crunchy cabbage stalks. Delivers on flavour, too: medium-to-hot spice, a bold fermented aroma, punchy garlic notes and a well-seasoned balance of salt and tang. A standout jar that’s alive, expressive and deeply moreish.',
	},
	{
		image: 'https://i.guim.co.uk/img/media/e17225a3893ec424292dd4f08c590e39d74dcef8/0_844_2896_1973/master/2896.png?width=120&quality=45&auto=format&fit=max&dpr=2&s=f4524a6af66e2d294f9091e640b82351',
		title: 'Best bargain: Jongga Mat kimchi',
		price: '£1.09',
		stars: '★★★★☆',
		description:
			'This classic Korean kimchi brand, founded in 1987, offers a mellow, approachable, gentle heat, soft bite and well-balanced flavour. Brilliant red-orange and glossy, it’s coated in a thick sauce (thanks to thickener E415), with no MSG, high-fructose corn syrup or preservatives (unlike some larger commercial brands). It contains added lactic acid bacteria to support fermentation, and while it’s not the liveliest, it still delivers a pleasant tang, with a clean and savoury flavour, a subtle sweetness and just enough heat to keep things interesting.',
	},
	{
		image: 'https://i.guim.co.uk/img/media/27ba255736b9245a3fbbb4781316c5711ebeb70f/0_234_1080_646/master/1080.png?width=120&quality=45&auto=format&fit=max&dpr=2&s=72c5b8c2cae63d6a3efed4e1baa12d43',
		title: 'Mr Kimchi traditional kimchi',
		price: '£12.90',
		stars: '★★★★★',
		description:
			'This is delivered fresh, allowing you to ferment it in your own kitchen – a brilliant way to explore the simplicity and rewards of fermentation. I tried the traditional Korean recipe made with fish sauce and glutinous rice flour, though Mr Kimchi also has a vegan version. It delivers an authentic Korean experience, freshly made in the UK, allowing for a proper ferment that deepens flavour. Satisfyingly crunchy, with a vivid, red colour, and the generous amount of gochugaru brings a lively medium heat. Vibrant, garlicky and with a well-balanced, tangy acidity. Rice flour adds a mild natural sweetness that rounds things off beautifully.',
	},
	{
		image: 'https://i.guim.co.uk/img/media/29566595aa7eff21d99a2d832b6008d53c7b47b5/0_429_5000_2571/master/5000.jpg?width=120&quality=45&auto=format&fit=max&dpr=2&s=98e87bcc58e4efea92597eaeb6cfdd51',
		title: 'Jamie Ferments kimchi',
		price: '£8.50',
		stars: '★★★★★',
		description:
			'Bursting with life, quite literally. When I opened the jar, it fizzed and popped with activity, a sign of a raw, unpasteurised ferment at its peak. I tasted the vegan and traditional versions and found them equally delicious. The vegan version swaps fish sauce for a mix of soy sauce, sesame oil and sesame seeds, which brings a lovely, nutty depth. It has a vivid red hue, is glossy, crunchy and well-structured, with a bright, expressive flavour: clean lactic acidity, mellow umami, a medium heat and a gentle natural sweetness from the rice flour. A joyful, fizzy ferment with loads of character – one of the best on the shelf.',
	},
	{
		image: 'https://i.guim.co.uk/img/media/1bdb33229b3ffc19e36d9ccdf4d06a98b0758d51/0_891_2884_1576/master/2884.png?width=120&quality=45&auto=format&fit=max&dpr=2&s=8669674a9f7ba01825899102f4f137f1',
		title: 'Tickles’ Pickles fresh kimchi',
		price: '£6.50',
		stars: '★★★☆☆',
		description:
			'Bursting with life, quite literally. When I opened the jar, it fizzed and popped with activity, a sign of a raw, unpasteurised ferment at its peak. I tasted the vegan and traditional versions and found them equally delicious. The vegan version swaps fish sauce for a mix of soy sauce, sesame oil and sesame seeds, which brings a lovely, nutty depth. It has a vivid red hue, is glossy, crunchy and well-structured, with a bright, expressive flavour: clean lactic acidity, mellow umami, a medium heat and a gentle natural sweetness from the rice flour. A joyful, fizzy ferment with loads of character – one of the best on the shelf.',
	},
];

export const FilterCarouselComponent = () => {
	return <ProductCarousel products={productData} />;
};
