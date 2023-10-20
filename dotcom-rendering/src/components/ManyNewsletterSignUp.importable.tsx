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
// Note - the package also exports a component as a named export "ReCAPTCHA",
// that version will compile and render but is non-functional.
// Use the default export instead.
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { isServer } from '../lib/isServer';
import {
	getCaptchaSiteKey,
	reportTrackingEvent,
	requestMultipleSignUps,
} from '../lib/newsletter-sign-up-requests';
import { useConfig } from './ConfigContext';
import { Flex } from './Flex';
import { ManyNewslettersForm } from './ManyNewslettersForm';
import { BUTTON_ROLE, BUTTON_SELECTED_CLASS } from './NewsletterCard';
import { Section } from './Section';

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
	display: ${hide ? 'none' : 'block'};
	position: fixed;
	/* stylelint-disable-next-line value-no-vendor-prefix -- required safari before v13 https://developer.mozilla.org/en-US/docs/Web/CSS/position */
	position: -webkit-sticky;
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

const attributeToNumber = (
	element: Element,
	attributeName: string,
): number | undefined => {
	const value = element.getAttribute(attributeName);
	if (!value) return undefined;
	const numericValue = Number(value);
	if (isNaN(numericValue)) return undefined;
	return numericValue;
};

export const ManyNewsletterSignUp = () => {
	const [newslettersToSignUpFor, setNewslettersToSignUpFor] = useState<
		{
			/** unique identifier for the newsletter in kebab-case format */
			identityName: string;
			/** unique id number for the newsletter */
			listId: number;
		}[]
	>([]);
	const [status, setStatus] = useState<FormStatus>('NotSent');
	const [email, setEmail] = useState('');
	const reCaptchaRef = useRef<ReactGoogleRecaptcha>(null);
	const useReCaptcha = isServer
		? false
		: !!window.guardian.config.switches['emailSignupRecaptcha'];
	const captchaSiteKey = useReCaptcha ? getCaptchaSiteKey() : undefined;

	const userCanInteract = status !== 'Success' && status !== 'Loading';
	const { renderingTarget } = useConfig();

	const toggleNewsletter = useCallback(
		(event: Event) => {
			if (!userCanInteract) {
				return;
			}
			const { target: button } = event;
			if (!(button instanceof HTMLElement)) {
				return;
			}
			const { identityName } = button.dataset;
			const listId = attributeToNumber(button, 'data-list-id');
			if (!identityName || typeof listId === 'undefined') {
				return;
			}
			const index = newslettersToSignUpFor.findIndex(
				(newsletter) => newsletter.identityName === identityName,
			);
			if (index === -1) {
				setNewslettersToSignUpFor([
					...newslettersToSignUpFor,
					{ identityName, listId },
				]);
				button.classList.add(BUTTON_SELECTED_CLASS);
				button.setAttribute(
					'aria-label',
					button.dataset.ariaLabelWhenChecked ?? 'remove from list',
				);
			} else {
				setNewslettersToSignUpFor([
					...newslettersToSignUpFor.slice(0, index),
					...newslettersToSignUpFor.slice(index + 1),
				]);
				button.classList.remove(BUTTON_SELECTED_CLASS);

				button.setAttribute(
					'aria-label',
					button.dataset.ariaLabelWhenUnchecked ?? 'add to list',
				);
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
		for (const button of signUpButtons) {
			button.classList.remove(BUTTON_SELECTED_CLASS);
			const ariaLabelText =
				button instanceof HTMLElement
					? button.dataset.ariaLabelWhenUnchecked ?? 'add to list'
					: 'add to list';

			button.setAttribute('aria-label', ariaLabelText);
		}

		setNewslettersToSignUpFor([]);
	}, [userCanInteract]);

	useEffect(() => {
		const signUpButtons = [
			...document.querySelectorAll(`[data-role=${BUTTON_ROLE}]`),
		];
		for (const button of signUpButtons) {
			button.addEventListener('click', toggleNewsletter);
		}
		return () => {
			for (const button of signUpButtons) {
				button.removeEventListener('click', toggleNewsletter);
			}
		};
	}, [toggleNewsletter, newslettersToSignUpFor]);

	const sendRequest = async (reCaptchaToken: string): Promise<void> => {
		const identityNames = newslettersToSignUpFor.map(
			(newsletter) => newsletter.identityName,
		);
		const listIds = newslettersToSignUpFor.map(
			(newsletter) => newsletter.listId,
		);

		void reportTrackingEvent(
			'ManyNewsletterSignUp',
			'form-submit',
			renderingTarget,
			{
				listIds,
			},
		);

		const response = await requestMultipleSignUps(
			email,
			identityNames,
			reCaptchaToken,
		).catch(() => {
			return undefined;
		});

		if (!response?.ok) {
			const responseText = response
				? await response.text()
				: '[fetch failure - no response]';
			void reportTrackingEvent(
				'ManyNewsletterSignUp',
				'failure-response',
				renderingTarget,
				{
					listIds,
					// If the backend handles the failure and responds with an informative
					// error message (E.G. "Service unavailable", "Invalid email" etc) this
					// should be included in the event data.
					// If not, the response text will be the HTML for the default error page
					// which would not be helpful to include it in the tracking data.
					responseText: responseText.substring(0, 100),
				},
			);

			return setStatus('Failed');
		}

		void reportTrackingEvent(
			'ManyNewsletterSignUp',
			'success-response',
			renderingTarget,
			{
				listIds,
			},
		);
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
			void reportTrackingEvent(
				'ManyNewsletterSignUp',
				'captcha-not-loaded-when-needed',
				renderingTarget,
			);
			return;
		}
		setStatus('Loading');
		// successful execution triggers a call to sendRequest
		// with the onChange prop on the captcha Component
		void reportTrackingEvent(
			'ManyNewsletterSignUp',
			'captcha-execute',
			renderingTarget,
		);
		const result = await reCaptchaRef.current.executeAsync();

		if (typeof result !== 'string') {
			void reportTrackingEvent(
				'ManyNewsletterSignUp',
				'captcha-failure',
				renderingTarget,
			);
			setStatus('Failed');
			return;
		}

		void reportTrackingEvent(
			'ManyNewsletterSignUp',
			'captcha-success',
			renderingTarget,
		);
		return sendRequest(result);
	};

	const handleCaptchaError: ReactEventHandler<HTMLDivElement> = (event) => {
		void reportTrackingEvent(
			'ManyNewsletterSignUp',
			'captcha-error',
			renderingTarget,
			{
				eventType: event.type,
				status,
			},
		);
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
								// The Google documentation specifies that if the 'recaptcha-badge' is hidden,
								// their T+C's must be displayed instead. While this component hides the
								// badge, the T+C's are inluded in the ManyNewslettersForm component.
								// https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed
								css={css`
									.grecaptcha-badge {
										visibility: hidden;
									}
								`}
							>
								<ReactGoogleRecaptcha
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
