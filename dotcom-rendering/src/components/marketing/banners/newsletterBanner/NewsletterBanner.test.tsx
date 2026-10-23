import { neutral } from '@guardian/source/foundations';
import {
	bannerSchema,
	hexColourToString,
} from '@guardian/support-dotcom-components';
import { NEWSLETTER_BANNER_CONFIG } from '../../../StickyBottomBanner/newsletterBannerDetails';
import { props } from '../utils/storybook';
import { NewsletterBanner } from './NewsletterBanner';

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
});
