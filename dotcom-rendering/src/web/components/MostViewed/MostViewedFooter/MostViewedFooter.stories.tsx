import fetchMock from 'fetch-mock';

import { Display, Design, Pillar } from '@guardian/types';
import { ABProvider } from '@guardian/ab-react';

import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import {
	responseWithTwoTabs,
	responseWithOneTab,
	responseWithMissingImage,
} from '../MostViewed.mocks';

import { MostViewedFooter } from './MostViewedFooter';

export default {
	component: MostViewedFooter,
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
		<AbProvider>
			<ElementContainer>
				<MostViewedFooter
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					sectionName="politics"
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					display={Display.Standard}
				/>
			</ElementContainer>
		</AbProvider>
	);
};
withTwoTabs.story = { name: 'with two tabs' };

export const withOneTabs = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithOneTab,
	});

	return (
		<AbProvider>
			<ElementContainer>
				<MostViewedFooter
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					display={Display.Standard}
				/>
			</ElementContainer>
		</AbProvider>
	);
};
withOneTabs.story = { name: 'with one tab' };

export const withNoMostSharedImage = () => {
	fetchMock.restore().getOnce('*', {
		status: 200,
		body: responseWithMissingImage,
	});

	return (
		<AbProvider>
			<ElementContainer>
				<MostViewedFooter
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					ajaxUrl="https://api.nextgen.guardianapps.co.uk"
					display={Display.Standard}
				/>
			</ElementContainer>
		</AbProvider>
	);
};
withNoMostSharedImage.story = { name: 'with a missing image on most shared' };
