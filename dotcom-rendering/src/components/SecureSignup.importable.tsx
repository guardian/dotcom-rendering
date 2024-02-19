import { css } from '@emotion/react';
import { isString, type OphanAction } from '@guardian/libs';
import { space, until } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Link,
	SvgReload,
	SvgSpinner,
	TextInput,
} from '@guardian/source-react-components';
import type { CSSProperties, FormEvent, ReactEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import { palette } from '../palette';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';

type Props = {
	newsletterId: string;
	successDescription: string;
};

const formStyles = css`
	display: grid;
	align-items: center;
	grid-template-columns: auto min-content;
	grid-template-rows: 24px 48px;
	gap: 0 ${space[3]}px;

	grid-template-areas:
		'label label'
		'input button';

	label {
		grid-area: label;
		div {
			color: ${palette('--article-text')};
		}
	}
	input {
		grid-area: input;
		margin-top: 0;
		color: ${palette('--article-text')};
		background-color: ${palette('--article-background')};
	}
	button {
		grid-area: button;
		background-color: ${palette('--recaptcha-button')};
		color: ${palette('--recaptcha-button-text')};
		:hover {
			background-color: ${palette('--recaptcha-button-hover')};
		}
	}
`;

const formStylesWhenSignedIn = {
	gridTemplateColumns: 'auto 1fr',
	gridTemplateAreas: [
		// this is easier to parse over multiple lines
		'"label  label"',
		'"button input"',
	].join(' '),
} satisfies CSSProperties;

const errorContainerStyles = css`
	display: flex;
	align-items: flex-start;
	${until.tablet} {
		flex-wrap: wrap;
	}
	button {
		margin-left: ${space[1]}px;
		background-color: ${palette('--recaptcha-button')};
		:hover {
			background-color: ${palette('--recaptcha-button-hover')};
		}
	}
`;

const ErrorMessageWithAdvice = ({ text }: { text?: string }) => (
	<InlineError>
		<span>
			{text} Please try again or contact{' '}
			<Link
				href="mailto:customer.help@theguardian.com"
				target="_blank"
				rel="noreferrer"
			>
				customer.help@theguardian.com
			</Link>
		</span>
	</InlineError>
);

const SuccessMessage = ({ text }: { text?: string }) => (
	<InlineSuccess>
		<span>
			<b>Subscription Confirmed.&nbsp;</b>
			<span>{text}</span>
		</span>
	</InlineSuccess>
);

const buildFormData = (
	emailAddress: string,
	newsletterId: string,
): FormData => {
	const pageRef = window.location.origin + window.location.pathname;
	const refViewId = window.guardian.ophan?.pageViewId ?? '';

	const formData = new FormData();
	formData.append('email', emailAddress);
	formData.append('csrfToken', ''); // TO DO - PR on form handlers in frontend/identity to see how/if this is needed
	formData.append('listName', newsletterId);
	formData.append('ref', pageRef);
	formData.append('refViewId', refViewId);
	formData.append('name', '');

	return formData;
};

const resolveEmailIfSignedIn = async (): Promise<string | undefined> => {
	const { idApiUrl } = window.guardian.config.page;
	if (!idApiUrl) return;
	const fetchedEmail = await lazyFetchEmailWithTimeout(idApiUrl)();
	if (!fetchedEmail) return;
	return fetchedEmail;
};

const postFormData = async (
	endpoint: string,
	formData: FormData,
): Promise<Response> => {
	const requestBodyStrings: string[] = [];

	for (const [key, value] of formData.entries()) {
		requestBodyStrings.push(
			`${encodeURIComponent(key)}=${encodeURIComponent(
				value.toString(),
			)}`,
		);
	}

	return fetch(endpoint, {
		method: 'POST',
		body: requestBodyStrings.join('&'),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
};

type EventDescription =
	| 'click-button'
	| 'form-submission'
	| 'submission-confirmed'
	| 'submission-failed'
	| 'form-submit-error';

const sendTracking = (
	newsletterId: string,
	eventDescription: EventDescription,
	renderingTarget: RenderingTarget,
): void => {
	let action: OphanAction = 'CLICK';

	switch (eventDescription) {
		case 'form-submission':
			action = 'ANSWER';
			break;
		case 'submission-confirmed':
			action = 'SUBSCRIBE';
			break;

		case 'form-submit-error':
		case 'submission-failed':
			action = 'CLOSE';
			break;
		case 'click-button':
			action = 'CLICK';
			break;
	}

	// The data team use a custom date format for timestamps,
	// (yyy-MM-dd hh:mm:ss.ssssss UTC)
	// and will cast the integer value  to this
	// format at their end
	const value = JSON.stringify({
		eventDescription,
		newsletterId,
		timestamp: Date.now(),
	});

	void submitComponentEvent(
		{
			action,
			value,
			//check if this can be used or needs to be added
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: `AR SecureSignup ${newsletterId}`,
			},
		},
		renderingTarget,
	);
};

/**
 * # Secure Signup
 *
 * Enables signing up to a newsletter.
 *
 * ## Why is this an island?
 *
 * - We use the user’s email if signed in
 * - We respond to user input and submitting AJAX form
 *
 * ---
 *
 * [`EmailSignup` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-emailsignup)
 */
export const SecureSignup = ({ newsletterId, successDescription }: Props) => {
	const [signedInUserEmail, setSignedInUserEmail] = useState<string>();
	const [isWaitingForResponse, setIsWaitingForResponse] =
		useState<boolean>(false);
	const [responseOk, setResponseOk] = useState<boolean | undefined>(
		undefined,
	);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		void resolveEmailIfSignedIn().then(setSignedInUserEmail);
	}, []);
	const { renderingTarget } = useConfig();

	const hasResponse = typeof responseOk === 'boolean';

	const submitForm = async (): Promise<void> => {
		const input: HTMLInputElement | null =
			document.querySelector('input[type="email"]') ?? null;
		const emailAddress: string = input?.value ?? '';

		sendTracking(newsletterId, 'form-submission', renderingTarget);
		const response = await postFormData(
			window.guardian.config.page.ajaxUrl + '/email',
			buildFormData(emailAddress, newsletterId),
		);

		// The response body could be accessed with await response.text()
		// here and added to state but the response is not informative
		// enough to convey the actualreason for a failure to the user,
		// so a generic failure message is used.
		setIsWaitingForResponse(false);
		setResponseOk(response.ok);

		sendTracking(
			newsletterId,
			response.ok ? 'submission-confirmed' : 'submission-failed',
			renderingTarget,
		);
	};

	const resetForm: ReactEventHandler<HTMLButtonElement> = () => {
		setErrorMessage(undefined);
		setResponseOk(undefined);
	};

	const handleClick = (): void => {
		sendTracking(newsletterId, 'click-button', renderingTarget);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (isWaitingForResponse) {
			return;
		}
		setErrorMessage(undefined);

		submitForm().catch((error) => {
			// eslint-disable-next-line no-console -- unexpected error
			console.error(error);
			sendTracking(newsletterId, 'form-submit-error', renderingTarget);
			setErrorMessage(`Sorry, there was an error signing you up.`);
			setIsWaitingForResponse(false);
		});
	};

	const hideEmailInput = isString(signedInUserEmail);

	return (
		<>
			<form
				onSubmit={handleSubmit}
				id={`secure-signup-${newsletterId}`}
				style={{
					display:
						hasResponse || isWaitingForResponse
							? 'none'
							: undefined,
					...(hideEmailInput ? formStylesWhenSignedIn : undefined),
				}}
				css={formStyles}
			>
				<TextInput
					hidden={hideEmailInput}
					hideLabel={hideEmailInput}
					name="email"
					label="Enter your email address"
					type="email"
					value={signedInUserEmail}
				/>
				<Button onClick={handleClick} size="small" type="submit">
					Sign up
				</Button>
			</form>
			{isWaitingForResponse && (
				<div>
					<SvgSpinner isAnnouncedByScreenReader={true} size="small" />
				</div>
			)}

			{!!errorMessage && <ErrorMessageWithAdvice text={errorMessage} />}

			{hasResponse &&
				(responseOk ? (
					<div>
						<SuccessMessage text={successDescription} />
					</div>
				) : (
					<div css={errorContainerStyles}>
						<ErrorMessageWithAdvice text={`Sign up failed.`} />
						<Button
							size="small"
							icon={<SvgReload />}
							iconSide={'right'}
							onClick={resetForm}
						>
							Try again
						</Button>
					</div>
				))}
		</>
	);
};
