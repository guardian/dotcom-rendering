import React from 'react';
import { Footer } from '@root/src/amp/components/Footer';
import { Container } from '@root/src/amp/components/Container';
import { Body as BodyArticle } from '@root/src/amp/components/BodyArticle';
import { Body as BodyLiveblog } from '@root/src/amp/components/BodyLiveblog';
import { Header } from '@root/src/amp/components/Header';
import { Onward } from '@root/src/amp/components/Onward';
import { AdConsent } from '@root/src/amp/components/AdConsent';
import { css } from 'emotion';
import { Sidebar } from '@root/src/amp/components/Sidebar';
import { Analytics, AnalyticsModel } from '@root/src/amp/components/Analytics';
import { filterForTagsOfType } from '@root/src/amp/lib/tag-utils';
import { AnalyticsIframe } from '@root/src/amp/components/AnalyticsIframe';
import { palette } from '@guardian/src-foundations';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { AmpExperimentComponent } from '@root/src/amp/components/AmpExperiment';
import { AmpExperiments } from '@root/src/amp/server/ampExperimentCache';
import { decideDesign } from '@root/src/web/lib/decideDesign';
import { decideTheme } from '@root/src/web/lib/decideTheme';

const backgroundColour = css`
	background-color: ${palette.neutral[97]};
`;

const Body: React.SFC<{
	data: ArticleModel;
	pillar: Theme;
	design: Design;
	config: ConfigType;
}> = ({ data, design, config, pillar }) => {
	// TODO check if there is a better way to determine if liveblog
	const isLiveBlog =
		data.tags.find((tag) => tag.id === 'tone/minutebyminute') !== undefined;

	if (isLiveBlog) {
		return <BodyLiveblog pillar={pillar} data={data} config={config} />;
	}

	return (
		<BodyArticle
			pillar={pillar}
			design={design}
			data={data}
			config={config}
		/>
	);
};

export const Article: React.FC<{
	experimentsData?: AmpExperiments;
	nav: NavType;
	articleData: ArticleModel;
	config: ConfigType;
	analytics: AnalyticsModel;
}> = ({ nav, articleData, config, analytics, experimentsData }) => {
	const design = decideDesign({
		designType: articleData.designType,
		tags: articleData.tags,
		isLiveBlog: config.isLiveBlog,
		isLive: config.isLive,
	});
	const pillar = decideTheme({
		pillar: articleData.pillar,
		design,
	});

	return (
		<>
			<Analytics key="analytics" analytics={analytics} />
			<AnalyticsIframe url={config.ampIframeUrl} />
			<AdConsent />
			{experimentsData && (
				<AmpExperimentComponent experimentsData={experimentsData} />
			)}

			{/* /TODO change to gray bgcolor */}
			<div key="main" className={backgroundColour}>
				<Container>
					<Header
						nav={nav}
						guardianBaseURL={articleData.guardianBaseURL}
					/>
					<Body
						data={articleData}
						pillar={pillar}
						design={design}
						config={config}
					/>
					<Onward
						pageID={articleData.pageId}
						sectionID={articleData.sectionName}
						hasRelated={articleData.hasRelated}
						hasStoryPackage={articleData.hasStoryPackage}
						seriesTags={filterForTagsOfType(
							articleData.tags,
							'Series',
						)}
						guardianBaseURL={articleData.guardianBaseURL}
					/>
					<Footer nav={nav} />
				</Container>
			</div>

			{/* The sidebar has to live here unfortunately to be valid AMP
            but note the click handler lives in the Header. */}
			<Sidebar key="sidebar" nav={nav} />
		</>
	);
};
