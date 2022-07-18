import { ArticleDesign } from '@guardian/libs';
import type { DCRContainerPalette } from '../../types/front';
import { Card } from './Card/Card';

type Props = {
	content: TrailType[];
	containerPalette?: DCRContainerPalette;
};

export const Spotlight = ({ content, containerPalette }: Props) => (
	<Card
		containerPalette={containerPalette}
		showAge={true}
		linkTo={content[0].url}
		format={content[0].format}
		headlineText={content[0].headline}
		headlineSize="large"
		byline={content[0].byline}
		showByline={content[0].showByline}
		showQuotes={
			content[0].format.design === ArticleDesign.Comment ||
			content[0].format.design === ArticleDesign.Letter
		}
		webPublicationDate={content[0].webPublicationDate}
		kickerText={content[0].kickerText}
		showPulsingDot={content[0].format.design === ArticleDesign.LiveBlog}
		showSlash={true}
		showClock={false}
		imageUrl={content[0].image}
		mediaType={content[0].mediaType}
		mediaDuration={content[0].mediaDuration}
		imagePosition="right"
		imageSize="jumbo"
		discussionId={content[0].discussionId}
	/>
);
