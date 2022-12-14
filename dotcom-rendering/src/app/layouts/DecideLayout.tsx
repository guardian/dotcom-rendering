import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import type { FEArticleType } from '../../types/frontend';
import { StandardLayout } from './StandardLayout';

type Props = {
	CAPIArticle: FEArticleType;
	format: ArticleFormat;
};

export const DecideLayout = ({ CAPIArticle, format }: Props) => {
	switch (format.display) {
		case ArticleDisplay.Immersive: {
			switch (format.design) {
				case ArticleDesign.Interactive: {
					return <div>Not Supported</div>;
				}
				default: {
					return <div>Not Supported</div>;
				}
			}
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return <div>Not Supported</div>;
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return <div>Not Supported</div>;
				default:
					return <div>Not Supported</div>;
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (format.design) {
				case ArticleDesign.Interactive:
					return <div>Not Supported</div>;
				case ArticleDesign.FullPageInteractive: {
					return <div>Not Supported</div>;
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return <div>Not Supported</div>;
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return <div>Not Supported</div>;
				case ArticleDesign.NewsletterSignup:
					return <div>Not Supported</div>;
				default:
					return (
						<StandardLayout
							CAPIArticle={CAPIArticle}
							format={format}
						/>
					);
			}
		}
	}
};
