import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import React, { useEffect } from 'react';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import {
	responseWithMissingImage,
	responseWithOneTab,
	responseWithTwoTabs,
} from './MostViewed.mocks';
import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { Section } from './Section';

const Hydrated = ({ children }: { children: React.ReactNode }) => {
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

export const withTwoTabs = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithTwoTabs,
	});

	return (
		<Hydrated>
			<Section fullWidth={true}>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					sectionName="politics"
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</Section>
		</Hydrated>
	);
};
withTwoTabs.story = { name: 'with two tabs' };

export const withOneTabs = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithOneTab,
	});

	return (
		<Hydrated>
			<Section fullWidth={true}>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</Section>
		</Hydrated>
	);
};
withOneTabs.story = { name: 'with one tab' };

export const withNoMostSharedImage = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithMissingImage,
	});

	return (
		<Hydrated>
			<Section fullWidth={true}>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</Section>
		</Hydrated>
	);
};
withNoMostSharedImage.story = { name: 'with a missing image on most shared' };
