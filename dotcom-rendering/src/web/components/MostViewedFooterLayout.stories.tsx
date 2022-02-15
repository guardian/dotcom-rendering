import fetchMock from 'fetch-mock';

import { ArticleDisplay, ArticleDesign, ArticlePillar } from '@guardian/libs';
import { ABProvider } from '@guardian/ab-react';

import React, { useEffect } from 'react';
import { ElementContainer } from './ElementContainer';
import {
	responseWithTwoTabs,
	responseWithOneTab,
	responseWithMissingImage,
} from './MostViewed.mocks';

import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

const HydratedLayout = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		doStorybookHydration();
	});
	return <>{children}</>;
};

export default {
	component: MostViewedFooterLayout,
	title: 'Components/MostViewedFooter',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
};

const AbProvider: React.FC = ({ children }) => {
	return (
		<ABProvider
			mvtMaxValue={1000000}
			mvtId={1234}
			pageIsSensitive={false}
			abTestSwitches={{}}
			arrayOfTestObjects={[]}
		>
			{children}
		</ABProvider>
	);
};

export const withTwoTabs = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithTwoTabs,
	});

	return (
		<HydratedLayout>
			<AbProvider>
				<ElementContainer>
					<MostViewedFooterLayout
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.News,
						}}
						sectionName="politics"
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						switches={{}}
						pageIsSensitive={false}
						isDev={false}
					/>
				</ElementContainer>
			</AbProvider>
		</HydratedLayout>
	);
};
withTwoTabs.story = { name: 'with two tabs' };

export const withOneTabs = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithOneTab,
	});

	return (
		<HydratedLayout>
			<AbProvider>
				<ElementContainer>
					<MostViewedFooterLayout
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.News,
						}}
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						switches={{}}
						pageIsSensitive={false}
						isDev={false}
					/>
				</ElementContainer>
			</AbProvider>
		</HydratedLayout>
	);
};
withOneTabs.story = { name: 'with one tab' };

export const withNoMostSharedImage = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithMissingImage,
	});

	return (
		<HydratedLayout>
			<AbProvider>
				<ElementContainer>
					<MostViewedFooterLayout
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: ArticlePillar.News,
						}}
						ajaxUrl="https://api.nextgen.guardianapps.co.uk"
						switches={{}}
						pageIsSensitive={false}
						isDev={false}
					/>
				</ElementContainer>
			</AbProvider>
		</HydratedLayout>
	);
};
withNoMostSharedImage.story = { name: 'with a missing image on most shared' };
