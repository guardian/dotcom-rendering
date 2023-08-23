import type { OphanAction } from '@guardian/libs';
import { getOphan, submitComponentEvent } from '../client/ophan/ophan';

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
		for (const [index, newsletterId] of newsletterIdOrList.entries()) {
			formData.append(`listNames[${index}]`, newsletterId);
		}
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

type TrackingEventDescription =
	| 'captcha-success'
	| 'captcha-failure'
	| 'captcha-error'
	| 'captcha-execute'
	| 'captcha-not-loaded-when-needed'
	| 'form-submit'
	| 'failure-response'
	| 'success-response';

const trackingEventDescriptionToOphanAction = (
	description: TrackingEventDescription,
): OphanAction => {
	switch (description) {
		case 'captcha-success':
		case 'captcha-failure':
			return 'ANSWER';
		case 'captcha-error':
			return 'CLOSE';
		case 'captcha-execute':
			return 'EXPAND';
		case 'captcha-not-loaded-when-needed':
			return 'CLOSE';
		case 'form-submit':
			return 'CLICK';
		case 'failure-response':
			return 'RETURN';
		case 'success-response':
			return 'SUBSCRIBE';
	}
};

export const reportTrackingEvent = async (
	componentName: string,
	eventDescription: TrackingEventDescription,
	extraDetails?: Partial<
		Record<string, string | string[] | number | number[]>
	>,
): Promise<void> => {
	const ophan = await getOphan();

	const payload = {
		...extraDetails,
		message: eventDescription,
		timestamp: Date.now(),
	};

	console.log('reportTrackingEvent', { payload });

	submitComponentEvent(
		{
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: componentName,
			},
			action: trackingEventDescriptionToOphanAction(eventDescription),
			value: JSON.stringify(payload),
		},
		ophan.record,
	);
};
