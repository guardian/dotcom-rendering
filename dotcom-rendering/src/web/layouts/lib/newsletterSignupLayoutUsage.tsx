import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { decidePalette } from '../../lib/decidePalette';
import { NewsletterSignupLayout } from '../NewsletterSignupLayout';

export const hasNewsletterSignUpTag = (CAPIArticle: CAPIArticleType): boolean =>
	CAPIArticle.tags.some((tag) => tag.id === 'info/newsletter-sign-up');

export const buildNewsletterSignupLayout = (
	CAPIArticle: CAPIArticleType,
	NAV: NavType,
	format: ArticleFormat,
) => {
	const newsletterFormat = {
		theme: format.theme,
		design: ArticleDesign.NewsletterSignup,
		display: ArticleDisplay.Standard,
	};
	const newsletterPalette = decidePalette(newsletterFormat);

	return (
		<NewsletterSignupLayout
			CAPIArticle={CAPIArticle}
			NAV={NAV}
			format={newsletterFormat}
			palette={newsletterPalette}
		/>
	);
};
