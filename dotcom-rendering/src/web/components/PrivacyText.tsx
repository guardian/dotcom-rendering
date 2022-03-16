type PrivacyTextSubject = 'newsletters';

interface Props {
	subject: PrivacyTextSubject;
	recaptcha?: boolean;
}

const textBySubject = {
	newsletters:
		'Our newsletters may contain info about charities, online ads, and content funded by outside parties.',
};

const RecaptchaText = () => (
	<>
		We operate Google reCAPTCHA to protect our website and the{' '}
		<a
			href="https://policies.google.com/privacy"
			target="_blank"
			aria-label="google's privacy policy"
		>
			Google Privacy Policy
		</a>{' '}
		and{' '}
		<a
			href="https://policies.google.com/terms"
			target="_blank"
			aria-label="google's terms of service"
		>
			Terms of Services
		</a>{' '}
		apply.
	</>
);

export const PrivacyText = ({ subject, recaptcha }: Props) => {
	return (
		<p>
			<b>Privacy Notice:</b> {textBySubject[subject]}
			For more information click{' '}
			<a
				target="_blank"
				href="/help/privacy-policy"
				aria-label="our privacy policy"
			>
				here
			</a>{' '}
			for our privacy policy.
			{recaptcha && <RecaptchaText />}
		</p>
	);
};
