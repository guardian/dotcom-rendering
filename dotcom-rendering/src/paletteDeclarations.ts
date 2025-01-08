// ----- Imports ----- //
/* eslint sort-keys: ["error", "asc", { minKeys: 12, natural: true }]
  --
  the palette object is large and ordering helps knowing where to insert new elements
*/
import { palette as sourcePalette } from '@guardian/source/foundations';
import {
	buttonThemeBrand,
	buttonThemeDefault,
} from '@guardian/source/react-components';
import {
	expandingWrapperDarkTheme,
	expandingWrapperThemeDefault,
	tabsDarkTheme,
	tabsThemeDefault,
} from '@guardian/source-development-kitchen/react-components';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	type ArticleTheme,
	Pillar,
} from './lib/articleFormat';
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
	}
};

const textblockBulletLight: PaletteFunction = ({ theme, design }) => {
	switch (theme) {
		case Pillar.News: {
			return design === ArticleDesign.Analysis
				? sourcePalette.news[300]
				: sourcePalette.news[400];
		}
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle: {
			return pillarPalette(theme, 400);
		}
		case ArticleSpecial.Labs: {
			return sourcePalette.neutral[7];
		}
		case ArticleSpecial.SpecialReport: {
			return sourcePalette.specialReport[300];
		}
		case ArticleSpecial.SpecialReportAlt: {
			return sourcePalette.specialReportAlt[200];
		}
	}
};

const textblockTextLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Audio:
			return sourcePalette.neutral[97];
		default:
			return 'inherit';
	}
};

const textblockTextDark: PaletteFunction = () => 'inherit';

const headlineTextLight: PaletteFunction = ({ design, display, theme }) => {
	switch (display) {
		case ArticleDisplay.Immersive:
			return sourcePalette.neutral[97];
		default: {
			switch (design) {
				case ArticleDesign.Editorial:
				case ArticleDesign.Feature:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review: {
					switch (theme) {
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[200];
						case ArticleSpecial.Labs:
							return sourcePalette.labs[200];
						default:
							return pillarPalette(theme, 200);
					}
				}
				case ArticleDesign.LiveBlog: {
					switch (theme) {
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[200];
						default:
							return sourcePalette.neutral[100];
					}
				}
				case ArticleDesign.DeadBlog: {
					switch (theme) {
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[200];
						default:
							return sourcePalette.neutral[7];
					}
				}
				case ArticleDesign.Interview:
				case ArticleDesign.Picture:
				case ArticleDesign.Audio:
				case ArticleDesign.Video:
					switch (theme) {
						case ArticleSpecial.Labs:
							return sourcePalette.neutral[7];
						default:
							return sourcePalette.neutral[97];
					}
				default:
					return sourcePalette.neutral[7];
			}
		}
	}
};

const headlineTextDark: PaletteFunction = ({ design, display, theme }) => {
	switch (display) {
		case ArticleDisplay.Immersive:
			return sourcePalette.neutral[97];
		default: {
			switch (design) {
				case ArticleDesign.Editorial:
				case ArticleDesign.Feature:
				case ArticleDesign.Recipe:
				case ArticleDesign.Review: {
					switch (theme) {
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[700];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[500];
						case ArticleSpecial.Labs:
							return sourcePalette.labs[400];
						default:
							return pillarPalette(theme, 500);
					}
				}
				case ArticleDesign.DeadBlog: {
					switch (theme) {
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[500];
						default:
							return sourcePalette.neutral[97];
					}
				}
				case ArticleDesign.LiveBlog: {
					switch (theme) {
						case ArticleSpecial.SpecialReport:
							return sourcePalette.neutral[93];
						default:
							return sourcePalette.neutral[97];
					}
				}
				default:
					return sourcePalette.neutral[97];
			}
		}
	}
};

const headlineMatchTextLight: PaletteFunction = (format) =>
	seriesTitleMatchTextLight(format);

const headlineMatchTextDark: PaletteFunction = (format) =>
	seriesTitleMatchTextDark(format);

const headlineBackgroundLight: PaletteFunction = ({
	display,
	design,
	theme,
}) => {
	switch (display) {
		case ArticleDisplay.Immersive:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				default:
					return sourcePalette.neutral[7];
			}
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			switch (design) {
				case ArticleDesign.Interview:
					return sourcePalette.neutral[7];
				default:
					return 'transparent';
			}
		default:
			return 'transparent';
	}
};

const headlineBackgroundDark: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	if (display === ArticleDisplay.Immersive) return sourcePalette.neutral[7];

	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[7];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case ArticleSpecial.Labs:
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[200];
				default:
					return pillarPalette(theme, 200);
			}
		case ArticleDesign.Interview:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[20];
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
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

const headlineBlogBackgroundLight: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
				case ArticleSpecial.SpecialReportAlt:
				case ArticleSpecial.Labs:
					return sourcePalette.news[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Sport:
					return sourcePalette.sport[300];
				case Pillar.Culture:
					return sourcePalette.culture[300];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
			}
		default:
			return articleBackgroundLight({ design, display, theme });
	}
};

const headlineBlogBackgroundDark: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	return headlineBackgroundDark({ design, display, theme });
};

const headlineBylineLight: PaletteFunction = ({ design, display, theme }) => {
	switch (display) {
		case ArticleDisplay.Immersive: {
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				default:
					return pillarPalette(theme, 400);
			}
		}
		default:
			switch (design) {
				case ArticleDesign.Interview:
					return sourcePalette.neutral[7];
				default:
					return 'inherit';
			}
	}
};

const headlineBylineDark: PaletteFunction = ({ design, display, theme }) => {
	switch (display) {
		case ArticleDisplay.Immersive: {
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				default:
					return pillarPalette(theme, 500);
			}
		}
		default:
			switch (design) {
				case ArticleDesign.Interview:
					return sourcePalette.neutral[7];
				default:
					return 'inherit';
			}
	}
};

const bylineLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
			}
		case ArticleDesign.Analysis:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
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
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
	}
};

const bylineDark: PaletteFunction = ({ design, theme }) => {
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

const bylineAnchorLight: PaletteFunction = ({ design, theme, display }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Culture:
					return pillarPalette(theme, 300);
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.brandAlt[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.news[300];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		case ArticleDesign.Interview:
			switch (display) {
				case ArticleDisplay.Showcase:
				case ArticleDisplay.NumberedList:
				case ArticleDisplay.Standard:
					return sourcePalette.neutral[7];
				case ArticleDisplay.Immersive:
					switch (theme) {
						case Pillar.News:
						case Pillar.Opinion:
						case Pillar.Sport:
						case Pillar.Culture:
						case Pillar.Lifestyle:
							return pillarPalette(theme, 400);
						case ArticleSpecial.Labs:
							return sourcePalette.labs[300];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[100];
					}
			}
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Letter:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
		case ArticleDesign.Standard:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
			}
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
			}
	}
};

const bylineAnchorDark: PaletteFunction = ({ design, theme, display }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.Labs:
					return sourcePalette.news[500];
			}
		case ArticleDesign.Interview:
			switch (display) {
				case ArticleDisplay.Showcase:
				case ArticleDisplay.NumberedList:
				case ArticleDisplay.Standard:
					return sourcePalette.neutral[7];
				case ArticleDisplay.Immersive:
					switch (theme) {
						case Pillar.News:
						case Pillar.Opinion:
						case Pillar.Sport:
						case Pillar.Culture:
						case Pillar.Lifestyle:
							return pillarPalette(theme, 500);
						case ArticleSpecial.Labs:
							return sourcePalette.labs[400];
						case ArticleSpecial.SpecialReport:
							return sourcePalette.specialReport[500];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[700];
					}
			}
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Letter:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
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
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				default:
					return sourcePalette.neutral[60];
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
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 200);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.brandAlt[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 300);
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
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 300);
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
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 300);
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
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.Labs: {
					return sourcePalette.news[600];
				}
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
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
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
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
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
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 600);
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

const calloutPromptLight: PaletteFunction = () => sourcePalette.brand[500];
const calloutPromptDark: PaletteFunction = () => sourcePalette.brand[800];

const calloutSubmitTextLight: PaletteFunction = () =>
	buttonThemeDefault.button.textPrimary;
const calloutSubmitTextDark: PaletteFunction = () =>
	buttonThemeBrand.button.textPrimary;

const calloutSubmitBackgroundLight: PaletteFunction = () =>
	buttonThemeDefault.button.backgroundPrimary;
const calloutSubmitBackgroundDark: PaletteFunction = () =>
	buttonThemeBrand.button.backgroundPrimary;

const calloutSubmitBackgroundHoverLight: PaletteFunction = () =>
	buttonThemeDefault.button.backgroundPrimaryHover;
const calloutSubmitBackgroundHoverDark: PaletteFunction = () =>
	buttonThemeBrand.button.backgroundPrimaryHover;

export const expandingWrapper = {
	'--expandingWrapper--background': {
		light: () => expandingWrapperThemeDefault['--background'],
		dark: () => expandingWrapperDarkTheme['--background'],
	},
	'--expandingWrapper--border': {
		light: () => expandingWrapperThemeDefault['--border'],
		dark: () => expandingWrapperDarkTheme['--border'],
	},
	'--expandingWrapper--collapseBackground': {
		light: () => expandingWrapperThemeDefault['--collapseBackground'],
		dark: () => expandingWrapperDarkTheme['--collapseBackground'],
	},
	'--expandingWrapper--collapseBackgroundHover': {
		light: () => expandingWrapperThemeDefault['--collapseBackgroundHover'],
		dark: () => expandingWrapperDarkTheme['--collapseBackgroundHover'],
	},
	'--expandingWrapper--collapseText': {
		light: () => expandingWrapperThemeDefault['--collapseText'],
		dark: () => expandingWrapperDarkTheme['--collapseText'],
	},
	'--expandingWrapper--collapseTextHover': {
		light: () => expandingWrapperThemeDefault['--collapseTextHover'],
		dark: () => expandingWrapperDarkTheme['--collapseTextHover'],
	},
	'--expandingWrapper--text': {
		light: () => expandingWrapperThemeDefault['--text'],
		dark: () => expandingWrapperDarkTheme['--text'],
	},
	'--expandingWrapper--horizontalRules': {
		light: () => expandingWrapperThemeDefault['--horizontalRules'],
		dark: () => expandingWrapperDarkTheme['--horizontalRules'],
	},
	'--expandingWrapper--expandBackground': {
		light: () => expandingWrapperThemeDefault['--expandBackground'],
		dark: () => expandingWrapperDarkTheme['--expandBackground'],
	},
	'--expandingWrapper--expandBackgroundHover': {
		light: () => expandingWrapperThemeDefault['--expandBackgroundHover'],
		dark: () => expandingWrapperDarkTheme['--expandBackgroundHover'],
	},
	'--expandingWrapper--expandText': {
		light: () => expandingWrapperThemeDefault['--expandText'],
		dark: () => expandingWrapperDarkTheme['--expandText'],
	},
} satisfies {
	[Key in `--expandingWrapper${keyof typeof expandingWrapperThemeDefault}`]: {
		light: PaletteFunction;
		dark: PaletteFunction;
	};
};

export const tabs = {
	'--tabs--background': {
		light: () => tabsThemeDefault['--background'],
		dark: () => tabsDarkTheme['--background'],
	},
	'--tabs--text': {
		light: () => tabsThemeDefault['--text'],
		dark: () => tabsDarkTheme['--text'],
	},
	'--tabs--border': {
		light: () => tabsThemeDefault['--border'],
		dark: () => tabsDarkTheme['--border'],
	},
	'--tabs--inactiveBackground': {
		light: () => tabsThemeDefault['--inactiveBackground'],
		dark: () => tabsDarkTheme['--inactiveBackground'],
	},
} satisfies {
	[Key in `--tabs${keyof typeof tabsThemeDefault}`]: {
		light: PaletteFunction;
		dark: PaletteFunction;
	};
};

const datelineMobileLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.neutral[46];
		default:
			if (
				theme === ArticleSpecial.SpecialReportAlt &&
				design !== ArticleDesign.DeadBlog
			) {
				return sourcePalette.specialReportAlt[100];
			}
			return sourcePalette.neutral[46];
	}
};

const datelineLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[20];
			}
		case ArticleDesign.Analysis:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Interactive:
		case ArticleDesign.Interview:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.Review:
			return sourcePalette.neutral[60];
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[60];
			}
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[46];
			}
		default:
			return sourcePalette.neutral[46];
	}
};

const datelineDark: PaletteFunction = ({ design, theme }) => {
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
					return sourcePalette.neutral[93];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[60];
	}
};

const headlineBorder: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return 'rgba(255,255,255, 0.2)';
		case ArticleDesign.DeadBlog:
			return '#CDCDCD';
		default:
			return sourcePalette.neutral[86];
	}
};

const timelineBulletLight: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return pillarPalette(format.theme, 200);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[200];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const timelineBulletDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return pillarPalette(format.theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[700];
	}
};

const headingLineLight: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return pillarPalette(format.theme, 200);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[200];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const headingLineDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return pillarPalette(format.theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[700];
	}
};

const subheadingTextLight = ({ design, theme }: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 200);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
			}
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		default:
			return sourcePalette.neutral[7];
	}
};

const subheadingTextDark = ({ design, theme }: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
			}
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		default:
			return sourcePalette.neutral[86];
	}
};
const avatarLight: PaletteFunction = () => sourcePalette.neutral[93];

const avatarDark: PaletteFunction = () => sourcePalette.neutral[93];

const followTextLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[86];
		case ArticleDesign.LiveBlog:
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.neutral[97];
		default:
			return sourcePalette.neutral[7];
	}
};
const followTextDark: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[86];
		default:
			return sourcePalette.neutral[86];
	}
};

const followIconBackgroundLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[200];
				case Pillar.Sport:
					return sourcePalette.sport[200];
				case Pillar.Culture:
					return sourcePalette.culture[200];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[200];
				case Pillar.News:
				default:
					return sourcePalette.news[200];
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.news[800];
			}
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[7];
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.opinion[800];
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
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				default:
					return sourcePalette.neutral[100];
			}
		default:
			return sourcePalette.neutral[100];
	}
};
const followIconBackgroundDark: PaletteFunction = ({ theme, design }) => {
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

const followIconFillLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Gallery:
			switch (theme) {
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
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[600];
				case Pillar.Sport:
					return sourcePalette.sport[600];
				case Pillar.Culture:
					return sourcePalette.culture[600];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case Pillar.News:
				default:
					return sourcePalette.news[600];
			}
		case ArticleDesign.Standard: {
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.News:
				default:
					return sourcePalette.news[400];
			}
		}
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
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.News:
				default:
					return sourcePalette.news[400];
			}
		default:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[400];
				case Pillar.Sport:
					return sourcePalette.sport[400];
				case Pillar.Culture:
					return sourcePalette.culture[400];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				case Pillar.News:
				default:
					return sourcePalette.news[400];
			}
	}
};
const followIconFillDark: PaletteFunction = ({ theme, design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[93];
		case ArticleDesign.Standard:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
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
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
		default:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case Pillar.News:
				default:
					return sourcePalette.news[500];
			}
	}
};

const starRatingFillColourLight: PaletteFunction = () =>
	sourcePalette.neutral[7];
const starRatingFillColourDark: PaletteFunction = () =>
	sourcePalette.neutral[0];
const starRatingBackgroundColourLight: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const starRatingBackgroundColourDark: PaletteFunction = () =>
	sourcePalette.brandAlt[200];

const blockQuoteFillLight: PaletteFunction = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) {
		return sourcePalette.labs[300];
	}

	switch (format.design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog: {
			switch (format.theme) {
				case Pillar.News:
					return sourcePalette.neutral[46];
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 200);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline: {
			return sourcePalette.neutral[46];
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review: {
			switch (format.theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 200);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
		default: {
			switch (format.theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 400);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
	}
};

const blockQuoteFillDark: PaletteFunction = ({
	design,
	theme,
}: ArticleFormat) => {
	if (theme === ArticleSpecial.Labs) {
		return sourcePalette.labs[400];
	}

	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog: {
			switch (theme) {
				case Pillar.News:
					return sourcePalette.neutral[60];
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		}
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline: {
			return sourcePalette.neutral[60];
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review: {
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		}
		default:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
	}
};
const blockquoteTextLight: PaletteFunction = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return sourcePalette.neutral[7];
		default:
			switch (format.theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[46];
			}
	}
};
const blockquoteTextDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[100];
				default:
					return sourcePalette.neutral[60];
			}
		default:
			return sourcePalette.neutral[100];
	}
};

const blockQuoteLinkLight: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.Opinion:
			return pillarPalette(format.theme, 400);
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
	}
};

const blockQuoteLinkDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.Opinion:
			return pillarPalette(format.theme, 500);
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
	}
};

const bulletFillLight: PaletteFunction = (format: ArticleFormat) => {
	if (format.theme === ArticleSpecial.Labs) {
		return sourcePalette.labs[300];
	}

	if (format.theme === Pillar.News) {
		return sourcePalette.neutral[46];
	}

	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline: {
			return sourcePalette.neutral[46];
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review: {
			switch (format.theme) {
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 200);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
		default: {
			switch (format.theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(format.theme, 400);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		}
	}
};

const bulletFillDark: PaletteFunction = ({ design, theme }: ArticleFormat) => {
	if (theme === ArticleSpecial.Labs) {
		return sourcePalette.labs[400];
	}

	switch (design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline: {
			return sourcePalette.neutral[46];
		}
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review: {
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		}
		default:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
	}
};

const accordionTitleRowFillLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const accordionTitleRowFillDark: PaletteFunction = () =>
	sourcePalette.neutral[60];
const accordionTitleRowBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const accordionTitleRowBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];
const accordionTitleRowBorderTopLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const accordionTitleRowBorderTopDark: PaletteFunction = () =>
	sourcePalette.neutral[20];
const accordionTitleLight: PaletteFunction = () => sourcePalette.neutral[7];
const accordionTitleDark: PaletteFunction = () => sourcePalette.neutral[86];
const accordionBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];
const accordionBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];

const tableBlockTextLight: PaletteFunction = () => sourcePalette.neutral[7];
const tableBlockTextDark: PaletteFunction = () => sourcePalette.neutral[86];
const tableBlockBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const tableBlockBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[38];
const tableBlockStripeLight: PaletteFunction = () => sourcePalette.neutral[93];
const tableBlockStripeDark: PaletteFunction = () => sourcePalette.neutral[20];
const tableBlockTextFirstColumnLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const tableBlockTextFirstColumnDark: PaletteFunction = () =>
	sourcePalette.neutral[60];
const tableBlockBorderTopLight: PaletteFunction = () =>
	sourcePalette.brand[500];
const tableBlockBorderTopDark: PaletteFunction = () =>
	sourcePalette.neutral[60];

const tableOfContentsLight: PaletteFunction = () => sourcePalette.neutral[7];
const tableOfContentsDark: PaletteFunction = () => sourcePalette.neutral[86];
const tableOfContentsBorderLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const tableOfContentsBorderDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const podcastMetaTitleLight: PaletteFunction = () => sourcePalette.neutral[97];
const podcastMetaTitleDark: PaletteFunction = () => sourcePalette.neutral[97];
const podcastMetaButtonTextLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const podcastMetaButtonTextDark: PaletteFunction = () =>
	sourcePalette.neutral[86];
const podcastMetaButtonBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[20];
const podcastMetaButtonBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];
const podcastMetaButtonBackgroundHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[10];
const podcastMetaButtonBackgroundHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const adLabelsTextLight: PaletteFunction = () => sourcePalette.neutral[46];
const adLabelsTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const adBackgroundLight: PaletteFunction = () => sourcePalette.neutral[97];

const adBackgroundDark: PaletteFunction = () => sourcePalette.neutral[20];

const articleInnerAdBackgroundLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[93];
		default:
			return sourcePalette.neutral[97];
	}
};
const articleInnerAdBackgroundDark: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[7];
		default:
			return sourcePalette.neutral[20];
	}
};

const adBorderLight: PaletteFunction = () => sourcePalette.neutral[86];

const adBorderDark: PaletteFunction = () => sourcePalette.neutral[38];

const adSupportBannerBackgroundLight: PaletteFunction = () => {
	return sourcePalette.neutral[93];
};
const adSupportBannerBackgroundDark: PaletteFunction = () => {
	return sourcePalette.neutral[46];
};
const adSupportBannerButtonBackgroundLight: PaletteFunction = () => {
	return sourcePalette.brand[400];
};
const adSupportBannerButtonBackgroundDark: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextLight: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextDark: PaletteFunction = () => {
	return sourcePalette.neutral[0];
};
const adSupportBannerTextLight: PaletteFunction = () => {
	return sourcePalette.brand[400];
};
const adSupportBannerTextDark: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};

const appsFooterLinksTextLight: PaletteFunction = () =>
	sourcePalette.neutral[7];
const appsFooterLinksTextDark: PaletteFunction = () =>
	sourcePalette.neutral[60];
const appsFooterLinksTextHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[10];
const appsFooterLinksTextHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[46];
const appsFooterBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const appsFooterBackgroundDark: PaletteFunction = (format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[10];
		default:
			return sourcePalette.neutral[0];
	}
};
const clickToViewBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const clickToViewBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];
const clickToViewBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const clickToViewBorderDark: PaletteFunction = () => sourcePalette.neutral[46];
const clickToViewButtonLight: PaletteFunction = () => sourcePalette.brand[400];
const clickToViewButtonDark: PaletteFunction = () => sourcePalette.neutral[97];
const clickToViewButtonTextLight: PaletteFunction = () =>
	buttonThemeDefault.button.textPrimary;
const clickToViewButtonTextDark: PaletteFunction = () =>
	sourcePalette.neutral[7];
const clickToViewButtonHoverLight: PaletteFunction = () =>
	buttonThemeDefault.button.backgroundPrimaryHover;
const clickToViewButtonHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const brandingLabelLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
		case ArticleDesign.Picture:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[20];
				default:
					return sourcePalette.neutral[7];
			}
		default:
			return sourcePalette.neutral[20];
	}
};
const brandingLabelDark: PaletteFunction = () => sourcePalette.neutral[86];
const brandingBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const brandingBorderDark: PaletteFunction = () => sourcePalette.neutral[20];
const brandingLinkLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
		case Pillar.News:
			switch (design) {
				case ArticleDesign.Picture:
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return sourcePalette.neutral[86];
				case ArticleDesign.Analysis:
					return sourcePalette.news[300];
				default:
					return sourcePalette.news[400];
			}
		default:
			return pillarPalette(theme, 400);
	}
};
const brandingLinkDark: PaletteFunction = ({ design, theme }) => {
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

const standfirstBulletDark: PaletteFunction = ({ design, theme }) => {
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
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
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

const standfirstBulletLight: PaletteFunction = ({ design, theme }) => {
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
		case ArticleDesign.Video:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
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

const standfirstLinkBorderLight: PaletteFunction = ({ design, theme }) => {
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
		case ArticleDesign.Audio:
			return sourcePalette.neutral[86];
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
const standfirstLinkBorderDark: PaletteFunction = () => {
	return sourcePalette.neutral[46];
};

const standfirstBackgroundLight: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Sport:
					return sourcePalette.sport[100];
				case ArticleSpecial.Labs:
					return sourcePalette.news[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[200];
				default:
					return pillarPalette(theme, 200);
			}
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
				default:
					return sourcePalette.neutral[93];
			}
		default:
			return articleBackgroundLight({ design, display, theme });
	}
};

const standfirstBackgroundDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[10];
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.Opinion:
					return sourcePalette.opinion[100];
				case Pillar.Sport:
					return sourcePalette.sport[100];
				case Pillar.Culture:
					return sourcePalette.culture[100];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[100];
				case Pillar.News:
				default:
					return sourcePalette.news[100];
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
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return sourcePalette.neutral[10];
			}
		default:
			return sourcePalette.neutral[10];
	}
};

const standfirstBorder: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return 'rgba(255,255,255, 0.2)';
		case ArticleDesign.DeadBlog:
			return '#BDBDBD';
		default:
			return sourcePalette.neutral[86];
	}
};

const standfirstLinkTextLight: PaletteFunction = ({ design, theme }) => {
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
		case ArticleDesign.Video:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
			}
		case ArticleDesign.Audio:
			return sourcePalette.neutral[86];
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
const standfirstLinkTextDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			return sourcePalette.neutral[86];
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

const standfirstTextLight: PaletteFunction = (format) => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[100];
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (format.theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[0];
				default:
					return sourcePalette.neutral[86];
			}
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

const standfirstTextDark: PaletteFunction = ({ design, display, theme }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[93];
		case ArticleDesign.Gallery:
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
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

const cardBorderTopLight: PaletteFunction = () => sourcePalette.neutral[73];
const cardBorderTopDark: PaletteFunction = (format) =>
	cardBorderTopLight(format);

const cardBorderSupportingLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const cardBorderSupportingDark: PaletteFunction = () =>
	sourcePalette.neutral[46];

const cardMetaTextLight: PaletteFunction = () => sourcePalette.neutral[46];

const cardMetaTextDark: PaletteFunction = () => sourcePalette.neutral[60];

const cardBackgroundLight: PaletteFunction = () => 'transparent';
const cardBackgroundDark: PaletteFunction = () => 'transparent';

const cardMediaBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const cardMediaBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const cardMediaIconLight: PaletteFunction = (format) =>
	cardMediaBackgroundLight(format);
const cardMediaIconDark: PaletteFunction = (format) =>
	cardMediaBackgroundDark(format);

const cardHeadlineTextLight: PaletteFunction = () => sourcePalette.neutral[7];

const cardTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const cardTrailTextLight: PaletteFunction = () => sourcePalette.neutral[38];
const cardTrailTextDark: PaletteFunction = () => sourcePalette.neutral[73];

const liveKickerBackgroundLight: PaletteFunction = (format) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle: {
			return pillarPalette(format.theme, 400);
		}
		case ArticleSpecial.SpecialReport:
			return sourcePalette.news[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
	}
};
const liveKickerBackgroundDark: PaletteFunction = (format) => {
	switch (format.theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle: {
			return pillarPalette(format.theme, 300);
		}
		case ArticleSpecial.SpecialReport:
			return sourcePalette.news[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
	}
};

const liveKickerTextLight: PaletteFunction = () => sourcePalette.neutral[97];

const liveKickerTextDark: PaletteFunction = () => sourcePalette.neutral[93];

const liveKickerPulsingDot: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[97], 0.75);

const cardKickerTextLight: PaletteFunction = (format) => {
	switch (format.theme) {
		case Pillar.Opinion:
			return pillarPalette(format.theme, 300);
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.News:
			return pillarPalette(format.theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.news[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const cardKickerTextDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.news[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const cardBackgroundHover: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[7], 0.1);

const captionTextLight: PaletteFunction = ({ design, theme }) => {
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
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.neutral[46];
			}
	}
};

const captionTextDark: PaletteFunction = ({ design, theme }) => {
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

const captionPhotoEssayMainMediaTextLight = () => sourcePalette.neutral[46];
const captionPhotoEssayMainMediaTextDark = () => sourcePalette.neutral[60];

const captionLink: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.NewsletterSignup) {
		return sourcePalette.neutral[0];
	}
	if (design === ArticleDesign.Analysis && theme === Pillar.News) {
		return sourcePalette.news[300];
	}
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

const captionOverlayText: PaletteFunction = () => {
	return sourcePalette.neutral[100];
};

const keyEventBulletLight: PaletteFunction = () => sourcePalette.neutral[46];
const keyEventBulletDark: PaletteFunction = () => sourcePalette.neutral[60];

const keyEventBulletHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[0];
const keyEventBulletHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const keyEventTitleLight: PaletteFunction = () => sourcePalette.neutral[7];
const keyEventTitleDark: PaletteFunction = () => sourcePalette.neutral[86];

const keyEventTextLight: PaletteFunction = ({ theme }) => {
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
const keyEventTextDark: PaletteFunction = ({ theme }) => {
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

const keyEventBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const keyEventBackgroundDark: PaletteFunction = () => sourcePalette.neutral[10];

const keyEventBackgroundDesktopLight: PaletteFunction = () =>
	sourcePalette.neutral[93];
const keyEventBackgroundDesktopDark: PaletteFunction = () =>
	sourcePalette.neutral[7];

const keyEventBorderLight: PaletteFunction = () => sourcePalette.neutral[46];
const keyEventBorderDark: PaletteFunction = () => sourcePalette.neutral[60];
const keyEventButtonLight: PaletteFunction = () => sourcePalette.neutral[7];
const keyEventButtonDark: PaletteFunction = () => sourcePalette.neutral[86];
const keyEventButtonHoverLight: PaletteFunction = () =>
	sourcePalette.brandAlt[300];
const keyEventButtonHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[60];
const keyEventButtonFillLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const keyEventButtonFillDark: PaletteFunction = () => sourcePalette.neutral[7];

const numberedListNumberLight: PaletteFunction = () =>
	sourcePalette.neutral[46];

const numberedListNumberDark: PaletteFunction = () => sourcePalette.neutral[60];

const numberedListTitleLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Sport:
		case Pillar.Lifestyle:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const numberedListTitleDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Sport:
		case Pillar.Lifestyle:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
	}
};
const numberedListHeadingLight: PaletteFunction = () =>
	sourcePalette.neutral[7];

const numberedListHeadingDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const numberedListLinksLight: PaletteFunction = (format: ArticleFormat) =>
	numberedListTitleLight(format);

const numberedListLinksDark: PaletteFunction = (format: ArticleFormat) =>
	numberedListTitleDark(format);

const summaryEventBulletLight: PaletteFunction = ({ theme }) => {
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
const summaryEventBulletDark: PaletteFunction = ({ theme }) => {
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
const summaryEventBulletHoverLight: PaletteFunction = ({ theme }) => {
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
const summaryEventBulletHoverDark: PaletteFunction = ({ theme }) => {
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

const articleBackgroundLight: PaletteFunction = ({
	design,
	display,
	theme,
}) => {
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
		case ArticleDesign.Picture:
		case ArticleDesign.Audio:
		case ArticleDesign.Video: {
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.neutral[0];
			}
		}
		case ArticleDesign.Interactive:
		case ArticleDesign.FullPageInteractive:
			return 'transparent';
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case ArticleSpecial.Labs:
					switch (display) {
						case ArticleDisplay.Immersive:
							return sourcePalette.neutral[100];
						default:
							return sourcePalette.neutral[97];
					}
				default:
					return sourcePalette.neutral[100];
			}
	}
};

const articleBackgroundDark: PaletteFunction = ({ design, theme }) => {
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

const articleInnerBackgroundLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.neutral[0];
			}

		default:
			return 'transparent';
	}
};

const articleInnerBackgroundDark: PaletteFunction = (palette) =>
	articleInnerBackgroundLight(palette);

const articleSectionBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];

const articleSectionBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const articleSectionTitleLight: PaletteFunction = () =>
	sourcePalette.neutral[0];

const articleSectionTitleDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const articleLinkTextLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Audio) {
		return sourcePalette.neutral[86];
	}
	if (design === ArticleDesign.Analysis) return sourcePalette.news[300];
	switch (theme) {
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
		default:
			return pillarPalette(theme, 400);
	}
};

const articleLinkTextDark: PaletteFunction = ({ display, theme }) => {
	switch (display) {
		case ArticleDisplay.NumberedList: {
			switch (theme) {
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Lifestyle:
				case Pillar.Culture:
				case Pillar.Opinion:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		}
		default:
			return sourcePalette.neutral[86];
	}
};

const articleLinkBorderLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Audio) {
		return sourcePalette.neutral[46];
	}
	if (theme === ArticleSpecial.Labs) return sourcePalette.neutral[60];
	if (theme === ArticleSpecial.SpecialReport) {
		return sourcePalette.specialReport[300];
	}

	if (
		theme === ArticleSpecial.SpecialReportAlt &&
		design !== ArticleDesign.DeadBlog &&
		design !== ArticleDesign.LiveBlog
	) {
		return transparentColour(sourcePalette.neutral[60], 0.3);
	}

	return sourcePalette.neutral[86];
};

const articleLinkBorderDark: PaletteFunction = () => sourcePalette.neutral[46];

const articleMetaLinesDark: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.neutral[20];
		case ArticleDesign.Comment:
			return sourcePalette.neutral[20];
		case ArticleDesign.Interactive:
			return sourcePalette.neutral[46];
		default:
			return sourcePalette.neutral[20];
	}
};

const articleLinkHoverLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Audio) {
		return sourcePalette.neutral[86];
	}
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
					switch (design) {
						case ArticleDesign.LiveBlog:
							return sourcePalette.specialReportAlt[200];
						default:
							return sourcePalette.specialReportAlt[200];
					}
			}
	}
};

const articleLinkHoverDark: PaletteFunction = (f) => articleLinkTextDark(f);

const articleLinkBorderHoverLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Audio) {
		return sourcePalette.neutral[86];
	}

	if (theme === ArticleSpecial.Labs) {
		return sourcePalette.neutral[7];
	}

	if (theme === ArticleSpecial.SpecialReport) {
		return sourcePalette.specialReport[100];
	}

	if (
		theme === ArticleSpecial.SpecialReportAlt &&
		design !== ArticleDesign.LiveBlog &&
		design !== ArticleDesign.DeadBlog
	) {
		return sourcePalette.specialReportAlt[200];
	}

	if (design === ArticleDesign.Analysis && theme === Pillar.News) {
		return sourcePalette.news[300];
	}
	if (theme === ArticleSpecial.SpecialReportAlt) {
		return sourcePalette.specialReportAlt[200];
	}
	return pillarPalette(theme, 400);
};

const articleLinkBorderHoverDark: PaletteFunction = (f) =>
	articleLinkTextDark(f);

const articleBorderLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.SpecialReportAlt:
			return transparentColour(sourcePalette.neutral[60], 0.3);
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		default:
			switch (design) {
				case ArticleDesign.Picture:
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return transparentColour(sourcePalette.neutral[60], 0.5);
				default:
					return sourcePalette.neutral[86];
			}
	}
};

const articleBorderDark: PaletteFunction = () => sourcePalette.neutral[20];

const straightLinesLight: PaletteFunction = (format) => {
	if (format.theme === ArticleSpecial.SpecialReportAlt) {
		return transparentColour(sourcePalette.neutral[60], 0.3);
	}
	if (
		format.design === ArticleDesign.Picture ||
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Audio
	) {
		return transparentColour(sourcePalette.neutral[60], 0.5);
	}
	if (format.theme === ArticleSpecial.Labs) return sourcePalette.neutral[60];
	return sourcePalette.neutral[86];
};

const straightLinesDark: PaletteFunction = ({ design, theme }) => {
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
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[20];
			}
		default:
			return sourcePalette.neutral[20];
	}
};

const subNavBorder: PaletteFunction = ({ design, theme }) => {
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
const subNavLinkHeaderLight: PaletteFunction = (format) => {
	switch (format.design) {
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.neutral[100];
		default:
			return sourcePalette.neutral[7];
	}
};
const subNavLinkHeaderDark: PaletteFunction = () => sourcePalette.neutral[100];
const subNavLinkFooterLight: PaletteFunction = () => sourcePalette.neutral[7];
const subNavLinkFooterDark: PaletteFunction = () => sourcePalette.neutral[100];
const subNavLinkHoverLight: PaletteFunction = (format) =>
	articleLinkHoverLight(format);
const subNavLinkHoverDark: PaletteFunction = (format) =>
	articleLinkHoverDark(format);
const subNavMoreLight: PaletteFunction = () => sourcePalette.neutral[60];
const subNavMoreDark: PaletteFunction = () => sourcePalette.neutral[38];

const navReaderRevenueLinkText: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const navSearchBarIcon: PaletteFunction = () => sourcePalette.neutral[100];
const navSearchBarText: PaletteFunction = () => sourcePalette.neutral[100];
const navSearchBarBackground: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[100], 0.1);

const pullQuoteTextLight: PaletteFunction = ({
	design,
	theme,
}: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
		case ArticleDesign.PhotoEssay:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 200);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[200];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
			}
		default:
			return sourcePalette.neutral[7];
	}
};

const pullQuoteTextDark: PaletteFunction = ({
	design,
	theme,
}: ArticleFormat) => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
		case ArticleDesign.PhotoEssay:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			return sourcePalette.neutral[97];
	}
};

const pullQuoteBackgroundLight: PaletteFunction = (format: ArticleFormat) => {
	const articleBackground = articleBackgroundLight(format);
	if (articleBackground === 'transparent') return sourcePalette.neutral[100];
	return articleBackground;
};

const pullQuoteBackgroundDark: PaletteFunction = (format: ArticleFormat) => {
	const articleBackground = articleBackgroundDark(format);
	if (articleBackground === 'transparent') return sourcePalette.neutral[0];
	return articleBackground;
};

const pullQuoteBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const pullQuoteBorderDark: PaletteFunction = () => sourcePalette.neutral[60];

const pullQuoteIconLight: PaletteFunction = (format: ArticleFormat) => {
	const text = pullQuoteTextLight(format);
	return text === sourcePalette.neutral[7]
		? pullQuoteBorderDark(format)
		: text;
};
const pullQuoteIconDark: PaletteFunction = (format: ArticleFormat) => {
	const text = pullQuoteTextDark(format);
	return text === sourcePalette.neutral[97]
		? pullQuoteBorderLight(format)
		: text;
};

const shareButtonLiveBlogMobileMetaLight: PaletteFunction = ({
	design,
	theme,
}) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return pillarPalette(theme, 200);
			}
	}
};

const shareButtonHoverLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[100];
				default:
					return sourcePalette.neutral[7];
			}
		default:
			return sourcePalette.neutral[100];
	}
};

const shareButtonHoverDark: PaletteFunction = () => sourcePalette.neutral[7];

const shareButtonBorderLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return sourcePalette.neutral[46];
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[60];
		default:
			return sourcePalette.neutral[86];
	}
};

const shareButtonBorderDark: PaletteFunction = () => sourcePalette.neutral[20];

const shareButtonBorderXSmallLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return sourcePalette.neutral[46];
		default:
			return sourcePalette.neutral[86];
	}
};

const shareButtonCopiedLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return sourcePalette.neutral[86];
		default:
			return sourcePalette.neutral[7];
	}
};

const shareButtonCopiedDark: PaletteFunction = () => sourcePalette.neutral[86];

const shareButtonLight: PaletteFunction = ({ design, theme, display }) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
			}
		case ArticleDesign.DeadBlog:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[400];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return pillarPalette(theme, 400);
			}
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
					return sourcePalette.news[300];
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];
				default:
					return pillarPalette(theme, 400);
			}
		default:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				default:
					if (
						design === ArticleDesign.NewsletterSignup &&
						display === ArticleDisplay.Standard
					) {
						return sourcePalette.neutral[7];
					}
					if (
						theme === ArticleSpecial.SpecialReportAlt &&
						design !== ArticleDesign.LiveBlog
					) {
						return sourcePalette.specialReportAlt[100];
					}
					if (theme === ArticleSpecial.SpecialReportAlt) {
						return sourcePalette.news[400];
					}
					return pillarPalette(theme, 400);
			}
	}
};

const shareButtonDark: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[7];
				default:
					return sourcePalette.neutral[86];
			}
		default:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
				default:
					return pillarPalette(theme, 500);
			}
	}
};

const matchNavBackgroundLight: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const matchNavBackgroundDark: PaletteFunction = () =>
	sourcePalette.brandAlt[200];

const matchNavText: PaletteFunction = () => sourcePalette.neutral[7];

const matchStatsBackgroundLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return sourcePalette.neutral[97];
		default:
			// One off colour for match stats
			// https://github.com/guardian/dotcom-rendering/issues/9531
			return '#d9edf6';
	}
};

const matchStatsBackgroundDark: PaletteFunction = () =>
	sourcePalette.sport[300];

const matchTabBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const matchTabBorderDark: PaletteFunction = () => sourcePalette.neutral[46];

const matchActiveTabBorderLight: PaletteFunction = () =>
	sourcePalette.sport[300];
const matchActiveTabBorderDark: PaletteFunction = () =>
	sourcePalette.sport[500];

const liveBlockContainerBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const liveBlockContainerBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const liveBlockBorderTopLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
		default:
			return pillarPalette(theme, 400);
	}
};

const liveBlockBorderTopDark: PaletteFunction = () => sourcePalette.neutral[60];

const liveBlockBorderBottomLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const liveBlockBorderBottomDark: PaletteFunction = () =>
	sourcePalette.neutral[46];

const subMetaLabelTextLight: PaletteFunction = ({ theme, design }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			switch (design) {
				case ArticleDesign.Picture:
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return sourcePalette.neutral[60];
				default:
					return sourcePalette.neutral[46];
			}
	}
};
const subMetaLabelTextDark: PaletteFunction = () => {
	return sourcePalette.neutral[86];
};
const subMetaBackgroundLight: PaletteFunction = ({
	design,
	theme,
	display,
}) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			switch (theme) {
				// specialreport blogs should have specialreport background
				case ArticleSpecial.SpecialReport:
					return sourcePalette.neutral[100];
				default:
					return sourcePalette.neutral[97];
			}
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
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.neutral[7];
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
							return sourcePalette.neutral[100];
						default:
							return sourcePalette.neutral[97];
					}
				default:
					return sourcePalette.neutral[100];
			}
	}
};

const subMetaBackgroundDark: PaletteFunction = ({ design, theme }) => {
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

const subMetaTextLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[100];
		default:
			switch (design) {
				case ArticleDesign.Picture:
				case ArticleDesign.Video:
				case ArticleDesign.Audio:
					return sourcePalette.neutral[86];
				case ArticleDesign.DeadBlog:
				case ArticleDesign.LiveBlog:
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.news[400];
						default:
							return pillarPalette(theme, 300);
					}
				case ArticleDesign.Analysis:
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[300];
						default:
							switch (theme) {
								case Pillar.Opinion:
									return sourcePalette.opinion[300];
								case ArticleSpecial.SpecialReportAlt:
									return sourcePalette.specialReportAlt[200];
								default:
									return pillarPalette(theme, 400);
							}
					}
				default:
					switch (theme) {
						case Pillar.Opinion:
							return sourcePalette.opinion[300];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
						default:
							return pillarPalette(theme, 400);
					}
			}
	}
};

const subMetaTextDark: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[700];

		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];

		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
		default:
			if (design === ArticleDesign.Picture) {
				return sourcePalette.neutral[86];
			} else {
				return pillarPalette(theme, 500);
			}
	}
};

const subMetaTextHoverLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			switch (theme) {
				case ArticleSpecial.Labs:
					return sourcePalette.neutral[100];
				default:
					return sourcePalette.neutral[7];
			}

		default:
			return sourcePalette.neutral[100];
	}
};

const syndicationButtonTextLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[100];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			return sourcePalette.neutral[46];
	}
};

const syndicationButtonTextDark: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[86];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[800];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			return sourcePalette.neutral[46];
	}
};

const syndicationButtonHoverLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.DeadBlog:
				case ArticleDesign.LiveBlog:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			return sourcePalette.neutral[86];
	}
};

const syndicationButtonHoverDark: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[38];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[100];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			return sourcePalette.neutral[46];
	}
};

const syndicationButtonBorder: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[60];
		case ArticleSpecial.SpecialReportAlt:
			switch (design) {
				case ArticleDesign.DeadBlog:
				case ArticleDesign.LiveBlog:
					return sourcePalette.neutral[86];
				default:
					return sourcePalette.specialReportAlt[100];
			}
		default:
			return sourcePalette.neutral[86];
	}
};

const interactiveBlockBackgroundLight: PaletteFunction = ({
	design,
	theme,
	display,
}) => {
	switch (design) {
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
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[800];
				case ArticleSpecial.Labs:
					switch (display) {
						case ArticleDisplay.Immersive:
							return sourcePalette.neutral[100];
						default:
							return sourcePalette.neutral[97];
					}
				default:
					return sourcePalette.neutral[100];
			}
	}
};

const interactiveBlockBackgroundDark = () => sourcePalette.neutral[100];

const interactiveBlockBackgroundDatawrapperDark: PaletteFunction = ({
	design,
	theme,
}) => {
	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[10]; // same as liveBlockContainerBackgroundDark
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
					return sourcePalette.specialReportAlt[100]; // same as articleBackgroundDark
				default:
					return sourcePalette.neutral[10]; // same as articleBackgroundDark
			}
		default:
			return sourcePalette.neutral[10]; // same as articleBackgroundDark
	}
};

const mostViewedHeadlineLight = (): string => sourcePalette.neutral[7];
const mostViewedHeadlineDark = (): string => sourcePalette.neutral[86];

const dropCapLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return pillarPalette(theme, 200);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[200];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReport[200];
	}
};

const dropCapDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.Opinion:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.News:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[700];
	}
};

const richLinkFillDark: PaletteFunction = ({ design, theme }) => {
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
				case Pillar.Opinion:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.News:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
			}
		default:
			switch (theme) {
				case Pillar.Opinion:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.News:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};

const appsEpicBackgroundLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.neutral[20];
		default:
			return sourcePalette.neutral[97];
	}
};
const appsEpicBackgroundDark: PaletteFunction = () => sourcePalette.neutral[20];

const appsEpicBorderLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.brandAlt[200];
		default:
			return sourcePalette.brandAlt[400];
	}
};

const appsEpicBorderDark: PaletteFunction = () => sourcePalette.brandAlt[200];

const appsEpicTextLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.neutral[97];
		default:
			return sourcePalette.neutral[7];
	}
};

const appsEpicTextDark: PaletteFunction = () => sourcePalette.neutral[97];

const linkKickerTextLight: PaletteFunction = ({ design, theme }) => {
	switch (design) {
		case ArticleDesign.Analysis:
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
					return sourcePalette.opinion[300];
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

const linkKickerTextDark: PaletteFunction = ({ theme }) => {
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
			return sourcePalette.news[500];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const ageWarningWrapperBackground: PaletteFunction = (format) => {
	switch (format.design) {
		case ArticleDesign.Interview:
			return 'transparent';
		default:
			return headlineBackgroundLight(format);
	}
};
const ageWarningBackgroundLight: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const ageWarningBackgroundDark: PaletteFunction = () =>
	sourcePalette.brandAlt[200];
const ageWarningText: PaletteFunction = () => sourcePalette.neutral[7];

const articleTextLight: PaletteFunction = () => sourcePalette.neutral[7];
const articleTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const carouselTextLight: PaletteFunction = () => sourcePalette.neutral[7];
const carouselTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const carouselBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const carouselBorderDark: PaletteFunction = () => sourcePalette.neutral[60];

const carouselArrowLight: PaletteFunction = () => sourcePalette.neutral[100];
const carouselArrowDark: PaletteFunction = () => sourcePalette.neutral[0];

const carouselArrowBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[0];
const carouselArrowBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const carouselArrowBackgroundHoverLight: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const carouselArrowBackgroundHoverDark: PaletteFunction = () =>
	sourcePalette.brandAlt[200];

const carouselDotLight: PaletteFunction = () => sourcePalette.neutral[93];
const carouselDotDark: PaletteFunction = () => sourcePalette.neutral[20];

const carouselDotHoverLight: PaletteFunction = () => sourcePalette.neutral[86];
const carouselDotHoverDark: PaletteFunction = () => sourcePalette.neutral[46];

const carouselActiveDotLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[100];
		default:
			return pillarPalette(theme, 400);
	}
};
const carouselActiveDotDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[700];
		default:
			return pillarPalette(theme, 500);
	}
};

const carouselTitleHighlightLight: PaletteFunction = ({ theme, design }) => {
	switch (theme) {
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.neutral[7];
		case Pillar.News:
			if (design === ArticleDesign.Analysis) {
				return sourcePalette.news[300];
			}
			return sourcePalette.news[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		default:
			return pillarPalette(theme, 400);
	}
};

const carouselTitleHighlightDark: PaletteFunction = ({ theme, design }) => {
	switch (theme) {
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.neutral[97];
		case Pillar.News:
			if (design === ArticleDesign.Analysis) {
				return sourcePalette.news[600];
			}
			return sourcePalette.news[500];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		default:
			return pillarPalette(theme, 500);
	}
};

const carouselChevronLight: PaletteFunction = () => sourcePalette.neutral[7];
const carouselChevronDark: PaletteFunction = () => sourcePalette.neutral[86];
const carouselChevronHoverLight: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[73], 0.2);
const carouselChevronHoverDark: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[73], 0.2);
const carouselChevronBorderLight: PaletteFunction = () =>
	sourcePalette.neutral[73];
const carouselChevronBorderDark: PaletteFunction = () =>
	sourcePalette.neutral[73];
const carouselChevronDisabledLight: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[7], 0.32);
const carouselChevronDisabledDark: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[86], 0.32);
const carouselChevronBorderDisabledLight: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[73], 0.32);
const carouselChevronBorderDisabledDark: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[73], 0.32);

const slideshowCaptionLight: PaletteFunction = () => sourcePalette.neutral[100];
const slideshowCaptionDark: PaletteFunction = () => sourcePalette.neutral[100];
const slideshowPaginationDotLight: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[7], 0.2);
const slideshowPaginationDotDark: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[86], 0.2);
const slideshowPaginationDotActiveLight: PaletteFunction = () =>
	sourcePalette.neutral[7];
const slideshowPaginationDotActiveDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const mostViewedFooterHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const mostViewedFooterHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const mostViewedTabBorderDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[500];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
	}
};

const mostViewedTabBorderLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 300);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[300];
	}
};

const richLinkTextLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis) return sourcePalette.news[300];
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[350];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.neutral[7];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const richLinkTextDark: PaletteFunction = () => sourcePalette.neutral[86];
const richLinkBackgroundLight: PaletteFunction = ({ design }) => {
	return design === ArticleDesign.Analysis
		? '#F2E8E6'
		: sourcePalette.neutral[97];
};
const richLinkBackgroundDark: PaletteFunction = () => sourcePalette.neutral[20];
const richLinkFillLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis) return sourcePalette.news[400];
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[350];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const richLinkBackgroundHoverLight: PaletteFunction = ({ design }) => {
	return design === ArticleDesign.Analysis
		? '#e9d9d5' //not available in colour palette. Check with design to update or change.
		: sourcePalette.neutral[93];
};
const richLinkBackgroundHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[10];
const richLinkHeaderLight: PaletteFunction = () => sourcePalette.neutral[0];
const richLinkHeaderDark: PaletteFunction = () => sourcePalette.neutral[100];
const richLinkBrandingTextLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const richLinkBorderLight: PaletteFunction = ({ design, theme }) => {
	switch (theme) {
		case Pillar.News:
			return design === ArticleDesign.Analysis
				? sourcePalette.news[300]
				: sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[350];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const richLinkBorderDark: PaletteFunction = () => sourcePalette.neutral[60];
const richLinkQuoteFillLight: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis && theme === Pillar.News) {
		return sourcePalette.news[300];
	}
	switch (theme) {
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Culture:
		case Pillar.Sport:
			return pillarPalette(theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const affiliateDisclaimerBackgroundLight: PaletteFunction = ({ design }) => {
	return design === ArticleDesign.Analysis
		? '#F2E8E6'
		: sourcePalette.neutral[97];
};
const affiliateDisclaimerBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];
const affiliateDisclaimerBackgroundHoverLight: PaletteFunction = ({
	design,
}) => {
	return design === ArticleDesign.Analysis
		? '#e9d9d5' //not available in colour palette. Check with design to update or change.
		: sourcePalette.neutral[93];
};
const affiliateDisclaimerBackgroundHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const seriesTitleBackgroundLight: PaletteFunction = ({ theme, display }) => {
	if (theme === ArticleSpecial.SpecialReport) {
		return sourcePalette.brandAlt[400];
	}
	switch (display) {
		case ArticleDisplay.Immersive:
			switch (theme) {
				case Pillar.Opinion:
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
		default:
			return 'transparent';
	}
};
const sectionTitleBackgroundLight: PaletteFunction = ({ theme, display }) => {
	switch (display) {
		case ArticleDisplay.Immersive:
			switch (theme) {
				case Pillar.Opinion:
				case Pillar.News:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 400);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[200];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[400];
			}
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
		default:
			return 'transparent';
	}
};
const seriesTitleTextLight: PaletteFunction = ({ theme, display, design }) => {
	if (theme === ArticleSpecial.Labs && design !== ArticleDesign.LiveBlog) {
		return sourcePalette.neutral[7];
	}
	if (
		theme === ArticleSpecial.SpecialReportAlt &&
		design !== ArticleDesign.LiveBlog &&
		design !== ArticleDesign.DeadBlog &&
		design !== ArticleDesign.Video &&
		design !== ArticleDesign.Audio
	) {
		return sourcePalette.specialReportAlt[100];
	}

	if (theme === ArticleSpecial.SpecialReport) {
		return sourcePalette.specialReport[300];
	}
	switch (display) {
		case ArticleDisplay.Immersive:
			return sourcePalette.neutral[100];
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
			switch (design) {
				case ArticleDesign.DeadBlog:
					switch (theme) {
						case Pillar.News:
						case Pillar.Opinion:
							return pillarPalette(theme, 400);
						case Pillar.Sport:
						case Pillar.Culture:
						case Pillar.Lifestyle:
							return pillarPalette(theme, 300);
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.news[400];
						case ArticleSpecial.Labs:
							return sourcePalette.labs[300];
					}

				case ArticleDesign.Analysis:
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[300];
						case Pillar.Opinion:
						case Pillar.Sport:
						case Pillar.Culture:
						case Pillar.Lifestyle:
							return pillarPalette(theme, 400);
						case ArticleSpecial.Labs:
							return sourcePalette.labs[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
					}
				case ArticleDesign.LiveBlog:
					switch (theme) {
						case Pillar.News:
							return sourcePalette.news[600];
						case Pillar.Sport:
						case Pillar.Lifestyle:
						case Pillar.Culture:
						case Pillar.Opinion:
						default:
							return sourcePalette.neutral[100];
					}
				case ArticleDesign.MatchReport:
					return sourcePalette.neutral[7];
				case ArticleDesign.Picture:
				case ArticleDesign.Video:
					return sourcePalette.neutral[86];
				case ArticleDesign.Audio:
					switch (theme) {
						case Pillar.Opinion:
						case Pillar.News:
						case Pillar.Sport:
						case Pillar.Culture:
						case Pillar.Lifestyle:
							return pillarPalette(theme, 500);
						case ArticleSpecial.Labs:
							return sourcePalette.labs[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
					}
				default:
					switch (theme) {
						case Pillar.Opinion:
						case Pillar.News:
						case Pillar.Sport:
						case Pillar.Culture:
						case Pillar.Lifestyle:
							return pillarPalette(theme, 400);
						case ArticleSpecial.Labs:
							return sourcePalette.labs[400];
						case ArticleSpecial.SpecialReportAlt:
							return sourcePalette.specialReportAlt[200];
					}
			}
		default:
			return sourcePalette.neutral[7];
	}
};
const seriesTitleTextDark: PaletteFunction = ({ design, theme, display }) => {
	if (display === ArticleDisplay.Immersive) return sourcePalette.neutral[100];
	switch (design) {
		case ArticleDesign.Analysis:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[700];
				case ArticleSpecial.SpecialReport:
				case ArticleSpecial.Labs:
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
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
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
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
			}
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
		case ArticleDesign.Audio:
			return sourcePalette.neutral[60];
		default:
			switch (theme) {
				case Pillar.News:
				case Pillar.Opinion:
				case Pillar.Sport:
				case Pillar.Culture:
				case Pillar.Lifestyle:
					return pillarPalette(theme, 500);
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[500];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
			}
	}
};
const seriesTitleMatchTextLight: PaletteFunction = (format) => {
	if (
		format.design === ArticleDesign.MatchReport ||
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return sourcePalette.neutral[7];
	}
	return seriesTitleTextLight(format);
};
const seriesTitleMatchTextDark: PaletteFunction = (format) => {
	if (
		format.design === ArticleDesign.MatchReport ||
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		return sourcePalette.neutral[7];
	}
	return seriesTitleTextDark(format);
};

const recaptchaButtonLight: PaletteFunction = () => sourcePalette.neutral[0];
const recaptchaButtonDark: PaletteFunction = () => sourcePalette.neutral[86];
const recaptchaButtonHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[20];
const recaptchaButtonHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[93];
const recaptchaButtonTextLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const recaptchaButtonTextDark: PaletteFunction = () => sourcePalette.neutral[7];
const recaptchaBorderLight: PaletteFunction = () => sourcePalette.neutral[7];
const recaptchaBorderDark: PaletteFunction = () => sourcePalette.neutral[86];
const privacyTextSupportingLight: PaletteFunction = () =>
	sourcePalette.neutral[0];
const privacyTextSupportingSubduedLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const privacyTextSupportingSubduedDark: PaletteFunction = () =>
	sourcePalette.neutral[60];

const privacyTextRegularLight: PaletteFunction = () => sourcePalette.neutral[7];
const privacyTextDark: PaletteFunction = () => sourcePalette.neutral[86];
const witnessTitleText: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
		default:
			return pillarPalette(theme, 400);
	}
};
const witnessTitleIcon: PaletteFunction = (format) => witnessTitleText(format);
const witnessTitleAuthor: PaletteFunction = (format) =>
	witnessTitleText(format);

const commentCountFill: PaletteFunction = ({ design, theme }) => {
	if (
		design === ArticleDesign.LiveBlog ||
		design === ArticleDesign.DeadBlog
	) {
		return sourcePalette.neutral[46];
	}
	if (theme === ArticleSpecial.Labs) return sourcePalette.neutral[7];
	if (theme === ArticleSpecial.SpecialReport) {
		return sourcePalette.specialReport[300];
	}

	if (theme === ArticleSpecial.SpecialReportAlt) {
		return sourcePalette.specialReportAlt[100];
	}

	if (design === ArticleDesign.Analysis) {
		switch (theme) {
			case Pillar.News:
				return sourcePalette.news[300];
			default:
				pillarPalette(theme, 400);
		}
	}
	if (design === ArticleDesign.Picture) {
		return sourcePalette.neutral[86];
	}
	return pillarPalette(theme, 400);
};

const commentCountFillDark: PaletteFunction = ({ design, theme }) => {
	if (
		design === ArticleDesign.LiveBlog ||
		design === ArticleDesign.DeadBlog
	) {
		return sourcePalette.neutral[46];
	}
	if (theme === ArticleSpecial.Labs) return sourcePalette.neutral[86];
	if (theme === ArticleSpecial.SpecialReport) {
		return sourcePalette.specialReport[500];
	}

	if (theme === ArticleSpecial.SpecialReportAlt) {
		return sourcePalette.specialReportAlt[700];
	}

	if (design === ArticleDesign.Analysis) {
		switch (theme) {
			case Pillar.News:
				return sourcePalette.news[500];
			default:
				pillarPalette(theme, 500);
		}
	}
	if (design === ArticleDesign.Picture) {
		return sourcePalette.neutral[86];
	}
	return pillarPalette(theme, 500);
};

const mobileCommentCountFill: PaletteFunction = (format) => {
	if (format.design === ArticleDesign.LiveBlog) {
		switch (format.theme) {
			case Pillar.News:
			case Pillar.Opinion:
			case Pillar.Sport:
			case Pillar.Culture:
			case Pillar.Lifestyle:
				return pillarPalette(format.theme, 600);
			default:
				return sourcePalette.neutral[100];
		}
	}
	return commentCountFill(format);
};

const mobileCommentCountFillDark: PaletteFunction = (format) => {
	if (format.design === ArticleDesign.LiveBlog) {
		return sourcePalette.neutral[100];
	}
	return commentCountFillDark(format);
};

const explainerAtomBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const explainerAtomBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];
const explainerAtomAccentLight: PaletteFunction = () =>
	sourcePalette.neutral[7];
const explainerAtomAccentDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const signInLinkLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[100];
		default:
			return pillarPalette(theme, 300);
	}
};
const signInLinkDark: PaletteFunction = () => sourcePalette.neutral[100];

const signInLinkLineLight: PaletteFunction = () => sourcePalette.neutral[86];
const signInLinkLineDark: PaletteFunction = () => sourcePalette.neutral[60];

const topPickBackgroundLight: PaletteFunction = () => sourcePalette.neutral[93];
const topPickBackgroundDark: PaletteFunction = () => sourcePalette.neutral[20];

const topPickLinkLight: PaletteFunction = () => sourcePalette.brand[500];
const topPickLinkDark: PaletteFunction = () => sourcePalette.brand[800];

const staffLabelLight: PaletteFunction = () => sourcePalette.brand[400];
const staffLabelDark: PaletteFunction = () => sourcePalette.brand[800];

const staffPickLight: PaletteFunction = () => sourcePalette.neutral[7];
const staffPickDark: PaletteFunction = () => sourcePalette.neutral[86];

const staffPickBadgeLight: PaletteFunction = () => sourcePalette.neutral[7];
const staffPickBadgeDark: PaletteFunction = () => sourcePalette.neutral[100];

const staffPickBadgeTextLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const staffPickBadgeTextDark: PaletteFunction = () => sourcePalette.neutral[7];

const speechBubbleBackgroundLight: PaletteFunction = ({ theme, design }) => {
	switch (theme) {
		case Pillar.News:
			return design === ArticleDesign.Analysis
				? sourcePalette.news[300]
				: sourcePalette.news[400];
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return pillarPalette(theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const staffBadgeLight: PaletteFunction = () => sourcePalette.brand[400];
const staffBadgeDark: PaletteFunction = () => sourcePalette.neutral[100];

const staffBadgeTextLight: PaletteFunction = () => sourcePalette.neutral[100];
const staffBadgeTextDark: PaletteFunction = () => sourcePalette.brand[400];

const recommendationCountLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const recommendationCountDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const recommendationCountSelectedLight: PaletteFunction = () =>
	sourcePalette.brand[400];
const recommendationCountSelectedDark: PaletteFunction = () =>
	sourcePalette.brand[600];

const recommendationCountArrowLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const recommendationCountArrowDark: PaletteFunction = () =>
	sourcePalette.neutral[60];

const recommendationCountArrowSelectedLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const recommendationCountArrowSelectedDark: PaletteFunction = () =>
	sourcePalette.neutral[0];

const discussionSectionBackgroundLight: PaletteFunction = ({
	theme,
	design,
}) => {
	switch (theme) {
		case Pillar.Opinion:
			return sourcePalette.opinion[800];
		default:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[97];
				default:
					return sourcePalette.neutral[100];
			}
	}
};
const discussionSectionBackgroundDark: PaletteFunction = ({
	theme,
	design,
}) => {
	switch (theme) {
		case Pillar.Opinion:
			return sourcePalette.neutral[10];
		default:
			switch (design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return sourcePalette.neutral[0];
				default:
					return sourcePalette.neutral[10];
			}
	}
};

const discussionTextLight: PaletteFunction = () => sourcePalette.neutral[7];
const discussionTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const discussionAccentTextLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[400];
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 400);
		case Pillar.News:
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		default:
			return sourcePalette.news[400];
	}
};
const discussionAccentTextDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[500];
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case Pillar.News:
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		default:
			return sourcePalette.news[500];
	}
};

const discussionSubduedLight: PaletteFunction = () => sourcePalette.neutral[46];
const discussionSubduedDark: PaletteFunction = () => sourcePalette.neutral[60];

const discussionLinkLight: PaletteFunction = () => sourcePalette.brand[500];
const discussionLinkDark: PaletteFunction = () => sourcePalette.brand[800];

const discussionPrimaryButtonBackgroundLight: PaletteFunction = ({ theme }) => {
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
			return sourcePalette.opinion[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		default:
			return sourcePalette.news[300];
	}
};

const discussionPrimaryButtonBackgroundDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		default:
			return sourcePalette.news[500];
	}
};

const discussionButtonHover: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Opinion:
			// TODO - check if this is correct since it's the same shade as non-hover
			return sourcePalette.opinion[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case Pillar.News:
		case ArticleSpecial.SpecialReport:
		default:
			return sourcePalette.news[400];
	}
};

const discussionButtonTextLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const discussionButtonTextDark: PaletteFunction = () =>
	sourcePalette.neutral[7];

const discussionReportBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const discussionReportBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[0];

const discussionReportAbuseFormLabelText: PaletteFunction = () =>
	sourcePalette.neutral[7];

const discussionReportAbuseFormLabelTextDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const discussionReportBorder: PaletteFunction = () => sourcePalette.neutral[38];

const discussionReportBorderDark: PaletteFunction = () =>
	sourcePalette.neutral[60];

const discussionReportButton: PaletteFunction = () => sourcePalette.brand[400];

const discussionReportButtonDark: PaletteFunction = () =>
	sourcePalette.brand[600];

const discussionReportErrorText: PaletteFunction = () =>
	sourcePalette.error[400];

const discussionReportErrorTextDark: PaletteFunction = () =>
	sourcePalette.error[500];

const discussionReportSuccessText: PaletteFunction = () =>
	sourcePalette.success[400];

const discussionReportSuccessTextDark: PaletteFunction = () =>
	sourcePalette.success[500];

const discussionBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const discussionBorderDark: PaletteFunction = () => sourcePalette.neutral[20];

const commentFormInputBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const commentFormInputBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[0];

const commentFormHeaderBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const commentFormHeaderBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const discussionBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[93];
const discussionBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[38];

const discussionSelectedBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const discussionSelectedBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const discussionPreviewBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[93];
const discussionPreviewBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const discussionPaginationTextLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const discussionPaginationTextDark: PaletteFunction = () =>
	sourcePalette.neutral[86];

const discussionPaginationBorderLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const discussionPaginationBorderDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const discussionPaginationBorderHover: PaletteFunction = () =>
	sourcePalette.neutral[60];

const discussionPaginationBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const discussionPaginationBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[0];

const discussionLoadingBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[93];
const discussionLoadingBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const discussionLoadingShimmerLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const discussionLoadingShimmerDark: PaletteFunction = () =>
	sourcePalette.neutral[46];

const paginationTextLight: PaletteFunction = ({ theme }) => {
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
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};
const paginationTextDark: PaletteFunction = () => sourcePalette.neutral[86];

const interactiveContentsHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[93];
const interactiveContentsHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const audioAtomBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const audioAtomBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const audioAtomKickerLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[400];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};

const audioAtomKickerDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[500];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[500];
	}
};

const audioAtomBorderLight: PaletteFunction = () => sourcePalette.neutral[86];
const audioAtomBorderDark: PaletteFunction = () => sourcePalette.neutral[38];

const audioAtomIconsLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[400];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
	}
};

const audioAtomIconsDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[500];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[500];
	}
};

const audioAtomProgressBarLight: PaletteFunction = () =>
	sourcePalette.neutral[60];
const audioAtomProgressBarDark: PaletteFunction = () =>
	sourcePalette.neutral[60];

const expandableAtomBackgroundLight: PaletteFunction = ({ design }) => {
	switch (design) {
		case ArticleDesign.Analysis:
			return '#F2E8E6';
		default:
			return sourcePalette.neutral[93];
	}
};
const expandableAtomBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const expandableAtomTextHoverLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[400];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
		default:
			return pillarPalette(theme, 400);
	}
};

const expandableAtomTextHoverDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Opinion:
			return pillarPalette(theme, 500);
		case ArticleSpecial.Labs:
			return sourcePalette.lifestyle[500];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[500];
	}
};
const expandableAtomBorderLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const expandableAtomBorderDark: PaletteFunction = () =>
	sourcePalette.neutral[38];
const expandableAtomButtonLight: PaletteFunction = () =>
	sourcePalette.neutral[0];
const expandableAtomButtonDark: PaletteFunction = () =>
	sourcePalette.neutral[86];
const expandableAtomButtonFillLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const expandableAtomButtonFillDark: PaletteFunction = () =>
	sourcePalette.neutral[7];

const timelineAtomBulletLight: PaletteFunction = () => sourcePalette.neutral[7];
const timelineAtomBulletDark: PaletteFunction = () => sourcePalette.neutral[93];
sourcePalette.neutral[0];

const timelineAtomHighlightText: PaletteFunction = () =>
	sourcePalette.neutral[0];

const timelineAtomHighlightTextBackgroundLight: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const timelineAtomHighlightTextBackgroundDark: PaletteFunction = () =>
	sourcePalette.brandAlt[200];
sourcePalette.neutral[0];

const emailSignupButtonBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[0];
const emailSignupButtonBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[100];
const emailSignupButtonHoverLight: PaletteFunction = () =>
	sourcePalette.neutral[20];
const emailSignupButtonHoverDark: PaletteFunction = () =>
	sourcePalette.neutral[86];
const emailSignupButtonTextLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const emailSignupButtonTextDark: PaletteFunction = () =>
	sourcePalette.neutral[0];
const emailSignupTextSubduedLight: PaletteFunction = () => '';
const emailSignupTextSubduedDark: PaletteFunction = () => '';

const codeBlockBackgroundLight: PaletteFunction = () => '#f5f2f0';
const codeBlockBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[38];
const codeBlockTextShadowLight: PaletteFunction = () =>
	sourcePalette.neutral[100];
const codeBlockTextShadowDark: PaletteFunction = () => sourcePalette.neutral[0];

const lastUpdatedTextLight: PaletteFunction = ({ theme, design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Opinion:
					return pillarPalette(theme, 600);
				case ArticleSpecial.Labs:
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
			}
		default:
			return sourcePalette.neutral[0];
	}
};
const lastUpdatedTextDark: PaletteFunction = ({ theme, design }) => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			switch (theme) {
				case Pillar.News:
				case Pillar.Culture:
				case Pillar.Lifestyle:
				case Pillar.Sport:
				case Pillar.Opinion:
					return pillarPalette(theme, 600);
				case ArticleSpecial.Labs:
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[600];
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[700];
			}
		default:
			return sourcePalette.neutral[93];
	}
};

const bioLinkUnderline: PaletteFunction = () => sourcePalette.neutral[86];

const multiBylineNonLinkedTextLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const multiBylineNonLinkedTextDark: PaletteFunction = () =>
	sourcePalette.neutral[60];

const bioTextSubduedLight: PaletteFunction = () => sourcePalette.neutral[46];
const bioTextSubduedDark: PaletteFunction = () => sourcePalette.neutral[86];

const endNoteTextSubduedLight: PaletteFunction = () =>
	sourcePalette.neutral[46];
const endNoteTextSubduedDark: PaletteFunction = () => sourcePalette.neutral[86];

const interactiveAtomBackgroundLight: PaletteFunction = () => 'transparent';
const interactiveAtomBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[100];

const discussionPreModLight: PaletteFunction = () => sourcePalette.brand[500];
const discussionPreModDark: PaletteFunction = () => sourcePalette.brand[800];

const discussionCommentUnderlineLight: PaletteFunction = () =>
	sourcePalette.neutral[86];
const discussionCommentUnderlineDark: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[86], 0.5);

const timelineEventBorderLight: PaletteFunction = () =>
	sourcePalette.neutral[86];

const timelineEventBorderDark: PaletteFunction = () =>
	sourcePalette.neutral[20];

const mastheadTopBarBackground: PaletteFunction = () =>
	sourcePalette.brand[300];
const mastheadTopBarText: PaletteFunction = () => sourcePalette.neutral[100];
const mastheadTopBarLinkText: PaletteFunction = () =>
	sourcePalette.neutral[100];
const mastheadTopBarVerticalDivider: PaletteFunction = () =>
	sourcePalette.brand[600];

const mastheadNavBackground: PaletteFunction = () => sourcePalette.brand[400];
const mastheadNavLinkText: PaletteFunction = () => sourcePalette.neutral[100];
const mastheadNavLinkTextHover: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const mastheadNavBorder: PaletteFunction = () => sourcePalette.brand[600];
const mastheadNavLines: PaletteFunction = () => sourcePalette.brand[600];

const mastheadVeggieBurgerIcon: PaletteFunction = () =>
	sourcePalette.brand[400];
const mastheadVeggieBurgerBackground: PaletteFunction = () =>
	sourcePalette.brandAlt[400];
const mastheadVeggieBurgerBackgroundHover: PaletteFunction = () =>
	sourcePalette.brandAlt[300];

const mastheadHighlightsBackground: PaletteFunction = () =>
	sourcePalette.neutral[97];
const mastheadHighlightsBorder: PaletteFunction = () =>
	sourcePalette.neutral[60];

const highlightsCardHeadline: PaletteFunction = () => sourcePalette.neutral[7];
const highlightsCardKickerText: PaletteFunction = (format) => {
	switch (format.theme) {
		case Pillar.Opinion:
			return pillarPalette(format.theme, 300);
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.News:
			return pillarPalette(format.theme, 400);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.news[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const pinnedPostBorderLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Opinion:
			return pillarPalette(theme, 300);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[300];
	}
};
const pinnedPostBorderDark: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Culture:
		case Pillar.Lifestyle:
		case Pillar.Sport:
		case Pillar.Opinion:
			return pillarPalette(theme, 200);
		case ArticleSpecial.Labs:
			return sourcePalette.labs[200];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[200];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[200];
	}
};

const youtubeOverlayKicker: PaletteFunction = ({ theme }: ArticleFormat) => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[500];
		case Pillar.Opinion:
			return sourcePalette.news[500];
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
			return sourcePalette.news[500];
	}
};

const highlightContainerStartFade: PaletteFunction = () => {
	return sourcePalette.neutral[97];
};
const highlightContainerMidFade: PaletteFunction = () => {
	return 'rgba(250, 250, 250, 0.6)';
};

const highlightContainerEndFade: PaletteFunction = () => {
	return 'transparent';
};

const designTagText: PaletteFunction = ({ theme }) => {
	if (theme === ArticleSpecial.SpecialReportAlt) {
		return sourcePalette.specialReportAlt[800];
	}
	return sourcePalette.neutral[100];
};

const designTagBackground: PaletteFunction = ({ theme }) => {
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
			return sourcePalette.specialReportAlt[100];
	}
};

const cricketScoreboardBorderTop: PaletteFunction = () => {
	return sourcePalette.sport[300];
};

const cricketScoreboardDivider: PaletteFunction = () => {
	return sourcePalette.neutral[86];
};

const cricketScoreboardLinkText: PaletteFunction = () => {
	return sourcePalette.sport[300];
};

const imageTitleBackground: PaletteFunction = ({ design, theme }) => {
	if (design === ArticleDesign.Analysis && theme === Pillar.News) {
		return sourcePalette.news[300];
	}

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
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[400];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReportAlt[200];
	}
};

const lightboxDivider: PaletteFunction = (format) =>
	imageTitleBackground(format);

const cardSublinksBackgroundLight: PaletteFunction = () =>
	sourcePalette.neutral[97];
const cardSublinksBackgroundDark: PaletteFunction = () =>
	sourcePalette.neutral[10];

const latestLinksDottedLineLight: PaletteFunction = () =>
	sourcePalette.neutral[60];
const latestLinksDottedLineDark: PaletteFunction = () =>
	sourcePalette.neutral[38];

const editorialButtonBackground: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return sourcePalette.news[300];
		case Pillar.Culture:
			return sourcePalette.culture[300];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[300];
		case Pillar.Sport:
			return sourcePalette.sport[300];
		case Pillar.Opinion:
			return sourcePalette.opinion[300];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReport[300];
	}
};
const editorialButtonBackgroundHover: PaletteFunction = (
	format: ArticleFormat,
) => {
	switch (format.theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReport[400];
	}
};
const editorialButtonBorderHover: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReport[400];
	}
};

const editorialButtonText: PaletteFunction = (format: ArticleFormat) => {
	switch (format.theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Culture:
			return sourcePalette.culture[400];
		case Pillar.Lifestyle:
			return sourcePalette.lifestyle[400];
		case Pillar.Sport:
			return sourcePalette.sport[400];
		case Pillar.Opinion:
			return sourcePalette.opinion[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[400];
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.specialReport[200];
	}
};

const featureCardKickerTextLight: PaletteFunction = ({ theme }) => {
	switch (theme) {
		case ArticleSpecial.Labs:
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.neutral[86];
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return pillarPalette(theme, 600);
	}
};

const pillText: PaletteFunction = () => sourcePalette.neutral[100];
const pillBackground: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[7], 0.7);
const pillDivider: PaletteFunction = () =>
	transparentColour(sourcePalette.neutral[100], 0.5);

// ----- Palette ----- //

/**
 * A template literal type used to make sure the keys of the palette use the
 * correct CSS custom property syntax.
 *
 * IMPORTANT - do not use a CSS variable name ending in "label" as Storybook theming will fail
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
	...expandingWrapper,
	...tabs,
	'--accordion-background': {
		light: accordionBackgroundLight,
		dark: accordionBackgroundDark,
	},
	'--accordion-title': {
		light: accordionTitleLight,
		dark: accordionTitleDark,
	},
	'--accordion-title-row-background': {
		light: accordionTitleRowBackgroundLight,
		dark: accordionTitleRowBackgroundDark,
	},
	'--accordion-title-row-border-top': {
		light: accordionTitleRowBorderTopLight,
		dark: accordionTitleRowBorderTopDark,
	},
	'--accordion-title-row-fill': {
		light: accordionTitleRowFillLight,
		dark: accordionTitleRowFillDark,
	},
	'--ad-background': {
		light: adBackgroundLight,
		dark: adBackgroundDark,
	},
	'--ad-background-article-inner': {
		light: articleInnerAdBackgroundLight,
		dark: articleInnerAdBackgroundDark,
	},
	'--ad-border': {
		light: adBorderLight,
		dark: adBorderDark,
	},
	'--ad-labels-text': {
		light: adLabelsTextLight,
		dark: adLabelsTextDark,
	},
	'--ad-support-banner-background': {
		light: adSupportBannerBackgroundLight,
		dark: adSupportBannerBackgroundDark,
	},
	'--ad-support-banner-button-background': {
		light: adSupportBannerButtonBackgroundLight,
		dark: adSupportBannerButtonBackgroundDark,
	},
	'--ad-support-banner-button-text': {
		light: adSupportBannerButtonTextLight,
		dark: adSupportBannerButtonTextDark,
	},
	'--ad-support-banner-text': {
		light: adSupportBannerTextLight,
		dark: adSupportBannerTextDark,
	},
	'--affiliate-disclaimer-background': {
		light: affiliateDisclaimerBackgroundLight,
		dark: affiliateDisclaimerBackgroundDark,
	},
	'--affiliate-disclaimer-background-hover': {
		light: affiliateDisclaimerBackgroundHoverLight,
		dark: affiliateDisclaimerBackgroundHoverDark,
	},
	'--age-warning-background': {
		light: ageWarningBackgroundLight,
		dark: ageWarningBackgroundDark,
	},
	'--age-warning-text': {
		light: ageWarningText,
		dark: ageWarningText,
	},
	'--age-warning-wrapper-background': {
		light: ageWarningWrapperBackground,
		dark: ageWarningWrapperBackground,
	},
	'--apps-epic-background': {
		light: appsEpicBackgroundLight,
		dark: appsEpicBackgroundDark,
	},
	'--apps-epic-border': {
		light: appsEpicBorderLight,
		dark: appsEpicBorderDark,
	},
	'--apps-epic-text': {
		light: appsEpicTextLight,
		dark: appsEpicTextDark,
	},
	'--apps-footer-background': {
		light: appsFooterBackgroundLight,
		dark: appsFooterBackgroundDark,
	},
	'--apps-footer-links-text': {
		light: appsFooterLinksTextLight,
		dark: appsFooterLinksTextDark,
	},
	'--apps-footer-links-text-hover': {
		light: appsFooterLinksTextHoverLight,
		dark: appsFooterLinksTextHoverDark,
	},
	'--article-background': {
		light: articleBackgroundLight,
		dark: articleBackgroundDark,
	},
	'--article-border': {
		light: articleBorderLight,
		dark: articleBorderDark,
	},
	'--article-inner-background': {
		light: articleInnerBackgroundLight,
		dark: articleInnerBackgroundDark,
	},
	'--article-link-border': {
		light: articleLinkBorderLight,
		dark: articleLinkBorderDark,
	},
	'--article-link-border-hover': {
		light: articleLinkBorderHoverLight,
		dark: articleLinkBorderHoverDark,
	},
	'--article-link-text': {
		light: articleLinkTextLight,
		dark: articleLinkTextDark,
	},
	'--article-link-text-hover': {
		light: articleLinkHoverLight,
		dark: articleLinkHoverDark,
	},
	'--article-meta-lines': {
		light: articleBorderLight,
		dark: articleMetaLinesDark,
	},
	'--article-section-background': {
		light: articleSectionBackgroundLight,
		dark: articleSectionBackgroundDark,
	},
	'--article-section-title': {
		light: articleSectionTitleLight,
		dark: articleSectionTitleDark,
	},
	'--article-text': {
		light: articleTextLight,
		dark: articleTextDark,
	},
	'--audio-atom-background': {
		light: audioAtomBackgroundLight,
		dark: audioAtomBackgroundDark,
	},
	'--audio-atom-border': {
		light: audioAtomBorderLight,
		dark: audioAtomBorderDark,
	},
	'--audio-atom-icons': {
		light: audioAtomIconsLight,
		dark: audioAtomIconsDark,
	},
	'--audio-atom-kicker': {
		light: audioAtomKickerLight,
		dark: audioAtomKickerDark,
	},
	'--audio-atom-progress-bar': {
		light: audioAtomProgressBarLight,
		dark: audioAtomProgressBarDark,
	},
	'--avatar-background': {
		light: avatarLight,
		dark: avatarDark,
	},
	'--bio-link-underline': {
		light: bioLinkUnderline,
		dark: bioLinkUnderline,
	},
	'--bio-text-subdued': {
		light: bioTextSubduedLight,
		dark: bioTextSubduedDark,
	},
	'--block-quote-fill': {
		light: blockQuoteFillLight,
		dark: blockQuoteFillDark,
	},
	'--block-quote-link': {
		light: blockQuoteLinkLight,
		dark: blockQuoteLinkDark,
	},
	'--block-quote-text': {
		light: blockquoteTextLight,
		dark: blockquoteTextDark,
	},
	'--branding-border': {
		light: brandingBorderLight,
		dark: brandingBorderDark,
	},
	'--branding-label-text': {
		light: brandingLabelLight,
		dark: brandingLabelDark,
	},
	'--branding-link-text': {
		light: brandingLinkLight,
		dark: brandingLinkDark,
	},
	'--bullet-fill': {
		light: bulletFillLight,
		dark: bulletFillDark,
	},
	'--byline': {
		light: bylineLight,
		dark: bylineDark,
	},
	'--byline-anchor': {
		light: bylineAnchorLight,
		dark: bylineAnchorDark,
	},
	'--byline-background': {
		light: bylineBackgroundLight,
		dark: bylineBackgroundDark,
	},
	'--byline-hover': {
		light: bylineHoverLight,
		dark: bylineHoverDark,
	},
	'--byline-underline': {
		light: bylineUnderline,
		dark: bylineUnderline,
	},
	'--callout-highlight-background': {
		light: starRatingBackgroundColourLight,
		dark: starRatingBackgroundColourDark,
	},
	'--callout-highlight-text': {
		light: starRatingFillColourLight,
		dark: starRatingFillColourDark,
	},
	'--callout-prompt': {
		light: calloutPromptLight,
		dark: calloutPromptDark,
	},
	'--callout-submit-background': {
		light: calloutSubmitBackgroundLight,
		dark: calloutSubmitBackgroundDark,
	},
	'--callout-submit-background-hover': {
		light: calloutSubmitBackgroundHoverLight,
		dark: calloutSubmitBackgroundHoverDark,
	},
	'--callout-submit-text': {
		light: calloutSubmitTextLight,
		dark: calloutSubmitTextDark,
	},
	'--caption-link': {
		light: captionLink,
		dark: captionLink,
	},
	'--caption-overlay-text': {
		light: captionOverlayText,
		dark: captionOverlayText,
	},
	'--caption-photo-essay-main-media-text': {
		light: captionPhotoEssayMainMediaTextLight,
		dark: captionPhotoEssayMainMediaTextDark,
	},
	'--caption-text': {
		light: captionTextLight,
		dark: captionTextDark,
	},
	'--card-background': {
		light: cardBackgroundLight,
		dark: cardBackgroundDark,
	},
	'--card-background-hover': {
		light: cardBackgroundHover,
		dark: cardBackgroundHover,
	},
	'--card-border-supporting': {
		light: cardBorderSupportingLight,
		dark: cardBorderSupportingDark,
	},
	'--card-border-top': {
		light: cardBorderTopLight,
		dark: cardBorderTopDark,
	},
	'--card-footer-text': {
		light: cardMetaTextLight,
		dark: cardMetaTextDark,
	},
	'--card-headline': {
		light: cardHeadlineTextLight,
		dark: cardTextDark,
	},
	'--card-kicker-text': {
		light: cardKickerTextLight,
		dark: cardKickerTextDark,
	},
	'--card-media-background': {
		light: cardMediaBackgroundLight,
		dark: cardMediaBackgroundDark,
	},
	'--card-media-icon': {
		light: cardMediaIconLight,
		dark: cardMediaIconDark,
	},
	'--card-sublinks-background': {
		light: cardSublinksBackgroundLight,
		dark: cardSublinksBackgroundDark,
	},
	'--card-trail-text': {
		light: cardTrailTextLight,
		dark: cardTrailTextDark,
	},
	'--carousel-active-dot': {
		light: carouselActiveDotLight,
		dark: carouselActiveDotDark,
	},
	'--carousel-active-dot-hover': {
		light: carouselActiveDotLight,
		dark: carouselActiveDotDark,
	},
	'--carousel-arrow': {
		light: carouselArrowLight,
		dark: carouselArrowDark,
	},
	'--carousel-arrow-background': {
		light: carouselArrowBackgroundLight,
		dark: carouselArrowBackgroundDark,
	},
	'--carousel-arrow-background-disabled': {
		light: () => sourcePalette.neutral[46],
		dark: () => sourcePalette.neutral[60],
	},
	'--carousel-arrow-background-hover': {
		light: carouselArrowBackgroundHoverLight,
		dark: carouselArrowBackgroundHoverDark,
	},
	'--carousel-border': {
		light: carouselBorderLight,
		dark: carouselBorderDark,
	},
	'--carousel-chevron': {
		light: carouselChevronLight,
		dark: carouselChevronDark,
	},
	'--carousel-chevron-border': {
		light: carouselChevronBorderLight,
		dark: carouselChevronBorderDark,
	},
	'--carousel-chevron-border-disabled': {
		light: carouselChevronBorderDisabledLight,
		dark: carouselChevronBorderDisabledDark,
	},
	'--carousel-chevron-disabled': {
		light: carouselChevronDisabledLight,
		dark: carouselChevronDisabledDark,
	},
	'--carousel-chevron-hover': {
		light: carouselChevronHoverLight,
		dark: carouselChevronHoverDark,
	},
	'--carousel-dot': {
		light: carouselDotLight,
		dark: carouselDotDark,
	},
	'--carousel-dot-hover': {
		light: carouselDotHoverLight,
		dark: carouselDotHoverDark,
	},
	'--carousel-text': {
		light: carouselTextLight,
		dark: carouselTextDark,
	},
	'--carousel-title-highlight': {
		light: carouselTitleHighlightLight,
		dark: carouselTitleHighlightDark,
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
	'--click-to-view-button-hover': {
		light: clickToViewButtonHoverLight,
		dark: clickToViewButtonHoverDark,
	},
	'--click-to-view-button-text': {
		light: clickToViewButtonTextLight,
		dark: clickToViewButtonTextDark,
	},
	'--code-block-background': {
		light: codeBlockBackgroundLight,
		dark: codeBlockBackgroundDark,
	},
	'--code-block-text-shadow': {
		light: codeBlockTextShadowLight,
		dark: codeBlockTextShadowDark,
	},
	'--comment-count-fill': {
		light: commentCountFill,
		dark: commentCountFillDark,
	},
	'--comment-count-mobile-fill': {
		light: mobileCommentCountFill,
		dark: mobileCommentCountFillDark,
	},
	'--comment-form-header-background': {
		light: commentFormHeaderBackgroundLight,
		dark: commentFormHeaderBackgroundDark,
	},
	'--comment-form-input-background': {
		light: commentFormInputBackgroundLight,
		dark: commentFormInputBackgroundDark,
	},
	'--cricket-scoreboard-border-top': {
		light: cricketScoreboardBorderTop,
		dark: cricketScoreboardBorderTop,
	},
	'--cricket-scoreboard-divider': {
		light: cricketScoreboardDivider,
		dark: cricketScoreboardDivider,
	},
	'--cricket-scoreboard-link-text': {
		light: cricketScoreboardLinkText,
		dark: cricketScoreboardLinkText,
	},
	'--dateline': {
		light: datelineLight,
		dark: datelineDark,
	},
	'--dateline-mobile': {
		light: datelineMobileLight,
		dark: standfirstTextDark,
	},
	'--design-tag-background': {
		light: designTagBackground,
		dark: designTagBackground,
	},
	'--design-tag-text': {
		light: designTagText,
		dark: designTagText,
	},
	'--discussion-accent-text': {
		light: discussionAccentTextLight,
		dark: discussionAccentTextDark,
	},
	'--discussion-background': {
		light: discussionBackgroundLight,
		dark: discussionBackgroundDark,
	},
	'--discussion-border': {
		light: discussionBorderLight,
		dark: discussionBorderDark,
	},
	'--discussion-button-background-hover': {
		light: discussionButtonHover,
		dark: discussionButtonHover,
	},
	'--discussion-button-text': {
		light: discussionButtonTextLight,
		dark: discussionButtonTextDark,
	},
	'--discussion-comment-underline': {
		light: discussionCommentUnderlineLight,
		dark: discussionCommentUnderlineDark,
	},
	'--discussion-link': {
		light: discussionLinkLight,
		dark: discussionLinkDark,
	},
	'--discussion-loading-background': {
		light: discussionLoadingBackgroundLight,
		dark: discussionLoadingBackgroundDark,
	},
	'--discussion-loading-shimmer': {
		light: discussionLoadingShimmerLight,
		dark: discussionLoadingShimmerDark,
	},
	'--discussion-pagination-background': {
		light: discussionPaginationBackgroundLight,
		dark: discussionPaginationBackgroundDark,
	},
	'--discussion-pagination-border': {
		light: discussionPaginationBorderLight,
		dark: discussionPaginationBorderDark,
	},
	'--discussion-pagination-border-hover': {
		light: discussionPaginationBorderHover,
		dark: discussionPaginationBorderHover,
	},
	'--discussion-pagination-text': {
		light: discussionPaginationTextLight,
		dark: discussionPaginationTextDark,
	},
	'--discussion-pick-label-text': {
		light: staffPickLight,
		dark: staffPickDark,
	},
	'--discussion-pre-mod': {
		light: discussionPreModLight,
		dark: discussionPreModDark,
	},
	'--discussion-preview-background': {
		light: discussionPreviewBackgroundLight,
		dark: discussionPreviewBackgroundDark,
	},
	'--discussion-primary-button-background': {
		light: discussionPrimaryButtonBackgroundLight,
		dark: discussionPrimaryButtonBackgroundDark,
	},
	'--discussion-report-background': {
		light: discussionReportBackgroundLight,
		dark: discussionReportBackgroundDark,
	},
	'--discussion-report-border': {
		light: discussionReportBorder,
		dark: discussionReportBorderDark,
	},
	'--discussion-report-button': {
		light: discussionReportButton,
		dark: discussionReportButtonDark,
	},
	'--discussion-report-error-text': {
		light: discussionReportErrorText,
		dark: discussionReportErrorTextDark,
	},
	'--discussion-report-label-text': {
		light: discussionReportAbuseFormLabelText,
		dark: discussionReportAbuseFormLabelTextDark,
	},
	'--discussion-report-success-text': {
		light: discussionReportSuccessText,
		dark: discussionReportSuccessTextDark,
	},
	'--discussion-section-background': {
		light: discussionSectionBackgroundLight,
		dark: discussionSectionBackgroundDark,
	},
	'--discussion-selected-background': {
		light: discussionSelectedBackgroundLight,
		dark: discussionSelectedBackgroundDark,
	},
	'--discussion-staff-label-text': {
		light: staffLabelLight,
		dark: staffLabelDark,
	},
	'--discussion-subdued': {
		light: discussionSubduedLight,
		dark: discussionSubduedDark,
	},
	'--discussion-text': {
		light: discussionTextLight,
		dark: discussionTextDark,
	},
	'--discussion-top-pick-background': {
		light: topPickBackgroundLight,
		dark: topPickBackgroundDark,
	},
	'--discussion-top-pick-link': {
		light: topPickLinkLight,
		dark: topPickLinkDark,
	},
	'--drop-cap': {
		light: dropCapLight,
		dark: dropCapDark,
	},
	'--editorial-button-background': {
		light: editorialButtonBackground,
		dark: editorialButtonBackground,
	},
	'--editorial-button-background-hover': {
		light: editorialButtonBackgroundHover,
		dark: editorialButtonBackgroundHover,
	},
	'--editorial-button-border-hover': {
		light: editorialButtonBorderHover,
		dark: editorialButtonBorderHover,
	},
	'--editorial-button-text': {
		light: editorialButtonText,
		dark: editorialButtonText,
	},
	'--email-signup-button-background': {
		light: emailSignupButtonBackgroundLight,
		dark: emailSignupButtonBackgroundDark,
	},
	'--email-signup-button-hover': {
		light: emailSignupButtonHoverLight,
		dark: emailSignupButtonHoverDark,
	},
	'--email-signup-button-text': {
		light: emailSignupButtonTextLight,
		dark: emailSignupButtonTextDark,
	},
	'--email-signup-text-subdued': {
		light: emailSignupTextSubduedLight,
		dark: emailSignupTextSubduedDark,
	},
	'--end-note-text-subdued': {
		light: endNoteTextSubduedLight,
		dark: endNoteTextSubduedDark,
	},
	'--eu-parliament-ecr': {
		light: () => sourcePalette.brand[500],
		dark: () => '#009AE1',
	},
	'--eu-parliament-epp': {
		light: () => '#3DBBE2',
		dark: () => '#3DBBE2',
	},
	'--eu-parliament-greensefa': {
		light: () => '#39A566',
		dark: () => '#39A566',
	},
	'--eu-parliament-ni': {
		light: () => sourcePalette.neutral[20],
		dark: () => '#A1A1A1',
	},
	'--eu-parliament-renew': {
		light: () => '#FF7F0F',
		dark: () => '#FF7F0F',
	},
	'--eu-parliament-sd': {
		light: () => sourcePalette.news[400],
		dark: () => '#DC2E1C',
	},
	'--eu-parliament-theleft': {
		light: () => '#8B0000',
		dark: () => '#B23C2D',
	},
	'--eu-parliament-unknown': {
		light: () => '#848484',
		dark: () => sourcePalette.neutral[46],
	},
	'--expandable-atom-background': {
		light: expandableAtomBackgroundLight,
		dark: expandableAtomBackgroundDark,
	},
	'--expandable-atom-border': {
		light: expandableAtomBorderLight,
		dark: expandableAtomBorderDark,
	},
	'--expandable-atom-button': {
		light: expandableAtomButtonLight,
		dark: expandableAtomButtonDark,
	},
	'--expandable-atom-button-fill': {
		light: expandableAtomButtonFillLight,
		dark: expandableAtomButtonFillDark,
	},
	'--expandable-atom-text-hover': {
		light: expandableAtomTextHoverLight,
		dark: expandableAtomTextHoverDark,
	},
	'--explainer-atom-accent': {
		light: explainerAtomAccentLight,
		dark: explainerAtomAccentDark,
	},
	'--explainer-atom-background': {
		light: explainerAtomBackgroundLight,
		dark: explainerAtomBackgroundDark,
	},
	'--feature-card-background': {
		light: () => sourcePalette.neutral[93],
		dark: () => sourcePalette.neutral[38],
	},
	'--feature-card-footer-text': {
		light: () => sourcePalette.neutral[86],
		dark: () => sourcePalette.neutral[20],
	},
	'--feature-card-headline': {
		light: () => sourcePalette.neutral[97],
		dark: () => sourcePalette.neutral[20],
	},
	'--feature-card-kicker-text': {
		light: featureCardKickerTextLight,
		dark: () => sourcePalette.neutral[20],
	},
	'--feature-card-trail-text': {
		light: () => sourcePalette.neutral[86],
		dark: () => sourcePalette.neutral[20],
	},
	'--filter-key-events-toggle-border-top': {
		light: () => sourcePalette.neutral[86],
		dark: () => sourcePalette.neutral[20],
	},
	'--follow-icon-background': {
		light: followIconBackgroundLight,
		dark: followIconBackgroundDark,
	},
	'--follow-icon-fill': {
		light: followIconFillLight,
		dark: followIconFillDark,
	},
	'--follow-text': {
		light: followTextLight,
		dark: followTextDark,
	},
	'--front-container-background': {
		light: () => sourcePalette.neutral[100],
		dark: () => sourcePalette.neutral[10],
	},
	/** This should match --front-container-background but does not have a container override set */
	'--front-page-background': {
		light: () => sourcePalette.neutral[100],
		dark: () => sourcePalette.neutral[10],
	},
	'--heading-line': {
		light: headingLineLight,
		dark: headingLineDark,
	},
	'--headline-background': {
		light: headlineBackgroundLight,
		dark: headlineBackgroundDark,
	},
	'--headline-blog-background': {
		light: headlineBlogBackgroundLight,
		dark: headlineBlogBackgroundDark,
	},
	'--headline-border': {
		light: headlineBorder,
		dark: headlineBorder,
	},
	'--headline-byline': {
		light: headlineBylineLight,
		dark: headlineBylineDark,
	},
	'--headline-colour': {
		light: headlineTextLight,
		dark: headlineTextDark,
	},
	'--headline-match-colour': {
		light: headlineMatchTextLight,
		dark: headlineMatchTextDark,
	},
	'--highlights-card-headline': {
		light: highlightsCardHeadline,
		dark: highlightsCardHeadline,
	},
	'--highlights-card-kicker-text': {
		light: highlightsCardKickerText,
		dark: highlightsCardKickerText,
	},
	'--highlights-container-background': {
		light: mastheadHighlightsBackground,
		dark: mastheadHighlightsBackground,
	},
	'--highlights-container-border': {
		light: mastheadHighlightsBorder,
		dark: mastheadHighlightsBorder,
	},
	'--highlights-container-end-fade': {
		light: highlightContainerEndFade,
		dark: highlightContainerEndFade,
	},
	'--highlights-container-mid-fade': {
		light: highlightContainerMidFade,
		dark: highlightContainerMidFade,
	},
	'--highlights-container-start-fade': {
		light: highlightContainerStartFade,
		dark: highlightContainerStartFade,
	},
	'--image-title-background': {
		light: imageTitleBackground,
		dark: imageTitleBackground,
	},
	'--interactive-atom-background': {
		light: interactiveAtomBackgroundLight,
		dark: interactiveAtomBackgroundDark,
	},
	'--interactive-block-background': {
		light: interactiveBlockBackgroundLight,
		dark: interactiveBlockBackgroundDark,
	},
	'--interactive-block-background-datawrapper': {
		light: interactiveBlockBackgroundLight,
		dark: interactiveBlockBackgroundDatawrapperDark,
	},
	'--interactive-contents-hover': {
		light: interactiveContentsHoverLight,
		dark: interactiveContentsHoverDark,
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
	'--key-event-bullet': {
		light: keyEventBulletLight,
		dark: keyEventBulletDark,
	},
	'--key-event-bullet-hover': {
		light: keyEventBulletHoverLight,
		dark: keyEventBulletHoverDark,
	},
	'--key-event-button': {
		light: keyEventButtonLight,
		dark: keyEventButtonDark,
	},
	'--key-event-button-fill': {
		light: keyEventButtonFillLight,
		dark: keyEventButtonFillDark,
	},
	'--key-event-button-hover': {
		light: keyEventButtonHoverLight,
		dark: keyEventButtonHoverDark,
	},
	'--key-event-text': {
		light: keyEventTextLight,
		dark: keyEventTextDark,
	},
	'--key-event-title': {
		light: keyEventTitleLight,
		dark: keyEventTitleDark,
	},
	'--kicker-background-live': {
		light: liveKickerBackgroundLight,
		dark: liveKickerBackgroundDark,
	},
	'--kicker-pulsing-dot-live': {
		light: liveKickerPulsingDot,
		dark: liveKickerPulsingDot,
	},
	'--kicker-text-live': {
		light: liveKickerTextLight,
		dark: liveKickerTextDark,
	},
	'--last-updated-text': {
		light: lastUpdatedTextLight,
		dark: lastUpdatedTextDark,
	},
	'--latest-links-dotted-line': {
		light: latestLinksDottedLineLight,
		dark: latestLinksDottedLineDark,
	},
	'--lightbox-divider': {
		light: lightboxDivider,
		dark: lightboxDivider,
	},
	'--link-kicker-text': {
		light: linkKickerTextLight,
		dark: linkKickerTextDark,
	},
	'--live-block-border-bottom': {
		light: liveBlockBorderBottomLight,
		dark: liveBlockBorderBottomDark,
	},
	'--live-block-border-top': {
		light: liveBlockBorderTopLight,
		dark: liveBlockBorderTopDark,
	},
	'--live-block-container-background': {
		light: liveBlockContainerBackgroundLight,
		dark: liveBlockContainerBackgroundDark,
	},
	'--masthead-nav-background': {
		light: mastheadNavBackground,
		dark: mastheadNavBackground,
	},
	'--masthead-nav-border': {
		light: mastheadNavBorder,
		dark: mastheadNavBorder,
	},
	'--masthead-nav-lines': {
		light: mastheadNavLines,
		dark: mastheadNavLines,
	},
	'--masthead-nav-link-text': {
		light: mastheadNavLinkText,
		dark: mastheadNavLinkText,
	},
	'--masthead-nav-link-text-hover': {
		light: mastheadNavLinkTextHover,
		dark: mastheadNavLinkTextHover,
	},
	'--masthead-top-bar-background': {
		light: mastheadTopBarBackground,
		dark: mastheadTopBarBackground,
	},
	'--masthead-top-bar-link-text': {
		light: mastheadTopBarLinkText,
		dark: mastheadTopBarLinkText,
	},
	'--masthead-top-bar-text': {
		light: mastheadTopBarText,
		dark: mastheadTopBarText,
	},
	'--masthead-top-bar-vertical-divider': {
		light: mastheadTopBarVerticalDivider,
		dark: mastheadTopBarVerticalDivider,
	},
	'--masthead-veggie-burger-background': {
		light: mastheadVeggieBurgerBackground,
		dark: mastheadVeggieBurgerBackground,
	},
	'--masthead-veggie-burger-background-hover': {
		light: mastheadVeggieBurgerBackgroundHover,
		dark: mastheadVeggieBurgerBackgroundHover,
	},
	'--masthead-veggie-burger-icon': {
		light: mastheadVeggieBurgerIcon,
		dark: mastheadVeggieBurgerIcon,
	},
	'--match-nav-background': {
		light: matchNavBackgroundLight,
		dark: matchNavBackgroundDark,
	},
	'--match-nav-text': {
		light: matchNavText,
		dark: matchNavText,
	},
	'--match-stats-background': {
		light: matchStatsBackgroundLight,
		dark: matchStatsBackgroundDark,
	},
	'--match-tab-border': {
		light: matchTabBorderLight,
		dark: matchTabBorderDark,
	},
	'--match-tab-border-active': {
		light: matchActiveTabBorderLight,
		dark: matchActiveTabBorderDark,
	},
	'--most-viewed-description': {
		light: () => sourcePalette.neutral[46],
		dark: () => sourcePalette.neutral[60],
	},
	'--most-viewed-footer-hover': {
		light: mostViewedFooterHoverLight,
		dark: mostViewedFooterHoverDark,
	},
	'--most-viewed-headline': {
		light: mostViewedHeadlineLight,
		dark: mostViewedHeadlineDark,
	},
	'--most-viewed-tab-border': {
		light: mostViewedTabBorderLight,
		dark: mostViewedTabBorderDark,
	},
	'--multi-byline-non-linked-text': {
		light: multiBylineNonLinkedTextLight,
		dark: multiBylineNonLinkedTextDark,
	},
	'--nav-reader-revenue-link-text': {
		light: navReaderRevenueLinkText,
		dark: navReaderRevenueLinkText,
	},
	'--nav-search-bar-background': {
		light: navSearchBarBackground,
		dark: navSearchBarBackground,
	},
	'--nav-search-bar-icon': {
		light: navSearchBarIcon,
		dark: navSearchBarIcon,
	},
	'--nav-search-bar-text': {
		light: navSearchBarText,
		dark: navSearchBarText,
	},
	'--numbered-list-heading': {
		light: numberedListHeadingLight,
		dark: numberedListHeadingDark,
	},
	'--numbered-list-links': {
		light: numberedListLinksLight,
		dark: numberedListLinksDark,
	},
	'--numbered-list-number': {
		light: numberedListNumberLight,
		dark: numberedListNumberDark,
	},
	'--numbered-list-title': {
		light: numberedListTitleLight,
		dark: numberedListTitleDark,
	},
	'--pagination-text': {
		light: paginationTextLight,
		dark: paginationTextDark,
	},
	'--pill-background': {
		light: pillBackground,
		dark: pillBackground,
	},
	'--pill-divider': {
		light: pillDivider,
		dark: pillDivider,
	},
	'--pill-text': {
		light: pillText,
		dark: pillText,
	},
	'--pinned-post-background': {
		light: liveBlockContainerBackgroundLight,
		dark: liveBlockContainerBackgroundDark,
	},
	'--pinned-post-border': {
		light: pinnedPostBorderLight,
		dark: pinnedPostBorderDark,
	},
	'--podcast-meta-button-background': {
		light: podcastMetaButtonBackgroundLight,
		dark: podcastMetaButtonBackgroundDark,
	},
	'--podcast-meta-button-background-hover': {
		light: podcastMetaButtonBackgroundHoverLight,
		dark: podcastMetaButtonBackgroundHoverDark,
	},
	'--podcast-meta-button-text': {
		light: podcastMetaButtonTextLight,
		dark: podcastMetaButtonTextDark,
	},
	'--podcast-meta-title': {
		light: podcastMetaTitleLight,
		dark: podcastMetaTitleDark,
	},
	'--privacy-text-regular': {
		light: privacyTextRegularLight,
		dark: privacyTextDark,
	},
	'--privacy-text-supporting': {
		light: privacyTextSupportingLight,
		dark: privacyTextDark,
	},
	'--privacy-text-supporting-subdued': {
		light: privacyTextSupportingSubduedLight,
		dark: privacyTextSupportingSubduedDark,
	},
	'--pullquote-background': {
		light: pullQuoteBackgroundLight,
		dark: pullQuoteBackgroundDark,
	},
	'--pullquote-border': {
		light: pullQuoteBorderLight,
		dark: pullQuoteBorderDark,
	},
	'--pullquote-icon': {
		light: pullQuoteIconLight,
		dark: pullQuoteIconDark,
	},
	'--pullquote-text': {
		light: pullQuoteTextLight,
		dark: pullQuoteTextDark,
	},
	'--quiz-atom-answers-background': {
		light: () => sourcePalette.neutral[97],
		dark: () => sourcePalette.neutral[20],
	},
	'--quiz-atom-answers-hover': {
		light: () => sourcePalette.neutral[86],
		dark: () => sourcePalette.neutral[38],
	},
	'--quiz-atom-check-mark': {
		light: () => sourcePalette.neutral[0],
		dark: () => sourcePalette.neutral[97],
	},
	'--quiz-atom-incorrect-answer-background': {
		light: () => sourcePalette.news[400],
		dark: () => sourcePalette.news[300],
	},
	'--quote-icon-fill': {
		light: richLinkQuoteFillLight,
		dark: richLinkFillDark,
	},
	'--recaptcha-border': {
		light: recaptchaBorderLight,
		dark: recaptchaBorderDark,
	},
	'--recaptcha-button': {
		light: recaptchaButtonLight,
		dark: recaptchaButtonDark,
	},
	'--recaptcha-button-hover': {
		light: recaptchaButtonHoverLight,
		dark: recaptchaButtonHoverDark,
	},
	'--recaptcha-button-text': {
		light: recaptchaButtonTextLight,
		dark: recaptchaButtonTextDark,
	},
	'--recommendation-count': {
		light: recommendationCountLight,
		dark: recommendationCountDark,
	},
	'--recommendation-count-arrow': {
		light: recommendationCountArrowLight,
		dark: recommendationCountArrowDark,
	},
	'--recommendation-count-arrow-selected': {
		light: recommendationCountArrowSelectedLight,
		dark: recommendationCountArrowSelectedDark,
	},
	'--recommendation-count-selected': {
		light: recommendationCountSelectedLight,
		dark: recommendationCountSelectedDark,
	},
	'--rich-link-background': {
		light: richLinkBackgroundLight,
		dark: richLinkBackgroundDark,
	},
	'--rich-link-background-hover': {
		light: richLinkBackgroundHoverLight,
		dark: richLinkBackgroundHoverDark,
	},
	'--rich-link-border': {
		light: richLinkBorderLight,
		dark: richLinkBorderDark,
	},
	'--rich-link-branding-text': {
		light: richLinkBrandingTextLight,
		dark: richLinkHeaderDark,
	},
	'--rich-link-fill': {
		light: richLinkFillLight,
		dark: richLinkFillDark,
	},
	'--rich-link-header': {
		light: richLinkHeaderLight,
		dark: richLinkHeaderDark,
	},
	'--rich-link-text': {
		light: richLinkTextLight,
		dark: richLinkTextDark,
	},
	'--section-background': {
		light: () => 'transparent',
		dark: () => 'transparent',
	},
	'--section-background-left': {
		light: () => 'transparent',
		dark: () => 'transparent',
	},
	'--section-border': {
		light: () => sourcePalette.neutral[86],
		dark: () => sourcePalette.neutral[20],
	},
	'--section-border-primary': {
		light: () => sourcePalette.neutral[20],
		dark: () => sourcePalette.neutral[86],
	},
	'--section-border-secondary': {
		light: () => sourcePalette.neutral[73],
		dark: () => sourcePalette.neutral[38],
	},
	'--section-date': {
		light: () => sourcePalette.news[400],
		dark: () => sourcePalette.news[600],
	},
	'--section-description': {
		light: () => sourcePalette.neutral[46],
		dark: () => sourcePalette.neutral[73],
	},
	'--section-title-background': {
		light: sectionTitleBackgroundLight,
		dark: sectionTitleBackgroundLight,
	},
	'--section-toggle-button': {
		light: () => sourcePalette.neutral[46],
		dark: () => sourcePalette.neutral[60],
	},
	'--section-toggle-button-hover': {
		light: () => sourcePalette.neutral[7],
		dark: () => sourcePalette.neutral[93],
	},
	'--series-title-background': {
		light: seriesTitleBackgroundLight,
		dark: seriesTitleBackgroundLight,
	},
	'--series-title-match-text': {
		light: seriesTitleMatchTextLight,
		dark: seriesTitleMatchTextDark,
	},
	'--series-title-text': {
		light: seriesTitleTextLight,
		dark: seriesTitleTextDark,
	},
	'--share-button': {
		light: shareButtonLight,
		dark: shareButtonDark,
	},
	'--share-button-border': {
		light: shareButtonBorderLight,
		dark: shareButtonBorderDark,
	},
	'--share-button-copied': {
		light: shareButtonCopiedLight,
		dark: shareButtonCopiedDark,
	},
	'--share-button-hover': {
		light: shareButtonHoverLight,
		dark: shareButtonHoverDark,
	},
	'--share-button-liveblog-mobile-meta': {
		light: shareButtonLiveBlogMobileMetaLight,
		dark: shareButtonLiveBlogMobileMetaLight,
	},
	'--share-button-xsmall-border': {
		light: shareButtonBorderXSmallLight,
		dark: shareButtonBorderDark,
	},
	'--sign-in-link': {
		light: signInLinkLight,
		dark: signInLinkDark,
	},
	'--sign-in-link-underline': {
		light: signInLinkLineLight,
		dark: signInLinkLineDark,
	},
	'--slideshow-caption': {
		light: slideshowCaptionLight,
		dark: slideshowCaptionDark,
	},
	'--slideshow-pagination-dot': {
		light: slideshowPaginationDotLight,
		dark: slideshowPaginationDotDark,
	},
	'--slideshow-pagination-dot-active': {
		light: slideshowPaginationDotActiveLight,
		dark: slideshowPaginationDotActiveDark,
	},
	'--speech-bubble-background': {
		light: speechBubbleBackgroundLight,
		dark: speechBubbleBackgroundLight,
	},
	'--stacked-progress-background': {
		light: () => sourcePalette.neutral[86],
		/**
		 * Custom colour to prevent clashes with the neutral palette, which
		 * is sometimes used for sections of the stacked progress bar.
		 */
		dark: () => '#606060',
	},
	'--stacked-progress-to-win': {
		light: () => sourcePalette.neutral[7],
		dark: () => sourcePalette.neutral[86],
	},
	'--staff-contributor-badge': {
		light: staffBadgeLight,
		dark: staffBadgeDark,
	},
	'--staff-contributor-badge-text': {
		light: staffBadgeTextLight,
		dark: staffBadgeTextDark,
	},
	'--staff-pick-badge': {
		light: staffPickBadgeLight,
		dark: staffPickBadgeDark,
	},
	'--staff-pick-badge-text': {
		light: staffPickBadgeTextLight,
		dark: staffPickBadgeTextDark,
	},
	'--standfirst-background': {
		light: standfirstBackgroundLight,
		dark: standfirstBackgroundDark,
	},
	'--standfirst-border': {
		light: standfirstBorder,
		dark: standfirstBorder,
	},
	'--standfirst-bullet': {
		light: standfirstBulletLight,
		dark: standfirstBulletDark,
	},
	'--standfirst-link-border': {
		light: standfirstLinkBorderLight,
		dark: standfirstLinkBorderDark,
	},
	'--standfirst-link-text': {
		light: standfirstLinkTextLight,
		dark: standfirstLinkTextDark,
	},
	'--standfirst-text': {
		light: standfirstTextLight,
		dark: standfirstTextDark,
	},
	'--star-rating-background': {
		light: starRatingBackgroundColourLight,
		dark: starRatingBackgroundColourDark,
	},
	'--star-rating-fill': {
		light: starRatingFillColourLight,
		dark: starRatingFillColourDark,
	},
	'--straight-lines': {
		light: straightLinesLight,
		dark: straightLinesDark,
	},
	'--stuck-background': {
		light: () => sourcePalette.neutral[100],
		dark: () => sourcePalette.neutral[7],
	},
	'--sub-meta-background': {
		light: subMetaBackgroundLight,
		dark: subMetaBackgroundDark,
	},
	'--sub-meta-label-text': {
		light: subMetaLabelTextLight,
		dark: subMetaLabelTextDark,
	},
	'--sub-meta-text': {
		light: subMetaTextLight,
		dark: subMetaTextDark,
	},
	'--sub-meta-text-hover': {
		light: subMetaTextHoverLight,
		dark: subMetaBackgroundDark,
	},
	'--sub-nav-border': {
		light: subNavBorder,
		dark: subNavBorder,
	},
	'--sub-nav-link-footer': {
		light: subNavLinkFooterLight,
		dark: subNavLinkFooterDark,
	},
	'--sub-nav-link-header': {
		light: subNavLinkHeaderLight,
		dark: subNavLinkHeaderDark,
	},
	'--sub-nav-link-hover': {
		light: subNavLinkHoverLight,
		dark: subNavLinkHoverDark,
	},
	'--sub-nav-more': {
		light: subNavMoreLight,
		dark: subNavMoreDark,
	},
	'--subheading-text': {
		light: subheadingTextLight,
		dark: subheadingTextDark,
	},
	'--summary-event-bullet': {
		light: summaryEventBulletLight,
		dark: summaryEventBulletDark,
	},
	'--summary-event-bullet-hover': {
		light: summaryEventBulletHoverLight,
		dark: summaryEventBulletHoverDark,
	},
	'--syndication-button-border': {
		light: syndicationButtonBorder,
		dark: syndicationButtonBorder,
	},
	'--syndication-button-hover': {
		light: syndicationButtonHoverLight,
		dark: syndicationButtonHoverDark,
	},
	'--syndication-button-text': {
		light: syndicationButtonTextLight,
		dark: syndicationButtonTextDark,
	},
	'--table-block-background': {
		light: tableBlockBackgroundLight,
		dark: tableBlockBackgroundDark,
	},
	'--table-block-border-top': {
		light: tableBlockBorderTopLight,
		dark: tableBlockBorderTopDark,
	},
	'--table-block-stripe': {
		light: tableBlockStripeLight,
		dark: tableBlockStripeDark,
	},
	'--table-block-text': {
		light: tableBlockTextLight,
		dark: tableBlockTextDark,
	},
	'--table-block-text-first-column': {
		light: tableBlockTextFirstColumnLight,
		dark: tableBlockTextFirstColumnDark,
	},
	'--table-of-contents': {
		light: tableOfContentsLight,
		dark: tableOfContentsDark,
	},
	'--table-of-contents-border': {
		light: tableOfContentsBorderLight,
		dark: tableOfContentsBorderDark,
	},
	'--tabs-input': {
		light: () => sourcePalette.neutral[100],
		dark: () => sourcePalette.neutral[0],
	},
	'--tag-page-chevron': {
		light: () => sourcePalette.neutral[0],
		dark: () => sourcePalette.neutral[86],
	},
	'--textblock-bullet-background': {
		light: textblockBulletLight,
		dark: textblockBulletLight,
	},
	'--textblock-text': {
		light: textblockTextLight,
		dark: textblockTextDark,
	},
	'--timeline-atom-bullet': {
		light: timelineAtomBulletLight,
		dark: timelineAtomBulletDark,
	},
	'--timeline-atom-highlight-text': {
		light: timelineAtomHighlightText,
		dark: timelineAtomHighlightText,
	},
	'--timeline-atom-highlight-text-background': {
		light: timelineAtomHighlightTextBackgroundLight,
		dark: timelineAtomHighlightTextBackgroundDark,
	},
	'--timeline-bullet': {
		light: timelineBulletLight,
		dark: timelineBulletDark,
	},
	'--timeline-event-border': {
		light: timelineEventBorderLight,
		dark: timelineEventBorderDark,
	},
	'--treat-background': {
		light: () => sourcePalette.neutral[0],
		dark: () => sourcePalette.neutral[97],
	},
	'--treat-text': {
		light: () => sourcePalette.neutral[97],
		dark: () => sourcePalette.neutral[7],
	},
	'--trending-topics-background': {
		light: () => sourcePalette.neutral[100],
		dark: () => sourcePalette.neutral[7],
	},
	'--trending-topics-separator': {
		light: () => sourcePalette.neutral[86],
		dark: () => sourcePalette.neutral[20],
	},
	'--trending-topics-text': {
		light: () => sourcePalette.neutral[20],
		dark: () => sourcePalette.neutral[73],
	},
	'--uk-elections-conservative': {
		light: () => sourcePalette.sport[400],
		dark: () => '#009AE1',
	},
	'--uk-elections-labour': {
		light: () => sourcePalette.news[400],
		dark: () => '#DC2E1C',
	},
	'--uk-elections-lib-dem': {
		light: () => sourcePalette.opinion[450],
		dark: () => sourcePalette.opinion[500],
	},
	'--uk-elections-reform': {
		light: () => '#3DBBE2',
		dark: () => '#3DBBE2',
	},
	'--uk-elections-snp': {
		light: () => '#F5DC00',
		dark: () => '#F5DC00',
	},
	'--us-elections-democrats': {
		light: () => '#093CA3',
		dark: () => '#3261DB',
	},
	'--us-elections-republicans': {
		light: () => sourcePalette.news[400],
		dark: () => '#DC2E1C',
	},
	'--witness-title-author': {
		light: witnessTitleAuthor,
		dark: witnessTitleAuthor,
	},
	'--witness-title-icon': {
		light: witnessTitleIcon,
		dark: witnessTitleIcon,
	},
	'--witness-title-text': {
		light: witnessTitleText,
		dark: witnessTitleText,
	},
	'--youtube-overlay-kicker': {
		light: youtubeOverlayKicker,
		dark: youtubeOverlayKicker,
	},
} satisfies PaletteColours;

/**
 * A union of all the keys of the palette object. In other words, all the
 * possible colours that can be chosen.
 */
type ColourName = keyof typeof paletteColours;

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

export { type ColourName, paletteDeclarations };
