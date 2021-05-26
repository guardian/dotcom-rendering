import React from 'react';
import { css } from '@emotion/react';

import { Footer } from '@root/src/amp/components/Footer';
import { Body as BodyArticle } from '@root/src/amp/components/BodyArticle';
import { Body as BodyLiveblog } from '@root/src/amp/components/BodyLiveblog';
import { Header } from '@root/src/amp/components/Header';
import { Onward } from '@root/src/amp/components/Onward';
import { AdConsent } from '@root/src/amp/components/AdConsent';
import { Sidebar } from '@root/src/amp/components/Sidebar';
import { Analytics, AnalyticsModel } from '@root/src/amp/components/Analytics';
import { filterForTagsOfType } from '@root/src/amp/lib/tag-utils';
import { AnalyticsIframe } from '@root/src/amp/components/AnalyticsIframe';
import { palette } from '@guardian/src-foundations';
import { ArticleModel } from '@root/src/amp/types/ArticleModel';
import { AmpExperimentComponent } from '@root/src/amp/components/AmpExperiment';
import { AmpExperiments } from '@root/src/amp/server/ampExperimentCache';

const containerStyles = css`
	margin: auto;
	max-width: 600px;
`;

const backgroundColour = css`
	background-color: ${palette.neutral[97]};
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
		<>
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
		</>
	);
};
