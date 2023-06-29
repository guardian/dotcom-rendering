import type { OphanAction } from '@guardian/libs';
import {
	getOphanRecordFunction,
	submitComponentEvent,
} from '../client/ophan/ophan';

const isServer = typeof window === 'undefined';

export const getCaptchaSiteKey = (): string | undefined =>
	isServer ? undefined : window.guardian.config.page.googleRecaptchaSiteKey;

const buildNewsletterSignUpFormData = (
	emailAddress: string,
	newsletterIdOrList: string | string[],
	recaptchaToken: string,
): FormData => {
	const pageRef = window.location.origin + window.location.pathname;
	const refViewId = window.guardian.ophan?.pageViewId ?? '';

	const formData = new FormData();
	formData.append('email', emailAddress);
	formData.append('csrfToken', ''); // TO DO - PR on form handlers in frontend/identity to see how/if this is needed

	if (Array.isArray(newsletterIdOrList)) {
		newsletterIdOrList.forEach((newsletterId, index) => {
			formData.append(`listNames[${index}]`, newsletterId);
		});
	} else {
		formData.append('listName', newsletterIdOrList);
	}

	formData.append('ref', pageRef);
	formData.append('refViewId', refViewId);
	formData.append('name', '');
	if (window.guardian.config.switches.emailSignupRecaptcha) {
		formData.append('g-recaptcha-response', recaptchaToken);
	}

	return formData;
};

const postFormData = async (
	endpoint: string,
	formData: FormData,
): Promise<Response> => {
	const requestBodyStrings: string[] = [];

	formData.forEach((value, key) => {
		requestBodyStrings.push(
			`${encodeURIComponent(key)}=${encodeURIComponent(
				value.toString(),
			)}`,
		);
	});

	return fetch(endpoint, {
		method: 'POST',
		body: requestBodyStrings.join('&'),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
};

export const requestMultipleSignUps = async (
	emailAddress: string,
	newsletterIds: string[],
	recaptchaToken: string,
): Promise<Response> => {
	const data = buildNewsletterSignUpFormData(
		emailAddress,
		newsletterIds,
		recaptchaToken,
	);

	return await postFormData(
		window.guardian.config.page.ajaxUrl + '/email/many',
		data,
	);
};

export const requestSingleSignUp = async (
	emailAddress: string,
	newsletterId: string,
	recaptchaToken: string,
): Promise<Response> => {
	const data = buildNewsletterSignUpFormData(
		emailAddress,
		newsletterId,
		recaptchaToken,
	);

	return await postFormData(
		window.guardian.config.page.ajaxUrl + '/email',
		data,
	);
};

export const mockRequestMultipleSignUps = async (
	emailAddress: string,
	newsletterIds: string[],
	recaptchaToken: string,
): Promise<Response> => {
	await new Promise((resolve) => {
		setTimeout(resolve, 2000);
	});

	const fail = emailAddress.includes('example');

	return {
		ok: !fail,
		status: fail ? 400 : 200,
		message: `Simulated sign up of "${emailAddress}" to [${newsletterIds.join()}]. reCaptchaToken is ${
			recaptchaToken.length
		} characters.`,
	} as unknown as Response;
};

type CaptchaEventDescription =
	| 'captcha-success'
	| 'captcha-failure'
	| 'captcha-error'
	| 'captcha-execute'
	| 'captcha-not-loaded-when-needed';

const captchaEventDescriptionToOphanAction = (
	description: CaptchaEventDescription,
): OphanAction => {
	switch (description) {
		case 'captcha-success':
			return 'ANSWER';
		case 'captcha-failure':
			return 'ANSWER';
		case 'captcha-error':
			return 'CLOSE';
		case 'captcha-execute':
			return 'EXPAND';
		case 'captcha-not-loaded-when-needed':
			return 'CLOSE';
	}
};

export const reportCaptchaEvent = (
	componentName: string,
	eventDescription: CaptchaEventDescription,
	extraDetails?: Partial<Record<string, string | string[]>>,
): void => {
	const record = getOphanRecordFunction();

	const payload = {
		...extraDetails,
		message: eventDescription,
		timestamp: Date.now(),
	};

	// eslint-disable-next-line no-console -- debugging
	console.warn(`captcha event`, payload);

	submitComponentEvent(
		{
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: componentName,
			},
			action: captchaEventDescriptionToOphanAction(eventDescription),
			value: JSON.stringify(payload),
		},
		record,
	);
};

type FormEventDescription =
	| 'form-submit'
	| 'add-newsletter'
	| 'remove-newsletter'
	| 'remove-all-newsletters'
	| 'failure-response'
	| 'success-response';

export const reportFormEvent = (
	componentName: string,
	eventDescription: FormEventDescription,
	extraDetails?: Partial<Record<string, string | string[]>>,
): void => {
	const record = getOphanRecordFunction();

	const payload = {
		...extraDetails,
		message: eventDescription,
		timestamp: Date.now(),
	};

	// eslint-disable-next-line no-console -- debugging
	console.warn(`captcha event`, payload);
	submitComponentEvent(
		{
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: componentName,
			},
			action: 'CLICK',
			value: JSON.stringify(payload),
		},
		record,
	);
};
