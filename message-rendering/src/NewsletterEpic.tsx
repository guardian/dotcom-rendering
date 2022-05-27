import { css, ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';
import {
	brand,
	news,
	neutral,
	space,
	from,
	until,
	body,
	headline,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	buttonThemeBrandAlt,
	SvgClock,
} from '@guardian/source-react-components';
import type { TrackClick } from './tracking';

const canRender = () => true;
const styles = {
	epicContainer: css`
		padding: 4px 8px 12px;
		border-top: 1px solid ${news[400]};
		background-color: ${neutral[97]};
		display: flex;
		flex-direction: row;
		max-width: 620px;
	`,
	rightSection: css`
		padding-left: 12px;
	`,
	frequencySection: css`
		padding: 4px;
	`,
	frequencyClock: css`
		position: relative;
		top: 2px;
		margin-right: 4px;

		svg {
			fill: #999999;
			height: 16px;
			width: 16px;
		}
	`,
	frequencyText: css`
		color: ${neutral[20]};
		${textSans.medium()}
		margin-left: 4px;
	`,
	image: css`
		width: 196px;

		${until.desktop} {
			width: 96px;
		}
	`,
	heading: css`
		${headline.small({ fontWeight: 'bold' })};
		margin: 0;
		max-width: 100%;

		${from.mobileLandscape} {
			${headline.small({ fontWeight: 'bold' })};
		}

		${from.tablet} {
			max-width: 100%;
		}
	`,
	paragraph: css`
		${body.medium()}
		line-height: 135%;
		margin: ${space[5]}px 0 ${space[5]}px;
		max-width: 100%;
		color: ${neutral[0]};

		${from.phablet} {
			max-width: 90%;
		}

		${from.tablet} {
			max-width: 100%;
		}

		${from.desktop} {
			margin: ${space[3]}px 0 ${space[4]}px;
			max-width: 42rem;
		}

		${from.leftCol} {
			max-width: 37rem;
		}

		${from.wide} {
			max-width: 42rem;
		}
	`,
};

export type NewsletterSubscribeCallback = (id: string) => Promise<void>;

export type BrazeMessageProps = {
	header?: string;
	frequency?: string;
	paragraph1?: string;
	paragraph2?: string;
	imageUrl?: string;
	newsletterId?: string;
	ophanComponentId?: string;
};

export type Props = {
	brazeMessageProps: BrazeMessageProps;
	subscribeToNewsletter: NewsletterSubscribeCallback;
	trackClick: TrackClick;
};

type CTAProps = {
	subscribeToNewsletter: NewsletterSubscribeCallback;
	newsletterId: string;
	ophanComponentId?: string;
	trackClick: TrackClick;
};

type SubscribeClickStatus = 'DEFAULT' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';

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
	newslettersLink: css`
		${body.medium()}
		border-bottom: 1px solid ${neutral[60]};
		color: ${news[400]};
		padding-bottom: 2px;
		text-decoration: none;
	`,
	newslettersLinkPeriod: css`
		color: ${neutral[0]};
	`,
};

type SignUpButtonProps = { onSignUpClick: () => void };

const SignUpButton: React.FC<SignUpButtonProps> = (
	props: SignUpButtonProps,
) => {
	return (
		<ThemeProvider theme={buttonThemeBrandAlt}>
			<Button css={ctaStyles.button} onClick={props.onSignUpClick}>
				Sign up
			</Button>
		</ThemeProvider>
	);
};

const CTA: React.FC<CTAProps> = (props: CTAProps) => {
	const {
		subscribeToNewsletter,
		newsletterId,
		ophanComponentId,
		trackClick,
	} = props;

	const [subscribeClickStatus, setSubscribeClickStatus] =
		useState<SubscribeClickStatus>('DEFAULT');

	const onSignUpClick = () => {
		setSubscribeClickStatus('IN_PROGRESS');

		const internalButtonId = 0;
		trackClick({
			internalButtonId,
			// We'll have already confirmed this is truthy in the canRender
			ophanComponentId: ophanComponentId as string,
		});

		subscribeToNewsletter(newsletterId as string)
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
			return <p>Loading...</p>;
		case 'SUCCESS':
			return (
				<>
					<div css={ctaStyles.thankYouText}>Thank you.</div>
					<div>
						<a
							href="https://www.theguardian.com/email-newsletters"
							css={ctaStyles.newslettersLink}
						>
							View all newsletters
							<span css={ctaStyles.newslettersLinkPeriod}>.</span>
						</a>
					</div>
				</>
			);
	}
};

export const NewsletterEpic: React.FC<Props> = (props: Props) => {
	const {
		brazeMessageProps: {
			header,
			frequency,
			paragraph1,
			paragraph2,
			imageUrl,
			newsletterId,
			ophanComponentId,
		},
		subscribeToNewsletter,
		trackClick,
	} = props;

	if (!canRender()) {
		return null;
	}

	return (
		<ThemeProvider theme={brand}>
			<section css={styles.epicContainer}>
				<div>
					<img css={styles.image} src={imageUrl}></img>
				</div>
				<div css={styles.rightSection}>
					<span css={styles.heading}>{header}</span>
					<div css={styles.frequencySection}>
						<span css={styles.frequencyClock}>
							<SvgClock />
						</span>
						<span css={styles.frequencyText}>{frequency}</span>
					</div>
					<p css={styles.paragraph}>{paragraph1}</p>
					{paragraph2 ? (
						<p css={styles.paragraph}>{paragraph2}</p>
					) : null}
					<CTA
						subscribeToNewsletter={subscribeToNewsletter}
						newsletterId={newsletterId as string}
						ophanComponentId={ophanComponentId}
						trackClick={trackClick}
					/>
				</div>
			</section>
		</ThemeProvider>
	);
};
