import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import type { Article } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { CommentLayout } from './CommentLayout';
import { CrosswordLayout } from './CrosswordLayout';
import { FullPageInteractiveLayout } from './FullPageInteractiveLayout';
import { GalleryLayout } from './GalleryLayout';
import { HostedArticleLayout } from './HostedArticleLayout';
import { HostedGalleryLayout } from './HostedGalleryLayout';
import { HostedVideoLayout } from './HostedVideoLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { LiveLayout } from './LiveLayout';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';
import { PictureLayout } from './PictureLayout';
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

/**
 * Guards the new grid-based immersive layout for all Guardian articles
 * behind a 0% a/b test
 */
export const REVAMPED_IMMERSIVE_LAYOUT_AB_TEST =
	'articles-and-publishing-revamped-immersive-layout';

const isInRevampedImmersiveLayoutTest = (article: Article): boolean =>
	article.frontendData.config.serverSideABTests[
		REVAMPED_IMMERSIVE_LAYOUT_AB_TEST
	] === 'enable';
export const interactiveLayoutSwitchoverDate = new Date('2024-06-01T00:00:00Z');

const DecideLayoutApps = ({ article, renderingTarget }: AppProps) => {
	const format = {
		design: article.design,
		display: article.display,
		theme: article.theme,
	};

	const serverTime = article.serverTime;

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
					return isInRevampedImmersiveLayoutTest(article) ||
						(article.theme === ArticleSpecial.Labs &&
							article.design === ArticleDesign.Standard) ? (
						<StandardLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					) : (
						<ImmersiveLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
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
							serverTime={serverTime}
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
							serverTime={serverTime}
						/>
					);
				case ArticleDesign.Picture:
					return (
						<PictureLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					);
				default:
					return (
						<StandardLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					);
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (article.design) {
				case ArticleDesign.Interactive:
					return (
						<StandardLayout
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
							serverTime={serverTime}
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
							serverTime={serverTime}
						/>
					);
				case ArticleDesign.NewsletterSignup:
					return (
						<NewsletterSignupLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					);
				case ArticleDesign.Gallery:
					return (
						<GalleryLayout
							gallery={article}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					);
				case ArticleDesign.HostedArticle:
					return (
						<HostedArticleLayout
							content={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.HostedVideo:
					return (
						<HostedVideoLayout
							content={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.HostedGallery:
					return (
						<HostedGalleryLayout
							gallery={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<StandardLayout
							article={article.frontendData}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
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

	const serverTime = article.serverTime;

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
					return isInRevampedImmersiveLayoutTest(article) ||
						(article.theme === ArticleSpecial.Labs &&
							article.design === ArticleDesign.Standard) ? (
						<StandardLayout
							article={article.frontendData}
							format={format}
							NAV={NAV}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					) : (
						<ImmersiveLayout
							article={article.frontendData}
							format={format}
							NAV={NAV}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
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
							serverTime={serverTime}
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
							serverTime={serverTime}
						/>
					);
				case ArticleDesign.Picture:
					return (
						<PictureLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					);
				default:
					return (
						<StandardLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
						/>
					);
			}
		}
		case ArticleDisplay.Standard:
		default: {
			switch (article.design) {
				case ArticleDesign.Interactive:
					return (
						<StandardLayout
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
							serverTime={serverTime}
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
							serverTime={serverTime}
						/>
					);
				case ArticleDesign.NewsletterSignup:
					return (
						<NewsletterSignupLayout
							article={article.frontendData}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
							serverTime={serverTime}
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
							serverTime={serverTime}
						/>
					);
				case ArticleDesign.HostedArticle:
					return (
						<HostedArticleLayout
							content={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.HostedVideo:
					return (
						<HostedVideoLayout
							content={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.HostedGallery:
					return (
						<HostedGalleryLayout
							gallery={article}
							format={format}
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
							serverTime={serverTime}
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
