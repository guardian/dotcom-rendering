/* eslint-disable jsx-a11y/aria-role */
import React from 'react';

import { Design, Display, Pillar, Special } from '@guardian/types';

import { Section } from '@frontend/web/components/Section';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Figure } from '@frontend/web/components/Figure';
import { Flex } from '@frontend/web/components/Flex';

import { RichLink } from './RichLink';

const someImage =
	'https://i.guim.co.uk/img/media/268d42accabbe8168fdbdee51ad31ab2f156b211/137_0_2088_1253/master/2088.jpg?width=460&quality=85&auto=format&fit=max&s=cf5abc39fb2af7a56b10306df21ab8e6';
const someContributor =
	'https://i.guim.co.uk/img/uploads/2017/10/09/Oliver-Wainwright,-L.png?width=300&quality=85&auto=format&fit=max&s=e1aa270c46b716e34c4783ced3376cc9';

export default {
	component: RichLink,
	title: 'Components/RichLink',
};

export const Article = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="news"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const Network = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="special-report"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
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
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="live"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
SectionStory.story = {
	name: 'Section',
};

export const Inline = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="inline">
						<RichLink
							richLinkIndex={1}
							cardStyle="audio"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
Inline.story = {
	name: 'Inline',
};

export const ImageContent = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="dead"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
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
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="feature"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
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
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="comment"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
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
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="comment"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
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
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="podcast"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const LiveBlog = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="media"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
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
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="analysis"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const Index = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="review"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const Crossword = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="letters"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const Survey = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="external"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const Signup = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="comment"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const Userid = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="editorial"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};

export const PaidFor = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<Figure role="richLink">
						<RichLink
							richLinkIndex={1}
							cardStyle="news"
							thumbnailUrl={someImage}
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
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
