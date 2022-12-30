import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { NavType } from '../../model/extract-nav';
import type { FEArticleType } from '../../types/frontend';
import { CommentLayout } from './CommentLayout';
import { FullPageInteractiveLayout } from './FullPageInteractiveLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { InteractiveLayout } from './InteractiveLayout';
import { LiveLayout } from './LiveLayout';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { StandardLayout } from './StandardLayout';

type Props = {
	CAPIArticle: FEArticleType;
	NAV: NavType;
	format: ArticleFormat;
};

export const DecideLayout = ({ CAPIArticle, NAV, format }: Props) => {
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
						<LiveLayout CAPIArticle={CAPIArticle} NAV={NAV} format={format} />
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
						<LiveLayout CAPIArticle={CAPIArticle} NAV={NAV} format={format} />
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
				case ArticleDesign.NewsletterSignup:
					return (
						<NewsletterSignupLayout
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
