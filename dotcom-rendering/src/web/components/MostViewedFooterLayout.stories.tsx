import React, { useEffect } from 'react';
import { trails } from '../../../fixtures/manual/trails';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { MostViewedFooter } from './MostViewedFooter';
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
	return (
		<Hydrated>
			<Section>
				<MostViewedFooterLayout>
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
withTwoTabs.story = { name: 'with two tabs' };

export const withOneTabs = () => {
	return (
		<Hydrated>
			<Section>
				<MostViewedFooterLayout>
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
withOneTabs.story = { name: 'with one tab' };
