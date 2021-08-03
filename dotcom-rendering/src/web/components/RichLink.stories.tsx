/* eslint-disable jsx-a11y/aria-role */

import { Design, Display, Pillar, Special } from '@guardian/types';

import { Figure } from '@frontend/web/components/Figure';
import { ContainerLayout } from '@frontend/web/components/ContainerLayout';

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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="news"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="article"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="special-report"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="network"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="live"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="section"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Sport,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="inline">
				<RichLink
					richLinkIndex={1}
					cardStyle="external"
					imageData={someImageData}
					headlineText="Rich link when inline"
					contentType="section"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Lifestyle,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="dead"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="imageContent"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="feature"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="interactive"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Lifestyle,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="comment"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="gallery"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Special.Labs,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="comment"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="video"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="podcast"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="audio"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="media"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="liveBlog"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Sport,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="analysis"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="tag"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="review"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="index"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Opinion,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="letters"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="crossword"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Opinion,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="external"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="survey"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="comment"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="signup"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="editorial"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="userid"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
		<ContainerLayout centralBorder="full">
			<Figure isMainMedia={false} role="richLink">
				<RichLink
					richLinkIndex={1}
					cardStyle="news"
					imageData={someImageData}
					headlineText="Rich link headline"
					contentType="userid"
					url=""
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.Culture,
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
