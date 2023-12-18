import { render } from '@testing-library/react';
import { ConfigProvider } from '../../ConfigContext';
import { SignInGateMainCheckoutComplete } from './SignInGateMainCheckoutComplete';

describe('SignInGateMainCheckoutComplete', () => {
	const signInGateProps = {
		signInUrl: 'https://profile.theguardian.com/signin?returnUrl=',
		registerUrl: '/register',
		guUrl: 'guUrl',
		dismissGate: () => {
			return;
		},
		ophanComponentId: 'componentId',
		personaliseSignInGateAfterCheckoutSwitch: true,
	};
	describe('it should display the correct copy based on the following variations', () => {
		const REGISTER_URL =
			'https://profile.theguardian.com/register?returnUrl=';
		const SIGN_IN_INCENTIVES_DIGITAL = [
			'Supporter rewards – unlock the benefits of your support',
			'Incisive analysis and original reporting direct to your inbox, with our newsletters',
			'Get involved in the discussion – comment on stories',
		];

		it('user is new and has a digital subscription', () => {
			const { container } = render(
				<ConfigProvider
					value={{ renderingTarget: 'Web', darkModeAvailable: false }}
				>
					<SignInGateMainCheckoutComplete
						{...signInGateProps}
						{...{
							checkoutCompleteCookieData: {
								userType: 'new',
								product: 'SupporterPlus',
							},
						}}
					/>
				</ConfigProvider>,
			);
			const headline = container.querySelector('h1');
			const bulletPoints = container.querySelectorAll('li');
			const button = container.querySelector(
				`[data-testid="sign-in-gate-main_register"]`,
			);

			expect(headline).toHaveTextContent('Thank you for subscribing');
			for (const [index, bullet] of bulletPoints.entries()) {
				expect(bullet).toHaveTextContent(
					SIGN_IN_INCENTIVES_DIGITAL[index],
				);
			}
			expect(button).toHaveTextContent('Complete registration');
			expect(button).toHaveAttribute('href', REGISTER_URL);
		});
	});
});
