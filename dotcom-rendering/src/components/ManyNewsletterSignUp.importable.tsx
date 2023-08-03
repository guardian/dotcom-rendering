import { css } from '@emotion/react';
import {
	from,
	headlineObjectStyles,
	palette,
	space,
} from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import type { ChangeEventHandler, ReactEventHandler } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';
import { isServer } from '../lib/isServer';
import {
	getCaptchaSiteKey,
	reportTrackingEvent,
	requestMultipleSignUps,
} from '../lib/newsletter-sign-up-requests';
import { Flex } from './Flex';
import { ManyNewslettersForm } from './ManyNewslettersForm';
import { BUTTON_ROLE, BUTTON_SELECTED_CLASS } from './NewsletterCard';
import { Section } from './Section';

// TO DO - remove before merging
const IN_DEV_MODE = true as boolean;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type FormStatus = 'NotSent' | 'Loading' | 'Success' | 'Failed' | 'InvalidEmail';

// To align the heading content with the carousel below
// from desktop
const contentWrapperStyle = css`
	${from.leftCol} {
		padding-left: 10px;
	}
`;

const sectionWrapperStyle = (hide: boolean) => css`
	display: ${hide ? 'none' : 'unset'};
	position: fixed;
	position: sticky;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 100;
`;

const desktopClearButtonWrapperStyle = css`
	display: none;
	padding-left: ${space[1]}px;
	margin-right: -10px;
	${from.leftCol} {
		display: block;
	}
`;

const mobileCaptionAndClearButtonWrapperStyle = css`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding-bottom: ${space[2]}px;
	${from.leftCol} {
		display: none;
	}
`;

interface ClearButtonProps {
	removeAll: { (): void };
}
const ClearButton = ({ removeAll }: ClearButtonProps) => (
	<Button
		size="small"
		color={palette.neutral[0]}
		onClick={removeAll}
		hideLabel={true}
		priority="tertiary"
		icon={<SvgCross />}
	>
		remove all newsletters from sign up list
	</Button>
);

interface CaptionProps {
	count: number;
	forDesktop?: boolean;
}
const Caption = ({ count, forDesktop = false }: CaptionProps) => {
	const typography = forDesktop
		? headlineObjectStyles.xsmall({
				fontWeight: 'regular',
		  })
		: headlineObjectStyles.xxxsmall({
				fontWeight: 'bold',
		  });

	return (
		<div
			css={css`
				padding-top: ${space[2]}px;
				${typography}
			`}
		>
			<span
				css={css`
					font-weight: bold;
				`}
			>
				{count}
			</span>{' '}
			{count === 1 ? 'newsletter' : 'newsletters'} selected
		</div>
	);
};

export const ManyNewsletterSignUp = () => {
	const [newslettersToSignUpFor, setNewslettersToSignUpFor] = useState<
		string[]
	>([]);
	const [status, setStatus] = useState<FormStatus>('NotSent');
	const [email, setEmail] = useState('');
	const reCaptchaRef = useRef<ReCAPTCHA>(null);
	const useReCaptcha =
		isServer || IN_DEV_MODE
			? false
			: !!window.guardian.config.switches['emailSignupRecaptcha'];
	const captchaSiteKey = useReCaptcha ? getCaptchaSiteKey() : undefined;

	const userCanInteract = ['NotSent', 'Failed', 'InvalidEmail'].includes(
		status,
	);

	const toggleNewsletter = useCallback(
		(event: Event) => {
			if (!userCanInteract) {
				return;
			}
			const { target: button } = event;
			if (!(button instanceof HTMLElement)) {
				return;
			}
			const id = button.getAttribute('data-newsletter-id');
			if (!id) {
				return;
			}
			const index = newslettersToSignUpFor.indexOf(id);
			if (index === -1) {
				setNewslettersToSignUpFor([...newslettersToSignUpFor, id]);
				button.classList.add(BUTTON_SELECTED_CLASS);
				const ariaLabelText =
					button.getAttribute('data-aria-label-when-checked') ??
					'remove from list';
				button.setAttribute('aria-label', ariaLabelText);
			} else {
				setNewslettersToSignUpFor([
					...newslettersToSignUpFor.slice(0, index),
					...newslettersToSignUpFor.slice(index + 1),
				]);
				button.classList.remove(BUTTON_SELECTED_CLASS);
				const ariaLabelText =
					button.getAttribute('data-aria-label-when-unchecked') ??
					'add to list';
				button.setAttribute('aria-label', ariaLabelText);
			}
		},
		[newslettersToSignUpFor, userCanInteract],
	);

	const removeAll = useCallback(() => {
		if (!userCanInteract) {
			return;
		}
		const signUpButtons = [
			...document.querySelectorAll(`[data-role=${BUTTON_ROLE}]`),
		];
		signUpButtons.forEach((button) => {
			button.classList.remove(BUTTON_SELECTED_CLASS);
			const ariaLabelText =
				button.getAttribute('data-aria-label-when-unchecked') ??
				'add to list';
			button.setAttribute('aria-label', ariaLabelText);
		});

		setNewslettersToSignUpFor([]);
	}, [userCanInteract]);

	useEffect(() => {
		const signUpButtons = [
			...document.querySelectorAll(`[data-role=${BUTTON_ROLE}]`),
		];
		signUpButtons.forEach((button) => {
			button.addEventListener('click', toggleNewsletter);
		});
		return () => {
			signUpButtons.forEach((button) => {
				button.removeEventListener('click', toggleNewsletter);
			});
		};
	}, [toggleNewsletter, newslettersToSignUpFor]);

	const sendRequest = async (reCaptchaToken: string): Promise<void> => {
		reportTrackingEvent('ManyNewsletterSignUp', 'form-submit', {
			newsletterIds: newslettersToSignUpFor,
		});

		const response = IN_DEV_MODE
			? await new Promise<Response>((resolve) => {
					setTimeout(() => {
						resolve({
							ok: false,
							text() {
								return new Promise<string>((resolveText) => {
									resolveText(
										`fake response text ${Math.random().toPrecision(
											5,
										)}`,
									);
								});
							},
						} as Response);
					}, 2000);
			  })
			: await requestMultipleSignUps(
					email,
					newslettersToSignUpFor,
					reCaptchaToken,
			  );

		if (!response.ok) {
			const responseText = await response.text();
			reportTrackingEvent('ManyNewsletterSignUp', 'failure-response', {
				newsletterIds: newslettersToSignUpFor,
				responseText,
			});

			return setStatus('Failed');
		}

		reportTrackingEvent('ManyNewsletterSignUp', 'success-response', {
			newsletterIds: newslettersToSignUpFor,
		});
		setStatus('Success');
	};

	const handleSubmitButton = async () => {
		if (!userCanInteract) {
			return;
		}

		if (!emailRegex.test(email)) {
			setStatus('InvalidEmail');
			return;
		}

		if (!useReCaptcha) {
			setStatus('Loading');
			void sendRequest('');
			return;
		}

		if (!reCaptchaRef.current) {
			reportTrackingEvent(
				'ManyNewsletterSignUp',
				'captcha-not-loaded-when-needed',
			);
			return;
		}
		setStatus('Loading');
		// successful execution triggers a call to sendRequest
		// with the onChange prop on the captcha Component
		reportTrackingEvent('ManyNewsletterSignUp', 'captcha-execute');
		const result = await reCaptchaRef.current.executeAsync();

		if (typeof result !== 'string') {
			reportTrackingEvent('ManyNewsletterSignUp', 'captcha-failure');
			setStatus('Failed');
			return;
		}

		reportTrackingEvent('ManyNewsletterSignUp', 'captcha-success');
		return sendRequest(result);
	};

	const handleCaptchaError: ReactEventHandler<HTMLDivElement> = (event) => {
		reportTrackingEvent('ManyNewsletterSignUp', 'captcha-error', {
			eventType: event.type,
			status,
		});
		reCaptchaRef.current?.reset();
	};

	const handleTextInput: ChangeEventHandler<HTMLInputElement> = (ev) => {
		if (!userCanInteract) {
			return;
		}
		if (status === 'InvalidEmail' && emailRegex.test(email)) {
			setStatus('NotSent');
		}
		setEmail(ev.target.value);
	};

	return (
		<div css={sectionWrapperStyle(newslettersToSignUpFor.length === 0)}>
			<Section
				backgroundColour={palette.brand[800]}
				showSideBorders={false}
				stretchRight={true}
				leftColSize="wide"
				padContent={false}
				leftContent={
					<Caption
						count={newslettersToSignUpFor.length}
						forDesktop={true}
					/>
				}
			>
				<div css={mobileCaptionAndClearButtonWrapperStyle}>
					<Caption count={newslettersToSignUpFor.length} />
					<ClearButton removeAll={removeAll} />
				</div>

				<div css={contentWrapperStyle}>
					<Flex>
						<ManyNewslettersForm
							{...{
								email,
								handleSubmitButton,
								handleTextInput,
								status,
							}}
							newsletterCount={newslettersToSignUpFor.length}
						/>
						<div css={desktopClearButtonWrapperStyle}>
							<ClearButton removeAll={removeAll} />
						</div>

						{useReCaptcha && !!captchaSiteKey && (
							<div
								css={css`
									.grecaptcha-badge {
										visibility: hidden;
									}
								`}
							>
								<ReCAPTCHA
									sitekey={captchaSiteKey}
									ref={reCaptchaRef}
									onError={handleCaptchaError}
									size="invisible"
									// Note - the component supports an onExpired callback
									// (for when the user completed a challenge, but did
									// not submit the form before the token expired.
									// We don't need that here as setting the token
									// triggers the submission (onChange callback)
								/>
							</div>
						)}
					</Flex>
				</div>
			</Section>
		</div>
	);
};
