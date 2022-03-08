// ----- Imports ----- //

import { ArticleFormat } from '@guardian/libs';

import { fill } from './fill';
import { text } from './text';
import { background } from './background';
import { border } from './border';
import { hover } from './hover';

// ----- Types ----- //

type Colour = string;

interface Palette {
	text: {
		articleLink: Colour;
		bylineLeftColumn: Colour;
		bylineInline: Colour;
		bylineDark: Colour;
		follow: Colour;
		followDark: Colour;
		headline: Colour;
		headlineDark: Colour;
		keyEventsInline: Colour;
		keyEventsLeftColumn: Colour;
		kicker: Colour;
		linkDark: Colour;
		standfirst: Colour;
		standfirstDark: Colour;
		standfirstLink: Colour;
		seriesTitle: Colour;
		pagination: Colour;
	};
	background: {
		headline: Colour;
		headlineDark: Colour;
		standfirst: Colour;
		standfirstDark: Colour;
	};
	border: {
		articleLink: Colour;
		articleLinkDark: Colour;
		liveBlock: Colour;
		standfirstLink: Colour;
		standfirstLinkDark: Colour;
		pagination: Colour;
	};
	fill: {
		commentCount: Colour;
		icon: Colour;
		iconDark: Colour;
		blockquoteIcon: Colour;
	};
	hover: {
		pagination: Colour;
	};
}

// ----- API ----- //

const palette = (format: ArticleFormat): Palette => ({
	text: {
		articleLink: text.articleLink(format),
		bylineLeftColumn: text.bylineLeftColumn(format),
		bylineInline: text.bylineInline(format),
		bylineDark: text.bylineDark(format),
		follow: text.follow(format),
		followDark: text.followDark(format),
		headline: text.headline(format),
		headlineDark: text.headlineDark(format),
		keyEventsInline: text.keyEventsInline(format),
		keyEventsLeftColumn: text.keyEventsLeftColumn(format),
		kicker: text.kicker(format),
		linkDark: text.linkDark(format),
		standfirst: text.standfirst(format),
		standfirstDark: text.standfirstDark(format),
		standfirstLink: text.standfirstLink(format),
		seriesTitle: text.seriesTitle(format),
		pagination: text.pagination(format),
	},
	background: {
		headline: background.headline(format),
		headlineDark: background.headlineDark(format),
		standfirst: background.standfirst(format),
		standfirstDark: background.standfirstDark(format),
	},
	border: {
		articleLink: border.articleLink(format),
		articleLinkDark: border.articleLinkDark(format),
		liveBlock: border.liveBlock(format),
		standfirstLink: border.standfirstLink(format),
		standfirstLinkDark: border.standfirstLinkDark(format),
		pagination: border.pagination(format),
	},
	fill: {
		commentCount: fill.commentCount(format),
		icon: fill.icon(format),
		iconDark: fill.iconDark(format),
		blockquoteIcon: fill.blockquoteIcon(format),
	},
	hover: {
		pagination: hover.pagination(format),
	},
});

// ----- Exports ----- //

export type { Colour };

export { text, background, border, fill, hover, palette };
