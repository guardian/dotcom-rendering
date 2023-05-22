import { css } from '@emotion/react';
import {
	body,
	headline,
	palette,
	textSans,
	titlepiece,
} from '@guardian/source-foundations';
import {
	Button,
	SvgAudio,
	SvgCheckmark,
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source-react-components';
import { useState } from 'react';

const SvgFood = () => (
	<svg
		width="26"
		height="28"
		viewBox="0 0 26 28"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M25.6101 10.125C26.13 9.62511 26.13 8.8751 25.6101 8.37495C25.0901 7.87502 24.3101 7.87502 23.79 8.37495L16.38 15.5H0C0 22.3749 5.85 28 12.9998 28C20.1496 28 25.9996 22.3749 25.9996 15.5H20.0198L25.6101 10.125Z"
			fill="#121212"
		/>
		<rect
			x="12.7515"
			y="5.80927"
			width="2.76982"
			height="2.76982"
			transform="rotate(110.102 12.7515 5.80927)"
			fill="#121212"
		/>
		<path
			d="M10.195 13.9256L6.92353 11.2953L10.8372 9.77725L10.195 13.9256Z"
			fill="#121212"
		/>
		<circle
			cx="14.3354"
			cy="10.0681"
			r="1.73114"
			transform="rotate(137.205 14.3354 10.0681)"
			fill="#121212"
		/>
		<rect
			x="5"
			y="8.75322"
			width="1.79371"
			height="1.79371"
			transform="rotate(-77.8029 5 8.75322)"
			fill="#121212"
		/>
		<path
			d="M13.3713 0.763414L15.704 2.15926L13.3288 3.48153L13.3713 0.763414Z"
			fill="#121212"
		/>
		<circle
			cx="7.57759"
			cy="2.57758"
			r="1.12107"
			transform="rotate(-50.6999 7.57759 2.57758)"
			fill="#121212"
		/>
	</svg>
);

const recipeData = [
	{
		recipeId: 1,
		occasion: [],
		image: 'https://i.guim.co.uk/img/media/3590a6b477839ff14c45489e18a3712b3e13e3aa/0_708_3765_3765/master/3765.jpg?width=620&quality=45&dpr=2&s=none',
		path: '/lifeandstyle/2017/oct/15/ofm-awards-2017-best-new-cookbook-fresh-india-meera-sodha',
		ingredients_lists: [
			{
				title: '',
				ingredients: [
					{
						item: 'coriander seeds',
						unit: 'tsp',
						comment: '',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
						text: 'coriander seeds 1 tsp',
					},
					{
						item: 'cumin seeds',
						unit: 'tsp',
						comment: '',
						quantity: {
							absolute: '2',
							from: '',
							to: '',
						},
						text: 'cumin seeds 2 tsp',
					},
					{
						item: 'rapeseed oil',
						unit: 'tbsp',
						comment: '',
						quantity: {
							absolute: '3',
							from: '',
							to: '',
						},
						text: 'rapeseed oil 3 tbsp',
					},
					{
						item: 'black mustard seeds',
						unit: 'tsp',
						comment: '',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
						text: 'black mustard seeds 1 tsp',
					},
					{
						item: 'brown onion',
						unit: '',
						comment: 'large halved and thinly sliced',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
						text: 'brown onion 1 large, halved and thinly sliced',
					},
					{
						item: 'baby new potatoes',
						unit: 'g',
						comment: 'quartered',
						quantity: {
							absolute: '800',
							from: '',
							to: '',
						},
						text: 'baby new potatoes 800g, quartered',
					},
					{
						item: 'savoy cabbage',
						unit: 'g',
						comment: 'finely shredded',
						quantity: {
							absolute: '200',
							from: '',
							to: '',
						},
						text: 'savoy cabbage 200g, finely shredded',
					},
					{
						item: 'black kale',
						unit: 'g',
						comment: 'or cavalo nero   finely shredded',
						quantity: {
							absolute: '200',
							from: '',
							to: '',
						},
						text: 'black kale or cavalo nero 200g, finely shredded',
					},
					{
						item: 'salt',
						unit: 'tsp',
						comment: '',
						quantity: {
							absolute: '1.25',
							from: '',
							to: '',
						},
						text: 'salt 1¼ tsp',
					},
					{
						item: 'chilli powder',
						unit: 'tsp',
						comment: '',
						quantity: {
							absolute: '0.5',
							from: '',
							to: '',
						},
						text: 'chilli powder ½ tsp',
					},
					{
						item: 'ground turmeric',
						unit: 'tsp',
						comment: '',
						quantity: {
							absolute: '0.75',
							from: '',
							to: '',
						},
						text: 'ground turmeric ¾ tsp',
					},
					{
						item: 'Flaky salt',
						unit: '',
						comment: '',
						text: 'Flaky salt',
						quantity: {
							absolute: '',
							from: '',
							to: '',
						},
					},
				],
			},
		],
		meal_type: [],
		preptime: [10],
		cookingtime: [30],
		serves: 'Serves 4',
		credit: "Holly O'Neill, recipes by Meera Sodha",
		cuisines: ['indian', 'british', 'japanese'],
		ingredient_tags: [],
		steps: [
			'Lightly grind the coriander and cumin seeds with a pestle and mortar.',
			'Put the oil into a large lidded frying pan over a medium heat and, when hot, add the curry leaves and mustard seeds.',
			'When they crackle, add the onion.',
			'Cook for around 10 minutes, until golden and sweet, stirring occasionally.',
			'Add the crushed coriander and cumin, followed by the potatoes.',
			'Cook for 10 minutes, turning every now and then until crispy.',
			'Add a couple of tablespoons of water, cover with the lid and cook for a further 5 minutes, until the potatoes are tender and no longer resist the point of a knife.',
			'Finally, add the shredded cabbage and black kale to the pan with a couple of tablespoons of water and stir-fry for 3 minutes.',
			'Add the salt, chilli and turmeric, mix well, cover with the lid, reduce the heat to low and cook for another 4 minutes, or until the cabbage and black kale have wilted.',
			'Serve with a fiery pickle, hot chapattis and yogurt, or with dal and rice.',
		],
		recipes_title: 'Savoy cabbage, black kale and potato subji ',
		blurb: "In Gujarat, cabbages and potatoes are near deities. In Lincolnshire, where they are the main crops, the same is true. Discover the vibrant and nutritious flavors of our Savoy Cabbage, Black Kale, and Potato Subji – Savoy Aloo Gobhi recipe. This enticing vegetarian dish takes the traditional Indian subji to new heights by combining the delicate crunch of Savoy cabbage, the earthy bitterness of black kale, and the comforting creaminess of potatoes. It's a symphony of textures and tastes that will leave you craving more. In this recipe, the Savoy cabbage and black kale are sautéed to perfection, retaining their vibrant colors and distinct flavors. The addition of potatoes adds a hearty element, making it a satisfying main course or a delightful side dish. The subji is further enhanced by a blend of aromatic spices, including cumin, coriander, and turmeric, infusing each bite with a delightful warmth and complexity. Whether you're a vegetarian or simply looking to add more plant-based goodness to your meals, our Savoy Cabbage, Black Kale, and Potato Subji – Savoy Aloo Gobhi recipe is a delicious and nutritious choice that will captivate your taste buds and nourish your body.",
		// blurb: "'Lorem Ipsum is simply dummy text",
	},
	{
		recipeId: 2,
		occasion: [],
		image: 'https://i.guim.co.uk/img/media/772df096f728edc2669781391b324a00ff015c5a/107_1179_3512_3512/master/3512.jpg?width=620&quality=85&dpr=1&s=none',
		path: '/food/2020/apr/11/alison-roman-recipes-easy-feast-for-easter',
		ingredients_lists: [
			{
				title: '',
				ingredients: [
					{
						item: 'whole chicken',
						unit: 'kg',
						comment: 'or 125  bonein skinon chicken thighs or legs',
						text: '1.8kg whole chicken, or 1.25kg bone-in, skin-on chicken thighs or legs',
						quantity: {
							absolute: '18',
							from: '',
							to: '',
						},
					},
					{
						item: 'black pepper',
						unit: '',
						comment: 'Salt and',
						text: 'Salt and black pepper',
						quantity: {
							absolute: '',
							from: '',
							to: '',
						},
					},
					{
						item: 'olive oil',
						unit: 'tbsp',
						comment: '',
						text: '4 tbsp olive oil',
						quantity: {
							absolute: '4',
							from: '',
							to: '',
						},
					},
					{
						item: 'lemon',
						unit: '',
						comment:
							'cut into thick slices crossways seeds removed',
						text: '1 lemon, cut into thick slices crossways, seeds removed',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'shallots',
						unit: '',
						comment: 'peeled and halved lengthways',
						text: '2 shallots, peeled and halved lengthways',
						quantity: {
							absolute: '2',
							from: '',
							to: '',
						},
					},
					{
						item: 'medjool dates',
						unit: '',
						comment: 'pitted',
						text: '4–6 medjool dates, pitted',
						quantity: {
							absolute: '',
							from: '4',
							to: '6',
						},
					},
					{
						item: 'thyme',
						unit: 'sprigs',
						comment: 'or oregano  plus extra for serving',
						text: '4 thyme or oregano sprigs, plus extra for serving',
						quantity: {
							absolute: '4',
							from: '',
							to: '',
						},
					},
					{
						item: 'chilli flakes',
						unit: 'tsp',
						comment: '2  ground urfa chilli or',
						text: '2 tsp ground urfa chilli or 1 tsp chilli flakes',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'Flaky salt',
						unit: '',
						comment: '',
						text: 'Flaky salt',
						quantity: {
							absolute: '',
							from: '',
							to: '',
						},
					},
				],
			},
		],
		meal_type: null,
		time: ['Prep 15 min', 'Cook 40 min'],
		preptime: [15],
		cookingtime: [40],
		serves: 'Serves 4–6',
		credit: 'Alison Roman',
		cuisines: null,
		ingredient_tags: null,
		steps: [
			'Heat the oven to 210C (190C fan)/425F/gas 7, and season the chicken all over.',
			'Put two tablespoons of oil in a large casserole dish over a medium–high heat.',
			'Add the chicken to the pot breast side up and press lightly, so the skin comes into even contact with the bottom of the pot.',
			'Brown the legs and render the excess fat.',
			'(If using thighs or legs, sear them skin side down).',
			'Cook until the chicken is nice and browned, about five to eight minutes.',
			'Add the lemon, making sure the slices come into contact with the bottom of the pot, and the shallots.',
			'Cook until lightly caramelised – about two minutes.',
			'Add the dates, herbs and 250ml water.',
			'Sprinkle the chicken with the chilli and put the lid on.',
			'Transfer to the oven and roast until the dates are plump, the lemon slices are jammy, and the chicken is almost but not totally cooked through, 20–25 minutes.',
			'Remove the lid and drizzle the chicken with the remaining two tablespoons of olive oil.',
			'Return to the oven, and roast until the top of the chicken is a glistening golden brown and the liquid is reduced by a half – another 20–30 minutes, depending on whether you’re using parts or a whole bird.',
			'Rest for 10 minutes before carving.',
			'Serve alongside the shallots, lemon slices and dates, with some more herbs and flaky salt sprinkled over.',
		],
		diet_tags: [],
		blurb: 'Entertaining is off the menu this Easter, but you can still make a special meal in isolation. \nIndulge in the flavors of a delightful Easter feast with our One-Pot Chicken with Dates and Caramelized Lemon recipe. This sensational dish brings together the succulent tenderness of chicken, the natural sweetness of dates, and the tangy aroma of caramelized lemons, creating a symphony of flavors that will leave your taste buds singing. In this easy-to-make recipe, tender chicken pieces are nestled into a fragrant blend of spices, including cumin, cinnamon, and paprika. As the chicken cooks, it releases its juices, infusing the dish with its rich, savory essence. Then, enter the dates—a generous handful of these luscious fruits adds a delightful touch of sweetness that perfectly balances the dish. But the real star of the show is the caramelized lemon. Sliced lemons are gently sautéed until they turn golden and release their natural sugars, creating a heavenly caramelized coating that adds a burst of citrusy goodness to every bite. The caramelized lemon not only enhances the flavor profile but also adds a visually stunning element to the dish, making it an eye-catching centerpiece for your Easter table. The magic of this recipe lies in its simplicity—all the ingredients are cooked together in a single pot, allowing the flavors to meld and develop into a harmonious combination. The result is a dish that is both comforting and elegant, perfect for celebrating the joy and togetherness of Easter. Whether you are hosting a festive family gathering or enjoying an intimate meal with loved ones, our One-Pot Chicken with Dates and Caramelized Lemon recipe is guaranteed to elevate your Easter occasion to new culinary heights. Prepare to be dazzled by the tantalizing flavors and aromas that will make this dish a holiday favorite for years to come.',
		recipes_title: 'One-pot chicken with dates and caramelised lemon',
	},
	{
		recipeId: 3,
		occasion: [],
		image: 'https://i.guim.co.uk/img/media/05ad6d45cfd14de02421d976dca4472524dfc6db/0_0_4441_3592/master/4441.jpg?width=1300&quality=85&dpr=1&s=none',
		path: '/lifeandstyle/2015/oct/23/italian-venison-stew-recipe-polenta-beetroot',
		ingredients_lists: [
			{
				title: '',
				ingredients: [
					{
						item: 'dried porcini mushrooms',
						unit: 'g',
						comment: '',
						text: '25g dried porcini mushrooms',
						quantity: {
							absolute: '25',
							from: '',
							to: '',
						},
					},
					{
						item: 'olive oil',
						unit: 'tbsp',
						comment: '',
						text: '1 tbsp olive oil',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'pancetta',
						unit: 'g',
						comment: 'or smoked bacon lardons',
						text: '100g pancetta (or smoked bacon) lardons',
						quantity: {
							absolute: '100',
							from: '',
							to: '',
						},
					},
					{
						item: 'venison shoulder',
						unit: 'kg',
						comment: 'cut into 23 cm dice',
						text: '1kg venison shoulder, cut into 2-3cm dice',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'flour',
						unit: 'tbsp',
						comment: '',
						text: '1-2 tbsp flour',
						quantity: {
							absolute: '',
							from: '1',
							to: '2',
						},
					},
					{
						item: 'onion',
						unit: '',
						comment: 'finely chopped',
						text: '1 onion, finely chopped',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'celery',
						unit: 'sticks',
						comment: 'finely chopped',
						text: '2 celery sticks, finely chopped',
						quantity: {
							absolute: '2',
							from: '',
							to: '',
						},
					},
					{
						item: 'large carrot',
						unit: '',
						comment: 'finely chopped',
						text: '1 large carrot, finely chopped',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'thyme',
						unit: 'sprig',
						comment: 'of',
						text: 'A sprig of thyme',
						quantity: {
							absolute: '1.0',
							from: '',
							to: '',
						},
					},
					{
						item: 'bay leaf',
						unit: '',
						comment: '',
						text: '1 bay leaf',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'ground cloves',
						unit: 'pinch',
						comment: 'of',
						text: 'A pinch of ground cloves',
						quantity: {
							absolute: '1.0',
							from: '',
							to: '',
						},
					},
					{
						item: 'ground nutmeg',
						unit: 'pinch',
						comment: 'of',
						text: 'A pinch of ground nutmeg',
						quantity: {
							absolute: '1.0',
							from: '',
							to: '',
						},
					},
					{
						item: 'tomato puree',
						unit: 'tbsp',
						comment: '',
						text: '1 tbsp tomato puree',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'red wine',
						unit: 'ml',
						comment: '',
						text: '200ml red wine',
						quantity: {
							absolute: '200',
							from: '',
							to: '',
						},
					},
					{
						item: 'chicken',
						unit: 'ml',
						comment: 'or beef stock',
						text: '200ml chicken or beef stock',
						quantity: {
							absolute: '200',
							from: '',
							to: '',
						},
					},
					{
						item: 'butter',
						unit: 'tbsp',
						comment: '',
						text: '1 tbsp butter',
						quantity: {
							absolute: '1',
							from: '',
							to: '',
						},
					},
					{
						item: 'mushrooms',
						unit: 'g',
						comment: 'roughly chopped',
						text: '400g mushrooms, roughly chopped',
						quantity: {
							absolute: '400',
							from: '',
							to: '',
						},
					},
					{
						item: 'parsley',
						unit: 'tbsp',
						comment: 'chopped',
						text: '2 tbsp parsley, chopped',
						quantity: {
							absolute: '2',
							from: '',
							to: '',
						},
					},
					{
						item: 'black pepper',
						unit: '',
						comment: 'Salt and',
						text: 'Salt and black pepper',
						quantity: {
							absolute: '',
							from: '',
							to: '',
						},
					},
				],
			},
		],
		meal_type: [],
		time: [],
		preptime: [60],
		cookingtime: [60],
		serves: 'Serves 6',
		credit: 'Henry Dimbleby and Jane Baxter',
		cuisines: ['italian', 'french', 'british'],
		ingredient_tags: [],
		steps: [
			'The first is the traditional Italian method, which is to pour the soft polenta into a mound on a clean, unvarnished wooden table, and then make a depression in the middle of the mound into which you pour the stew.',
			' Cover the dried mushrooms with 300ml boiling.',
			'Leave to soak for at least 20 minutes.',
			'Drain, keeping the soaking liquor, and roughly chop the mushrooms.',
			' Heat the oil in a large pan and fry the pancetta lardons until they are lightly coloured and some of the fat has been released.',
			'Remove from the pan with a slotted spoon and set to one side in a bowl.',
			' Dry the venison chunks well and toss in the flour with lots of salt and pepper added.',
			'Brown the venison in batches in the pan; chucking it all in the pan will only make the meat stew and it will be harder to brown.',
			'Add the browned meat to the pancetta on the side.',
			' Tip the vegetables into the pan with the chopped porcini, herbs and spices.',
			'Cook over a low heat for 10-15 minutes, adding a little extra oil if necessary.',
			'Stir in the tomato puree and add the red wine – you can also add a slug of gin at this stage – turning up the heat and giving the pan a good stir to release any bits stuck to the bottom.',
			' Return the venison and pancetta to the pan.',
			'Add the chicken stock and porcini soaking liquor and bring up to a simmer.',
			'Cover, turn the heat down, and cook gently for about an hour and a half, or until the venison is tender.',
			'Alternatively, you can transfer the venison into an ovenproof dish and cook it, covered, in a low oven –around 120C/235F/gas mark ¼-½.',
			' Heat the butter in a large frying pan and cook the chopped mushrooms until they start to wilt.',
			'Season well and cook for a few minutes before tipping the pan contents into the stew.',
			'Taste an adjust the seasoning if necessary.',
			'Serve sprinkled with chopped parsley.',
		],
		diet_tags: [],
		recipes_title: 'Venison stew',
		blurb: 'We are now properly into comfort food season, and this feast is a classic of the genre. The creamy blandness of soft polenta, with soft, sweet cavolo nero folded into it, combined with the deep, ferrous richness of the venison stew, will keep you warm you through the bleakest winter night. There are two ways to serve this dish. The first is the traditional Italian method, which is to pour the soft polenta into a mound on a clean, unvarnished wooden table, and then make a depression in the middle of the mound into which you pour the stew. Guests either serve themselves from this meat volcano or, even more traditionally, eat directly from it with forks. I love the generosity and theatre of this approach, it does have its drawbacks. It should, on no account, be attempted if (as in my case) there are likely to be tiny Lego parts or glittery beads secreted in the cracks of your kitchen table. In the past, I have got round this problem by pouring it instead on to a large wooden chopping board or a sheet of baking parchment. But you still have to get both the polenta and the stew to exactly the right consistency to avoid a messy landslide off the table and on to the floor. If, like my wife, you are unamused by the prospect of scraping spatters of hardened polenta off far-flung corners of the kitchen for years to come, it is fine to serve it more conventionally, in a bowl, as shown in this photograph. But it won’t be half as much fun.',
	},
];

export const RecipeRender = (props: { recipeId: number }) => {
	const [showingOverlay, setShowingOverlay] = useState(false);
	const [showingMethod, setShowingMethod] = useState(false);
	const [stepDone, setStepDone] = useState(-1);

	const recipeInfo = recipeData.find((x) => x.recipeId === props.recipeId);

	function markStepDone(index: number) {
		setStepDone(index);
	}

	function renderSteps() {
		return recipeInfo?.steps.map((step, index) => (
			// eslint-disable-next-line react/jsx-key, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<div
				onClick={() => markStepDone(index)}
				css={css`
					background: ${stepDone + 1 === index
						? '#DED9D9'
						: '#f6f6f6'};
					border-radius: 12px;
					margin: 1rem 1rem 0 1rem;
					padding: 8px;
					${body.small()};
					display: flex;
					opacity: ${stepDone < index ? '1' : '0.9'};
					font-weight: ${stepDone + 1 === index ? '700' : '400'};
				`}
			>
				<div>
					<span
						css={css`
							background: #dcdcdc;
							border-radius: 50%;
							width: 24px;
							height: 24px;
							display: flex;
							justify-content: center;
						`}
					>
						{stepDone < index ? (
							<span>{index + 1}</span>
						) : (
							<SvgCheckmark />
						)}
					</span>
				</div>
				<span
					css={css`
						padding-left: 8px;
						width: 285px;
					`}
				>
					{step}
				</span>
				<span>
					{stepDone + 1 === index ? <SvgAudio size="small" /> : null}
				</span>
			</div>
		));
	}

	function renderIngredients() {
		return recipeInfo?.ingredients_lists
			.flatMap((i) => i.ingredients)
			.map((item, index) => (
				// eslint-disable-next-line react/jsx-key
				<div
					css={css`
						background: #f6f6f6;
						border-radius: 12px;
						padding: 1rem;
						margin: 1rem 1rem 0 1rem;
						${textSans.medium()};
						opacity: 0.9;
					`}
				>
					{item.quantity.absolute} {item.unit} {item.item}
				</div>
			));
	}

	function showMethod() {
		setShowingMethod(!showingMethod);
	}

	function toggleOverlay() {
		console.log('checking overlay');

		window.scrollTo(0, 0);

		setShowingOverlay(!showingOverlay);
	}

	const Overlay = () => {
		return (
			<>
				<div
					css={css`
						background-image: url(${recipeInfo?.image});
						background-size: cover;
						/* background-size: 280px 739px; */
						background-repeat: no-repeat;
						height: 100vh;
					`}
				>
					<div
						css={css`
							display: flex;
							padding-right: 1rem;
							padding-left: 0.5rem;
							justify-content: space-between;
							background-color: #c1d8fc;
							padding: 1rem;
						`}
					>
						<button
							type="button"
							onClick={toggleOverlay}
							css={css`
								border: 0;
								background: rgba(0, 0, 0, 0);
							`}
						>
							<SvgChevronDownSingle size="small" />
						</button>
						<div
							css={css`
								font-weight: 700;
								font-size: large;
								${headline.medium()};
							`}
						>
							{showingMethod ? (
								<span>Method</span>
							) : (
								<span>Ingredients</span>
							)}
						</div>
						<Button onClick={showMethod}>
							{showingMethod ? (
								<span>Ingredients</span>
							) : (
								<span>Method</span>
							)}
						</Button>
					</div>

					<div>
						{showingMethod ? (
							<div>{renderSteps()}</div>
						) : (
							<div>{renderIngredients()}</div>
						)}
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			{showingOverlay ? (
				<Overlay />
			) : (
				<div
					css={css`
						height: 100%;
					`}
				>
					<div id="banner">
						<div
							css={css`
								${titlepiece.small()};
								font-weight: 700;
								background: ${palette.brandAlt[400]};
								padding-left: 1rem;
								padding-top: 2rem;
								display: flex;
								justify-content: space-between;
							`}
						>
							<span>Food</span>{' '}
							<span
								css={css`
									padding-right: 15px;
								`}
							>
								<SvgFood />
							</span>
						</div>
					</div>
					{/* <div
						css={css`
							display: flex;
							justify-content: space-between;
							padding: 1rem;
						`}
					>
						<SvgChevronLeftSingle size="medium" />
						<SvgBookMark size="medium" />
					</div> */}
					<div>
						<h2
							css={css`
								${headline.small({})};
								font-weight: 700;
								padding-left: 1rem;
								margin-top: 1rem;
							`}
						>
							{recipeInfo?.recipes_title}
						</h2>
						<br />
						<div
							css={css`
								display: flex;
								justify-content: center;
							`}
						>
							<img
								width="342px"
								height="228"
								src={recipeInfo?.image}
								alt="test"
								css={css`
									border-radius: 16px;
								`}
							/>
						</div>
					</div>
					<div
						css={css`
							background-color: #ededed;
							border-radius: 5px;
							margin: 1rem;
							padding: 1rem;
							display: flex;
							justify-content: space-between;
						`}
					>
						<div
							css={css`
								display: flex;
								flex-direction: column;
								justify-content: center;
							`}
						>
							<span
								css={css`
									${headline.xxsmall()};
								`}
							>
								{recipeInfo?.serves}
							</span>
							<span
								css={css`
									${textSans.medium()};
									text-align: center;
								`}
							></span>
						</div>
						<div
							css={css`
								display: flex;
								flex-direction: column;
							`}
						>
							<span
								css={css`
									${headline.xxsmall()};
								`}
							>
								{recipeInfo?.preptime} mins
							</span>
							<span
								css={css`
									${textSans.medium()};
									text-align: center;
								`}
							>
								Prep
							</span>
						</div>
						<div
							css={css`
								display: flex;
								flex-direction: column;
							`}
						>
							<span
								css={css`
									${headline.xxsmall()};
								`}
							>
								{recipeInfo?.cookingtime} mins
							</span>
							<span
								css={css`
									${textSans.medium()};
									text-align: center;
								`}
							>
								Cook
							</span>
						</div>
					</div>
					<div
						css={css`
							${textSans.medium()};
							padding: 1rem;
							margin: 1 rem;
						`}
						id="blurb"
					>
						<p>{recipeInfo?.blurb}</p>
					</div>

					<button
						type="button"
						onClick={toggleOverlay}
						css={css`
							margin-left: 1rem;
							/* margin-right: 1rem; */
							padding-top: 0.5rem;
							padding-bottom: 0.5rem;
							width: 90%;
							justify-content: space-around;
							display: flex;
							font-weight: 900;
							border: 0;
							border-radius: 20px 20px 0px 0px;
							${headline.xxxsmall()};
							background-color: #c1d8fc;
							position: sticky;
							bottom: 0px;
						`}
					>
						<span>Ingredients</span>{' '}
						<span>
							<SvgChevronUpSingle size="xsmall" />
						</span>
						<span>Method</span>
					</button>
				</div>
			)}
		</>
	);
};
