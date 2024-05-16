import { UKLocalElectionTracker as UKLocalElectionTrackerComponent } from './UKLocalElectionTracker';
import { Meta, StoryObj } from '@storybook/react';
import { FrontSection } from './FrontSection';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { DynamicPackage } from './DynamicPackage';
import { DCRFrontCard } from '../types/front';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { trails } from '../../fixtures/manual/trails';

const meta = {
	title: 'Components/UK Local Election Tracker',
	component: UKLocalElectionTrackerComponent,
} satisfies Meta<typeof UKLocalElectionTrackerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const snap: DCRFrontCard = {
	format: {
		design: ArticleDesign.Standard,
		theme: Pillar.News,
		display: ArticleDisplay.Standard,
	},
	url: '',
	headline: '',
	showQuotedHeadline: false,
	dataLinkName: '',
	discussionApiUrl: '',
	isExternalLink: true,
	embedUri:
		'https://content.guardianapis.com/atom/interactive/interactives/2024/04/local-elections-tracker/local-elections-tracker-2024',
	showLivePlayable: false,
};

export const UKLocalElectionTracker = {} satisfies Story;

export const DynamoContainer = {
	render: (args) => (
		<FrontSection
			title="Dynamic Package"
			showTopBorder={true}
			discussionApiUrl={discussionApiUrl}
			editionId={'UK'}
			containerPalette="EventPalette"
		>
			<DynamicPackage
				groupedTrails={{
					huge: [],
					veryBig: [],
					big: [],
					standard: trails.slice(1, 4),
					snap: [snap],
				}}
				showAge={true}
				containerPalette="EventPalette"
				imageLoading="eager"
			/>
		</FrontSection>
	),
} satisfies Story;

// TODO: Add stories for iOS and Android
