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
		viewport: {
			defaultViewport: 'mobile',
		},
	},
	argTypes: {
		onClickSupportButton: { action: 'clicked' },
	},
};

type Args = Omit<Props, 'ref'>;

export const AdSlotSquare = (args: Args) => {
	const ref = useRef(null);
	return <AdSlot ref={ref} {...args} />;
};
AdSlotSquare.storyName = 'with isFirstAdSlot = true';
AdSlotSquare.args = {
	isFirstAdSlot: true,
};

export const AdSlotNotSquare = (args: Args) => {
	const ref = useRef(null);
	return <AdSlot ref={ref} {...args} />;
};
AdSlotNotSquare.storyName = 'with isFirstAdSlot = false';
AdSlotNotSquare.args = {
	isFirstAdSlot: false,
};
