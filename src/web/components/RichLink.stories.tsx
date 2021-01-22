import React from 'react';

import { Pillar, Special } from '@guardian/types';

import { Section } from '@frontend/web/components/Section';
import { ArticleContainer } from '@frontend/web/components/ArticleContainer';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { Flex } from '@frontend/web/components/Flex';

import { RichLink } from './RichLink';

// cardStyle = "news" | "special-report" | "live" | "dead" | "feature" | "editorial" | "comment" | "podcast" | "media" | "analysis" | "review" | "letters" | "external"
// ContentType = "article" | "network" | "section" | "imageContent" | "interactive" | "gallery" | "video" | "audio" | "liveBlog" | "tag" | "index" | "crossword" | "survey" | "signup" | "userid"

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
					<RichLink
						richLinkIndex={1}
						cardStyle="news"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="article"
						url=""
						pillar={Pillar.Culture}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="special-report"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="network"
						url=""
						pillar={Pillar.Culture}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="live"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="section"
						url=""
						pillar={Pillar.Sport}
						tags={[]}
						sponsorName=""
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
SectionStory.story = {
	name: 'Section',
};

export const ImageContent = () => {
	return (
		<Section>
			<Flex>
				<LeftColumn>
					<p />
				</LeftColumn>
				<ArticleContainer>
					<RichLink
						richLinkIndex={1}
						cardStyle="dead"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="imageContent"
						url=""
						pillar={Pillar.News}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="feature"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="interactive"
						url=""
						pillar={Pillar.Lifestyle}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="comment"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="gallery"
						url=""
						pillar={Special.Labs}
						tags={[]}
						sponsorName=""
						contributorImage={someContributor}
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="comment"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="video"
						url=""
						pillar={Pillar.News}
						tags={[]}
						sponsorName=""
						contributorImage={someContributor}
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="podcast"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="audio"
						url=""
						pillar={Pillar.Culture}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="media"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="liveBlog"
						url=""
						pillar={Pillar.Sport}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="analysis"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="tag"
						url=""
						pillar={Pillar.Culture}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="review"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="index"
						url=""
						pillar={Pillar.Opinion}
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
					<RichLink
						richLinkIndex={1}
						cardStyle="letters"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="crossword"
						url=""
						pillar={Pillar.Opinion}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="external"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="survey"
						url=""
						pillar={Pillar.Culture}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="comment"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="signup"
						url=""
						pillar={Pillar.Culture}
						tags={[]}
						sponsorName=""
						contributorImage={someContributor}
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="editorial"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="userid"
						url=""
						pillar={Pillar.Culture}
						tags={[]}
						sponsorName=""
					/>
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
					<RichLink
						richLinkIndex={1}
						cardStyle="news"
						thumbnailUrl={someImage}
						headlineText="Rich link headline"
						contentType="userid"
						url=""
						pillar={Pillar.Culture}
						tags={[
							{
								id: 'tone/advertisement-features',
								type: '',
								title: '',
							},
						]}
						sponsorName="Sponsor name"
					/>
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
