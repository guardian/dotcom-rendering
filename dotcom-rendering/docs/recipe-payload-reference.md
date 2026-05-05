# Recipe article: full DCR payload reference

> **What this is:** A complete, annotated record of everything DCR has access to when a reader visits a recipe article URL. The data below was fetched live from production via `https://www.theguardian.com/<article-path>.json?dcr=true`.
>
> **Source article:** [Meera Sodha's vegan recipe for spring onion pancakes](https://www.theguardian.com/food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes) — a single-recipe article, used as the canonical fixture in `fixtures/generated/fe-articles/Recipe.ts`.

---

## Top-level structure

```
FEArticle {
  version               3
  headline              string
  standfirst            string (HTML)
  webTitle              string
  mainMediaElements     FEElement[]       hero image element(s)
  main                  string (HTML)     hero image as raw HTML
  filterKeyEvents       false
  keyEvents             []
  blocks                Block[]           THE ARTICLE BODY (see below)
  author                { byline: string }
  byline                string
  webPublicationDate    ISO 8601 string
  webPublicationDateDeprecated  ISO 8601 string
  webPublicationDateDisplay     string (localised)
  webPublicationSecondaryDateDisplay  string
  editionLongForm       "Europe edition" / "UK edition" etc
  editionId             "EUR" | "UK" | "US" | "AU" | "INT"
  pageId                string            e.g. "food/2021/feb/06/meera-sodhas-..."
  canonicalUrl          string            full https URL
  format                { design, theme, display }
  designType            "Recipe"          (deprecated field, mirrors format.design)
  tags                  TagType[]         (see Tags section)
  pillar                "lifestyle"
  isLegacyInteractive   false
  isImmersive           false
  sectionLabel          string
  sectionUrl            string
  sectionName           string
  subMetaSectionLinks   { url, title }[]
  subMetaKeywordLinks   { url, title }[]
  shouldHideAds         false
  isAdFreeUser          false
  webURL                string
  linkedData            object[]          JSON-LD for SEO (see linkedData section)
  openGraphData         { [key]: string }
  twitterData           { [key]: string }
  config                ConfigType        switches, ab tests, ad targeting, etc.
  guardianBaseURL       "https://www.theguardian.com"
  contentType           "Article"
  hasRelated            true
  hasStoryPackage       false
  beaconURL             string
  isCommentable         true
  commercialProperties  { US, AU, UK, INT, EUR }  ad targeting per edition
  pageType              { hasShowcaseMainElement, isFront, isLiveblog, ... }
  trailText             string (HTML)
  nav                   FENavType         full navigation tree
  showBottomSocialButtons  true
  pageFooter            { footerLinks }
  publication           "The Guardian"
  shouldHideReaderRevenue  false
  slotMachineFlags      string
  contributionsServiceUrl  string
  isSpecialReport       false
  showTableOfContents   false
  lang                  "en"
  isRightToLeftLang     false
}
```

---

## `format`

```json
{
	"design": "RecipeDesign",
	"theme": "LifestylePillar",
	"display": "StandardDisplay"
}
```

`design: "RecipeDesign"` is the key signal. DCR maps this to `ArticleDesign.Recipe` in `src/lib/articleFormat.ts`. It:

-   Activates the recipe section-grouping logic in `ArticleRenderer.tsx`
-   Enables the Feast nudge islands
-   Changes subheading font weight to bold
-   Suppresses drop caps

---

## `blocks` — the article body

Each article has one or more `Block` objects. For standard recipe articles there is always exactly **one block**. Each block has an `elements` array of typed `FEElement` objects.

### Block metadata

```json
{
	"id": "5ee89b118f089a4ae3aff6e7",
	"attributes": {
		"pinned": false,
		"keyEvent": false,
		"summary": false
	},
	"blockCreatedOn": 1612607438000,
	"blockCreatedOnDisplay": "11.30 CET",
	"blockLastUpdated": 1713195353000,
	"blockLastUpdatedDisplay": "17.35 CEST",
	"blockFirstPublished": 1612607438000,
	"blockFirstPublishedDisplay": "11.30 CET",
	"blockFirstPublishedDisplayNoTimezone": "11.30",
	"contributors": [],
	"primaryDateLine": "Sat 6 Feb 2021 11.30 CET",
	"secondaryDateLine": "Last modified on Tue 2 Dec 2025 09.27 CET"
}
```

### Elements in the body (live production data)

```
[0]  TextBlockElement
     html: '<p>The world of pancakes is so vast...'
     ↑ Article intro paragraph

[1]  SubheadingBlockElement
     html:      '<h2>Spring onion pancakes with sesame sauce</h2>'
     elementId: '73a6d038-5f11-4d29-a9cf-1e55f2703be4'
     ↑ Recipe title. DCR uses this to split the article into recipe sections.
       stripHtmlTags(html) = "Spring onion pancakes with sesame sauce"
       This is the ONLY recipe identifier available to DCR.

[2]  TextBlockElement
     html: '<p>Prep <strong>5 min</strong>Rest <strong>30 min</strong>Cook <strong>1 hr</strong>Makes <strong>4, to serve 2 for lunch</strong></p>'
     ↑ Prep/cook time and yield, encoded as bold text in a paragraph

[3]  TextBlockElement
     html: '<p>Making these involves a particular set of processes...'
     ↑ Author introduction / context

[4]  TextBlockElement
     html: '<p>For the pancakes<br><strong>275g plain flour</strong>, plus 2 tbsp extra<br><strong>Fine sea salt</strong>...'
     ↑ Ingredients group 1, written as bold-formatted prose. NOT structured data.

[5]  TextBlockElement
     html: '<p>For the sesame sauce<br><strong>30g tahini</strong><br><strong>75g sweet white miso</strong>...'
     ↑ Ingredients group 2 (sauce), also bold-formatted prose.

[6]  TextBlockElement
     html: '<p>Fill and boil half a kettle of water...'
     ↑ Method step 1

[7]  TextBlockElement
     html: '<p>While the dough is resting...'
     ↑ Method step 2

[8]  TextBlockElement
     html: '<p>Mix all the sauce ingredients...'
     ↑ Method step 3

[9]  TextBlockElement
     html: '<p>Once the dough has rested...'
     ↑ Method step 4

[10] TextBlockElement
     html: '<p>When you are ready to cook the pancakes...'
     ↑ Method step 5

[11] TextBlockElement
     html: '<p>Serve the pancakes hot with the sauce...'
     ↑ Final method step / serving suggestion
```

**Key observation:** Ingredients and method steps are plain `TextBlockElement` nodes with the content as formatted HTML. There is no `IngredientBlockElement` or `MethodStepBlockElement`. The structure is purely editorial convention.

The `SubheadingBlockElement` has exactly three fields:

```ts
{
	_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement';
	html: '<h2>Spring onion pancakes with sesame sauce</h2>';
	elementId: '73a6d038-5f11-4d29-a9cf-1e55f2703be4'; // CAPI UUID — not a Feast ID
}
```

---

## `linkedData` — the richest recipe data in the payload

Three objects are present. This is what goes into `<head>` as `<script type="application/ld+json">` for Google and other search engines.

### Object 1: `NewsArticle`

```json
{
	"@type": "NewsArticle",
	"@context": "https://schema.org",
	"@id": "https://www.theguardian.com/food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes",
	"publisher": {
		"@type": "Organization",
		"@id": "https://www.theguardian.com#publisher",
		"name": "The Guardian",
		"url": "https://www.theguardian.com/"
	},
	"isAccessibleForFree": true,
	"image": [
		"https://i.guim.co.uk/...1200x630...",
		"...1200x1200...",
		"...1200x900..."
	],
	"author": [
		{
			"@type": "Person",
			"name": "Meera Sodha",
			"sameAs": "...profile/meera-sodha"
		}
	],
	"datePublished": "2021-02-06T10:30:38.000Z",
	"dateModified": "2025-12-02T08:27:00.000Z",
	"headline": "Meera Sodha's vegan recipe for spring onion pancakes",
	"mainEntityOfPage": "https://www.theguardian.com/food/2021/..."
}
```

### Object 2: `WebPage`

```json
{
	"@type": "WebPage",
	"@context": "https://schema.org",
	"@id": "https://www.theguardian.com/food/2021/...",
	"potentialAction": {
		"@type": "ViewAction",
		"target": "android-app://com.guardian/https/www.theguardian.com/food/2021/..."
	}
}
```

### Object 3: `Recipe` (most valuable for Feast)

```json
{
	"@context": "http://schema.org",
	"@type": "Recipe",
	"name": "Spring onion pancakes with sesame sauce",
	"description": "The world of pancakes is so vast...",
	"image": "https://media.guim.co.uk/e5a2cb2a.../1702.jpg",
	"datePublished": "2021-02-06T10:30:38Z",
	"url": "https://www.theguardian.com/food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes",
	"recipeCategory": ["Lunch"],
	"recipeCuisine": ["Chinese"],
	"recipeIngredient": [
		"275.0g plain flour, plus 2 tbsp extra",
		"Fine sea salt",
		"Coconut oil",
		"0.5tsp Chinese five spice powder - I like Bart Ingredients",
		"6.0 spring onions, trimmed and finely sliced",
		"30.0g tahini",
		"75.0g sweet white miso - I like Clearspring",
		"1.0tbsp toasted sesame oil",
		"2.0tbsp white-wine vinegar",
		"0.5tsp chilli oil sediment plus 1 tbsp oil - I like Lee Kum Kee"
	],
	"recipeInstructions": [
		{
			"@type": "HowToStep",
			"text": "Fill and boil half a kettle of water...",
			"image": []
		},
		{
			"@type": "HowToStep",
			"text": "While the dough is resting...",
			"image": []
		},
		{
			"@type": "HowToStep",
			"text": "Mix all the sauce ingredients...",
			"image": []
		},
		{
			"@type": "HowToStep",
			"text": "Once the dough has rested...",
			"image": []
		},
		{
			"@type": "HowToStep",
			"text": "When you are ready to cook the pancakes...",
			"image": []
		},
		{
			"@type": "HowToStep",
			"text": "Serve the pancakes hot with the sauce...",
			"image": []
		}
	],
	"recipeYield": ["Makes 4.0 pancakes, to serve 2 for lunch"],
	"prepTime": "PT5M",
	"cookTime": "PT60M",
	"totalTime": "PT95M",
	"author": { "@type": "Person", "name": "Meera Sodha" },
	"suitableForDiet": [
		"https://schema.org/VeganDiet",
		"https://schema.org/VegetarianDiet",
		"",
		"",
		""
	]
}
```

**Important:** Note the numeric quantities (`275.0g`, `6.0 spring onions`). This is a strong signal that these values were parsed from a structured source — probably a `RecipeAtom` in CAPI that stores quantities as typed numbers — and then serialised back to strings for the schema.org output. The `frontend` text body elements use `275g` (no decimal), but `linkedData` has `275.0g`. **This is the biggest clue that a RecipeAtom exists in CAPI.**

**What is missing here:** There is no `@id` on the `Recipe` object itself, no `identifier` field, no Feast recipe ID. The `url` field points to the Guardian article, not to a Feast record.

---

## `tags`

```json
[
	{
		"id": "food/series/the-new-vegan",
		"type": "Series",
		"title": "The new vegan"
	},
	{ "id": "food/vegan", "type": "Keyword", "title": "Vegan food and drink" },
	{ "id": "food/vegetables", "type": "Keyword", "title": "Vegetables" },
	{ "id": "food/food", "type": "Keyword", "title": "Food" },
	{
		"id": "food/chinese",
		"type": "Keyword",
		"title": "Chinese food and drink"
	},
	{
		"id": "lifeandstyle/lifeandstyle",
		"type": "Keyword",
		"title": "Life and style"
	},
	{ "id": "food/main-course", "type": "Keyword", "title": "Main course" },
	{ "id": "food/snacks", "type": "Keyword", "title": "Snacks" },
	{ "id": "food/starter", "type": "Keyword", "title": "Starter" },
	{ "id": "food/pancakes", "type": "Keyword", "title": "Pancakes" },
	{ "id": "type/article", "type": "Type", "title": "Article" },
	{ "id": "tone/recipes", "type": "Tone", "title": "Recipes" },
	{ "id": "tone/features", "type": "Tone", "title": "Features" },
	{
		"id": "profile/meera-sodha",
		"type": "Contributor",
		"title": "Meera Sodha",
		"bylineImageUrl": "...",
		"bylineLargeImageUrl": "..."
	},
	{
		"id": "publication/theguardian",
		"type": "Publication",
		"title": "The Guardian"
	},
	{ "id": "theguardian/feast", "type": "NewspaperBook", "title": "Feast" },
	{
		"id": "theguardian/feast/feast",
		"type": "NewspaperBookSection",
		"title": "Feast"
	},
	{
		"id": "tracking/commissioningdesk/feast",
		"type": "Tracking",
		"title": "UK Feast"
	}
]
```

Tags relevant for feature logic:

| Tag                                    | Why it matters                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| `tone/recipes`                         | Identifies the article as a recipe; suppresses "article may be outdated" age warning in DCR |
| `theguardian/feast`                    | Published in the Feast print supplement                                                     |
| `tracking/commissioningdesk/feast`     | Commissioned by the Feast desk                                                              |
| `food/main-course`, `food/snacks` etc. | Meal-type keywords; could be used for Feast app routing                                     |

---

## Multi-recipe articles

When an article contains multiple recipes (e.g. "Meera Sodha: two summer recipes"), the structure scales linearly:

### Blocks

```
[0]  TextBlockElement          article intro
[1]  SubheadingBlockElement    "Spring onion pancakes with sesame sauce"    ← recipe 1 title
[2]  TextBlockElement          prep/cook time
[3]  TextBlockElement          ingredients
...
[n]  SubheadingBlockElement    "Sesame dipping sauce"                       ← recipe 2 title
[n+1] TextBlockElement         prep/cook time
[n+2] TextBlockElement         ingredients
...
```

### linkedData

One `@type: "Recipe"` object per recipe, distinguished by `name`:

```json
[
  { "@type": "NewsArticle", ... },
  { "@type": "WebPage", ... },
  { "@type": "Recipe", "name": "Spring onion pancakes with sesame sauce", "recipeIngredient": [...] },
  { "@type": "Recipe", "name": "Sesame dipping sauce", "recipeIngredient": [...] }
]
```

**Note:** The order of `SubheadingBlockElement` entries in `blocks[].elements` corresponds positionally to the order of `@type: "Recipe"` objects in `linkedData`. DCR does not currently exploit this correspondence — it only reads the recipe name from the subheading HTML.

---

## What DCR currently uses from all of this

| Data                                          | Used by DCR? | Where                                                                 |
| --------------------------------------------- | ------------ | --------------------------------------------------------------------- |
| `format.design === 'RecipeDesign'`            | Yes          | `ArticleRenderer.tsx` — triggers section grouping and nudge injection |
| `SubheadingBlockElement.html`                 | Yes          | `stripHtmlTags(html)` — produces `recipeName` for `FeastRecipeNudge`  |
| `SubheadingBlockElement.elementId`            | No           | CAPI UUID, not passed anywhere                                        |
| `pageId`                                      | Yes          | Passed to both nudge islands; used as `utm_content` in Adjust links   |
| `editionId`                                   | Yes          | Passed to `FeastContextualNudge` for US copy variant                  |
| `tags`                                        | Yes          | `tone/recipes` used in `age-warning.ts` to suppress staleness banner  |
| `linkedData` — `@type: "Recipe"`              | No           | Passed to `<head>` as JSON-LD only; never read by any React component |
| `linkedData` — `recipeIngredient[]`           | No           | Not used                                                              |
| `linkedData` — `recipeInstructions[]`         | No           | Not used                                                              |
| `linkedData` — `recipeYield`, `prepTime` etc. | No           | Not used                                                              |

---

## What is NOT in the payload (the gap)

| Missing field                                   | Why it matters                                                                                                                                                         | Where it probably lives                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Feast recipe ID**                             | Required for `deep_link_value` in Adjust deep links so users land on the specific recipe in the Feast app                                                              | Feast team's backend or CAPI RecipeAtom                                      |
| `SubheadingBlockElement.feastId`                | The natural place to attach a Feast ID in DCR's data model                                                                                                             | Does not exist yet                                                           |
| Structured ingredient quantities                | `recipeIngredient` in `linkedData` has `"275.0g flour"` — implies a `RecipeAtom` with numeric quantities exists somewhere upstream                                     | Likely in CAPI as a RecipeAtom, consumed by `frontend` to build `linkedData` |
| Per-subheading position mapping to `linkedData` | If there is a reliable positional correspondence between `SubheadingBlockElement[n]` and `linkedData.Recipe[n]`, DCR could read recipe data from `linkedData` directly | Implicit in current structure but not formalised                             |

---

## How to refresh this data

The fixture at `fixtures/generated/fe-articles/Recipe.ts` was generated by `gen-fixtures.js` and can be refreshed with:

```sh
make gen-fixtures
```

To inspect the live payload yourself:

```sh
curl "https://www.theguardian.com/food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes.json?dcr=true" | python3 -m json.tool | less
```
