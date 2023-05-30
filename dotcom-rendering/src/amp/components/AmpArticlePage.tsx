import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import type { NavType } from '../../model/extract-nav';
import type { ConfigType } from '../../types/config';
import { filterForTagsOfType } from '../lib/tag-utils';
import type { AmpExperiments } from '../server/ampExperimentCache';
import type { ArticleModel } from '../types/ArticleModel';
import { AdConsent } from './AdConsent';
import { AmpExperimentComponent } from './AmpExperiment';
import type { AnalyticsModel } from './Analytics';
import { Analytics } from './Analytics';
import { AnalyticsIframe } from './AnalyticsIframe';
import { Body as BodyArticle } from './BodyArticle';
import { Body as BodyLiveblog } from './BodyLiveblog';
import { ContentABTestProvider } from './ContentABTest';
import { Footer } from './Footer';
import { Header } from './Header';
import { Onward } from './Onward';
import type { PermutiveModel } from './Permutive';
import { Permutive } from './Permutive';
import { Sidebar } from './Sidebar';

const containerStyles = css`
	margin: auto;
	max-width: 600px;
`;

const backgroundColour = css`
	background-color: ${neutral[97]};
`;

type BodyProps = {
	data: ArticleModel;
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
	articleData: ArticleModel;
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
