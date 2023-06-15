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
import ReCAPTCHA from 'react-google-recaptcha';
import {
	getCaptchaSiteKey,
	mockRequestMultipleSignUps,
	requestMultipleSignUps,
} from '../lib/newsletter-sign-up-requests';
import { Flex } from './Flex';
import { BUTTON_ROLE, BUTTON_SELECTED_CLASS } from './GroupedNewsletterList';
import { ManyNewslettersForm } from './ManyNewslettersForm';
import { Section } from './Section';

interface Props {
	/**
	 * Whether to use the mocked request function.
	 *
	 * This option is to allow a functional Story to be published for the component.
	 * TO DO - find a better way to do that!
	 */
	useMockedRequestFunction?: boolean;
}

type FormStatus = 'NotSent' | 'Loading' | 'Success' | 'Failed';

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
	padding: ${space[1]}px;
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
		: headlineObjectStyles.xxsmall({
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

export const ManyNewsletterSignUp = ({ useMockedRequestFunction }: Props) => {
	const [newslettersToSignUpFor, setNewslettersToSignUpFor] = useState<
		string[]
	>([]);
	const [status, setStatus] = useState<FormStatus>('NotSent');
	const [email, setEmail] = useState('');
	const reCaptchaRef = useRef<ReCAPTCHA>(null);
	const captchaSiteKey = getCaptchaSiteKey();

	const toggleNewsletter = useCallback(
		(event: Event) => {
			if (status !== 'NotSent') {
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
		[newslettersToSignUpFor, status],
	);

	const removeAll = useCallback(() => {
		if (status !== 'NotSent') {
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
	}, [status]);

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
		const functionToUse = useMockedRequestFunction
			? mockRequestMultipleSignUps
			: requestMultipleSignUps;
		const response = await functionToUse(
			email,
			newslettersToSignUpFor,
			reCaptchaToken,
		);
		setStatus(response.ok ? 'Success' : 'Failed');
	};

	// TO DO - support an boolean prop to submit without the captcha
	// would need this for the story to work
	const handleSubmitButton = () => {
		if (status !== 'NotSent') {
			return;
		}
		if (!reCaptchaRef.current) {
			console.warn('NO reCAPTCHA');
			return;
		}
		setStatus('Loading');
		reCaptchaRef.current.execute();
		// successfull execution triggers a call to sendRequest
	};

	const handleCaptchaLoadError: ReactEventHandler<HTMLDivElement> = () => {
		console.warn(`reCAPTCHA failed to load.`);
		reCaptchaRef.current?.reset();
	};

	const handleTextInput: ChangeEventHandler<HTMLInputElement> = (ev) => {
		if (status !== 'NotSent') {
			return;
		}
		setEmail(ev.target.value);
	};

	return (
		<div css={sectionWrapperStyle(newslettersToSignUpFor.length === 0)}>
			<Section
				backgroundColour={palette.brand[800]}
				showSideBorders={false}
				stretchRight={true}
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

					{!!captchaSiteKey && (
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
								onChange={(token) => {
									if (token) {
										void sendRequest(token);
									}
								}}
								onError={handleCaptchaLoadError}
								size="invisible"
								// Note - the component supports an onExpired callback
								// (for when the user completed a challenge, but did
								// not submit the form before the token expired.
								// We don't need that here as completing the captcha
								// (onChange callback) triggers the submission
							/>
						</div>
					)}
				</Flex>
			</Section>
		</div>
	);
};
