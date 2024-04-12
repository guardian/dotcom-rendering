import { css } from '@emotion/react';
import { palette } from '@guardian/source-foundations';
import { filterForTagsOfType } from '../lib/tag-utils.amp';
import type { NavType } from '../model/extract-nav';
import type { AmpExperiments } from '../server/AMPExperimentCache.amp';
import type { AMPArticleModel } from '../types/article.amp';
import type { ConfigType } from '../types/config';
import { AdConsent } from './AdConsent.amp';
import { AmpExperimentComponent } from './AmpExperiment.amp';
import type { AnalyticsModel } from './Analytics.amp';
import { Analytics } from './Analytics.amp';
import { AnalyticsIframe } from './AnalyticsIframe.amp';
import { Body as BodyArticle } from './BodyArticle.amp';
import { Body as BodyLiveblog } from './BodyLiveblog.amp';
import { ContentABTestProvider } from './ContentABTest.amp';
import { Footer } from './Footer.amp';
import { Header } from './Header.amp';
import { Onward } from './Onward.amp';
import type { PermutiveModel } from './Permutive.amp';
import { Permutive } from './Permutive.amp';
import { Sidebar } from './Sidebar.amp';

const containerStyles = css`
	margin: auto;
	max-width: 600px;
`;

const backgroundColour = css`
	background-color: ${palette.neutral[97]};
`;

type BodyProps = {
	data: AMPArticleModel;
	config: ConfigType;
};

const Body = ({ data, config }: BodyProps) => {
	const { format } = data;

	if (
		format.design === 'LiveBlogDesign' ||
		format.design === 'DeadBlogDesign'
	) {
		return <BodyLiveblog data={data} config={config} />;
	}
	return <BodyArticle data={data} config={config} />;
};

type ArticleProps = {
	experimentsData?: AmpExperiments;
	nav: NavType;
	articleData: AMPArticleModel;
	config: ConfigType;
	analytics: AnalyticsModel;
	permutive: PermutiveModel;
};

export const AmpArticlePage = ({
	nav,
	articleData,
	config,
	analytics,
	experimentsData,
	permutive: { projectId, apiKey, payload },
}: ArticleProps) => {
	return (
		<ContentABTestProvider
			switches={config.switches}
			pageId={config.pageId}
		>
			<Permutive
				projectId={projectId}
				apiKey={apiKey}
				payload={payload}
			/>
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
			<Sidebar key="sidebar" />
		</ContentABTestProvider>
	);
};
