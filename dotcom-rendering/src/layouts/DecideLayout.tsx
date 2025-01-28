import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import { AudioLayout } from './AudioLayout';
import { CommentLayout } from './CommentLayout';
import { FullPageInteractiveLayout } from './FullPageInteractiveLayout';
import { ImmersiveLayout } from './ImmersiveLayout';
import { InteractiveLayout } from './InteractiveLayout';
import { LiveLayout } from './LiveLayout';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';
import { PictureLayout } from './PictureLayout';
import { ShowcaseLayout } from './ShowcaseLayout';
import { StandardLayout } from './StandardLayout';

interface BaseProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
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

const DecideLayoutApps = ({ article, format, renderingTarget }: AppProps) => {
	const notSupported = <pre>Not supported</pre>;
	switch (format.display) {
		case ArticleDisplay.Immersive: {
			return (
				<ImmersiveLayout
					article={article}
					format={format}
					renderingTarget={renderingTarget}
				/>
			);
		}
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Showcase: {
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							article={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Picture:
					return (
						<PictureLayout
							article={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<ShowcaseLayout
							article={article}
							format={format}
							renderingTarget={renderingTarget}
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
							article={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);

				case ArticleDesign.FullPageInteractive: {
					// Should be FullPageInteractiveLayout once implemented for apps
					return notSupported;
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
					return (
						<CommentLayout
							article={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.NewsletterSignup:
					// Should be NewsletterSignup once implemented for apps
					return notSupported;
				default:
					return (
						<StandardLayout
							article={article}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
			}
		}
	}
};

const DecideLayoutWeb = ({
	article,
	format,
	NAV,
	renderingTarget,
}: WebProps) => {
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
							article={article}
							NAV={NAV}
							format={format}
						/>
					);
				}
				default: {
					return (
						<ImmersiveLayout
							article={article}
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
			switch (format.design) {
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article}
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
							article={article}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Picture:
					return (
						<PictureLayout
							article={article}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<ShowcaseLayout
							article={article}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
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
							article={article}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.FullPageInteractive: {
					return (
						<FullPageInteractiveLayout
							article={article}
							NAV={NAV}
							format={format}
						/>
					);
				}
				case ArticleDesign.LiveBlog:
				case ArticleDesign.DeadBlog:
					return (
						<LiveLayout
							article={article}
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
							article={article}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.NewsletterSignup:
					return (
						<NewsletterSignupLayout
							article={article}
							NAV={NAV}
							format={format}
							renderingTarget={renderingTarget}
						/>
					);
				case ArticleDesign.Audio:
					return (
						<AudioLayout
							article={article}
							format={format}
							NAV={NAV}
							renderingTarget={renderingTarget}
						/>
					);
				default:
					return (
						<StandardLayout
							article={article}
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
	const { article, format, renderingTarget } = props;

	switch (renderingTarget) {
		case 'Apps':
			return (
				<DecideLayoutApps
					article={article}
					format={format}
					renderingTarget={renderingTarget}
				/>
			);
		case 'Web':
			return (
				<DecideLayoutWeb
					NAV={props.NAV}
					article={article}
					format={format}
					renderingTarget={renderingTarget}
				/>
			);
	}
};
