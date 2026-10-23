import { neutral } from '@guardian/source/foundations';
import {
	bannerSchema,
	hexColourToString,
} from '@guardian/support-dotcom-components';
import { fireEvent, render, screen } from '@testing-library/react';
import { NEWSLETTER_BANNER_CONFIG } from '../../../StickyBottomBanner/newsletterBannerDetails';
import { props } from '../utils/storybook';
import { NewsletterBanner } from './NewsletterBanner';

jest.mock('../../../../lib/useNewsletterSubscription', () => ({
	useNewsletterSubscription: jest.fn(),
}));

jest.mock('../../../../lib/useMatchMedia', () => ({
	...jest.requireActual<typeof import('../../../../lib/useMatchMedia')>(
		'../../../../lib/useMatchMedia',
	),
	useMatchMedia: () => false,
}));

jest.mock('./NewsletterSignupForm', () => ({
	NewsletterSignupForm: ({ onSuccess }: { onSuccess: () => void }) => (
		<button onClick={onSuccess}>Sign up</button>
	),
}));

describe('NewsletterBanner configuration', () => {
	it('uses newsletter colours', () => {
		const { colours } = NEWSLETTER_BANNER_CONFIG.design;

		expect(hexColourToString(colours.basic.background)).toBe('#F3F7FF');
		expect(hexColourToString(colours.basic.headerText)).toBe(neutral[7]);
		expect(hexColourToString(colours.basic.bodyText)).toBe(neutral[20]);
	});

	it('uses local newsletter settings instead of SDC presentation settings', () => {
		const banner = NewsletterBanner({
			...props,
			bannerChannel: 'subscriptions',
			content: { heading: 'SDC heading' },
			design: undefined,
			isCollapsible: true,
			idApiUrl: 'https://idapi.theguardian.com',
		});

		expect(banner.props).toMatchObject(NEWSLETTER_BANNER_CONFIG);
		expect(bannerSchema.safeParse(banner.props).success).toBe(true);
	});

	it('preserves runtime tracking and service props', () => {
		const runtimeProps = {
			tracking: props.tracking,
			articleCounts: props.articleCounts,
			countryCode: 'US',
			fetchEmail: jest.fn(),
			submitComponentEvent: jest.fn(),
			contributionsServiceUrl: 'https://contributions.example.com',
			idApiUrl: 'https://idapi.theguardian.com',
		};
		const banner = NewsletterBanner({ ...props, ...runtimeProps });

		expect(banner.props).toMatchObject(runtimeProps);
	});

	it('keeps the same close button outside the transitioning panels after signup', () => {
		render(
			<NewsletterBanner
				{...props}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);
		const closeButton = screen.getByRole('button', { name: 'Close' });

		fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(
			1,
		);
		expect(screen.getByRole('button', { name: 'Close' })).toBe(closeButton);
		expect(closeButton.closest('[aria-hidden]')).toBeNull();
		expect(closeButton.closest('[inert]')).toBeNull();

		fireEvent.click(closeButton);

		expect(
			closeButton.closest('[role="alert"]')?.hasAttribute('inert'),
		).toBe(true);
	});
});
