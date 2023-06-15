import { Button, InlineError } from '@guardian/source-react-components';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
	requestMultipleSignUps,
	requestSingleSignUp,
} from '../lib/newsletter-sign-up-requests';
import { Section } from './Section';

const isServer = typeof window === 'undefined';

export const TestManyNewslettersButton = () => {
	const [singleIsWaiting, setSingleIsWaiting] = useState(false);
	const [manyIsWaiting, setManyIsWaiting] = useState(false);
	const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

	const makeRequestForSingleSignUp = async (
		emailAddress: string,
		newsletterId: string,
	) => {
		const response = await requestSingleSignUp(
			emailAddress,
			newsletterId,
			recaptchaToken ?? '',
		);
		console.log(response);
		setManyIsWaiting(false);
	};

	const makeRequestForManySignUp = async (
		emailAddress: string,
		newsletterIds: string[],
	) => {
		const response = await requestMultipleSignUps(
			emailAddress,
			newsletterIds,
			recaptchaToken ?? '',
		);
		console.log(response);
		setSingleIsWaiting(false);
	};

	const singleSubmitHandler = () => {
		if (singleIsWaiting) {
			return;
		}
		setSingleIsWaiting(true);
		void makeRequestForSingleSignUp(
			'test-single@example.com',
			'green-light',
		);
	};

	const manySubmitHandler = () => {
		if (manyIsWaiting) {
			return;
		}
		setManyIsWaiting(true);
		void makeRequestForManySignUp('test-many@example.com', [
			'green-light',
			'morning-mail',
		]);
	};

	const captchaSiteKey = isServer
		? undefined
		: window.guardian.config.page.googleRecaptchaSiteKey;
	return (
		<Section>
			<Button onClick={singleSubmitHandler} disabled={singleIsWaiting}>
				test the /email endpoint!
			</Button>
			<Button onClick={manySubmitHandler} disabled={manyIsWaiting}>
				test the /email/many endpoint!
			</Button>

			{!!captchaSiteKey && (
				<ReCAPTCHA
					sitekey={captchaSiteKey}
					onChange={setRecaptchaToken}
					onError={undefined}
				/>
			)}
			{!captchaSiteKey && (
				<InlineError>No googleRecaptchaSiteKey set</InlineError>
			)}
		</Section>
	);
};
