import fetchMock from 'fetch-mock';

import { ArticleDisplay, ArticleDesign, ArticlePillar } from '@guardian/libs';

import React, { useEffect } from 'react';
import { ElementContainer } from './ElementContainer';
import {
	responseWithTwoTabs,
	responseWithOneTab,
	responseWithMissingImage,
} from './MostViewed.mocks';

import { MostViewedFooterLayout } from './MostViewedFooterLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

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
		</Hydrated>
	);
};
withNoMostSharedImage.story = { name: 'with a missing image on most shared' };
