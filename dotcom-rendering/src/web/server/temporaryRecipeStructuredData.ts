// This is for an experiment testing SEO performance on recipes before
// and after structured data is added. If this file is still here on 01/08/22
// follow up with Ophan on why it hasn't been removed. Delete if no good answer.

type RecipeSchemaObject = {
	[url: string]: string;
};

export const recipeSchema: RecipeSchemaObject = {
	'https://www.theguardian.com/lifeandstyle/wordofmouth/2013/nov/07/how-to-make-perfect-apple-pie': `{
		"@context":"https://schema.org/",
		"@type":"Recipe",
		"name":"The perfect hamburger",
		"image":[
		   "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2010/8/3/1280851276363/Perfect-hamburger-006.jpg?width=700&quality=45&auto=format&fit=max&dpr=2&s=32ffe62eaad00a538d50aedc097237d7"
		],
		"author":{
		   "@type":"Person",
		   "name":"Felicity Cloake"
		},
		"datePublished":"2010-08-05",
		"description":"Burgers may be fast food, but they're also a craft.",
		"prepTime":"PT80M",
		"cookTime":"PT100M",
		"totalTime":"PT180M",
		"keywords":"burgers, barbecue",
		"recipeYield":"6",
		"recipeCategory":"Main",
		"recipeCuisine":"American",
		"nutrition":{
		   "@type":"NutritionInformation",
		   "calories":"1000 calories"
		},
		"recipeIngredient":[
		   "1 tbsp oil or butter",
		   "1 large onion, finely chopped",
		   "1kg roughly minced chuck steak (or any non-lean mince)",
		   "100ml stout",
		   "2 tbsp brown breadcrumbs",
		   "2 tsp chopped herbs (parsley or thyme work well)",
		   "1 tsp salt",
		   "Black pepper",
		   "Garnishes, sauces and rolls, as desired"
		],
		"recipeInstructions":[
		   {
			  "@type":"HowToStep",
			  "name":"Brown the onion",
			  "text":"Heat the oil in a frying pan over a low heat, and cook the onion until soft and slightly browned. Leave to cool."
		   },
		   {
			  "@type":"HowToStep",
			  "name":"Prepare the meat for cooking",
			  "text":"Spread the beef out and sprinkle over the onion. Add the stout, breadcrumbs, herbs and seasoning and mix together with a fork, being careful not to overwork it."
		   },
		   {
			  "@type":"HowToStep",
			  "name":"Divide into burgers",
			  "text":"Divide the meat into 12 flattish burgers, putting a dimple in the centre of each. Cover and refrigerate for an hour."
		   },
		   {
			  "@type":"HowToStep",
			  "name":"Cook the burgers!",
			  "text":"Cook the burgers on a medium to hot barbecue or griddle pan: leave them undisturbed for the first 3 minutes so they build up a good seal on the bottom, then carefully turn them over, adding a slice of cheese on top if desired. Cook for a further 4 minutes for rare, and 7 for well done, and allow to rest for a few minutes before serving. (You can toast buns, cut-side down, on the barbecue at this point.)"
		   }
		]
	 }`,
};
