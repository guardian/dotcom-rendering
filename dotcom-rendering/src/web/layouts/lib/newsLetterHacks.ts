import { ArticleDesign, ArticleDisplay } from "@guardian/libs";

export const hackToNewsletterSignupLayout = false;
export const hackCardsToNewsLetterSignUpFormatBasedOnText = true

export const formatAsNewsletterDesign = (format:ArticleFormat) => {
	return {
		theme: format.theme,
		design: ArticleDesign.NewsletterSignup,
		display: ArticleDisplay.Standard,
	}
}
