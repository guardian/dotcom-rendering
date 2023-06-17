// This is for an experiment testing SEO performance on recipes before and
// after structured data is added. If this file is still here on 01/08/22 follow
// up with Ophan on why it hasn't been removed and delete if no good answer.

type RecipeSchemaObject = {
	[url: string]: string;
};

export const recipeSchema: RecipeSchemaObject = {
	'https://www.theguardian.com/lifeandstyle/wordofmouth/2010/aug/05/how-to-make-perfect-hamburger': `{
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
	'https://www.theguardian.com/food/2021/nov/24/how-to-make-shortbread-recipe-felicity-cloake-masterclass': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "How to make shortbread",
		"image": [
		  "https://i.guim.co.uk/img/media/e105cc86929c1d1b12318f6a1dabc87222c9e39e/442_1389_4718_4765/master/4718.jpg?width=1300&quality=45&fit=max&dpr=2&s=060c453f91405de2df57fb87ba8f4ade"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2021-11-24",
		"description": "Christmas shortbread as made by our resident perfectionist, with a few choices of festive flavourings.",
		"prepTime": "PT35M",
		"cookTime": "PT60M",
		"totalTime": "PT95M",
		"keywords": "shortbread, baking, Christmas",
		"recipeYield": "24",
		"recipeCategory": "Biscuit",
		"recipeCuisine": "Scottish",
		"recipeIngredient": [
		  "230g unsalted butter",
		  "110g caster sugar",
		  "1 good pinch of salt",
		  "260g plain flour",
		  "80g ground rice",
		  "Demerara sugar"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Beat the butter, then add sugar and salt",
			"text": "Put the butter in a large bowl (or the bowl of a food processor), beat until very soft, then beat in the sugar and salt. I like to use golden caster sugar for flavour, but white or granulated work fine, too. (Salt, for me, is mandatory, just as in porridge, but they’re your biscuits, so leave it out if you prefer.)",
			"image": "https://i.guim.co.uk/img/media/1b4d61478f3f557ba01fd713e0d7ec25e12aa79a/126_0_6524_6525/master/6524.jpg?width=620&quality=45&fit=max&dpr=2&s=d8d8509079c45c4ecfa888324c30eed6"
		  },
		  {
			"@type": "HowToStep",
			"name": "Mix in the dry ingredients",
			"text": "Sift the flour and ground rice into the butter, then mix to a smooth dough. Ground rice, which is coarser than rice flour, gives these biscuits their characteristic grittiness; it’s usually found alongside semolina in the supermarkets, or among the speciality Asian ingredients. You can substitute coarse cornmeal or, for a smoother texture, just make up the weight with extra flour instead.",
			"image": "https://i.guim.co.uk/img/media/3961f936c67c55b2e2c01d707c688a1ef012a64d/144_0_6910_6909/master/6910.jpg?width=620&quality=45&fit=max&dpr=2&s=6239367e51f0314908dd93cb8da29fba"
		  },
		  {
			"@type": "HowToStep",
			"name": "Make large rounds or little biscuits",
			"text": "If you’d like to make traditional shortbread rounds, line two 15cm cake or tart tins with baking paper. Divide the dough into two equal pieces, roll into balls and put one in each tin. Use your hands to pat it down until it covers the base of the tin in an even layer. To make individual biscuits, on a lightly floured surface, roll out or pat the dough until it’s about 1cm thick, then cut it into your desired shapes. Arrange these, well spaced out, on two lined baking trays. Re-roll any scraps and repeat until all the dough is used up.",
			"image": "https://i.guim.co.uk/img/media/16b59f738b4573833a4957ffb13819e181325a94/82_0_5722_5718/master/5722.jpg?width=620&quality=45&fit=max&dpr=2&s=0772283d61caabef4863f6cfe70abf64"
		  },
		  {
			"@type": "HowToStep",
			"name": "Chill to firm up",
			"text": "Put the tins or baking trays in the fridge, cover and chill for 15-20 minutes, until the dough is firm: this will stop the biscuits spreading too much in the oven (you can also chill them overnight, if you want to get ahead). When you’re ready to bake, heat the oven to 170C (150C fan)/325F/gas 3.",
			"image": "https://i.guim.co.uk/img/media/0815b83b527ec0f48e30dd208d1011e6afdf4469/0_274_6996_6991/master/6996.jpg?width=620&quality=45&fit=max&dpr=2&s=90514e096b2dd8ba0f31c0a19255667e"
		  },
		  {
			"@type": "HowToStep",
			"name": "Bake, sprinkle with sugar and leave to cool",
			"text": "Bake the shortbread rounds for an hour or the individual biscuits for about 30 minutes, until cooked through but not browned. Leaving them in the tin, cut the rounds into slices while they’re still warm. Sprinkle with demerara sugar (unless you’re going to ice your shortbread) and leave to cool completely.",
			"image": "https://i.guim.co.uk/img/media/09a29aa0ba7e7d952e670f84dcf3b80d9a17a939/472_0_5243_5244/master/5243.jpg?width=620&quality=45&fit=max&dpr=2&s=6cbb060b98fe7099789d2711dbaf454b"
		  },
		  {
			"@type": "HowToStep",
			"name": "Alternative flavourings",
			"text": "Try adding one or several of the following to your dough in step 3: 75g chocolate chips; the grated zest of two lemons or one large orange; half a teaspoon of ground cinnamon, a pinch of cloves and a quarter-teaspoon each of ground nutmeg and ground ginger; three-quarters of a teaspoon of ground ginger and 75g finely chopped crystallised ginger; 50g dried fruit and 25g candied peel.",
			"image": "https://i.guim.co.uk/img/media/f1756f85e1438df2cb4bdeeead64678730fb7f8f/0_392_5161_5157/master/5161.jpg?width=620&quality=45&fit=max&dpr=2&s=b78c19859066f643785a9ca21d162c77"
		  },
		  {
			"@type": "HowToStep",
			"name": "Optional finishing touches",
			"text": "I love shortbread plain, but you might like to half-dip the biscuits in 75g melted chocolate (this gives a neater finish than dipping the whole things). Alternatively, ice them with 225g sifted icing sugar mixed with just enough warm water to give a thick, but runny consistency, perhaps flavoured with lemon juice and zest, or vanilla essence or flower water."
		  }
		]
	  }`,
	'https://www.theguardian.com/lifeandstyle/wordofmouth/2012/aug/30/how-to-cook-perfect-banana-bread': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "The perfect banana bread",
		"image": [
		  "https://i.guim.co.uk/img/media/b1c9aacc8c5946835d481bc0343333c0f4c0db59/0_433_1067_1067/master/1067.jpg?width=620&quality=85&fit=max&s=61ea774ed60c182913dc2d1dd2b46da9"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2012-08-30",
		"description": "Banana bread is utterly delicious, the natural sweetness of the fruit lending itself perfectly to baking – and, while it may not be exactly a health food, it is at least better than a fried banana and peanut butter sandwich...",
		"prepTime": "PT15M",
		"cookTime": "PT60M",
		"totalTime": "PT75M",
		"keywords": "banana, banana bread, baking",
		"recipeYield": "1 loaf",
		"recipeCategory": "Baking",
		"recipeCuisine": "Bread",
		"recipeIngredient": [
		  "350g ripe bananas (peeled weight)",
		  "180g plain flour, plus extra for the tin",
		  "2½ tsp baking powder",
		  "1 tsp salt",
		  "160g soft, light brown sugar",
		  "2 eggs, beaten",
		  "4 tbsp melted butter, plus extra to grease, slightly cooled",
		  "50g walnuts, roughly chopped"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Mash the bananas",
			"text": "Preheat the oven to 170C. Put two-thirds of the peeled banana chunks into a bowl and mash until smooth. Roughly mash the remainder and stir in gently."
		  },
		  {
			"@type": "HowToStep",
			"name": "Prepare baking tin",
			"text": "Sift the flour, baking powder and salt into a bowl, and grease and lightly flour a baking tin about 21x9x7cm."
		  },
		  {
			"@type": "HowToStep",
			"name": "Mix the dough",
			"text": "Put the sugar, eggs and melted butter in a large bowl and use an electric mixer to whisk them until pale and slightly increased in volume. Fold in the bananas and the dry ingredients until you can see no more flour, then fold in the walnuts."
		  },
		  {
			"@type": "HowToStep",
			"name": "Bake and leave to cool",
			"text": "Spoon into the tin and bake for about an hour until a skewer inserted into the middle comes out clean. Cool in the tin for 10 minutes before turning out on to a rack to cool completely."
		  }
		]
	  }`,
	'https://www.theguardian.com/food/2021/sep/29/how-to-make-tiramisu-recipe-masterclass-felicity-cloake': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "How to make tiramisu",
		"image": "https://i.guim.co.uk/img/media/04cd2ae4ac2079f1380bf3ba1d5f097b3ac58877/1076_1207_6074_3848/master/6074.jpg?width=1300&quality=85&fit=max&s=7e7fc513159aa2b5abea7a10239cd885",
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2021-09-29",
		"description": "The classic, boozy Italian dessert gets the step-by-step Felicity Cloake treatment",
		"prepTime": "PT35M",
		"cookTime": "PT240M",
		"totalTime": "PT275M",
		"keywords": "dessert, tiramisu, Italian",
		"recipeYield": "6-8",
		"recipeCategory": "Food",
		"recipeCuisine": "Italian",
		"recipeIngredient": [
		  "100ml strong coffee",
		  "4 eggs",
		  "75g caster sugar",
		  "450g mascarpone",
		  "2 tbsp sweet marsala (optional)",
		  "2 tbsp dark rum (optional)",
		  "16-24 savoiardi biscuits (or boudoir), depending on the size of your dish",
		  "Cocoa powder, to dust"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Make the coffee",
			"text": "Espresso is ideal, because you want the coffee to have as intense a flavour as possible, but if you don’t have the wherewithal at home, a strongly brewed cafetiere, moka or filter pot, or even a cup of instant, will do, as will a takeaway from your favourite coffee shop if you don’t.",
			"image": "https://i.guim.co.uk/img/media/d16236d4a8333e1ee2aeba3d6d551e6b2a36bf82/874_952_5055_5052/master/5055.jpg?width=620&quality=85&fit=max&s=772c5a231bb63bab36fa26e5491ea6b5"
		  },
		  {
			"@type": "HowToStep",
			"name": "Separate the eggs",
			"text": "Separate the eggs into two large, clean bowls – you’ll be beating the whites into a foam, so it’s important they’re not contaminated with any yolk, which might interfere with the process. As such, I’d advise cracking each white into a small bowl first, so you can make sure of this before you add it to the larger bowl."
		  },
		  {
			"@type": "HowToStep",
			"name": "Whip the egg whites",
			"text": "Whisk the whites until they form stiff, rather than droopy peaks – you should be able to hold the bowl upside down with confidence, though be careful when testing this. (Don’t be tempted to keep whisking after they reach this stage, because they’ll quickly start to break down into a watery mess, and you’ll need to whisk in a fresh white to get them back.) Set aside.",
			"image": "https://i.guim.co.uk/img/media/73469f6ffea172d74eaee006493540b9e4253879/0_633_7442_6217/master/7442.jpg?width=620&quality=85&fit=max&s=b5579f9f24abb11a26d03c72359c6b3e"
		  },
		  {
			"@type": "HowToStep",
			"name": "Mix the yolks with sugar",
			"text": "Beat the egg yolks with the sugar until voluminous and pale yellow in colour; like whipping the egg whites, this is easiest done with a food mixer or electric beaters. Drain off any excess liquid from the mascarpone, if necessary, put it into a medium bowl and beat with a wooden spoon to loosen a little.",
			"iamge": "https://i.guim.co.uk/img/media/d3638097c45007fb3d418a0bb073a8d6082f1d4f/0_118_7957_6307/master/7957.jpg?width=620&quality=85&fit=max&s=d36d9d131a84cbb0acc00594fc7a2e13"
		  },
		  {
			"@type": "HowToStep",
			"name": "Mix the yolks and mascarpone",
			"text": "Beat the cheese into the egg yolks a little at a time, until you have a smooth mixture without any lumps – with such a simple dessert, it’s worth taking your time, but try not to be too violent or you’ll lose the air you’ve just whipped into the yolks and sugar."
		  },
		  {
			"@type": "HowToStep",
			"name": "Add the whisked whites",
			"text": "Using a large metal spoon, gently fold a third of the whisked whites into the cheese mixture, then, once that’s well combined, fold in the rest, again being careful to knock out as little air from the mix as possible. (The pudding will still be edible if it’s a bit flat, or indeed lumpy, but it won’t be as deliciously light.)",
			"image": "https://i.guim.co.uk/img/media/45b00e5df9d753a42d68283f9bf47464887fcde9/0_1001_6945_5502/master/6945.jpg?width=620&quality=85&fit=max&s=942ec641f8921238df3a59080a5da035"
		  },
		  {
			"@type": "HowToStep",
			"name": "Now for the coffee (and booze)",
			"text": "Put the coffee and alcohol, if using, into a wide dish. Booze doesn’t appear in all versions of tiramisu, but it does make it a more interesting dish. Feel free to adjust to taste: I’d suggest combining something sweet and something strong – sweet sherry or a liqueur such as amaretto or triple sec instead of marsala, and brandy or grappa instead of rum)."
		  },
		  {
			"@type": "HowToStep",
			"name": "Soak the biscuits",
			"text": "Dip each biscuit – savoiardi, available from larger supermarkets and Italian specialists, are best, because they’re drier and lighter than boudoir biscuits or trifle sponges, but use whatever you can find – into the coffee mixture until they’re a pale brown colour, and then use them to line the base of a medium serving bowl.",
			"image": "https://i.guim.co.uk/img/media/f1e9a8d96520e9c1ca8654ad1ef002190aa3aec7/0_1182_7317_4445/master/7317.jpg?width=620&quality=85&fit=max&s=915bf850b37850b5e5f80e58e0fe8b91"
		  },
		  {
			"@type": "HowToStep",
			"name": "Layer, chill, then dust with cocoa",
			"text": "Spoon a third of the mascarpone mixture on top of the biscuits, followed by a generous sprinkle of cocoa. Repeat the layers twice more, finishing with a layer of the cheese mix. Cover and refrigerate for four to six hours before serving, though you can make it a day ahead, if necessary, before ending with a final flourish of cocoa dusted on top.",
			"image": [
			  "https://i.guim.co.uk/img/media/df673d52dce6df432c1cd80daab9058088f1e4f7/0_1159_10328_5244/master/10328.jpg?width=620&quality=85&fit=max&s=5d3a81a3fcd212f3b1ec0c9f5ee18ff2",
			  "https://i.guim.co.uk/img/media/8cbf5155e39a647de8e063747fbc28151fa97b8e/0_835_7993_4794/master/7993.jpg?width=620&quality=85&fit=max&s=e9d482f7c488f903de5068a0f00c5f36"
			]
		  }
		]
	  }`,
	'https://www.theguardian.com/lifeandstyle/wordofmouth/2011/nov/24/how-to-cook-perfect-lasagne': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "The perfect lasagne",
		"image": [
		  "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/11/23/1322068570110/Felicitys-perfect-lasagne-007.jpg?width=620&quality=85&fit=max&s=92b849967db413a76ee3588fde89c998"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2011-11-24",
		"description": "Just to be clear, that's 'lasagne' as in a baked dish of flat pasta and bolognese sauce. Do you prefer the British, American or Italian style?",
		"prepTime": "PT20M",
		"cookTime": "PT200M",
		"totalTime": "PT220M",
		"keywords": "lasagne, beef, Italian",
		"recipeYield": "6 servings",
		"recipeCategory": "Main",
		"recipeCuisine": "Italian",
		"recipeIngredient": [
		  "2 tbsp olive oil, plus extra to cook the pasta",
		  "1 onion, finely chopped",
		  "1 carrot, finely chopped",
		  "1 stick of celery, finely chopped",
		  "500g chuck steak, cut into small dice",
		  "50g chicken livers, trimmed and finely chopped",
		  "100ml red wine",
		  "400ml passata",
		  "Grated nutmeg",
		  "50g butter",
		  "50g plain flour",
		  "600ml whole milk",
		  "About 9 sheets dried egg lasagne (depending on the size of the sheets and your dish - you'll need 3 layers of pasta)",
		  "100g grated parmesan"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Fry veggies and brown the meat",
			"text": "Heat the oil in a large, heavy-based frying pan and gently fry the onion until softened. Add the carrot and continue to cook for 5 minutes, then add the celery and cook for another 2 minutes. Turn up the heat, add the chopped beef and cook until browned all over, then stir in the chopped livers and cook for 3 minutes."
		  },
		  {
			"@type": "HowToStep",
			"name": "Add wine, passata, and seasoning then leave to simmer",
			"text": "Pour in the wine and passata, season with salt, pepper and a pinch of grated nutmeg, then bring to a simmer. Cover partially, turn the heat down, and leave to simmer gently for 2 hours. Uncover, and simmer for another 30 minutes, or until the sauce is well flavoured and almost dry."
		  },
		  {
			"@type": "HowToStep",
			"name": "Prepare the béchamel sauce",
			"text": "Pre-heat the oven to 200C. To make the béchamel, melt the butter in a medium pan, and then whisk in the flour. Cook for a couple of minutes, stirring, then gradually whisk in the milk, and bring to the boil, still stirring. Season and simmer for about 5 minutes until thickened."
		  },
		  {
			"@type": "HowToStep",
			"name": "Blanch your pasta",
			"text": "Bring a large pan of salted water to the boil and add a couple of drops of olive oil. Blanch the pasta, in batches to stop it clumping together, for 1 minute, then drain, separate and leave to dry on a tea towel or greased plate or board."
		  },
		  {
			"@type": "HowToStep",
			"name": "Layer lasagne and cook",
			"text": "To assemble the lasagne, take a deep, wide dish and coat the bottom with a third of the meat sauce, topped with a quarter of the béchamel, and a sprinkling of parmesan, and finally a layer of blanched pasta. Repeat two more layers, and then top the last layer of pasta with the rest of the béchamel, and the remaining parmesan. Grate a little nutmeg over the top, and cook for 40 minutes, until golden and bubbling."
		  },
		  {
			"@type": "HowToStep",
			"name": "Leave to rest",
			"text": "Allow to rest for at least 20 minutes before serving – lasagne is better warm than hot, and even better the next day."
		  }
		]
	  }`,
	'https://www.theguardian.com/food/2021/jan/20/how-to-make-fish-pie-recipe-felicity-cloake-masterclass': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "How to make fish pie",
		"image": [
		  "https://i.guim.co.uk/img/media/d7b3a67dd7b86d6483decbc3e17866e57c1ee3f4/2109_358_7320_7316/master/7320.jpg?width=620&quality=85&fit=max&s=4b5a14f6084328c57a1cc358ecb077f5"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2021-01-20",
		"description": "What’s healthy but moreish, easy and adaptable enough to use up store-cupboard and crisper drawer bits? Homemade fish pie, that’s what.",
		"prepTime": "PT55M",
		"cookTime": "PT45M",
		"totalTime": "PT100M",
		"keywords": "fish, pie, fish pie",
		"recipeYield": "4",
		"recipeCategory": "Main",
		"recipeCuisine": "British",
		"recipeIngredient": [
		  "1kg floury potatoes",
		  "100g butter",
		  "1 splash milk",
		  "500ml fish stock",
		  "100ml white white wine",
		  "1 small bunch parsley or tarragon",
		  "350g white or oily fish (pollack, trout, etc)",
		  "350g smoked fish (haddock, cod, etc)",
		  "200g small peeled prawns, defrosted if necessary",
		  "50g plain or cornflour",
		  "2 anchovies, finely chopped (optional)",
		  "200ml double cream",
		  "2 hard-boiled eggs (boiled for 8 minutes), peeled (optional)",
		  "1 handful white breadcrumbs (optional)"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Choose your fish",
			"text": "A word about the fish. It’s hard to keep on top of what’s sustainable, especially internationally (if you’re unsure, check the Marine Conservation Society’s Good Fish Guide), so take the quantities listed above as a guide. I like a combination of white and smoked fish with sweet little prawns, but you may prefer to replace one of them with an oily fish such as salmon, trout or mackerel, or other seafood such as mussels, crabmeat or squid.",
			"image": "https://i.guim.co.uk/img/media/e2d72b3af07cfe8e0a5611a63d41168468f3ac32/0_0_7430_5121/master/7430.jpg?width=620&quality=85&fit=max&s=f2f94c770b9678e264950708d5d2a98c"
		  },
		  {
			"@type": "HowToStep",
			"name": "Choose the potatoes",
			"text": "Peel the potatoes – a floury variety is best here, because you want it to be a fluffy contrast to the richness beneath. Golden wonder or kerr’s pink would be ideal, but if you can’t find them, Rooster or maris pipers are your best bet, followed by desiree and king edwards in that order. Cut into large, but evenly-sized chunks.",
			"image": "https://i.guim.co.uk/img/media/2eb78f15962ffa5c4937891896ae2c03058597c8/0_0_4001_4458/master/4001.jpg?width=620&quality=85&fit=max&s=634ff10d594a274cad5a402c9f09e93e"
		  },
		  {
			"@type": "HowToStep",
			"name": "Cook the spuds",
			"text": "Put the potatoes in a suitable pan, cover with cold water, add a big pinch of salt and bring to a boil. Simmer until tender; how long this takes will depend on how large your potato chunks are. Drain well, then put back into the hot pan to steam completely dry. Add half the butter and all the milk, mash until smooth, then season to taste.",
			"image": "https://i.guim.co.uk/img/media/fe910e31a246e2b401c1d31318ad59e4864a3f23/0_0_7686_5580/master/7686.jpg?width=620&quality=85&fit=max&s=b5b990dc83e3505ae66eb1e815545e95"
		  },
		  {
			"@type": "HowToStep",
			"name": "Prepare the poaching liquor",
			"text": "While the potatoes are cooking, put the fish stock and wine into a pan large enough to hold all the fish in one layer, and bring to a simmer. Cut the stalks off the herbs and add these to the pan, too. Bring to a simmer, then add the fish, skin on if it’s still attached; leave the prawns aside for now.",
			"image": "https://i.guim.co.uk/img/media/d282c6c5197ff9e60e23fb90e01e00cb05feeecb/0_0_7492_7580/master/7492.jpg?width=620&quality=85&fit=max&s=aa6d0b6618cd89f7be5c0c6fe7251a3d"
		  },
		  {
			"@type": "HowToStep",
			"name": "Poach the fish",
			"text": "Turn the heat right down, and leave the pan to bubble very gently for about five minutes, until the fish is opaque but not cooked through; use your judgment here, because how long this takes depends on the size and thickness of the fillets. Err on the side of caution, however: the fish will cook further in the oven."
		  },
		  {
			"@type": "HowToStep",
			"name": "Start on the sauce",
			"text": "Lift out the fish with a slotted spoon and set aside to cool. Discard the herb stalks from the poaching liquor. Melt the remaining 50g butter in a medium saucepan over a medium-low heat, then stir in the flour (use cornflour if you’d prefer to keep things gluten-free) and fry, stirring, for a minute or so, until it smells slightly toasted. Gradually stir in the poaching liquor.",
			"image": "https://i.guim.co.uk/img/media/041a2b9fceab5016b01d1c78a1b3b84e0182ed6f/0_0_8208_7198/master/8208.jpg?width=620&quality=85&fit=max&s=9304cd381073f46bd77022312404aded"
		  },
		  {
			"@type": "HowToStep",
			"name": "Finish the sauce",
			"text": "Bring the sauce to a simmer, then turn down the heat and leave to bubble away for about 20 minutes, until thick. Meanwhile, remove and discard the skin from the fish, if necessary, and cut the flesh into large bite-sized chunks (again, bear in mind that the smaller they are, the bigger the risk that they’ll overcook). Heat the oven to 200C (180C fan)/390F/gas 6.",
			"image": "https://i.guim.co.uk/img/media/38b0727b0d9fcb9141ebbae8c8792350f13d1739/0_657_8814_6776/master/8814.jpg?width=620&quality=85&fit=max&s=6f021c9575f2f7bfe4cd573d0f837bfe"
		  },
		  {
			"@type": "HowToStep",
			"name": "Add the fish and flavourings",
			"text": "Take the sauce off the heat, roughly chop the herb leaves and finely chop the anchovies (you could use anchovy paste, if you prefer; add to taste).Once the sauce has stopped bubbling, stir both in with the double cream and season to taste. Stir through the fish and prawns (and quartered hard-boiled eggs, if you like).",
			"image": [
			  "https://i.guim.co.uk/img/media/723927922c4bfec2d1ff057c7802b1dcb46b8a2e/0_542_8148_6428/master/8148.jpg?width=620&quality=85&fit=max&s=7814899539c024f90482663389476346",
			  "https://i.guim.co.uk/img/media/c3941beeeeace0111e2a79c764ea9d86169d9f63/0_0_7898_6601/master/7898.jpg?width=620&quality=85&fit=max&s=4d90469f593c03978f6fc45777688781"
			]
		  },
		  {
			"@type": "HowToStep",
			"name": "Top with the mash and bake",
			"text": "Spoon into a baking dish and top with the mashed potato. Rake the top with a fork, if you want it to go extra-crisp, then bake for 20 minutes. Remove, sprinkle with the breadcrumbs, if using (grated cheese is another possibility), and bake for a further 15 minutes, until golden. Serve with peas or wilted greens.",
			"image": "https://i.guim.co.uk/img/media/9a876e5fcabc2d93303c4da38b170665c418dfa8/0_0_7701_6696/master/7701.jpg?width=620&quality=85&fit=max&s=fa0fdecc22b88c58c4341d9a7d8fd97a"
		  }
		]
	  }`,
	'https://www.theguardian.com/lifeandstyle/wordofmouth/2014/jul/17/how-to-mix-perfect-old-fashioned-cocktail': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "How to mix the perfect old fashioned",
		"image": [
		  "https://i.guim.co.uk/img/static/sys-images/Lifeandhealth/Pix/pictures/2014/7/16/1405529787340/The-perfect-old-fashioned-009.jpg?width=620&quality=85&fit=max&s=8b59d931e691e0554286177e3d7ef6eb",
		  "https://i.guim.co.uk/img/static/sys-images/Lifeandhealth/Pix/pictures/2014/7/16/1405529598349/The-perfect-old-fashioned-011.jpg?width=620&quality=85&fit=max&s=91743015de6c020ddd226c829af7e532"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2014-07-17",
		"description": "The no-nonsense counterpart to all those tediously long drinks full of fizz, fancy flavours and more fruit juice than your average breakfast bar, the old fashioned is that rare thing: a cocktail that actually tastes of booze.",
		"prepTime": "PT10M",
		"cookTime": "PT5M",
		"totalTime": "PT15M",
		"keywords": "old fashioned, cocktail, whiskey",
		"recipeYield": "1",
		"recipeCategory": "Cocktail",
		"recipeCuisine": "American",
		"recipeIngredient": [
		  "Bitters of your choice",
		  "2 slices of orange",
		  "2 maraschino cherries",
		  "60ml bourbon",
		  "Ice",
		  "100g brown sugar",
		  "100ml water"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Prepare sugar syrup",
			"text": "Put the sugar and water in a small pan and bring to the boil, stirring to dissolve the sugar. Decant into a jar or bottle and allow to cool."
		  },
		  {
			"@type": "HowToStep",
			"name": "Mush in fruit with sugar syrup and bitters",
			"text": "Put a splash of syrup in a small rocks glass and add a couple of dashes of bitters. Put in a slice of orange and a cherry, then muddle against the bottom of the glass until the fruit is thoroughly mushed. Remove the orange and any big bits of cherry skin.",
			"image": "https://i.guim.co.uk/img/static/sys-images/Lifeandhealth/Pix/pictures/2014/7/16/1405529353756/David-Doudoroffs-old-fash-001.jpg?width=620&quality=85&fit=max&s=97ab2c9b3ffd3ffe2a7d0ba0eb39dc73"
		  },
		  {
			"@type": "HowToStep",
			"name": "Add bourbon and garnish",
			"text": "Pour in the bourbon and stir well. Taste and add more syrup or bitters if you feel it lacking. Add ice in quantity, then garnish with the remaining fruit. Serve immediately and drink slowly.",
			"image": "https://i.guim.co.uk/img/static/sys-images/Lifeandhealth/Pix/pictures/2014/7/16/1405529598349/The-perfect-old-fashioned-011.jpg?width=620&quality=85&fit=max&s=91743015de6c020ddd226c829af7e532"
		  }
		]
	  }`,
	'https://www.theguardian.com/lifeandstyle/wordofmouth/2013/jan/31/how-to-cook-perfect-pulled-pork': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "Perfect pulled pork",
		"image": [
		  "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/1/30/1359552279710/Felicitys-perfect-pulled--006.jpg?width=620&quality=85&fit=max&s=bbef312f8da01583a7be5af15b0e18d7"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2013-01-31",
		"description": "Is it possible to cook delicious pulled pork without the smoke and drama of a barbecue pit? Felicity Cloake says it is (just don't tell the good ol' boys ... )",
		"prepTime": "PT20M",
		"cookTime": "PT480M",
		"totalTime": "PT500M",
		"keywords": "pork, pulled pork, barbecue",
		"recipeYield": "6 servings",
		"recipeCategory": "Main",
		"recipeCuisine": "American",
		"recipeIngredient": [
		  "1.6kg shoulder of pork from the neck end, bone in",
		  "2 tbsp salt",
		  "2 tbsp dark muscovado sugar",
		  "1 tbsp smoked paprika",
		  "2 tsp liquid smoke (optional)"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Season the pork",
			"text": "Preheat the oven to 220C. Line a roasting tin with sheets of foil big enough to fold over the top of the pork, then pat the meat dry with a paper towel and add it to the tin. Mix together the salt, sugar and paprika and rub about half into the meat."
		  },
		  {
			"@type": "HowToStep",
			"name": "Roast in hot oven until tender",
			"text": "Put the pork into the hot oven for about 40 minutes until well browned, then take out and turn down the heat to 125C. Pour the liquid smoke over the pork if using, then fold the foil over the top to make a sealed parcel. Put back in the oven and cook for about 6–7 hours, until the internal temperature measures 89C and it's soft enough to spoon. Pour off the juices and reserve."
		  },
		  {
			"@type": "HowToStep",
			"name": "Crispen then leave to cool",
			"text": "Turn the heat back up to 220 and cook the pork, uncovered, for 10 minutes to crisp up. Take out, cover with a tent of foil, and leave to rest for 30 minutes."
		  },
		  {
			"@type": "HowToStep",
			"name": "Pull into shreds and serve",
			"text": "Use two forks, or your fingers to pull into shreds, cutting up the crackling too, and then add the rest of the seasoning, and any meat juices from the tin, and stir in. If possible, leave to soak for 24 hours before reheating in a warm oven to serve."
		  }
		]
	  }`,
	'https://www.theguardian.com/food/2021/apr/07/how-to-make-cheese-and-onion-pie-recipe-felicity-cloake': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "Cheese and onion pie",
		"image": [
		  "https://i.guim.co.uk/img/media/a3600592f3b4666bee5aadb2f560b7e38d835922/0_0_6510_5667/master/6510.jpg?width=620&quality=85&fit=max&s=d97682a731550520ce5d7c65180c7526"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2021-04-07",
		"description": "Your step-by-step guide to a satisfyingly hearty slab pie that’s ideal for a picnic",
		"prepTime": "PT40M",
		"cookTime": "PT60M",
		"totalTime": "PT100M",
		"keywords": "pie, pastry, baking, cheese, onion",
		"recipeYield": "4-6 servings",
		"recipeCategory": "Main",
		"recipeCuisine": "British",
		"recipeIngredient": [
		  "4 onions",
		  "25g butter",
		  "Salt and pepper",
		  "1 small bunch fresh chives",
		  "5 spring onions",
		  "500g lancashire cheese",
		  "150g butter",
		  "400g plain flour",
		  "½ tsp salt",
		  "1½ tbsp mustard powder",
		  "Butter or oil, to grease",
		  "1 egg, to glaze"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Gently fry the onions",
			"text": "Peel and slice the onions fairly thinly. Melt the butter for the filling in a large frying pan over a medium-low heat, then add the onions and a pinch of salt, and cook, stirring regularly to prevent browning, until they collapse into soft, golden ribbons. This will probably take about 15 minutes.",
			"image": "https://i.guim.co.uk/img/media/8a18347858d0b611c1b4f526d19d7bcfb29b93d3/384_0_6145_6145/master/6145.jpg?width=620&quality=85&fit=max&s=3232d088529eb6fb07c2717547290e6d"
		  },
		  {
			"@type": "HowToStep",
			"name": "Mix the cheese, chives and spring onions",
			"text": "While the onions are cooking, finely chop the chives and roughly chop the spring onions. Put both in a bowl and crumble in the cheese. (I like the mildly lactic flavour of lancashire here, but cheshire, mild cheddar or any hard cheese will work; go easy on the seasoning if using a stronger variety, though.)",
			"image": "https://i.guim.co.uk/img/media/ceed45c67a3596bfd06c9118ba5a0d1a1ec69082/0_0_4975_4975/master/4975.jpg?width=620&quality=85&fit=max&s=58e8cbebbcc6ad6fb30cde1eace57d91"
		  },
		  {
			"@type": "HowToStep",
			"name": "Finish off the onions",
			"text": "Pour 100ml water on top of the softened onions, bring to a simmer, then leave it to bubble away until almost all the liquid has evaporated. Season, tip out of the pan on to a plate or tray, and leave to cool while you make the pastry. (You could use bought shortcrust, but this hot-water crust is so easy, that would be a bit of a shame.)"
		  },
		  {
			"@type": "HowToStep",
			"name": "Grease and line a pie dish",
			"text": "Lightly grease a medium pie dish (I used a rectangular 20cm x 26cm one) with butter or oil, and line it with a single sheet of greaseproof paper – this will help you lift out the cooked pie later (if you’re going to serve it straight from the dish, or are using a loose-bottomed pie tin, there’s no need for paper, so just grease the dish)."
		  },
		  {
			"@type": "HowToStep",
			"name": "Start on the pastry",
			"text": "Put the butter for the pastry in a small pan with 110ml water and heat over a medium flame until it has melted and the mixture is simmering. Heat the oven to 200C (180C fan)/390F/gas 6. Put the flour, salt and mustard powder in a large bowl and whisk well."
		  },
		  {
			"@type": "HowToStep",
			"name": "Finish the pastry, then roll out",
			"text": "Pour the boiling butter and water mixture into the flour bowl and stir in vigorously until the mix comes together into a smooth dough. Set aside about a third of it to make the lid. On a lightly floured surface, roll out the remaining dough to about twice the size of the dish."
		  },
		  {
			"@type": "HowToStep",
			"name": "Line the pie dish, then fill",
			"text": "Carefully lift the pastry into the pie dish, pressing it into the sides. Don’t worry too much about any tears; it’s easy enough to patch these up simply by pressing the dough together. Spread about half the cooled onions across the pastry base, followed by half the cheese, spring onion and chive mixture, then repeat the layers to fill the dish.",
			"image": "https://i.guim.co.uk/img/media/2b1347604e2582c3c6ea265ea26e368eeeb30958/0_0_6348_5004/master/6348.jpg?width=620&quality=85&fit=max&s=a7d16175b774a82946d10659977ef4cb"
		  },
		  {
			"@type": "HowToStep",
			"name": "Roll out the lid, and put in place",
			"text": "Roll out the remaining pastry so it’s just larger than the top of the dish. Moisten the exposed edges at the top of the pastry base to give the lid something to stick to, then lift the lid on top of the pie and gently press down around the edges with the back of a fork to seal (or crimp, if you’re feeling fancy).",
			"image": "https://i.guim.co.uk/img/media/843a1421cf3c382f19c8c48ba2c5a6c89abc739b/0_0_6319_4990/master/6319.jpg?width=620&quality=85&fit=max&s=995ff0f41796968458c1b6710c4645eb"
		  },
		  {
			"@type": "HowToStep",
			"name": "Glaze and bake",
			"text": "Beat the egg with a little water (or milk) to loosen, then brush over the lid of the pie. Poke a hole in the centre so the steam can escape, then bake for about 45 minutes, until golden. Leave to cool a little, or completely, before serving. It’s delicious with salad and/or pickles on the side.",
			"image": "https://i.guim.co.uk/img/media/f1a9db87183edce78432ce8d272c69123d98943f/0_0_6650_5591/master/6650.jpg?width=620&quality=85&fit=max&s=9eb9d65475c6929f8cb9755adfad7603"
		  }
		]
	  }`,
	'https://www.theguardian.com/food/2020/nov/11/how-to-make-the-perfect-meat-and-potato-pie-recipe-felicity-cloake': `{
		"@context": "https://schema.org/",
		"@type": "Recipe",
		"name": "Perfect meat and potato pie",
		"image": [
		  "https://i.guim.co.uk/img/media/572467e052422e0f3a95a4b764ccbad4b865f0cf/1176_1017_4927_4927/master/4927.jpg?width=620&quality=85&fit=max&s=5c0404a0a0988a42212f0a1a5f0ce6f3"
		],
		"author": {
		  "@type": "Person",
		  "name": "Felicity Cloake"
		},
		"datePublished": "2020-11-11",
		"description": "The classic northern pie gets the Felicity Cloake treatment",
		"prepTime": "PT35M",
		"cookTime": "PT60M",
		"totalTime": "PT95M",
		"keywords": "baking, pie, pastry, meat, beef, lamb",
		"recipeYield": "4 servings",
		"recipeCategory": "Main",
		"recipeCuisine": "British",
		"recipeIngredient": [
		  "500g plain flour, plus extra for dusting",
		  "Salt",
		  "250g grated suet",
		  "Oil, butter or dripping, to grease",
		  "2 tbsp milk, for brushing (optional)",
		  "600g mutton or lamb shoulder, or beef skirt or shin, finely chopped",
		  "1 tbsp flour",
		  "300g peeled floury potatoes, finely diced",
		  "1 onion, peeled and finely chopped",
		  "4 tbsp beef stock or water",
		  "1 tbsp Worcestershire sauce (optional)",
		  "1 pinch fresh marjoram (optional)"
		],
		"recipeInstructions": [
		  {
			"@type": "HowToStep",
			"name": "Prepare the pastry",
			"text": "Put the flour and a good pinch of salt in a large bowl, then add the grated suet and cut it in with a knife. Stir in about 90ml very cold water, then gradually add more water until you have a smooth but not sticky pastry. Wrap well and chill for at least 20 minutes.",
			"image": [
			  "https://i.guim.co.uk/img/media/8534ccdba835dd90a14fa79371058d542d58f3a3/0_0_8284_8284/master/8284.jpg?width=620&quality=85&fit=max&s=4bd26f56b8767c76448a89cf5b8d507f",
			  "https://i.guim.co.uk/img/media/89b4f2c236895f0e5cbeded1737d3238c27b4ee8/775_530_5295_5295/master/5295.jpg?width=620&quality=85&fit=max&s=633c8e8c0704ee228dc43eb6a5e14b46"
			]
		  },
		  {
			"@type": "HowToStep",
			"name": "Season the meat",
			"text": "Meanwhile, put the meat in a bowl with the flour and season well. Stir together, then add the remaining filling ingredients.",
			"image": "https://i.guim.co.uk/img/media/3be3bb0bd75fefe665961ea570e05b1213690104/504_339_5796_5796/master/5796.jpg?width=620&quality=85&fit=max&s=67b58aa080f71fb7bf666e0a45b0a9cb"
		  },
		  {
			"@type": "HowToStep",
			"name": "Preheat oven and grease pie tins",
			"text": "Heat the oven and a baking tray to 220C (200C fan)/425F/gas 7. Lightly grease four pie tins about 12cm wide x 3cm deep; if they’re not loose-bottomed, line the bases with circles of greaseproof paper."
		  },
		  {
			"@type": "HowToStep",
			"name": "Cut and fill circles of pastry",
			"text": "On a lightly floured work surface, roll out the pastry to about ½cm thick, then cut out circles slightly larger than the tins. Use these to line the tins, bringing the pastry up the sides to cover the rims. Spoon in the filling and use the remaining pastry to make lids. Moisten the pastry rims with a little water, then press on the lids. Crimp or press down with the back of a fork to seal, then cut a small hole in the middle to let out the steam. Brush the tops with milk.",
			"image": [
			  "https://i.guim.co.uk/img/media/e0a8c4334f70c10220384e90686aa51e41d40331/0_0_7277_7276/master/7277.jpg?width=620&quality=85&fit=max&s=557e8eaaacf6e7b6e89c60ac9cf42a99",
			  "https://i.guim.co.uk/img/media/8a5f2542fc3a36dbd860bd1158113e06e7ffdd5c/318_123_6703_6702/master/6703.jpg?width=620&quality=85&fit=max&s=f75a2e151e44dbafa27c0f85032573e1",
			  "https://i.guim.co.uk/img/media/d8020cfa7e1e0672e852d0598c116b4da29a27c2/406_235_6724_6724/master/6724.jpg?width=620&quality=85&fit=max&s=323ab617116b8fa10076384eba2b3e7f"
			]
		  },
		  {
			"@type": "HowToStep",
			"name": "Bake those pies!",
			"text": "Bake for 25 minutes, then turn down the heat to 180C (160C fan)/350F/gas 4 and bake for about 25-35 minutes more, until the pastry is deep golden. Leave the pies to cool in their tins for 10 minutes before carefully lifting out and serving.",
			"image": "https://i.guim.co.uk/img/media/6cd41b38d781c7e42725d367e857b3f52a65d680/697_412_7281_7282/master/7281.jpg?width=620&quality=85&fit=max&s=fb5851cc1735d613a6ff252a57485c61"
		  }
		]
	  }`,
};
