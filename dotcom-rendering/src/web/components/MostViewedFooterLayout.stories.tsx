import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import React, { useEffect } from 'react';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { ContainerLayout } from './ContainerLayout';
import {
	responseWithMissingImage,
	responseWithOneTab,
	responseWithTwoTabs,
} from './MostViewed.mocks';
import { MostViewedFooterLayout } from './MostViewedFooterLayout';

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
			<ContainerLayout fullWidth={true}>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					sectionName="politics"
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</ContainerLayout>
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
			<ContainerLayout fullWidth={true}>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</ContainerLayout>
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
			<ContainerLayout fullWidth={true}>
				<MostViewedFooterLayout
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
				/>
			</ContainerLayout>
		</Hydrated>
	);
};
withNoMostSharedImage.story = { name: 'with a missing image on most shared' };
