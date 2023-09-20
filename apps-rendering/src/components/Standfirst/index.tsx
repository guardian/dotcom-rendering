// ----- Imports ----- //
import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import type { Item } from 'item';
import { getFormat } from 'item';
import AnalysisStandfirst from './AnalysisStandfirst';
import DeadBlogStandfirst from './DeadBlogStandfirst';
import ExplainerStandfirst from './ExplainerStandfirst';
import GalleryStandfirst from './GalleryStandfirst';
import ImmersiveLabsStandfirst from './ImmersiveLabsStandfirst';
import ImmersiveStandfirst from './ImmersiveStandfirst';
import InterviewStandfirst from './InterviewStandfirst';
import LabsStandfirst from './LabsStandfirst';
import LiveBlogStandfirst from './LiveBlogStandfirst';
import MediaStandfirst from './MediaStandfirst';
import NewsletterSignupStandfirst from './NewsletterSignupStandfirst';
import ReviewStandfirst from './ReviewStandfirst';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

// ----- Component ----- //
interface Props {
	item: Item;
}

const Standfirst: React.FC<Props> = ({ item }) => {
	const format = getFormat(item);

	if (format.display === ArticleDisplay.Immersive) {
		return format.theme === ArticleSpecial.Labs ? (
			<ImmersiveLabsStandfirst item={item} />
		) : (
			<ImmersiveStandfirst
				standfirst={item.standfirst}
				format={format}
				byline={item.byline}
				bylineHtml={item.bylineHtml}
			/>
		);
	}
	if (format.theme === ArticleSpecial.Labs) {
		return <LabsStandfirst item={item} />;
	}
	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return <LiveBlogStandfirst item={item} />;
		case ArticleDesign.DeadBlog:
			return <DeadBlogStandfirst item={item} />;
		case ArticleDesign.Gallery:
			return (
				<GalleryStandfirst
					standfirst={item.standfirst}
					format={format}
				/>
			);
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return <MediaStandfirst item={item} />;
		case ArticleDesign.Review:
		case ArticleDesign.Feature:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return <ReviewStandfirst item={item} />;
		case ArticleDesign.Interview:
			return <InterviewStandfirst item={item} />;
		case ArticleDesign.Analysis:
			return <AnalysisStandfirst item={item} />;
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.Profile:
			return <ExplainerStandfirst item={item} />;
		case ArticleDesign.NewsletterSignup:
			return <NewsletterSignupStandfirst item={item} />;
		default:
			return (
				<DefaultStandfirst
					item={item}
					css={css(defaultStyles(format))}
				/>
			);
	}
};

// ----- Exports ----- //

export default Standfirst;
