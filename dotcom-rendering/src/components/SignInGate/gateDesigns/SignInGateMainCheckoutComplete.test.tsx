import { render } from '@testing-library/react';
import {
	COMPLETE_REGISTRATION_BUTTON,
	SIGN_IN_BUTTON,
	SIGN_IN_INCENTIVES_DIGITAL,
	SIGN_IN_INCENTIVES_NON_DIGITAL,
	SUBSCRIPTION_HEADER,
	SUPPORTER_HEADER,
} from '../../../lib/signInAfterCheckOutText';
import { ConfigProvider } from '../../ConfigContext';
import type { CheckoutCompleteCookieData } from '../types';
import { SignInGateMainCheckoutComplete } from './SignInGateMainCheckoutComplete';

describe('SignInGateMainCheckoutComplete', () => {
	const REGISTER_URL = 'https://profile.theguardian.com/register?returnUrl=';
	const SIGNIN_URL = 'https://profile.theguardian.com/signin?returnUrl=';
	const signInGateProps = {
		signInUrl: SIGNIN_URL,
		registerUrl: REGISTER_URL,
		guUrl: 'guUrl',
		dismissGate: () => {
			return;
		},
		ophanComponentId: 'componentId',
		personaliseSignInGateAfterCheckoutSwitch: true,
	};
	const SignInAfterCheckoutComponent = (
		checkoutCompleteCookieData: CheckoutCompleteCookieData,
	) => {
		return (
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<SignInGateMainCheckoutComplete
					{...signInGateProps}
					checkoutCompleteCookieData={checkoutCompleteCookieData}
				/>
			</ConfigProvider>
		);
	};
	describe('it should display the correct copy based on the following variations', () => {
		it('user is new and has a digital subscription', () => {
			const { container } = render(
				SignInAfterCheckoutComponent({
					userType: 'new',
					product: 'SupporterPlus',
				}),
			);
			const headline = container.querySelector('h1');
			const bulletPoints = container.querySelectorAll('li');
			const button = container.querySelector(
				`[data-testid="sign-in-gate-main_register"]`,
			);

			expect(headline).toHaveTextContent(SUBSCRIPTION_HEADER);

			for (const [index, bullet] of bulletPoints.entries()) {
				expect(bullet).toHaveTextContent(
					SIGN_IN_INCENTIVES_DIGITAL[index],
				);
			}
			expect(button).toHaveTextContent(COMPLETE_REGISTRATION_BUTTON);
			expect(button).toHaveAttribute('href', REGISTER_URL);
		});

		it('user is new and has a paper subscription', () => {
			const { container } = render(
				SignInAfterCheckoutComponent({
					userType: 'guest',
					product: 'Paper',
				}),
			);
			const headline = container.querySelector('h1');
			const bulletPoints = container.querySelectorAll('li');
			const button = container.querySelector(
				`[data-testid="sign-in-gate-main_register"]`,
			);

			expect(headline).toHaveTextContent(SUBSCRIPTION_HEADER);

			for (const [index, bullet] of bulletPoints.entries()) {
				expect(bullet).toHaveTextContent(
					SIGN_IN_INCENTIVES_NON_DIGITAL[index],
				);
			}
			expect(button).toHaveTextContent(COMPLETE_REGISTRATION_BUTTON);
			expect(button).toHaveAttribute('href', REGISTER_URL);
		});

		it('user is new and has a contributor', () => {
			const { container } = render(
				SignInAfterCheckoutComponent({
					userType: 'new',
					product: 'Contribution',
				}),
			);
			const headline = container.querySelector('h1');
			const bulletPoints = container.querySelectorAll('li');
			const button = container.querySelector(
				`[data-testid="sign-in-gate-main_register"]`,
			);

			expect(headline).toHaveTextContent(SUPPORTER_HEADER);

			for (const [index, bullet] of bulletPoints.entries()) {
				expect(bullet).toHaveTextContent(
					SIGN_IN_INCENTIVES_NON_DIGITAL[index],
				);
			}
			expect(button).toHaveTextContent(COMPLETE_REGISTRATION_BUTTON);
			expect(button).toHaveAttribute('href', REGISTER_URL);
		});

		it('user is existing and has a digital subscription', () => {
			const { container } = render(
				SignInAfterCheckoutComponent({
					userType: 'current',
					product: 'SupporterPlus',
				}),
			);
			const headline = container.querySelector('h1');
			const bulletPoints = container.querySelectorAll('li');
			const button = container.querySelector(
				`[data-testid="sign-in-gate-main_register"]`,
			);

			expect(headline).toHaveTextContent(SUBSCRIPTION_HEADER);

			for (const [index, bullet] of bulletPoints.entries()) {
				expect(bullet).toHaveTextContent(
					SIGN_IN_INCENTIVES_DIGITAL[index],
				);
			}
			expect(button).toHaveTextContent(SIGN_IN_BUTTON);
			expect(button).toHaveAttribute('href', SIGNIN_URL);
		});

		it('user is existing and has a paper subscription', () => {
			const { container } = render(
				SignInAfterCheckoutComponent({
					userType: 'current',
					product: 'Paper',
				}),
			);
			const headline = container.querySelector('h1');
			const bulletPoints = container.querySelectorAll('li');
			const button = container.querySelector(
				`[data-testid="sign-in-gate-main_register"]`,
			);

			expect(headline).toHaveTextContent(SUBSCRIPTION_HEADER);

			for (const [index, bullet] of bulletPoints.entries()) {
				expect(bullet).toHaveTextContent(
					SIGN_IN_INCENTIVES_NON_DIGITAL[index],
				);
			}
			expect(button).toHaveTextContent(SIGN_IN_BUTTON);
			expect(button).toHaveAttribute('href', SIGNIN_URL);
		});

		it('user is existing and has is a contributor', () => {
			const { container } = render(
				SignInAfterCheckoutComponent({
					userType: 'current',
					product: 'Contribution',
				}),
			);
			const headline = container.querySelector('h1');
			const bulletPoints = container.querySelectorAll('li');
			const button = container.querySelector(
				`[data-testid="sign-in-gate-main_register"]`,
			);

			expect(headline).toHaveTextContent(SUPPORTER_HEADER);

			for (const [index, bullet] of bulletPoints.entries()) {
				expect(bullet).toHaveTextContent(
					SIGN_IN_INCENTIVES_NON_DIGITAL[index],
				);
			}
			expect(button).toHaveTextContent(SIGN_IN_BUTTON);
			expect(button).toHaveAttribute('href', SIGNIN_URL);
		});
	});
});
