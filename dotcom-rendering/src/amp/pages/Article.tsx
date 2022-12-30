import { css } from '@emotion/react';
import { neutral } from '@guardian/source-foundations';
import type { NavType } from '../../model/extract-nav';
import type { ConfigType } from '../../types/config';
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
import type { PermutiveModel } from '../components/Permutive';
import { Permutive } from '../components/Permutive';
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

export const Article = ({
	nav,
	articleData,
	config,
	analytics,
	experimentsData,
	permutive: { projectId, apiKey, payload },
}: ArticleProps) => {
	return (
		<ContentABTestProvider switches={config.switches} pageId={config.pageId}>
			<Permutive projectId={projectId} apiKey={apiKey} payload={payload} />
			<Analytics key="analytics" analytics={analytics} />
			<AnalyticsIframe url={config.ampIframeUrl} />
			<AdConsent />
			{experimentsData && (
				<AmpExperimentComponent experimentsData={experimentsData} />
			)}

			{/* /TODO change to gray bgcolor */}
			<div key="main" css={[backgroundColour, containerStyles]}>
				<Header nav={nav} guardianBaseURL={articleData.guardianBaseURL} />
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
