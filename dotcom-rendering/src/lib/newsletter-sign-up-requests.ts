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
