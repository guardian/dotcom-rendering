import { breakpoints } from '@guardian/source-foundations';
import { useRef } from 'react';
import { AdSlot, type Props } from './AdSlot.apps';

export default {
	component: AdSlot,
	title: 'Components/AdSlot.apps',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
};

type Args = Omit<Props, 'ref'>;

export const AdSlotSquare = (args: Args) => {
	const ref = useRef(null);
	return <AdSlot ref={ref} {...args} />;
};
AdSlotSquare.storyName = 'with isSquare = true (first ad slot only)';
AdSlotSquare.args = {
	isSquare: true,
	onClickSupportButton: { action: 'clicked' },
};

export const AdSlotNotSquare = (args: Args) => {
	const ref = useRef(null);
	return <AdSlot ref={ref} {...args} />;
};
AdSlotNotSquare.storyName = 'with isSquare = false (all other slots)';
AdSlotNotSquare.args = {
	isSquare: false,
	onClickSupportButton: { action: 'clicked' },
};
