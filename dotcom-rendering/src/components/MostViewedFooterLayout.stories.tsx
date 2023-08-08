import React, { useEffect } from 'react';
import { trails } from '../../fixtures/manual/trails';
import { doStorybookHydration } from '../client/islands/doStorybookHydration';
import { MostViewedFooter } from './MostViewedFooter.importable';
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

export const withTwoTabsAdFree = () => {
	return (
		<Hydrated>
			<Section>
				<MostViewedFooterLayout renderAds={false}>
					<MostViewedFooter
						tabs={[
							{ heading: 'Tab 1', trails: trails.slice(0, 10) },
							{ heading: 'Tab 2', trails: trails.slice(5, 15) },
						]}
					/>
				</MostViewedFooterLayout>
			</Section>
		</Hydrated>
	);
};
withTwoTabsAdFree.storyName = 'with two tabs ad free';

export const withOneTabsAdFree = () => {
	return (
		<Hydrated>
			<Section>
				<MostViewedFooterLayout renderAds={false}>
					<MostViewedFooter
						tabs={[
							{
								heading: 'in the UK',
								trails: trails.slice(0, 10),
							},
						]}
					/>
				</MostViewedFooterLayout>
			</Section>
		</Hydrated>
	);
};
withOneTabsAdFree.storyName = 'with one tab ad free';

export const withTwoTabs = () => {
	return (
		<Hydrated>
			<Section>
				<MostViewedFooterLayout renderAds={true}>
					<MostViewedFooter
						tabs={[
							{ heading: 'Tab 1', trails: trails.slice(0, 10) },
							{ heading: 'Tab 2', trails: trails.slice(5, 15) },
						]}
					/>
				</MostViewedFooterLayout>
			</Section>
		</Hydrated>
	);
};
withTwoTabs.storyName = 'with two tabs';

export const withOneTabs = () => {
	return (
		<Hydrated>
			<Section>
				<MostViewedFooterLayout renderAds={true}>
					<MostViewedFooter
						tabs={[
							{
								heading: 'in the UK',
								trails: trails.slice(0, 10),
							},
						]}
					/>
				</MostViewedFooterLayout>
			</Section>
		</Hydrated>
	);
};
withOneTabs.storyName = 'with one tab';
