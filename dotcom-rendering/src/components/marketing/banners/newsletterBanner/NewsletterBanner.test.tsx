import { bannerSchema } from '@guardian/support-dotcom-components';
import { fireEvent, render, screen } from '@testing-library/react';
import { design, props } from '../utils/storybook';
import { NewsletterBanner } from './NewsletterBanner';

const sdcNewsletterProps = {
	...props,
	content: {
		heading: 'Sign up to The Stakes 2026',
		paragraphs: [
			'From the races and candidates to watch to the issues shaping American politics.',
		],
	},
	submitComponentEvent: async () => Promise.resolve(),
	isCollapsible: false,
	design: {
		...design,
		headerImage: {
			mobileUrl:
				'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
			tabletUrl:
				'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
			desktopUrl:
				'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
			altText: 'The Stakes 2026',
		},
	},
	promotedNewsletter: {
		listId: 6042,
		identityName: 'the-stakes-us-election-edition',
		name: 'The Stakes 2026',
		frequency: 'Weekly',
	},
};

jest.mock('../../../../lib/useNewsletterSubscription', () => ({
	useNewsletterSubscription: jest.fn(),
}));

jest.mock('../../../../lib/useMatchMedia', () => ({
	...jest.requireActual('../../../../lib/useMatchMedia'),
	useMatchMedia: () => false,
}));

jest.mock('./NewsletterSignupForm', () => ({
	NewsletterSignupForm: ({ onSuccess }: { onSuccess: () => void }) => (
		<button onClick={onSuccess}>Sign up</button>
	),
}));

describe('NewsletterBanner configuration', () => {
	it('passes SDC newsletter settings through to the banner wrapper', () => {
		const banner = NewsletterBanner({
			...sdcNewsletterProps,
			idApiUrl: 'https://idapi.theguardian.com',
		});

		expect(banner.props).toMatchObject(sdcNewsletterProps);
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
		const banner = NewsletterBanner({
			...sdcNewsletterProps,
			...runtimeProps,
		});

		expect(banner.props).toMatchObject(runtimeProps);
	});

	it('keeps the same close button outside the transitioning panels after signup', () => {
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
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

	it('uses the image from the SDC design headerImage', () => {
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		expect(
			screen.getAllByAltText('The Stakes 2026').length,
		).toBeGreaterThan(0);
	});
});
