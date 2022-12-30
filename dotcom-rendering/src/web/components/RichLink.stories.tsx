import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { Figure } from './Figure';
import { RichLink } from './RichLink';
import { Section } from './Section';

const someContributor =
	'https://uploads.guim.co.uk/2017/10/09/Oliver-Wainwright,-L.png';

const someImageData = {
	thumbnailUrl:
		'https://i.guim.co.uk/img/media/268d42accabbe8168fdbdee51ad31ab2f156b211/137_0_2088_1253/master/2088.jpg?width=460&quality=85&auto=format&fit=max&s=cf5abc39fb2af7a56b10306df21ab8e6',
	altText: 'What a lovely arch in this image',
	width: '1600',
	height: '900',
};

export default {
	component: RichLink,
	title: 'Components/RichLink',
};

export const Article = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="news"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="article"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};

export const Network = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="special-report"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="network"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};
Network.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [380] },
	},
};

export const SectionStory = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="live"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="section"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Sport,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Sport,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};
SectionStory.story = {
	name: 'Section',
};

export const Inline = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="external"
					imageData={someImageData}
					headlineText="Rich link when inline"
					contentType="section"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Lifestyle,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Lifestyle,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};
Inline.story = {
	name: 'Inline',
};

export const ImageContent = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="dead"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="imageContent"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};
ImageContent.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};

export const Interactive = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="feature"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="interactive"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Lifestyle,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Lifestyle,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};
Interactive.story = {
	parameters: {
		viewport: { defaultViewport: 'leftCol' },
	},
};

export const Gallery = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="comment"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="gallery"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticleSpecial.Labs,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticleSpecial.Labs,
					}}
					tags={[]}
					sponsorName=""
					contributorImage={someContributor}
				/>
			</Figure>
		</Section>
	);
};
Gallery.story = {
	parameters: {
		viewport: { defaultViewport: 'leftCol' },
	},
};

export const Video = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="comment"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="video"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					tags={[]}
					sponsorName=""
					contributorImage={someContributor}
				/>
			</Figure>
		</Section>
	);
};
Video.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [380] },
	},
};

export const Audio = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="podcast"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="audio"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};

export const LiveBlog = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="media"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="liveBlog"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.LiveBlog,
						theme: ArticlePillar.Sport,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.LiveBlog,
						theme: ArticlePillar.Sport,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};
LiveBlog.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [380] },
	},
};

export const Tag = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="analysis"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="tag"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};

export const Index = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="review"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="index"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Opinion,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Opinion,
					}}
					tags={[
						{
							id: '',
							type: 'Contributor',
							title: 'Contributor Name',
						},
					]}
					sponsorName=""
					starRating={3}
				/>
			</Figure>
		</Section>
	);
};

export const Crossword = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="letters"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="crossword"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Opinion,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Opinion,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};

export const Survey = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="external"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="survey"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};

export const Signup = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="comment"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="signup"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[]}
					sponsorName=""
					contributorImage={someContributor}
				/>
			</Figure>
		</Section>
	);
};

export const Userid = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="editorial"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="userid"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[]}
					sponsorName=""
				/>
			</Figure>
		</Section>
	);
};

export const PaidFor = () => {
	return (
		<Section showTopBorder={false} centralBorder="full" showSideBorders={false}>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="richLink"
			>
				<RichLink
					richLinkIndex={1}
					cardStyle="news"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="userid"
					url=""
					linkFormat={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.Culture,
					}}
					tags={[
						{
							id: 'tone/advertisement-features',
							type: '',
							title: '',
						},
					]}
					sponsorName="Sponsor name"
				/>
			</Figure>
		</Section>
	);
};
