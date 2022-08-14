import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { ContainerLayout } from './ContainerLayout';
import { Figure } from './Figure';
import { RichLink } from './RichLink';

const someContributor =
	'https://i.guim.co.uk/img/uploads/2017/10/09/Oliver-Wainwright,-L.png?width=300&quality=85&auto=format&fit=max&s=e1aa270c46b716e34c4783ced3376cc9';

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
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const Network = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
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
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};
SectionStory.story = {
	name: 'Section',
};

export const Inline = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};
Inline.story = {
	name: 'Inline',
};

export const ImageContent = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
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
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};
Interactive.story = {
	parameters: {
		viewport: { defaultViewport: 'leftCol' },
	},
};

export const Gallery = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};
Gallery.story = {
	parameters: {
		viewport: { defaultViewport: 'leftCol' },
	},
};

export const Video = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
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
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const LiveBlog = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
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
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const Index = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const Crossword = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const Survey = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const Signup = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const Userid = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};

export const PaidFor = () => {
	return (
		<ContainerLayout
			showTopBorder={false}
			centralBorder="full"
			showSideBorders={false}
		>
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
		</ContainerLayout>
	);
};
