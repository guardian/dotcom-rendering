import { mocked, userEvent, within } from 'storybook/test';
import { useCountryCode } from '../lib/useCountryCode';
import { GroupedNewslettersList } from './GroupedNewsletterList';
import { ManyNewsletterSignUp } from './ManyNewsletterSignUp.island';
import { BUTTON_ROLE } from './NewsletterCard';

const newsletters = {
	groups: [
		{
			title: 'test',
			newsletters: [
				{
					listId: 1,
					identityName: 'test-1',
					name: 'test newsletter 1',
					description:
						'Select at least one newsletter to make the ManyNewsletterSignUp appear',
					frequency: 'weekly',
					theme: 'news',
					group: '',
					successDescription: 'not used',
					illustrationCard:
						'https://media.guim.co.uk/ce2e59cfa2ab7db34cba24adbf20910976e55604/0_0_760_456/500.jpg',
				},
				{
					listId: 2,
					identityName: 'test-2',
					name: 'test newsletter 2',
					description:
						'Including the phrase "example.com" in the email before submitting will display the form\'s fail state.',
					frequency: 'monthly',
					theme: 'news',
					group: '',
					successDescription: 'not used',
					illustrationCard:
						'https://media.guim.co.uk/77074f52e5e6f22a6636ed10d65a421426490c9e/22_0_4747_2849/500.png',
				},
			],
		},
	],
};

export const Default = () => {
	return (
		<>
			<GroupedNewslettersList groupedNewsletters={newsletters} />
			<ManyNewsletterSignUp
				useReCaptcha={false}
				visibleRecaptcha={false}
				captchaSiteKey="TEST_RECAPTCHA_SITE_KEY"
			/>
		</>
	);
};

/**
 * US user with `usNewsletterHideMarketingToggle` switch enabled — the marketing opt-in
 * toggle is hidden from the sign-up bar and the user is silently enrolled.
 */
export const USHideMarketingToggle = {
	render: () => (
		<>
			<GroupedNewslettersList groupedNewsletters={newsletters} />
			<ManyNewsletterSignUp
				useReCaptcha={false}
				visibleRecaptcha={false}
				captchaSiteKey="TEST_RECAPTCHA_SITE_KEY"
			/>
		</>
	),
	beforeEach() {
		mocked(useCountryCode).mockReturnValue('US');
		window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
			true;
	},
	afterEach() {
		mocked(useCountryCode).mockReset();
		window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
			false;
	},
	async play({ canvasElement }: { canvasElement: HTMLElement }) {
		const canvas = within(canvasElement);
		const [firstButton] = canvas
			.queryAllByRole('button', {
				hidden: true,
			})
			.filter((el) => el.getAttribute('data-role') === BUTTON_ROLE);
		if (firstButton) {
			await userEvent.click(firstButton);
		}
	},
};

export default {
	component: Default,
	title: 'Components/ManyNewsletterSignUp',
	chromatic: { diffThreshold: 0.7 },
};
