# Recipe Article Data: Where it comes from and what we have

> **Goal of this document:** Explain the full data pipeline for recipe articles in DCR, catalogue every piece of recipe-related data that exists, identify where a Feast recipe ID would need to come from, and give the next engineer enough context to augment the pipeline with per-recipe deep links.

---

## The system at a glance

```
Composer (CMS) --> CAPI --> frontend (Scala) --> DCR --> Browser
```

Three services are involved before DCR even sees the data:

| Service                | What it is                                                                                                                               | Where it lives                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Composer**           | The Guardian's CMS. Journalists write and edit articles here.                                                                            | Internal tool, not public                    |
| **CAPI** (Content API) | The database/API that stores all Guardian content in typed block format                                                                  | `github.com/guardian/content-api` (internal) |
| **frontend**           | A Scala Play app that is the public-facing web backend. Fetches from CAPI, enriches data, either renders HTML itself or delegates to DCR | `github.com/guardian/frontend`               |
| **DCR**                | This repo. Receives data from `frontend` via HTTP POST and renders React HTML                                                            | `github.com/guardian/dotcom-rendering`       |

---

## Step 1: Authoring in Composer

A recipe article is written in Composer like any other article. The journalist writes:

-   An article intro/standfirst
-   One or more recipe sections, each starting with a subheading (e.g. `## Spring onion pancakes with sesame sauce`)
-   Ingredients as bold-text paragraphs
-   Method steps as numbered paragraphs

Importantly, there is **no structured recipe database entry** created in Composer. Ingredients are not entered as a list of rows in a database - they are authored as bolded prose inside a standard text body element. The structure comes from the editorial convention, not from a schema.

> Multi-recipe articles are also just a single article. The second, third, etc. recipes each start with their own `## Subheading`. There is no separate "recipe" record per sub-recipe.

---

## Step 2: Storage in CAPI

CAPI stores the article as a series of typed **block elements**. For a recipe article, the blocks look like this:

```
TextBlockElement       <- article intro paragraph
SubheadingBlockElement <- recipe title e.g. "Spring onion pancakes with sesame sauce"
TextBlockElement       <- prep/cook time and serving notes
TextBlockElement       <- ingredients (bold-formatted HTML)
TextBlockElement       <- method step 1
TextBlockElement       <- method step 2
...
```

The `SubheadingBlockElement` is just:

```ts
{
  _type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
  elementId: string,   // a CAPI-generated UUID for this element
  html: string,        // raw HTML e.g. '<h2>Spring onion pancakes with sesame sauce</h2>'
}
```

There is **no `recipeId` field**. There is **no link to a Feast recipe**. The `elementId` is an internal CAPI element UUID, not a Feast concept.

The article-level format is set to `RecipeDesign` by the content-api-scala-client based on the Tone tag `tone/recipes`:

```
@see https://github.com/guardian/content-api-scala-client/blob/master/
     client/src/main/scala/com.gu.contentapi.client/utils/format/Design.scala
```

Relevant CAPI tags present on a recipe article:

| Tag ID                  | Type          | Meaning                                                                              |
| ----------------------- | ------------- | ------------------------------------------------------------------------------------ |
| `tone/recipes`          | Tone          | Marks this as a recipe article; suppresses the "article may be outdated" age warning |
| `theguardian/feast`     | NewspaperBook | Published in the Feast print supplement                                              |
| `food/food`             | Keyword       | Appears in Food section                                                              |
| `food/vegan` etc.       | Keyword       | Dietary/cuisine keywords                                                             |
| `food/main-course` etc. | Keyword       | Meal-type keywords                                                                   |

---

## Step 3: The `frontend` backend enriches the data

When a reader requests a recipe article URL, `frontend`:

1. Fetches the article from CAPI
2. Converts CAPI block elements into the `FEElement` union type (defined in DCR at `src/types/content.ts`)
3. **Generates `linkedData`**, an array of schema.org JSON-LD objects for SEO. For recipe articles this includes a `@type: 'Recipe'` object (see below)
4. Sets the article format to `{ design: 'RecipeDesign', theme: 'LifestylePillar', display: 'StandardDisplay' }`
5. Serialises the whole lot as the `FEArticle` JSON type
6. In production: POSTs the JSON to DCR's `/Article` endpoint
7. In development: responds to `.json?dcr=true` requests (which DCR's dev server proxies)

### The `FEArticle` type

Defined at [src/frontend/feArticle.ts](../src/frontend/feArticle.ts). Key fields for recipes:

| Field           | Type                       | Notes                                                                       |
| --------------- | -------------------------- | --------------------------------------------------------------------------- |
| `format.design` | `'RecipeDesign'`           | Tells DCR to use the recipe layout and enable the Feast nudges              |
| `tags`          | `TagType[]`                | Includes `tone/recipes`, `theguardian/feast`, cuisine/dietary keywords      |
| `blocks`        | `Block[]`                  | The article body. Each block has an `elements` array of `FEElement`         |
| `linkedData`    | `{ [key: string]: any }[]` | Schema.org JSON-LD objects (see below)                                      |
| `pageId`        | `string`                   | e.g. `food/2021/feb/06/meera-sodhas-vegan-recipe-for-spring-onion-pancakes` |

---

## The schema.org `Recipe` object in `linkedData`

This is the most **structurally rich recipe data** in the entire pipeline. It lives in `FEArticle.linkedData` and is generated by `frontend` (not DCR). DCR passes it straight through to the HTML `<head>` as a JSON-LD `<script>` tag for search engines.

```jsonc
{
	"@context": "http://schema.org",
	"@type": "Recipe",
	"name": "Spring onion pancakes with sesame sauce",
	"description": "...",
	"image": "https://media.guim.co.uk/...",
	"datePublished": "2021-02-06T10:30:38Z",
	"url": "https://www.theguardian.com/food/2021/feb/06/...", // <-- article URL, NOT a Feast URL
	"recipeCategory": ["Lunch"],
	"recipeCuisine": ["Chinese"],
	"recipeIngredient": [
		// <-- structured ingredient list
		"275g plain flour, plus 2 tbsp extra",
		"Fine sea salt",
		"Coconut oil",
		"0.5tsp Chinese five spice powder",
		"6 spring onions, trimmed and finely sliced",
		"30g tahini",
		"..."
	],
	"recipeInstructions": [
		// <-- structured method steps
		{
			"@type": "HowToStep",
			"text": "Fill and boil half a kettle of water ...",
			"image": []
		},
		{
			"@type": "HowToStep",
			"text": "While the dough is resting ...",
			"image": []
		}
	],
	"recipeYield": ["Makes 4 pancakes, to serve 2 for lunch"],
	"prepTime": "PT5M",
	"cookTime": "PT60M",
	"totalTime": "PT95M",
	"author": { "@type": "Person", "name": "Meera Sodha" },
	"suitableForDiet": ["https://schema.org/VeganDiet", "..."]
}
```

### What this gives us

| Field                         | Status | Available in DCR?                          |
| ----------------------------- | ------ | ------------------------------------------ |
| Recipe name                   | Yes    | Yes, also in `SubheadingBlockElement.html` |
| Ingredients (string array)    | Yes    | In `linkedData` only                       |
| Method steps (structured)     | Yes    | In `linkedData` only                       |
| Prep, cook, total time        | Yes    | In `linkedData` only                       |
| Dietary tags                  | Yes    | In `linkedData` only                       |
| Category and cuisine          | Yes    | In `linkedData` only                       |
| **Feast recipe ID**           | **No** | **Not present anywhere**                   |
| Deep link value for Feast app | **No** | **Not present anywhere**                   |

For a multi-recipe article, there will be **one `@type: 'Recipe'` object per recipe** in the `linkedData` array (the `name` field distinguishes them).

---

## Step 4: DCR renders the article

DCR receives the `FEArticle` JSON at the `/Article` endpoint (`src/server/handler.article.web.ts`).

The pipeline inside DCR:

1. `validateAsFEArticle(body)` - validates the shape against the JSON schema
2. `enhanceArticleType(frontendData, 'Web')` - runs all the block enhancers (H2 IDs, blockquote styling, image lightbox, etc.)
3. `renderHtml({ article })` - server-side renders the React tree
4. `linkedData` is injected into `<head>` as `<script type="application/ld+json">`

### How recipe articles are rendered differently

In `ArticleRenderer.tsx`, when `format.design === ArticleDesign.Recipe`, the elements are **grouped into per-recipe sections** by splitting on `SubheadingBlockElement`:

```
Elements before first subheading  <- rendered as normal (article intro)
SubheadingBlockElement             <- recipe title rendered as <h2>
  TextBlockElement (ingredients)   |
  TextBlockElement (method step 1) |-- grouped into one "recipe section"
  TextBlockElement (method step 2) |
SubheadingBlockElement             <- second recipe title (if present)
  ...                              |-- second recipe section
```

Each section is wrapped in a `position: relative` container and gets:

-   A `FeastRecipeNudge` sticky left-column card (visible at 1300px+)
-   A `FeastContextualNudge` inline dismissable card (visible below 1300px)

The subheading title text is extracted via `stripHtmlTags(subheadingElement.html)` and passed as the `recipeName` prop to both nudge components. This is **the only recipe identifier currently available to DCR** at render time.

---

## The gap: no Feast recipe ID

The entire pipeline has zero knowledge of a Feast-specific recipe identifier. The only identifiers that exist are:

| Identifier          | Where                                    | What it is                                           |
| ------------------- | ---------------------------------------- | ---------------------------------------------------- |
| `pageId`            | `FEArticle.pageId`                       | Guardian article path, e.g. `food/2021/feb/06/...`   |
| `elementId`         | `SubheadingBlockElement.elementId`       | CAPI element UUID (random, not meaningful to Feast)  |
| Recipe `name`       | `SubheadingBlockElement.html` (stripped) | Plain-text recipe title as written by the journalist |
| `linkedData[n].url` | `FEArticle.linkedData`                   | Same as `pageId`, just as a full URL                 |

None of these map to a Feast app recipe. The Feast app has its own recipe database with its own IDs, and there is currently no published join between "Guardian article / subheading" and "Feast recipe ID".

---

## Where a Feast recipe ID would need to come from

There are two realistic approaches:

### Option A: Match on article path in the Feast backend

The Feast backend almost certainly stores a reference to the Guardian article path (`pageId`) for each recipe. If the Feast team can expose an API that accepts a Guardian `pageId` and returns a list of `{ recipeName, feastId }` pairs, DCR (or `frontend`) could call it at render time.

**Who to contact:** The Feast engineering team.  
**DCR change needed:** Add a server-side fetch in `handler.article.web.ts` (or in `frontend` before the POST to DCR) to look up Feast IDs, then pass them down through `SubheadingBlockElement` or as a new top-level field.

### Option B: Feast ID on the `SubheadingBlockElement` from `frontend`

The `frontend` Scala backend could be extended to attach a `feastId` field to `SubheadingBlockElement` when the article has `format.design === RecipeDesign`. This ID would need to come from a Feast API call or a joined data source.

**DCR change needed:** Add `feastId?: string` to the `SubheadingBlockElement` type in `src/types/content.ts`, then pass it from `ArticleRenderer.tsx` through to both island components, and finally into the `buildAppLink` deep link builder.

---

## Summary of the data pipeline

```
Journalist writes article in Composer
         |
         v
CAPI stores as typed block elements
  - SubheadingBlockElement: { elementId, html: '<h2>Recipe name</h2>' }
  - TextBlockElement: { html: '<p><strong>275g flour</strong>...' }
  - (no Feast IDs at this level)
         |
         v
frontend (Scala) fetches from CAPI and builds FEArticle
  - blocks[].elements: the block elements above
  - linkedData: schema.org JSON-LD including @type:'Recipe' with
      structured ingredients, method steps, timing, dietary info
  - format.design: 'RecipeDesign'
  - tags: includes tone/recipes, theguardian/feast, food keywords
  - pageId: the article path
         |
         v (HTTP POST to /Article)
DCR receives FEArticle
  - ArticleRenderer.tsx groups elements by SubheadingBlockElement
  - Recipe name extracted from subheading HTML
  - FeastRecipeNudge + FeastContextualNudge islands injected per section
  - linkedData injected into <head> as JSON-LD for SEO
         |
         v
Browser renders article with nudge cards
  - Nudge links go to guardian-feast.go.link with UTM params
  - No per-recipe deep link yet (no Feast ID available)
```

---

## Augmenting the pipeline: what to change where

Once a Feast recipe ID source is available, here is the minimum set of changes:

### 1. `src/types/content.ts`

Add `feastId` to `SubheadingBlockElement`:

```ts
export interface SubheadingBlockElement {
	_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement';
	elementId: string;
	html: string;
	feastId?: string; // NEW: Feast recipe identifier, e.g. "spring-onion-pancakes"
}
```

### 2. `src/frontend/feArticle.ts`

The `FEArticle` type already includes `blocks: Block[]`. No change needed at the article level if the ID is on the subheading element. If the ID comes at article level (single-recipe articles only), add:

```ts
feastRecipeIds?: Array<{ elementId: string; feastId: string }>;
```

### 3. `src/lib/ArticleRenderer.tsx`

In the `augmentedElements` IIFE, pass `data.feastId` through to both island components:

```ts
<FeastRecipeNudgeIsland
  recipeName={section.recipeName}
  feastId={section.feastId}   // NEW
  pageId={pageId}
  editionId={editionId}
/>
```

### 4. `src/components/FeastContextualNudge.tsx` and `FeastRecipeNudge.tsx`

In `buildAppLink`, add the `deep_link_value` parameter when `feastId` is available:

```ts
const buildAppLink = (
	pageId: string,
	campaign: string,
	feastId?: string,
): string => {
	const params = new URLSearchParams({
		utm_medium: 'ACQUISITIONS_NUDGE',
		utm_campaign: campaign,
		utm_content: pageId,
		utm_source: 'GUARDIAN_WEB',
		...(feastId ? { deep_link_value: feastId } : {}),
	});
	return `https://guardian-feast.go.link/p0nQT?${params.toString()}`;
};
```

### 5. `frontend` repository (out of scope for DCR)

The `frontend` Scala app needs to attach `feastId` to each `SubheadingBlockElement` when rendering recipe articles. This is where the Feast-to-CAPI join logic lives.

---

## File map (DCR files relevant to recipes)

```
src/types/content.ts
  SubheadingBlockElement        The only recipe-level element type, just elementId + html

src/types/blocks.ts
  Block                         Article body blocks; each has an elements: FEElement[] array

src/frontend/feArticle.ts
  FEArticle                     Full article payload from frontend; includes blocks + linkedData
  FEDesign                      'RecipeDesign' is one of the values

src/lib/articleFormat.ts
  decideFormat()                Maps 'RecipeDesign' string -> ArticleDesign.Recipe enum

src/lib/ArticleRenderer.tsx
  augmentedElements             Groups recipe elements by subheading; injects nudge islands

src/components/FeastContextualNudge.tsx
  buildAppLink()                Builds the Adjust deep link (no feastId yet - see placeholder comment)

src/components/FeastRecipeNudge.tsx
  Same buildAppLink pattern

fixtures/generated/fe-articles/Recipe.ts
  Real production data snapshot of a single-recipe article (Meera Sodha pancakes)
  Demonstrates exactly what frontend sends to DCR

scripts/test-data/gen-fixtures.js
  How fixtures are refreshed: fetches <url>.json?dcr from theguardian.com
```
