import { palette } from '@guardian/source/foundations';
import { bannerSchema } from '@guardian/support-dotcom-components';
import {
	fireEvent,
	render,
	screen as testingScreen,
} from '@testing-library/react';
import type {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../lib/useMatchMedia';
import {
	newsletterDesign,
	newsletterDesignDark,
	props,
	stringToHexColour,
} from '../utils/storybook';
import { NewsletterBanner } from './NewsletterBanner';
import type { NewsletterBannerData } from './NewsletterBannerData';

const squareIllustration = 'https://example.com/newsletter-square.jpg';

const sdcNewsletterProps = {
	...props,
	content: {
		heading: 'Configured banner heading',
		paragraphs: [
			'From the races and candidates to watch to the issues shaping American politics.',
		],
	},
	submitComponentEvent: async () => Promise.resolve(),
	isCollapsible: false,
	design: {
		...newsletterDesign,
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
		signUpDescription: 'Get our weekly guide to the 2026 election.',
		illustrationSquare: squareIllustration,
	},
};

jest.mock('../../../../lib/useNewsletterSubscription', () => ({
	useNewsletterSubscription: jest.fn(),
}));
jest.mock('../../../../lib/useMatchMedia', () => ({
	...jest.requireActual<{
		removeMediaRulePrefix: typeof removeMediaRulePrefix;
		useMatchMedia: typeof useMatchMedia;
	}>('../../../../lib/useMatchMedia'),
	useMatchMedia: () => false,
}));

jest.mock('./NewsletterSignupForm', () => ({
	NewsletterSignupForm: ({
		onSuccess,
		bannerData,
	}: {
		onSuccess: () => void;
		bannerData: NewsletterBannerData;
	}) => {
		const {
			signupButtonBackgroundColor,
			signupButtonTextColor,
			emailInputTextColor,
			emailInputBackgroundColor,
			emailInputBorderColor,
			toggleActiveColor,
		} = bannerData.settings.newsletterBanner;
		return (
			<button
				onClick={onSuccess}
				data-background-color={signupButtonBackgroundColor}
				data-text-color={signupButtonTextColor}
				data-input-text-color={emailInputTextColor}
				data-input-background-color={emailInputBackgroundColor}
				data-input-border-color={emailInputBorderColor}
				data-toggle-active-color={toggleActiveColor}
			>
				Sign up
			</button>
		);
	},
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

	it('renders older designs without newsletter colours and supports signup', () => {
		const colours = { ...newsletterDesign.colours };
		delete colours.newsletterBanner;
		const legacyProps = {
			...sdcNewsletterProps,
			design: { ...sdcNewsletterProps.design, colours },
		};
		expect(bannerSchema.safeParse(legacyProps).success).toBe(true);

		render(
			<NewsletterBanner
				{...legacyProps}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		expect(
			testingScreen.getByRole('heading', {
				name: 'Sign up for The Stakes 2026',
			}),
		).toBeInTheDocument();
		expect(
			testingScreen.getByRole('button', { name: 'Sign up' }),
		).toHaveAttribute('data-background-color', '#052962');

		fireEvent.click(testingScreen.getByRole('button', { name: 'Sign up' }));
		expect(
			testingScreen.getByText("You're signed up!"),
		).toBeInTheDocument();
		expect(
			testingScreen.getByRole('link', {
				name: 'Browse more newsletters',
			}),
		).toHaveStyle({ color: '#052962' });
	});

	it('places the logo wrapper in the banner grid and hides it below leftCol', () => {
		const { container } = render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);
		const banner = container.querySelector('[role="alert"]');
		const layout = banner?.firstElementChild;
		const logo = layout?.firstElementChild;
		expect(logo).toHaveStyle({ gridArea: 'logo' });

		const mediaRules = Array.from(document.styleSheets)
			.flatMap((sheet) => Array.from(sheet.cssRules))
			.filter(
				(rule): rule is CSSMediaRule => rule instanceof CSSMediaRule,
			)
			.filter((rule) => rule.conditionText.includes('1139.9px'))
			.flatMap((rule) => Array.from(rule.cssRules))
			.filter(
				(rule): rule is CSSStyleRule => rule instanceof CSSStyleRule,
			);
		expect(
			mediaRules.some(
				(rule) =>
					logo?.matches(rule.selectorText) === true &&
					rule.style.display === 'none',
			),
		).toBe(true);
	});

	it('keeps the same close button outside the transitioning panels after signup', () => {
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);
		const closeButton = testingScreen.getByRole('button', {
			name: 'Close',
		});

		fireEvent.click(testingScreen.getByRole('button', { name: 'Sign up' }));

		expect(
			testingScreen.getAllByRole('button', { name: 'Close' }),
		).toHaveLength(1);
		expect(testingScreen.getByRole('button', { name: 'Close' })).toBe(
			closeButton,
		);
		expect(closeButton.closest('[aria-hidden]')).toBeNull();
		expect(closeButton.closest('[inert]')).toBeNull();

		fireEvent.click(closeButton);

		expect(
			closeButton.closest('[role="alert"]')?.hasAttribute('inert'),
		).toBe(true);
	});

	it.each([
		{ theme: 'light', design: newsletterDesign, iconColor: '#FFFFFF' },
		{ theme: 'dark', design: newsletterDesignDark, iconColor: '#1A1A1A' },
	])('uses the $theme frequency icon color', ({ design, iconColor }) => {
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				design={{
					...sdcNewsletterProps.design,
					colours: design.colours,
				}}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		const icon = testingScreen
			.getByText('Free newsletter |')
			.parentElement?.previousElementSibling?.querySelector('svg');
		expect(icon).toHaveStyle({ fill: iconColor });
	});

	it('renders the frequency icon without a configured icon color', () => {
		const colours = {
			...newsletterDesign.colours,
			newsletterBanner: {
				...newsletterDesign.colours.newsletterBanner,
				frequencyIconColor: undefined,
			},
		};
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				design={{
					...sdcNewsletterProps.design,
					colours,
				}}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		expect(
			testingScreen
				.getByText('Free newsletter |')
				.parentElement?.previousElementSibling?.querySelector('svg'),
		).toBeInTheDocument();
	});

	it('passes the dark theme signup button colors to the form', () => {
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				design={{
					...sdcNewsletterProps.design,
					colours: newsletterDesignDark.colours,
				}}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		const button = testingScreen.getByRole('button', { name: 'Sign up' });
		expect(button).toHaveAttribute('data-background-color', '#FFFFFF');
		expect(button).toHaveAttribute('data-text-color', '#1A1A1A');
		expect(button).toHaveAttribute('data-input-text-color', '#EDEDED');
		expect(button).toHaveAttribute(
			'data-input-background-color',
			'#333333',
		);
		expect(button).toHaveAttribute('data-input-border-color', '#EDEDED');
	});

	it('passes configured email input colors to the form', () => {
		const colours = {
			...newsletterDesign.colours,
			newsletterBanner: {
				...newsletterDesign.colours.newsletterBanner,
				emailInputTextColor: stringToHexColour('123456'),
				emailInputBackgroundColor: stringToHexColour('FEDCBA'),
				emailInputBorderColor: stringToHexColour('AABBCC'),
			},
		};
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				design={{ ...sdcNewsletterProps.design, colours }}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		const button = testingScreen.getByRole('button', { name: 'Sign up' });
		expect(button).toHaveAttribute('data-input-text-color', '#123456');
		expect(button).toHaveAttribute(
			'data-input-background-color',
			'#FEDCBA',
		);
		expect(button).toHaveAttribute('data-input-border-color', '#AABBCC');
	});

	it('uses the action color when no signup button background is configured', () => {
		const colours = {
			...newsletterDesign.colours,
			newsletterBanner: {
				...newsletterDesign.colours.newsletterBanner,
				actionColor: stringToHexColour('8F6A70'),
			},
		};
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				design={{ ...sdcNewsletterProps.design, colours }}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		expect(
			testingScreen.getByRole('button', { name: 'Sign up' }),
		).toHaveAttribute('data-background-color', '#8F6A70');
	});

	it.each([
		{ theme: 'light', design: newsletterDesign, color: '#22874D' },
		{ theme: 'dark', design: newsletterDesignDark, color: '#28A85F' },
	])('passes the $theme toggle color to the form', ({ design, color }) => {
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				design={{
					...sdcNewsletterProps.design,
					colours: design.colours,
				}}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);

		expect(
			testingScreen.getByRole('button', { name: 'Sign up' }),
		).toHaveAttribute('data-toggle-active-color', color);
	});

	it.each([
		{
			theme: 'light',
			design: newsletterDesign,
			textColor: '#333333',
			browseColor: '#052962',
		},
		{
			theme: 'dark',
			design: newsletterDesignDark,
			textColor: '#DCDCDC',
			browseColor: '#DCDCDC',
		},
	])(
		'uses the $theme design colors for success content',
		({ design, textColor, browseColor }) => {
			render(
				<NewsletterBanner
					{...sdcNewsletterProps}
					design={{
						...sdcNewsletterProps.design,
						colours: design.colours,
					}}
					idApiUrl="https://idapi.theguardian.com"
				/>,
			);

			fireEvent.click(
				testingScreen.getByRole('button', { name: 'Sign up' }),
			);

			expect(
				testingScreen
					.getByText("You're signed up!")
					.closest('[role="alert"]'),
			).toHaveStyle({ color: textColor });
			const iconContainer = testingScreen
				.getByText("You're signed up!")
				.closest('[role="alert"]')?.parentElement?.parentElement;
			expect(iconContainer?.querySelector('svg')).toBeInTheDocument();
			expect(iconContainer).toHaveStyle({ color: '#58D08B' });
			expect(
				testingScreen.getByRole('link', {
					name: 'Browse more newsletters',
				}),
			).toHaveStyle({ color: browseColor, borderColor: browseColor });
		},
	);

	it('uses the default success icon color for older designs', () => {
		const colours = {
			...newsletterDesign.colours,
			newsletterBanner: {
				...newsletterDesign.colours.newsletterBanner,
				successIconColor: undefined,
			},
		};
		render(
			<NewsletterBanner
				{...sdcNewsletterProps}
				design={{ ...sdcNewsletterProps.design, colours }}
				idApiUrl="https://idapi.theguardian.com"
			/>,
		);
		fireEvent.click(testingScreen.getByRole('button', { name: 'Sign up' }));

		expect(
			testingScreen
				.getByText("You're signed up!")
				.closest('[role="alert"]')?.parentElement?.parentElement,
		).toHaveStyle({ color: palette.success[400] });
	});
});
