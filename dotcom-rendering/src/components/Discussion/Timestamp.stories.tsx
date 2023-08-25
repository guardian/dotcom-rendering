import { Timestamp } from './Timestamp';

export default { component: Timestamp, title: 'Discussion/Timestamp' };

// Date is mocked to "Fri March 27 2020 12:00:00 GMT+0000 (Greenwich Mean Time)" in config

export const TwoMonths = () => (
	<Timestamp
		isoDateTime={'2021-10-31T14:22:39Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
TwoMonths.storyName = 'Two months';

export const OneHour = () => (
	<Timestamp
		isoDateTime={'2022-01-01T11:00:00Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
OneHour.storyName = 'One Hour';

export const TwentyThreeHours = () => (
	<Timestamp
		isoDateTime={'2021-12-31T13:00:00Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
TwentyThreeHours.storyName = 'Twenty three hours';

export const TwentyFiveHours = () => (
	<Timestamp
		isoDateTime={'2021-12-31T11:00:00Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
TwentyFiveHours.storyName = 'Twenty five hours';
