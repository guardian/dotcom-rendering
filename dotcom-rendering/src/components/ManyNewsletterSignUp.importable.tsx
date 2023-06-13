import { css } from '@emotion/react';
import {
	from,
	headlineObjectStyles,
	palette,
	space,
} from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	SvgCross,
	SvgSpinner,
	TextInput,
} from '@guardian/source-react-components';
import type { ChangeEventHandler } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { BUTTON_ROLE, BUTTON_SELECTED_CLASS } from './GroupedNewsletterList';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { Section } from './Section';

enum FormState {
	NotSent,
	Loading,
	Success,
	Failed,
}

const sectionWrapperStyle = (hide: boolean) => css`
	display: ${hide ? 'none' : 'unset'};
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 100;
`;

const formFrameStyle = css`
	border: ${palette.neutral[0]} 3px dashed;
	border-radius: 12px;
	padding: ${space[2]}px;

	display: flex;
	flex-direction: column;

	${from.desktop} {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
`;

const formFieldsStyle = css`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding-bottom: ${space[1]}px;

	${from.desktop} {
		flex: 1;
		flex-direction: row;
		flex-shrink: 0;
		align-items: flex-end;
	}
`;

const inputWrapperStyle = css`
	margin-bottom: ${space[2]}px;
	${from.desktop} {
		margin-bottom: 0;
		margin-right: ${space[2]}px;
		flex-basis: 280px;
	}
`;

const formAsideStyle = css`
	${from.desktop} {
		flex-basis: 400px;
	}
`;

interface FormProps {
	status: FormState;
	email: string;
	handleTextInput: ChangeEventHandler<HTMLInputElement>;
	handleSubmitButton: { (): void };
}
const Form = ({
	status,
	email,
	handleTextInput,
	handleSubmitButton,
}: FormProps) => {
	return (
		<form
			css={formFrameStyle}
			onSubmit={(submitEvent) => {
				submitEvent.preventDefault();
			}}
		>
			{(status === FormState.NotSent || status === FormState.Loading) && (
				<div css={formFieldsStyle}>
					<span css={inputWrapperStyle}>
						<TextInput
							label="Enter your email"
							value={email}
							onChange={handleTextInput}
						/>
					</span>
					<Button
						icon={
							status === FormState.Loading ? (
								<SvgSpinner />
							) : undefined
						}
						disabled={status === FormState.Loading}
						iconSide="right"
						onClick={handleSubmitButton}
						size="small"
						cssOverrides={css`
							justify-content: center;
						`}
					>
						Sign up
					</Button>
				</div>
			)}

			{status === FormState.Failed && (
				<InlineError>Sign up failed.</InlineError>
			)}

			{status === FormState.Success && (
				<p
					css={css`
						${headlineObjectStyles.xsmall({
							lineHeight: 'tight',
							fontWeight: 'bold',
						})}
					`}
				>
					You are now a subscriber! Thank you for signing up
				</p>
			)}

			<aside css={formAsideStyle}>
				<NewsletterPrivacyMessage />
			</aside>
		</form>
	);
};

export const ManyNewsletterSignUp = () => {
	const [newslettersToSignUpFor, setNewslettersToSignUpFor] = useState<
		string[]
	>([]);
	const [status, setStatus] = useState(FormState.NotSent);
	const [email, setEmail] = useState('');

	const toggleNewsletter = useCallback(
		(event: Event) => {
			if (status !== FormState.NotSent) {
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
			} else {
				setNewslettersToSignUpFor([
					...newslettersToSignUpFor.slice(0, index),
					...newslettersToSignUpFor.slice(index + 1),
				]);
				button.classList.remove(BUTTON_SELECTED_CLASS);
			}
		},
		[newslettersToSignUpFor, status],
	);

	const removeAll = useCallback(() => {
		if (status !== FormState.NotSent) {
			return;
		}
		const signUpButtons = [
			...document.querySelectorAll(`[data-role=${BUTTON_ROLE}]`),
		];
		signUpButtons.forEach((button) => {
			button.classList.remove(BUTTON_SELECTED_CLASS);
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

	const handleSubmitButton = () => {
		if (status !== FormState.NotSent) {
			return;
		}
		setStatus(FormState.Loading);

		console.log(email, newslettersToSignUpFor);

		setTimeout(() => {
			setStatus(
				email.includes('@') ? FormState.Success : FormState.Failed,
			);
		}, 2000);
	};

	const handleTextInput: ChangeEventHandler<HTMLInputElement> = (ev) => {
		if (status !== FormState.NotSent) {
			return;
		}
		setEmail(ev.target.value);
	};

	return (
		<div css={sectionWrapperStyle(newslettersToSignUpFor.length === 0)}>
			<Section
				title={`${newslettersToSignUpFor.length} selected`}
				backgroundColour={palette.brand[800]}
				showSideBorders={false}
			>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
					`}
				>
					<Form
						{...{
							email,
							handleSubmitButton,
							handleTextInput,
							status,
						}}
					/>
					<div
						css={css`
							padding: ${space[1]}px;
						`}
					>
						<Button
							color={palette.neutral[0]}
							onClick={removeAll}
							hideLabel={true}
							priority="tertiary"
							icon={<SvgCross />}
						>
							cancel sign up
						</Button>
					</div>
				</div>
			</Section>
		</div>
	);
};
