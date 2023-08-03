import { css } from '@emotion/react';
import {
	from,
	headlineObjectStyles,
	palette,
	space,
} from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import type { ChangeEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Flex } from './Flex';
import { ManyNewslettersForm } from './ManyNewslettersForm';
import { BUTTON_ROLE, BUTTON_SELECTED_CLASS } from './NewsletterCard';
import { Section } from './Section';

interface Props {
	/** The endpoint to send the sign-up request to. An empty string will
	 * make the component use test results instead of making an actual request.
	 */
	apiEndpoint: string;
}

type FormStatus = 'NotSent' | 'Loading' | 'Success' | 'Failed';

// To align the heading content with the carousel below
// from desktop
const contentWrapperStyle = css`
	${from.leftCol} {
		padding-left: 10px;
	}
`;

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

/**
 * Placeholder function to represent API call.
 */
const sendSignUpRequest = async (
	emailAddress: string,
	newsletterIds: string[],
	apiEndpoint: string,
): Promise<{ ok: boolean; message?: string }> => {
	if (apiEndpoint === '') {
		await new Promise((resolve) => {
			setTimeout(resolve, 2000);
		});

		if (emailAddress.includes('example')) {
			return {
				ok: false,
				message: `Simulated failed sign up of "${emailAddress}" to [${newsletterIds.join()}].`,
			};
		}

		return {
			ok: true,
			message: `Simulated sign up of "${emailAddress}" to [${newsletterIds.join()}].`,
		};
	}

	return {
		ok: false,
		message: `A non-empty endpoint was provided, but actual API calls are not implemented.`,
	};
};

export const ManyNewsletterSignUp = ({ apiEndpoint }: Props) => {
	const [newslettersToSignUpFor, setNewslettersToSignUpFor] = useState<
		string[]
	>([]);
	const [status, setStatus] = useState<FormStatus>('NotSent');
	const [email, setEmail] = useState('');

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

	const handleSubmitButton = async () => {
		if (status !== 'NotSent') {
			return;
		}
		setStatus('Loading');

		const result = await sendSignUpRequest(
			email,
			newslettersToSignUpFor,
			apiEndpoint,
		);

		if (result.message) {
			console.log(result.message);
		}

		setStatus(result.ok ? 'Success' : 'Failed');
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
					</Flex>
				</div>
			</Section>
		</div>
	);
};
