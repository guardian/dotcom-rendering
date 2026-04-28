import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { darkDecorator } from '../../.storybook/decorators/themeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { RecipeBlockElement } from '../types/content';
import { RecipeCardInline } from './RecipeCardInline';

const recipeFormat = {
	design: ArticleDesign.Recipe,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const mockRecipe: RecipeBlockElement = {
	_type: 'model.dotcomrendering.pageElements.RecipeBlockElement',
	elementId: 'recipe-element-1',
	id: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
	isAppReady: true,
	webPublicationDate: '2024-03-15T10:00:00Z',
	title: "Meera Sodha's spring onion pancakes",
	byline: ['Meera Sodha'],
	description:
		'Crisp and savoury, these spring onion pancakes are a perfect weekend brunch or a quick weeknight snack. Serve with the chilli oil for a serious kick.',
	bookCredit: 'East: 120 Easy and Delicious Vegetarian Recipes',
	difficultyLevel: 'easy',
	featuredImage: {
		url: 'https://media.guim.co.uk/a4a7c9d0d6a5b2e0f0c0d1e2f3a4b5c6d7e8f9a0/0_0_5000_3000/500.jpg',
		mediaId: 'a4a7c9d0d6a5b2e0f0c0d1e2f3a4b5c6d7e8f9a0',
		cropId: '0_0_5000_3000',
		caption: 'Spring onion pancakes with chilli oil',
	},
	timings: [
		{
			qualifier: 'prep',
			durationInMins: { min: 10, max: 10 },
			text: '10 mins',
		},
		{
			qualifier: 'cooking',
			durationInMins: { min: 20, max: 25 },
			text: '20–25 mins',
		},
		{
			qualifier: 'total',
			durationInMins: { min: 30, max: 35 },
			text: '30–35 mins',
		},
	],
	serves: [
		{ amount: { min: 4, max: 4 }, unit: 'pancakes', text: '4 pancakes' },
		{ amount: { min: 2, max: 4 }, unit: 'people', text: '2–4 people' },
	],
	cuisineIds: ['chinese'],
	mealTypeIds: ['breakfast', 'snack'],
	suitableForDietIds: ['vegan', 'dairy-free'],
	celebrationIds: ['chinese-new-year'],
	techniquesUsedIds: ['frying', 'folding'],
	utensilsAndApplianceIds: ['frying-pan', 'rolling-pin'],
	ingredients: [
		{
			recipeSection: 'For the pancakes',
			ingredientsList: [
				{
					ingredientId: 'i1',
					text: '250g plain flour, plus extra for dusting',
				},
				{ ingredientId: 'i2', text: '1 tsp salt' },
				{ ingredientId: 'i3', text: '175ml boiling water' },
				{ ingredientId: 'i4', text: '2 tbsp sesame oil' },
				{ ingredientId: 'i5', text: '6 spring onions, finely sliced' },
			],
		},
		{
			recipeSection: 'For the dipping sauce',
			ingredientsList: [
				{ ingredientId: 'i6', text: '3 tbsp soy sauce' },
				{ ingredientId: 'i7', text: '1 tbsp rice wine vinegar' },
				{ ingredientId: 'i8', text: '1 tsp chilli oil' },
				{ ingredientId: 'i9', text: '1 tsp sesame seeds, toasted' },
			],
		},
	],
	instructions: [
		{
			stepNumber: 1,
			description:
				'Mix the flour and salt in a large bowl. Pour in the boiling water and stir quickly with a fork until a shaggy dough forms. Once cool enough to handle, knead for 2 minutes until smooth.',
		},
		{
			stepNumber: 2,
			description:
				'Divide the dough into 4 balls. Roll each ball into a thin circle (about 22cm). Brush with sesame oil, scatter over spring onions, roll up tightly, then coil the log into a spiral. Press flat and roll out again to a 16cm circle.',
		},
		{
			stepNumber: 3,
			description:
				'Heat a dry frying pan over a medium-high heat. Cook each pancake for 2–3 minutes per side until golden and cooked through. Keep warm.',
		},
		{
			stepNumber: 4,
			description:
				'Mix together all the dipping sauce ingredients. Serve the pancakes hot, cut into wedges, with the sauce alongside.',
		},
	],
	commerceCtas: [
		{
			sponsorName: 'Ocado',
			territory: 'GB',
			url: 'https://www.ocado.com/webshop/recipe/Spring-Onion-Pancakes/123456',
		},
		{
			sponsorName: "Sainsbury's",
			territory: 'GB',
			url: 'https://www.sainsburys.co.uk/recipe/spring-onion-pancakes',
		},
	],
};

const meta = {
	title: 'Components/RecipeCardInline',
	component: RecipeCardInline,
	args: {
		pageId: 'food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes',
		recipeName: "Meera Sodha's spring onion pancakes",
		recipe: mockRecipe,
	},
	parameters: {
		chromatic: { viewports: [375, 740, 980] },
	},
} satisfies Meta<typeof RecipeCardInline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — recipe name + CTAs */
export const Default: Story = {};

/** Without a recipe object — falls back to recipeName */
export const NoRecipeData: Story = {
	args: { recipe: undefined },
};

/** With left-col card active — hides at from.wide */
export const WithLeftColCard: Story = {
	args: { shouldShowLeftColCard: true },
};

/** Dark mode */
export const DefaultDark: Story = {
	decorators: [darkDecorator([recipeFormat])],
	args: { darkModeAvailable: true },
};
