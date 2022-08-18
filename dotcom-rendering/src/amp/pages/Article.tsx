import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import React from 'react';
import type { NavType } from '../../model/extract-nav';
import { AdConsent } from '../components/AdConsent';
import { AmpExperimentComponent } from '../components/AmpExperiment';
import type { AnalyticsModel } from '../components/Analytics';
import { Analytics } from '../components/Analytics';
import { AnalyticsIframe } from '../components/AnalyticsIframe';
import { Body as BodyArticle } from '../components/BodyArticle';
import { Body as BodyLiveblog } from '../components/BodyLiveblog';
import { ContentABTestProvider } from '../components/ContentABTest';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Onward } from '../components/Onward';
import { Sidebar } from '../components/Sidebar';
import { filterForTagsOfType } from '../lib/tag-utils';
import type { AmpExperiments } from '../server/ampExperimentCache';
import type { ArticleModel } from '../types/ArticleModel';

const containerStyles = css`
	margin: auto;
	max-width: 600px;
`;

const backgroundColour = css`
	background-color: ${neutral[97]};
`;

const Body: React.FunctionComponent<{
	data: ArticleModel;
	config: ConfigType;
}> = ({ data, config }) => {
	const { format } = data;

	if (
		format.design === 'LiveBlogDesign' ||
		format.design === 'DeadBlogDesign'
	) {
		return <BodyLiveblog data={data} config={config} />;
	}
	return <BodyArticle data={data} config={config} />;
};

export const Article: React.FC<{
	experimentsData?: AmpExperiments;
	nav: NavType;
	articleData: ArticleModel;
	config: ConfigType;
	analytics: AnalyticsModel;
}> = ({ nav, articleData, config, analytics, experimentsData }) => {
	return (
		<ContentABTestProvider
			switches={config.switches}
			pageId={config.pageId}
		>
			<Analytics key="analytics" analytics={analytics} />
			<AnalyticsIframe url={config.ampIframeUrl} />
			<AdConsent />
			{experimentsData && (
				<AmpExperimentComponent experimentsData={experimentsData} />
			)}

			{/* /TODO change to gray bgcolor */}
			<div key="main" css={[backgroundColour, containerStyles]}>
				<Header
					nav={nav}
					guardianBaseURL={articleData.guardianBaseURL}
				/>
				<Body data={articleData} config={config} />
				<Onward
					pageID={articleData.pageId}
					sectionID={articleData.sectionName}
					hasRelated={articleData.hasRelated}
					hasStoryPackage={articleData.hasStoryPackage}
					seriesTags={filterForTagsOfType(articleData.tags, 'Series')}
					guardianBaseURL={articleData.guardianBaseURL}
				/>
				<Footer nav={nav} />
			</div>

			{/* The sidebar has to live here unfortunately to be valid AMP
            but note the click handler lives in the Header. */}
			<Sidebar key="sidebar" nav={nav} />
		</ContentABTestProvider>
	);
};
