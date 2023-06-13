import { css } from '@emotion/react';
import { palette, space } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	SvgCross,
	SvgSpinner,
	TextInput,
} from '@guardian/source-react-components';
import { useCallback, useEffect, useState } from 'react';
import { BUTTON_ROLE, BUTTON_SELECTED_CLASS } from './GroupedNewsletterList';
import { NewsletterPrivacyMessage } from './NewsletterPrivacyMessage';
import { Section } from './Section';

interface Props {
	label: string;
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
	align-items: center;
	justify-content: space-between;
`;

enum FormState {
	NotSent,
	Loading,
	Success,
	Failed,
}

export const ManyNewsletterSignUp = ({ label }: Props) => {
	const [newslettersToSignUpFor, setNewslettersToSignUpFor] = useState<
		string[]
	>([]);
	const [status, setStatus] = useState(FormState.NotSent);

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

		setTimeout(() => {
			setStatus(FormState.Failed);
		}, 2000);
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
					<div css={formFrameStyle}>
						{(status === FormState.NotSent ||
							status === FormState.Loading) && (
							<div
								css={css`
									display: flex;
									flex-shrink: 0;
									align-items: flex-end;
								`}
							>
								<span
									css={css`
										margin-right: ${space[2]}px;
									`}
								>
									<TextInput label="email" />
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
								>
									{label}
								</Button>
							</div>
						)}

						{status === FormState.Failed && (
							<InlineError>Sign up failed.</InlineError>
						)}
						<div
							css={css`
								flex-basis: 400px;
							`}
						>
							<NewsletterPrivacyMessage />
						</div>
					</div>
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
