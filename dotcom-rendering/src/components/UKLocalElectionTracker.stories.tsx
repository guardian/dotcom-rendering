import { UKLocalElectionTracker as UKLocalElectionTrackerComponent } from './UKLocalElectionTracker';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/UK Local Election Tracker',
	component: UKLocalElectionTrackerComponent,
} satisfies Meta<typeof UKLocalElectionTrackerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UKLocalElectionTracker = {} satisfies Story;
