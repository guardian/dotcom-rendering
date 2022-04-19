// ----- Imports ----- //

import {
	ArticleFormat,
	ArticleDisplay,
	ArticleDesign,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import {
	neutral,
	opinion,
	sport,
	culture,
	lifestyle,
	news,
	labs,
	specialReport,
	brandAlt,
} from '@guardian/source-foundations';
import { Colour } from '.';

// ----- Functions ----- //

const branding = (_format: ArticleFormat): Colour => {
	return neutral[20];
}

const brandingDark = (_format: ArticleFormat): Colour => {
	return neutral[86];
}

const dropCap = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.News:
			return news[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const headline = (format: ArticleFormat): Colour => {
	if (
		format.display === ArticleDisplay.Immersive ||
		format.design === ArticleDesign.Media ||
		format.design === ArticleDesign.LiveBlog
	) {
		return neutral[100];
	}

	if (format.design === ArticleDesign.DeadBlog) {
		return neutral[7];
	}

	if (
		format.design === ArticleDesign.Feature ||
		format.design === ArticleDesign.Review
	) {
		switch (format.theme) {
			case ArticlePillar.Opinion:
				return opinion[300];
			case ArticlePillar.Sport:
				return sport[300];
			case ArticlePillar.Culture:
				return culture[300];
			case ArticlePillar.Lifestyle:
				return lifestyle[300];
			default:
				return news[300];
		}
	}

	return neutral[7];
};

const headlineDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return format.theme === ArticlePillar.Culture
				? neutral[86]
				: neutral[93];
		case ArticleDesign.DeadBlog:
			return neutral[93];
		default:
			return neutral[86];
	}
};

const bylineLeftColumn = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
			}
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[300];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
			}
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}
	}
};

const bylineInline = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const follow = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[200];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const followDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[100];
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[500];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticlePillar.Opinion:
					return opinion[500];
				case ArticleSpecial.Labs:
					return specialReport[500];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
			}
	}
};

const bylineDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
};

const linkDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return specialReport[500];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
};

const articleLink = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[350];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return specialReport[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[300];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticleSpecial.Labs:
					return specialReport[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
			}
	}
};

const keyEventsInline = ({ theme }: ArticleFormat): Colour => {
	switch (theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Sport:
			return sport[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[400];
		case ArticlePillar.Culture:
			return culture[350];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[400];
	}
};

const keyEventsLeftColumn = ({ theme }: ArticleFormat): Colour => {
	switch (theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

const standfirst = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.Media:
			return neutral[86];
		default:
			return neutral[7];
	}
};

const standfirstDark = ({ design }: ArticleFormat): Colour => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[93];
		default:
			return neutral[60];
	}
};

const standfirstLink = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return neutral[100];
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[300];
				case ArticlePillar.Sport:
					return sport[300];
				case ArticlePillar.Culture:
					return culture[300];
				case ArticlePillar.Opinion:
					return opinion[200];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[300];
			}
		case ArticleDesign.Media:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[500];
				case ArticlePillar.Opinion:
					return opinion[500];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
			}
		default: {
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}
		}
	}
};

const standfirstLinkDark = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return neutral[100];
		case ArticleDesign.Media:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[500];
				case ArticlePillar.Opinion:
					return opinion[500];
				case ArticleSpecial.Labs:
					return labs[300];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
			}
		default: {
			return neutral[60];
		}
	}
};

const kicker = (format: ArticleFormat): Colour => {
	if (
		format.theme === ArticleSpecial.SpecialReport &&
		(format.design === ArticleDesign.Comment ||
			format.design === ArticleDesign.Letter)
	)
		return opinion[550];

	if (format.theme === ArticleSpecial.SpecialReport) {
		return brandAlt[400];
	}

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return neutral[100];
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticleSpecial.Labs:
				default:
					return neutral[0];
			}
		case ArticleDesign.Media:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Opinion:
					return opinion[550];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Culture:
					return culture[500];
				case ArticleSpecial.Labs:
					return labs[400];
				default:
					return news[600];
			}
		default:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Opinion:
					return opinion[300];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticleSpecial.Labs:
					return labs[400];
				default:
					return news[400];
			}
	}
};

const seriesTitle = (format: ArticleFormat): Colour => {
	switch (format.design) {
		case ArticleDesign.DeadBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[400];
				case ArticlePillar.Lifestyle:
					return lifestyle[400];
				case ArticlePillar.Sport:
					return sport[400];
				case ArticlePillar.Culture:
					return culture[400];
				case ArticlePillar.Opinion:
					return opinion[400];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[400];
			}

		case ArticleDesign.LiveBlog:
			switch (format.theme) {
				case ArticlePillar.News:
					return news[600];
				case ArticlePillar.Lifestyle:
					return lifestyle[500];
				case ArticlePillar.Sport:
					return sport[600];
				case ArticlePillar.Culture:
					return culture[600];
				case ArticlePillar.Opinion:
					return opinion[600];
				case ArticleSpecial.Labs:
					return labs[400];
				case ArticleSpecial.SpecialReport:
					return specialReport[500];
			}
	}
	switch (format.theme) {
		case ArticlePillar.News:
			return news[600];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[600];
		case ArticlePillar.Culture:
			return culture[600];
		case ArticlePillar.Opinion:
			return opinion[600];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
};

const seriesTitleDark = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[500];
		case ArticlePillar.Lifestyle:
			return lifestyle[500];
		case ArticlePillar.Sport:
			return sport[500];
		case ArticlePillar.Culture:
			return culture[500];
		case ArticlePillar.Opinion:
			return opinion[500];
		case ArticleSpecial.Labs:
			return labs[400];
		case ArticleSpecial.SpecialReport:
			return specialReport[500];
	}
};

const pagination = (format: ArticleFormat): Colour => {
	switch (format.theme) {
		case ArticlePillar.News:
			return news[400];
		case ArticlePillar.Lifestyle:
			return lifestyle[300];
		case ArticlePillar.Sport:
			return sport[300];
		case ArticlePillar.Culture:
			return culture[300];
		case ArticlePillar.Opinion:
			return opinion[300];
		case ArticleSpecial.Labs:
			return labs[300];
		case ArticleSpecial.SpecialReport:
			return specialReport[300];
	}
};

// ----- API ----- //

const text = {
	articleLink,
	branding,
	brandingDark,
	bylineLeftColumn,
	bylineInline,
	bylineDark,
	dropCap,
	follow,
	followDark,
	headline,
	headlineDark,
	keyEventsInline,
	keyEventsLeftColumn,
	kicker,
	linkDark,
	standfirst,
	standfirstDark,
	standfirstLink,
	standfirstLinkDark,
	seriesTitle,
	seriesTitleDark,
	pagination,
};

// ----- Exports ----- //

export { text };
