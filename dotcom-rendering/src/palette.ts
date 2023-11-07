// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source-foundations';
import { buttonThemeDefault } from '@guardian/source-react-components';
import { transparentColour } from './lib/transparentColour';

// ----- Palette Functions ----- //
/**
 * Picks a lightness of colour for a palette corresponding to the given pillar
 * N.b. it does not handle non-pillar themes
 * @param pillar
 * @param lightness
 */
const pillarPalette = (
	pillar: Pillar,
	lightness: 100 | 200 | 300 | 400 | 500 | 600 | 800,
): string => {
	switch (pillar) {
		case Pillar.News:
			return sourcePalette.news[lightness];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[lightness];
		case Pillar.Sport:
			return sourcePalette.sport[lightness];
		case Pillar.Culture:
			return sourcePalette.culture[lightness];
		case Pillar.Opinion:
			return sourcePalette.opinion[lightness];
		default:
			return sourcePalette.news[lightness];
	}
};

const headlineColourLight = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Feature:
			return sourcePalette.news[300];
		default:
			return sourcePalette.neutral[10];
	}
};
const headlineColourDark = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Feature:
			return sourcePalette.news[600];
		default:
			return sourcePalette.neutral[97];
	}
};
const headlineBackgroundColourLight = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.news[400];
		default:
			return sourcePalette.neutral[100];
	}
};
const headlineBackgroundColourDark = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.news[200];
		default:
			return sourcePalette.neutral[7];
	}
};

const bylineLight = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Analysis:
			return sourcePalette.neutral[46];
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[46];
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Letter:
		case ArticleDesign.Standard:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
	}
};

const bylineDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[60];
	}
};

const bylineBackgroundLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.brandAlt[400];
			}
		default:
			return sourcePalette.brandAlt[400];
	}
};

const bylineBackgroundDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.brandAlt[200];
			}
		default:
			return sourcePalette.brandAlt[200];
	}
};

const bylineAnchorLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.brandAlt[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.News:
				default:
					return sourcePalette.news[300];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
	}
};

const bylineAnchorDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};

const bylineHoverLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Sport:
					return sourcePalette.sport[200];
				case Pillar.Culture:
					return sourcePalette.culture[200];
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.brandAlt[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
				case Pillar.News:
				default:
					return sourcePalette.news[200];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[300];
			}
	}
};

const bylineHoverDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Culture:
					return sourcePalette.culture[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[600];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[600];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case Pillar.News:
				default:
					return sourcePalette.news[600];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[600];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Culture:
					return sourcePalette.culture[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[600];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[600];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Culture:
					return sourcePalette.culture[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[600];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[600];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Culture:
					return sourcePalette.culture[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[600];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
			}
	}
};

const bylineUnderline: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		default:
			return 'inherit';
	}
};

const avatarLight = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.News:
					return sourcePalette.news[500];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.News:
					return sourcePalette.news[500];
			}
	}
};

const avatarDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[20];
			}
		default:
			return sourcePalette.neutral[20];
	}
};

const followLight = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[86];
		case ArticleDesign.Analysis: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		}
		default: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
		}
	}
};

const followDark = ({ theme, design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[86];
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[60];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};

const starRatingFillColourLight = (): string => sourcePalette.neutral[7];
const starRatingFillColourDark = (): string => sourcePalette.neutral[0];
const starRatingBackgroundColourLight = (): string =>
	sourcePalette.brandAlt[400];
const starRatingBackgroundColourDark = (): string =>
	sourcePalette.brandAlt[200];

const blockQuoteFillLight = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
			}
		}
		case ArticleDesign.Analysis: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
			}
		}
		default: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
			}
		}
	}
};
const blockQuoteFillDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[60];
		default:
			switch (design) {
				case ArticleDesign.Analysis: {
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[300];
						case Pillar.Opinion:
							return sourcePalette.opinion[300];
						case Pillar.Sport:
							return sourcePalette.sport[400];
						case Pillar.Culture:
							return sourcePalette.culture[400];
						case Pillar.Lifestyle:
							return sourcePalette.lifestyle[400];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
						case ArticleSpecial.Labs:
							return sourcePalette.labs[400];
					}
				}
				default: {
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[400];
						case Pillar.Opinion:
							return sourcePalette.opinion[300];
						case Pillar.Sport:
							return sourcePalette.sport[400];
						case Pillar.Culture:
							return sourcePalette.culture[400];
						case Pillar.Lifestyle:
							return sourcePalette.lifestyle[400];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
						case ArticleSpecial.Labs:
							return sourcePalette.labs[400];
					}
				}
			}
	}
};
const quotedBlockquoteStylesLight = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return sourcePalette.neutral[7];

	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[7];
		case ArticleDesign.Analysis:
			return sourcePalette.neutral[7];
		default:
			return sourcePalette.neutral[46];
	}
};
const quotedBlockquoteStylesDark = (): string => sourcePalette.neutral[100];

const accordionTitleRowFillLight = (): string => sourcePalette.neutral[46];
const accordionTitleRowFillDark = (): string => sourcePalette.neutral[60];
const accordionTitleRowBackgroundLight = (): string =>
	sourcePalette.neutral[100];
const accordionTitleRowBackgroundDark = (): string => sourcePalette.neutral[10];
const accordionTitleRowBorderTopLight = (): string => sourcePalette.neutral[86];
const accordionTitleRowBorderTopDark = (): string => sourcePalette.neutral[20];
const accordionTitleLight = (): string => sourcePalette.neutral[7];
const accordionTitleDark = (): string => sourcePalette.neutral[86];
const accordionKeyEventsBackgroundLight = (): string =>
	sourcePalette.neutral[100];
const accordionBackgroundDark = (): string => sourcePalette.neutral[10];
const accordionLiveFeedBackgroundLight = (): string =>
	sourcePalette.neutral[97];

const tableOfContentsLight = (): string => sourcePalette.neutral[7];
const tableOfContentsDark = (): string => sourcePalette.neutral[86];
const tableOfContentsBorderLight = (): string => sourcePalette.neutral[86];
const tableOfContentsBorderDark = (): string => sourcePalette.neutral[20];

const adLabelsTextLight = (): string => {
	return sourcePalette.neutral[20];
};
const adLabelsTextDark = (): string => {
	return sourcePalette.neutral[100];
};
const adBackgroundLight = (): string => {
	return sourcePalette.neutral[97];
};
const adBackgroundDark = (): string => {
	return sourcePalette.neutral[20];
};
const adSupportBannerBackgroundLight = (): string => {
	return sourcePalette.neutral[93];
};
const adSupportBannerBackgroundDark = (): string => {
	return sourcePalette.neutral[46];
};
const adSupportBannerButtonBackgroundLight = (): string => {
	return sourcePalette.brand[400];
};
const adSupportBannerButtonBackgroundDark = (): string => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextLight = (): string => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextDark = (): string => {
	return sourcePalette.neutral[0];
};
const adSupportBannerTextLight = (): string => {
	return sourcePalette.brand[400];
};
const adSupportBannerTextDark = (): string => {
	return sourcePalette.neutral[100];
};

const appsFooterLinksTextLight = (): string => sourcePalette.neutral[7];
const appsFooterLinksTextDark = (): string => sourcePalette.neutral[60];
const appsFooterLinksBackgroundLight = (): string => sourcePalette.neutral[97];
const appsFooterLinksBackgroundDark = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[10];
		default:
			return sourcePalette.neutral[0];
	}
};
const clickToViewBackgroundLight = (): string => sourcePalette.neutral[97];
const clickToViewBackgroundDark = (): string => sourcePalette.neutral[20];
const clickToViewBorderLight = (): string => sourcePalette.neutral[86];
const clickToViewBorderDark = (): string => sourcePalette.neutral[46];
const clickToViewButtonLight = (): string => sourcePalette.brand[400];
const clickToViewButtonDark = (): string => sourcePalette.neutral[97];
const clickToViewButtonTextLight = (): string =>
	buttonThemeDefault.button.textPrimary;
const clickToViewButtonTextDark = (): string => sourcePalette.neutral[7];
const clickToViewButtonHoverLight = (): string =>
	buttonThemeDefault.button.backgroundPrimaryHover;
const clickToViewButtonHoverDark = (): string => sourcePalette.neutral[86];

const brandingLabelLight = (): string => sourcePalette.neutral[20];
const brandingLabelDark = (): string => sourcePalette.neutral[86];
const brandingLinkLight = ({ design, theme }: ArticleFormat): string => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
		case Pillar.News:
			switch (design) {
				case ArticleDesign.Analysis:
					return sourcePalette.news[300];
				default:
					return sourcePalette.news[400];
			}
		default:
			return pillarPalette(theme, 400);
	}
};
const brandingLinkDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};

const standfirstBulletDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[46];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[550];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.News:
					return sourcePalette.news[550];
				default:
					return sourcePalette.neutral[46];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				default:
					return sourcePalette.neutral[46];
			}
	}
};

const standfirstBulletLight = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return sourcePalette.neutral[60];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.news[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[86];
			}
	}
};

const standfirstLinkBorderLight = ({
	design,
	theme,
}: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[600];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.news[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[450];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return transparentColour(sourcePalette.neutral[60], 0.3);
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[60];
				default:
					return sourcePalette.neutral[86];
			}
	}
};
const standfirstLinkBorderDark = (): string => {
	return sourcePalette.neutral[46];
};

const standfirstLinkTextLight = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case Pillar.Culture:
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}

		case ArticleDesign.Picture:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
			}
	}
};
const standfirstLinkTextDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.neutral[60];
			}
		default: {
			return sourcePalette.neutral[60];
		}
	}
};

const standfirstTextLight = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		default:
			if (
				format.theme === ArticleSpecial.SpecialReportAlt &&
				format.design !== ArticleDesign.DeadBlog
			) {
				return sourcePalette.specialReportAlt[100];
			}
			return sourcePalette.neutral[0];
	}
};

const standfirstTextDark = ({
	design,
	display,
	theme,
}: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[93];
		case ArticleDesign.Gallery:
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			if (display === ArticleDisplay.Immersive) {
				switch (theme) {
					case ArticleSpecial.SpecialReportAlt:
						return sourcePalette.neutral[93];
					default:
						return sourcePalette.neutral[60];
				}
			}

			return sourcePalette.neutral[60];
		default:
			return sourcePalette.neutral[60];
	}
};

const captionTextLight = ({ design, theme }: ArticleFormat): string => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[100];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.PhotoEssay:
					return sourcePalette.news[100];
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[7];
			}
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[20];
		default:
			switch (design) {
				case ArticleDesign.PhotoEssay:
					switch (theme as ArticleTheme) {
						case Pillar.News:
							return sourcePalette.news[300];
						case Pillar.Opinion:
							return sourcePalette.opinion[300];
						case Pillar.Sport:
							return sourcePalette.sport[300];
						case Pillar.Culture:
							return sourcePalette.culture[300];
						case Pillar.Lifestyle:
							return sourcePalette.lifestyle[300];
						case ArticleSpecial.Labs:
							return sourcePalette.labs[300];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[300];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.news[100];
					}

				case ArticleDesign.Picture:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.neutral[46];
			}
	}
};

const captionTextDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[60];
	}
};

const captionLink = ({ design, theme }: ArticleFormat): string => {
	if (design === ArticleDesign.NewsletterSignup)
		return sourcePalette.neutral[0];
	if (design === ArticleDesign.Analysis && theme === Pillar.News)
		return sourcePalette.news[300];
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[400];
		case Pillar.Sport:
			return sourcePalette.sport[300];
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const captionOverlayText = (): string => {
	return sourcePalette.neutral[100];
};

const keyEventBulletLight = (): string => sourcePalette.neutral[46];
const keyEventBulletDark = (): string => sourcePalette.neutral[60];

const keyEventBulletHoverLight = (): string => sourcePalette.neutral[0];
const keyEventBulletHoverDark = (): string => sourcePalette.neutral[86];

const keyEventTitleLight = (): string => sourcePalette.neutral[7];
const keyEventTitleDark = (): string => sourcePalette.neutral[86];

const keyEventTextLight = ({ theme }: ArticleFormat): string => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[300];
		case Pillar.Sport:
			return sourcePalette.sport[300];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Culture:
			return sourcePalette.culture[300];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[300];
	}
};
const keyEventTextDark = ({ theme }: ArticleFormat): string => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[500];
		case Pillar.Opinion:
			return sourcePalette.opinion[500];
		case Pillar.Sport:
			return sourcePalette.sport[500];
		case Pillar.Culture:
			return sourcePalette.culture[500];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[500];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
	}
};

const keyEventBackgroundLight = (): string => sourcePalette.neutral[97];
const keyEventBackgroundDark = (): string => sourcePalette.neutral[10];

const keyEventBackgroundDesktopLight = (): string => sourcePalette.neutral[93];
const keyEventBackgroundDesktopDark = (): string => sourcePalette.neutral[7];

const keyEventBorderLight = (): string => sourcePalette.neutral[46];
const keyEventBorderDark = (): string => sourcePalette.neutral[60];
const keyEventButtonLight = (): string => sourcePalette.neutral[7];
const keyEventButtonDark = (): string => sourcePalette.neutral[86];
const keyEventButtonHoverLight = (): string => sourcePalette.brandAlt[300];
const keyEventButtonHoverDark = (): string => sourcePalette.neutral[60];
const keyEventButtonFillLight = (): string => sourcePalette.neutral[100];
const keyEventButtonFillDark = (): string => sourcePalette.neutral[7];

const summaryEventBulletLight = ({ theme }: ArticleFormat): string => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const summaryEventBulletDark = ({ theme }: ArticleFormat): string => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[500];
		case Pillar.Sport:
			return sourcePalette.sport[500];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[500];
		case Pillar.Culture:
			return sourcePalette.culture[500];
		case Pillar.Opinion:
			return sourcePalette.opinion[500];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[500];
	}
};
const summaryEventBulletHoverLight = ({ theme }: ArticleFormat): string => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[200];
		case Pillar.Sport:
			return sourcePalette.sport[200];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[200];
		case Pillar.Culture:
			return sourcePalette.culture[200];
		case Pillar.Opinion:
			return sourcePalette.opinion[200];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[200];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[200];
	}
};
const summaryEventBulletHoverDark = ({ theme }: ArticleFormat): string => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[550];
		case Pillar.Sport:
			return sourcePalette.sport[600];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[600];
		case Pillar.Culture:
			return sourcePalette.culture[600];
		case Pillar.Opinion:
			return sourcePalette.opinion[550];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[600];
	}
};

const articleBackgroundLight = ({ design, display, theme }: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				default:
					return sourcePalette.neutral[97];
			}
		// Order matters. We want comment special report pieces to have the opinion background
		case ArticleDesign.Letter:
			return sourcePalette.opinion[800];
		case ArticleDesign.Comment:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.opinion[800];
			}
		case ArticleDesign.Editorial:
			return sourcePalette.opinion[800];
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.news[800];
			}
		case ArticleDesign.Picture: {
			return sourcePalette.neutral[0];
		}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case ArticleSpecial.Labs:
					switch (display) {
						case ArticleDisplay.Immersive:
							return 'transparent';
						default:
							return sourcePalette.neutral[97];
					}
				default:
					return 'transparent';
			}
	}
};

const articleBackgroundDark = ({ design, theme }: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[7];
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[0];
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[10];
			}
		default:
			return sourcePalette.neutral[10];
	}
};

const articleSectionBackground = () => sourcePalette.brand[400];

const articleLinkHover = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Culture:
					return sourcePalette.culture[350];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[100];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Culture:
					return sourcePalette.culture[350];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[100];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Lifestyle:
					return sourcePalette.sport[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[100];
				case ArticleSpecial.SpecialReportAlt:
					switch (design) {
						case ArticleDesign.LiveBlog:
							return sourcePalette.specialReportAlt[200];
						default:
							return sourcePalette.specialReportAlt[200];
					}
			}
	}
};

const articleBorder = ({ design, theme }: ArticleFormat): string => {
	switch (theme) {
		case ArticleSpecial.SpecialReportAlt:
			return transparentColour(sourcePalette.neutral[60], 0.3);
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		default:
			switch (design) {
				case ArticleDesign.Picture:
					return transparentColour(sourcePalette.neutral[60], 0.5);
				default:
					return sourcePalette.neutral[86];
			}
	}
};

const articleBorderSecondary = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt)
		return transparentColour(sourcePalette.neutral[60], 0.3);
	if (format.design === ArticleDesign.Picture)
		return transparentColour(sourcePalette.neutral[60], 0.5);
	return sourcePalette.neutral[86];
};

const subNavBorder = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
	}
};

// ----- Palette ----- //

/**
 * A template literal type used to make sure the keys of the palette use the
 * correct CSS custom property syntax.
 */
type CSSCustomProperty = `--${string}`;
/**
 * Ensures that all palette functions provide the same API, deriving a palette
 * colour from an {@linkcode ArticleFormat}.
 */
type PaletteFunction = (f: ArticleFormat) => string;
/**
 * Used to validate that the palette object always has the correct shape,
 * without changing its type.
 */
type PaletteColours = Record<
	CSSCustomProperty,
	{
		light: PaletteFunction;
		dark: PaletteFunction;
	}
>;

/**
 * Maps palette colour names (which are also CSS custom property names) to
 * a pair of palette functions, which can be used to derive both light and dark
 * mode colours from an {@linkcode ArticleFormat}.
 *
 * This is not accessed directly in components; the {@linkcode palette} function
 * is used instead.
 */
const paletteColours = {
	'--byline': {
		light: bylineLight,
		dark: bylineDark,
	},
	'--byline-background': {
		light: bylineBackgroundLight,
		dark: bylineBackgroundDark,
	},
	'--byline-anchor': {
		light: bylineAnchorLight,
		dark: bylineAnchorDark,
	},
	'--byline-underline': {
		light: bylineUnderline,
		dark: bylineUnderline,
	},
	'--byline-hover': {
		light: bylineHoverLight,
		dark: bylineHoverDark,
	},
	'--headline-colour': {
		light: headlineColourLight,
		dark: headlineColourDark,
	},
	'--headline-background-colour': {
		light: headlineBackgroundColourLight,
		dark: headlineBackgroundColourDark,
	},
	'--star-rating-fill': {
		light: starRatingFillColourLight,
		dark: starRatingFillColourDark,
	},
	'--star-rating-background': {
		light: starRatingBackgroundColourLight,
		dark: starRatingBackgroundColourDark,
	},
	'--block-quote-fill': {
		light: blockQuoteFillLight,
		dark: blockQuoteFillDark,
	},
	'--quoted-block-quote-styles': {
		light: quotedBlockquoteStylesLight,
		dark: quotedBlockquoteStylesDark,
	},
	'--accordion-title-row-fill': {
		light: accordionTitleRowFillLight,
		dark: accordionTitleRowFillDark,
	},
	'--accordion-title-row-background': {
		light: accordionTitleRowBackgroundLight,
		dark: accordionTitleRowBackgroundDark,
	},
	'--accordion-title-row-border-top': {
		light: accordionTitleRowBorderTopLight,
		dark: accordionTitleRowBorderTopDark,
	},
	'--accordion-title': {
		light: accordionTitleLight,
		dark: accordionTitleDark,
	},
	'--accordion-key-events-background': {
		light: accordionKeyEventsBackgroundLight,
		dark: accordionBackgroundDark,
	},
	'--accordion-live-feed-background': {
		light: accordionLiveFeedBackgroundLight,
		dark: accordionBackgroundDark,
	},
	'--table-of-contents': {
		light: tableOfContentsLight,
		dark: tableOfContentsDark,
	},
	'--table-of-contents-border': {
		light: tableOfContentsBorderLight,
		dark: tableOfContentsBorderDark,
	},
	'--ad-background': {
		light: adBackgroundLight,
		dark: adBackgroundDark,
	},
	'--ad-labels-text': {
		light: adLabelsTextLight,
		dark: adLabelsTextDark,
	},
	'--ad-support-banner-button-background': {
		light: adSupportBannerButtonBackgroundLight,
		dark: adSupportBannerButtonBackgroundDark,
	},
	'--ad-support-banner-background': {
		light: adSupportBannerBackgroundLight,
		dark: adSupportBannerBackgroundDark,
	},
	'--ad-support-banner-button-text': {
		light: adSupportBannerButtonTextLight,
		dark: adSupportBannerButtonTextDark,
	},
	'--ad-support-banner-text': {
		light: adSupportBannerTextLight,
		dark: adSupportBannerTextDark,
	},
	'--apps-footer-links-text': {
		light: appsFooterLinksTextLight,
		dark: appsFooterLinksTextDark,
	},
	'--apps-footer-links-background': {
		light: appsFooterLinksBackgroundLight,
		dark: appsFooterLinksBackgroundDark,
	},
	'--click-to-view-background': {
		light: clickToViewBackgroundLight,
		dark: clickToViewBackgroundDark,
	},
	'--click-to-view-border': {
		light: clickToViewBorderLight,
		dark: clickToViewBorderDark,
	},
	'--click-to-view-button': {
		light: clickToViewButtonLight,
		dark: clickToViewButtonDark,
	},
	'--click-to-view-button-text': {
		light: clickToViewButtonTextLight,
		dark: clickToViewButtonTextDark,
	},
	'--click-to-view-button-hover': {
		light: clickToViewButtonHoverLight,
		dark: clickToViewButtonHoverDark,
	},
	'--avatar-background': {
		light: avatarLight,
		dark: avatarDark,
	},
	'--standfirst-text': {
		light: standfirstTextLight,
		dark: standfirstTextDark,
	},
	'--standfirst-bullet': {
		light: standfirstBulletLight,
		dark: standfirstBulletDark,
	},
	'--standfirst-link-text': {
		light: standfirstLinkTextLight,
		dark: standfirstLinkTextDark,
	},
	'--standfirst-link-border': {
		light: standfirstLinkBorderLight,
		dark: standfirstLinkBorderDark,
	},
	'--follow': {
		light: followLight,
		dark: followDark,
	},
	'--caption-text': {
		light: captionTextLight,
		dark: captionTextDark,
	},
	'--caption-link': {
		light: captionLink,
		dark: captionLink,
	},
	'--caption-overlay-text': {
		light: captionOverlayText,
		dark: captionOverlayText,
	},
	'--key-event-bullet': {
		light: keyEventBulletLight,
		dark: keyEventBulletDark,
	},
	'--key-event-bullet-hover': {
		light: keyEventBulletHoverLight,
		dark: keyEventBulletHoverDark,
	},
	'--key-event-title': {
		light: keyEventTitleLight,
		dark: keyEventTitleDark,
	},
	'--key-event-text': {
		light: keyEventTextLight,
		dark: keyEventTextDark,
	},
	'--key-event-background': {
		light: keyEventBackgroundLight,
		dark: keyEventBackgroundDark,
	},
	'--key-event-background-desktop': {
		light: keyEventBackgroundDesktopLight,
		dark: keyEventBackgroundDesktopDark,
	},
	'--key-event-border': {
		light: keyEventBorderLight,
		dark: keyEventBorderDark,
	},
	'--key-event-button': {
		light: keyEventButtonLight,
		dark: keyEventButtonDark,
	},
	'--key-event-button-hover': {
		light: keyEventButtonHoverLight,
		dark: keyEventButtonHoverDark,
	},
	'--key-event-button-fill': {
		light: keyEventButtonFillLight,
		dark: keyEventButtonFillDark,
	},
	'--summary-event-bullet': {
		light: summaryEventBulletLight,
		dark: summaryEventBulletDark,
	},
	'--summary-event-bullet-hover': {
		light: summaryEventBulletHoverLight,
		dark: summaryEventBulletHoverDark,
	},
	'--branding-label-text': {
		light: brandingLabelLight,
		dark: brandingLabelDark,
	},
	'--branding-link-text': {
		light: brandingLinkLight,
		dark: brandingLinkDark,
	},
	'--article-background': {
		light: articleBackgroundLight,
		dark: articleBackgroundDark,
	},
	'--article-section-background': {
		light: articleSectionBackground,
		dark: articleSectionBackground,
	},
	'--article-link-hover': {
		light: articleLinkHover,
		dark: articleLinkHover,
	},
	'--article-border': {
		light: articleBorder,
		dark: articleBorder,
	},
	'--article-border-secondary': {
		light: articleBorderSecondary,
		dark: articleBorderSecondary,
	},
	'--sub-nav-border': {
		light: subNavBorder,
		dark: subNavBorder,
	},
} satisfies PaletteColours;

/**
 * A union of all the keys of the palette object. In other words, all the
 * possible colours that can be chosen.
 */
type ColourName = keyof typeof paletteColours;

/**
 * Looks up a palette colour by name. Retrieves a CSS value for the specified
 * colour, for use in CSS declarations. See the examples for how this is
 * commonly used with our Emotion-based styles.
 *
 * @param a The name of a palette colour; for example `--headline-colour`.
 * @returns A CSS `var` function call; for example `var(--headline-colour)`.
 * @example
 * const styles = css`
 *   color: ${palette('--headline-colour')};
 *   background-color: ${palette('--headline-background-colour')};
 * `;
 */
const palette = (colour: ColourName): string => `var(${colour})`;

/**
 * Builds a list of CSS custom property declarations representing colours. These
 * can be used to set up the palette on any element, and then retrieved to apply
 * styles via the {@linkcode palette} function. See the examples for ways the
 * palette could be set up.
 *
 * @param format The `ArticleFormat` of the current article.
 * @param colourScheme Get declarations for either `light` or `dark` mode.
 * @returns A set of CSS custom property declarations for palette colours,
 * in string format. For example:
 * ```
 * [ '--headline-colour: #1a1a1a;', '--headline-background-colour: #ffffff;' ]
 * ```
 * @example
 * <caption>Create a single stylesheet to handle both colour schemes.</caption>
 * const paletteStyles = css`
 *   :root {
 *     ${paletteDeclarations(format, 'light').join('\n')}
 *   }
 *
 *   (@)media (prefers-color-scheme: dark) {
 *     :root {
 *       ${paletteDeclarations(format, 'dark').join('\n')}
 *     }
 *   }
 * `;
 * @example
 * <caption>Load separate stylesheets based on user preference.</caption>
 * // Use to build a file called 'light.css'.
 * const lightPalette = css`
 *   :root {
 *     ${paletteDeclarations(format, 'light').join('\n')}
 *   }
 * `;
 * // Use to build a file called 'dark.css'.
 * const darkPalette = css`
 *   :root {
 *     ${paletteDeclarations(format, 'dark').join('\n')}
 *   }
 * `;
 *
 * const stylesheets = (
 *   <>
 *     <link
 *       media="(prefers-color-scheme: light)"
 *       rel="stylesheet"
 *       href="light.css"
 *     />
 *     <link
 *       media="(prefers-color-scheme: dark)"
 *       rel="stylesheet"
 *       href="dark.css"
 *     />
 *   </>
 * );
 */
const paletteDeclarations = (
	format: ArticleFormat,
	colourScheme: 'light' | 'dark',
): string[] =>
	Object.entries(paletteColours).map(
		([colourName, colour]) =>
			`${colourName}: ${colour[colourScheme](format)};`,
	);

// ----- Exports ----- //

export { palette, paletteDeclarations };
