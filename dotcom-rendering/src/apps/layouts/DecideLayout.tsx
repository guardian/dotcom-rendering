import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { FEArticleType } from '../../types/frontend';

type Props = {
	article: FEArticleType;
	format: ArticleFormat;
};

export const DecideLayout = ({ article, format }: Props) => {
	switch (format.display) {
		case ArticleDisplay.Immersive: {
			switch (format.design) {
				case ArticleDesign.Interactive: {
					// Carried over from web DecideLayout:
					// Render all 'immersive interactives' until switchover date as 'FullPageInteractive'
					// TBD: After 'immersive interactive' changes to CAPI are merged, add logic here to either use
					// 'InteractiveImmersiveLayout' if published after switchover date, or 'FullPageInteractiveLayout'
					// if published before.
					return <>Not supported</>; // Full page interactive layout
				}
				default: {
					return <>Not supported</>; // Immersive layout
				}
			}
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return <>Not supported</>; // Live layout
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return <>Not supported</>; // Comment layout

				default:
					return <>Not supported</>; // Showcase layout
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (format.design) {
				case ArticleDesign.Interactive:
					return <>Not supported</>; // Interactive layout
				case ArticleDesign.FullPageInteractive: {
					return <>Not supported</>; // Full page interactive layout
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return <>Not supported</>; // Live layout
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return <>Not supported</>; // Comment Layout
				case ArticleDesign.NewsletterSignup:
					return <>Not supported</>; // Newsletter signup layout
				default:
					return <StandardLayout article={article} format={format} />;
			}
		}
	}
};
