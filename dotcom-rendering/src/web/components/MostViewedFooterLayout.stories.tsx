import fetchMock from 'fetch-mock';

import { ArticleDisplay, ArticleDesign, ArticlePillar } from '@guardian/libs';

import React, { useEffect } from 'react';
import { AB } from '@guardian/ab-core';
import { ElementContainer } from './ElementContainer';
import {
	responseWithTwoTabs,
	responseWithOneTab,
	responseWithMissingImage,
} from './MostViewed.mocks';

import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { setABTests } from '../lib/useAB';

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

setABTests(
	new AB({
		mvtMaxValue: 1000000,
		mvtId: 1234,
		pageIsSensitive: false,
		abTestSwitches: {},
		arrayOfTestObjects: [],
	}),
);

export const withTwoTabs = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithTwoTabs,
	});

	return (
		<HydratedLayout>
			<ElementContainer>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					sectionName="politics"
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</ElementContainer>
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
			<ElementContainer>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</ElementContainer>
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
			<ElementContainer>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</ElementContainer>
		</HydratedLayout>
	);
};
withNoMostSharedImage.story = { name: 'with a missing image on most shared' };
