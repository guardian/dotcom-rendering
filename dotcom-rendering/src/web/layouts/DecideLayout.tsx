import { ArticleDisplay, ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { CommentLayout } from './CommentLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { LiveLayout } from './LiveLayout';
import { InteractiveLayout } from './InteractiveLayout';
import { FullPageInteractiveLayout } from './FullPageInteractiveLayout';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';
import { hackToNewsletterSignupLayout, formatAsNewsletterDesign } from './lib/newsLetterHacks';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	CAPIArticle: CAPIArticleType;
	NAV: NavType;
	format: ArticleFormat;
};

export const DecideLayout = ({
	CAPIArticle,
	NAV,
	format,
}: Props): JSX.Element => {


	if (hackToNewsletterSignupLayout || CAPIArticle.tags.some(tag => tag.id === 'info/newsletter-sign-up')) {
		const newsletterFormat = formatAsNewsletterDesign(format)
		const newsletterPalette = decidePalette(newsletterFormat);

		return (
			<NewsletterSignupLayout
				CAPIArticle={CAPIArticle}
				NAV={NAV}
				format={newsletterFormat}
				palette={newsletterPalette}
			/>
		);
	}


	// TODO we can probably better express this as data
	switch (format.display) {
		case ArticleDisplay.Immersive: {
			switch (format.design) {
				case ArticleDesign.Interactive: {
					// Render all 'immersive interactives' until switchover date as 'FullPageInteractive'
					// TBD: After 'immersive interactive' changes to CAPI are merged, add logic here to either use
					// 'InteractiveImmersiveLayout' if published after switchover date, or 'FullPageInteractiveLayout'
					// if published before.
					return (
						<FullPageInteractiveLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				}
				default: {
					return (
						<ImmersiveLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				}
			}
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				default:
					return (
						<ShowcaseLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (format.design) {
				case ArticleDesign.Interactive:
					return (
						<InteractiveLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				case ArticleDesign.FullPageInteractive: {
					return (
						<FullPageInteractiveLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
				default:
					return (
						<StandardLayout
							CAPIArticle={CAPIArticle}
							NAV={NAV}
							format={format}
						/>
					);
			}
		}
	}
};
