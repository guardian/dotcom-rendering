import { breakpoints } from '@guardian/source/foundations';
import { fn } from 'storybook/test';
import preview from '../../.storybook/preview';
import { NewsletterPreviewModal } from './NewsletterPreviewModal';

const meta = preview.meta({
	title: 'Components/NewsletterPreviewModal',
	component: NewsletterPreviewModal,
});

const defaultArgs = {
	newsletterName: 'The Long Wave',
	renderUrl: 'about:blank',
	onClose: fn(),
};

export const Default = meta.story({
	args: {
		...defaultArgs,
	},
});

export const LongTitle = meta.story({
	args: {
		...defaultArgs,
		newsletterName:
			'The European politics briefing with a deliberately very long newsletter title',
	},
});

export const Mobile = meta.story({
	args: {
		...defaultArgs,
	},
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
});

export const MobileLongTitle = meta.story({
	args: {
		...defaultArgs,
		newsletterName:
			'The European politics briefing with a deliberately very long newsletter title',
	},
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobile],
		},
	},
});
