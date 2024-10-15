import type { Decorator } from '@storybook/react';
import { lightDecorator, darkDecorator } from '../decorators/themeDecorator';
import { splitTheme } from '../decorators/splitThemeDecorator';
import {
	ArticleDisplay,
	ArticleDesign,
	Pillar,
	type ArticleFormat,
} from '../../src/lib/format';

const defaultFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

/**
 * A global type and toolbar item to control the colour scheme of the story.
 * It offers four options:
 *
 * 1. Light mode.
 * 2. Dark mode.
 * 3. Horizontal Split: display the story twice, on the left in light
 * mode and on the right in dark mode.
 * 4. Vertical Split: display the story twice, on the top in light
 * mode and on the bottom in dark mode.
 *
 * This is added to `globalTypes` in `preview.ts` to include it in the toolbar.
 * For more information on how this works see:
 * https://storybook.js.org/docs/essentials/toolbars-and-globals
 *
 * It relies on {@linkcode globalColourSchemeDecorator} to read the value that's
 * been set and apply the appropriate colours and layout.
 */
export const globalColourScheme = {
	description: 'View the story in light and dark mode, or both side-by-side',
	defaultValue: 'light',
	toolbar: {
		title: 'Colour Scheme',
		icon: 'mirror',
		items: [
			{ value: 'light', left: '☀️', title: 'Light' },
			{ value: 'dark', left: '🌙', title: 'Dark' },
			{
				value: 'horizontal',
				left: '◨',
				title: 'Horizontal Split',
			},
			{ value: 'vertical', left: '⬓', title: 'Vertical Split' },
		],
		dynamicTitle: true,
	},
} as const;

type ColourSchemeParameter =
	(typeof globalColourScheme.toolbar.items)[number]['value'];

/**
 * A decorator that reads the {@linkcode globalColourScheme} and applies a
 * colour palette and layout to the story based on the value. It's designed to
 * be used globally in `preview.ts` rather than at the story or component level,
 * as the toolbar item is available on all stories.
 *
 * It wraps a given story in a colour palette, which is applied via CSS
 * variables and defined in `palette.ts`. It makes use of other, existing
 * decorators to do this in each case: {@linkcode lightDecorator},
 * {@linkcode darkDecorator} and {@linkcode splitTheme}.
 *
 * To make use of a colour palette, an {@linkcode ArticleFormat} must be
 * available. There are three ways the decorator attempts to retrieve this,
 * in decreasing priority order (i.e. it will try 1, then 2, then 3):
 *
 * 1. If a list of formats is supplied via the story's `formats` parameter, it
 * will render the component multiple times, once for each format.
 * 2. If the story in question takes a `format` argument it renders the
 * component once, using that.
 * 3. If no format is available, it falls back to {@linkcode defaultFormat},
 * again rendering the component just once.
 *
 * For more information on `parameters` see:
 * https://storybook.js.org/docs/writing-stories/parameters
 *
 * @example
 * <caption>Using the `formats` parameter</caption>
 * const myStory = {
 *   args: {},
 *   parameters: {
 *     formats: [standardStandardNews, interviewImmersiveSport],
 *   },
 * } satisfies Story;
 *
 * @example
 * <caption>Using the story's `format` arg</caption>
 * const myStory = {
 *   args: {
 *     format: standardStandardNews,
 *   },
 * } satisfies Story;
 *
 * @example
 * <caption>Using the fallback `defaultFormat`</caption>
 * const myStory = {
 *   args: {},
 * } satisfies Story;
 */
export const globalColourSchemeDecorator: Decorator = (Story, context) => {
	const colourSchemeParameter: ColourSchemeParameter =
		context.globals.globalColourScheme;
	const formats = [
		context.parameters.formats ?? context.args.format ?? defaultFormat,
	].flat();

	switch (colourSchemeParameter) {
		case 'light':
			return lightDecorator(formats)(Story, context);
		case 'dark':
			return darkDecorator(formats)(Story, context);
		case 'horizontal':
			return splitTheme(formats, { orientation: 'horizontal' })(
				Story,
				context,
			);
		case 'vertical':
			return splitTheme(formats, { orientation: 'vertical' })(
				Story,
				context,
			);
	}
};
