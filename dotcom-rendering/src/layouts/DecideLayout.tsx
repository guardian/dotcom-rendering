import { ArticleDesign, ArticleDisplay } from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import type { Article } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { AudioLayout } from './AudioLayout';
import { CommentLayout } from './CommentLayout';
import { CrosswordLayout } from './CrosswordLayout';
import { FullPageInteractiveLayout } from './FullPageInteractiveLayout';
import { GalleryLayout } from './GalleryLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { InteractiveLayout } from './InteractiveLayout';
import { LiveLayout } from './LiveLayout';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';
import { PictureLayout } from './PictureLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { StandardLayout } from './StandardLayout';

interface BaseProps {
	article: Article;
	renderingTarget: RenderingTarget;
}

interface AppProps extends BaseProps {
	renderingTarget: 'Apps';
}

interface WebProps extends BaseProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

export type Props = WebProps | AppProps;

const DecideLayoutApps = ({ article, renderingTarget }: AppProps) => {
	const notSupported = <pre>Not supported</pre>;
	const format = {
		design: article.design,
		display: article.display,
		theme: article.theme,
	};
	switch (article.display) {
		case ArticleDisplay.Immersive: {
			switch (article.design) {
				case ArticleDesign.Interactive: {
					return (
						<FullPageInteractiveLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				}
				default: {
					return (
						<ImmersiveLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				}
			}
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (article.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Picture:
					return (
						<PictureLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<ShowcaseLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (article.design) {
				case ArticleDesign.Interactive:
					return (
						<InteractiveLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);

				case ArticleDesign.FullPageInteractive: {
					return (
						<FullPageInteractiveLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.NewsletterSignup:
					// Should be NewsletterSignup once implemented for apps
					return notSupported;
				case ArticleDesign.Gallery:
					return (
						<GalleryLayout
							gallery={article}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<StandardLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
			}
		}
	}
};

const DecideLayoutWeb = ({ article, NAV, renderingTarget }: WebProps) => {
	const format = {
		design: article.design,
		display: article.display,
		theme: article.theme,
	};
	switch (article.display) {
		case ArticleDisplay.Immersive: {
			switch (article.design) {
				case ArticleDesign.Interactive: {
					return (
						<FullPageInteractiveLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				}
				default: {
					return (
						<ImmersiveLayout
							article={article.frontendData}
							format={format}
							NAV={NAV}
							renderingTarget={renderingTarget}
						/>
					);
				}
			}
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (article.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Picture:
					return (
						<PictureLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<ShowcaseLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (article.design) {
				case ArticleDesign.Interactive:
					return (
						<InteractiveLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.FullPageInteractive: {
					return (
						<FullPageInteractiveLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.NewsletterSignup:
					return (
						<NewsletterSignupLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Audio:
					return (
						<AudioLayout
							article={article.frontendData}
							format={format}
							NAV={NAV}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Crossword:
					return (
						<CrosswordLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
						/>
					);
				case ArticleDesign.Gallery:
					return (
						<GalleryLayout
							gallery={article}
							NAV={NAV}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<StandardLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
			}
		}
	}
};

export const DecideLayout = (props: Props) => {
	const { article, renderingTarget } = props;

	switch (renderingTarget) {
		case 'Apps':
			return (
				<DecideLayoutApps
					article={article}
					renderingTarget={renderingTarget}
				/>
			);
		case 'Web':
			return (
				<DecideLayoutWeb
					NAV={props.NAV}
					article={article}
					renderingTarget={renderingTarget}
				/>
			);
	}
};
