import { css, ThemeProvider } from '@emotion/react';
import { body, neutral, news, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeBrandAlt,
	Link,
	SvgClock,
} from '@guardian/source-react-components';
import { useState } from 'react';
import type { NewsletterSubscribeCallback } from '../types/dcrTypes';
import type { TrackClick } from '../utils/tracking';
import { LoadingDots } from './CtaLoadingDotsAnimation';

type InteractiveButtonStatus =
	| 'DEFAULT'
	| 'IN_PROGRESS'
	| 'SUCCESS'
	| 'FAILURE';

// Newsletter CTA button
// -------------------------------------------------------
const ctaStyles = {
	button: css`
		background-color: ${news[400]};
		color: ${neutral[100]};
		&:hover {
			background-color: ${news[400]};
		}
	`,
	thankYouText: css`
		${body.medium({ fontWeight: 'bold' })};
		color: ${neutral[0]};
	`,
	errorText: css`
		${body.medium({ fontWeight: 'bold' })};
		color: ${neutral[0]};
		margin-bottom: 16px;
	`,
	newslettersLinkPeriod: css`
		color: ${neutral[0]};
	`,
};

type SignUpButtonProps = { onSignUpClick: () => void };

const SignUpButton = (props: SignUpButtonProps) => {
	return (
		<ThemeProvider theme={buttonThemeBrandAlt}>
			<Button css={ctaStyles.button} onClick={props.onSignUpClick}>
				Sign up
			</Button>
		</ThemeProvider>
	);
};

type CTAProps = {
	subscribeToNewsletter: NewsletterSubscribeCallback;
	newsletterId: string;
	ophanComponentId?: string;
	trackClick: TrackClick;
};

export const CTA = (props: CTAProps) => {
	const {
		subscribeToNewsletter,
		newsletterId,
		ophanComponentId,
		trackClick,
	} = props;

	const [subscribeClickStatus, setSubscribeClickStatus] =
		useState<InteractiveButtonStatus>('DEFAULT');

	const onSignUpClick = () => {
		setSubscribeClickStatus('IN_PROGRESS');

		const internalButtonId = 0;
		trackClick({
			internalButtonId,
			// We'll have already confirmed this is truthy in the canRender
			ophanComponentId: ophanComponentId as string,
		});

		subscribeToNewsletter(newsletterId)
			.then(() => setSubscribeClickStatus('SUCCESS'))
			.catch(() => {
				setSubscribeClickStatus('FAILURE');
			});
	};

	switch (subscribeClickStatus) {
		case 'DEFAULT':
			return <SignUpButton onSignUpClick={onSignUpClick} />;

		case 'FAILURE':
			return (
				<>
					<div css={ctaStyles.errorText}>
						There was an error signing up to the newsletter. Please
						try again
					</div>
					<SignUpButton onSignUpClick={onSignUpClick}></SignUpButton>
				</>
			);

		case 'IN_PROGRESS':
			return <LoadingDots styleReminderAnimation="#707070" />;

		case 'SUCCESS':
			return (
				<>
					<div css={ctaStyles.thankYouText}>Thank you.</div>
					<div>
						<Link
							href="https://manage.theguardian.com/email-prefs"
							priority="primary"
						>
							Manage my newsletters
						</Link>
						<span css={ctaStyles.newslettersLinkPeriod}>.</span>
					</div>
				</>
			);
	}
};

// Newsletter Frequency Block
// -------------------------------------------------------
const frequencyStyles = {
	container: css`
		padding: 4px;
	`,
	clock: css`
		position: relative;
		top: 2px;
		margin-right: 4px;
		svg {
			fill: ${neutral[60]};
			height: 16px;
			width: 16px;
		}
	`,
	text: css`
		color: ${neutral[20]};
		${textSans.medium()}
		margin-left: 4px;
	`,
};

type NewsletterFrequencyProps = {
	frequency?: string;
};

export const NewsletterFrequency = (props: NewsletterFrequencyProps) => {
	const { frequency } = props;

	if (!frequency) {
		return <></>;
	}

	return (
		<div css={frequencyStyles.container}>
			<span css={frequencyStyles.clock}>
				<SvgClock />
			</span>
			<span css={frequencyStyles.text}>{frequency}</span>
		</div>
	);
};
