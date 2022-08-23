// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	neutral,
	pxToRem,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Label,
	Link,
	SvgReload,
	SvgSpinner,
	TextInput,
} from '@guardian/source-react-components';
import { fakeRequestToEmailSignupService } from 'client/requestEmailSignUp';
import { FC, FormEventHandler, useState } from 'react';

// ----- sub-Components ----- //

const ErrorMessageWithAdvice = ({ text }: { text?: string }) => (
	<InlineError>
		<span>
			{text} Please try again or contact{' '}
			<Link
				href="mailto:customer.help@theguardian.com"
				target="_blank"
				css={css`
					display: inline-block;
					line-break: anywhere;
				`}
			>
				customer.help@theguardian.com
			</Link>
		</span>
	</InlineError>
);

const SuccessMessage = ({ text }: { text?: string }) => (
	<InlineSuccess>
		<span>
			<b>Subscription Confirmed.&nbsp;</b>
			<span>{text}</span>
		</span>
	</InlineSuccess>
);

// ----- Styles ----- //
const formStyle = css`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

const buttonStyle = css`
	background-color: ${neutral[0]};
	margin-bottom: ${remSpace[2]};
	flex-basis: ${pxToRem(118)}rem;
	justify-content: center;

	:disabled {
		background-color: ${neutral[46]};
	}
`;

// ----- Component ----- //

interface Props {
	newsletterId: string;
}

const HydratableEmailSignupForm: FC<Props> = ({ newsletterId }) => {
	const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
	const [submitResult, setSubmitResult] = useState<
		undefined | 'SUCCESS' | 'ERROR'
	>(undefined);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (
		event,
	): Promise<void> => {
		event.preventDefault();
		setIsWaitingForResponse(true);
		const form = event.target as HTMLFormElement;
		const emailInput = form.elements.namedItem('email');
		const emailAddress =
			emailInput && 'value' in emailInput ? emailInput.value : undefined;

		if (!emailAddress) {
			return;
		}

		const response = await fakeRequestToEmailSignupService(
			emailAddress,
			newsletterId,
		);
		setIsWaitingForResponse(false);

		if (response.status === 200) {
			setSubmitResult('SUCCESS');
		} else {
			setSubmitResult('ERROR');
		}
	};

	const resetForm = () => {
		setIsWaitingForResponse(false);
		setSubmitResult(undefined);
	};

	return (
		<div>
			<Label
				text="Enter your email address"
				cssOverrides={css`
					div {
						${textSans.xsmall({ fontWeight: 'bold' })};
					}
				`}
			/>
			<form
				className={'js-signup-form'}
				data-newsletter-id={newsletterId}
				css={formStyle}
				onSubmit={handleSubmit}
				style={{
					display:
						!!submitResult || isWaitingForResponse
							? 'none'
							: 'block',
				}}
			>
				<TextInput
					type="email"
					width={30}
					hideLabel
					name="email"
					disabled={isWaitingForResponse}
					label="Enter your email address"
					cssOverrides={css`
						height: 2.25rem;
						margin-right: ${remSpace[3]};
						margin-top: 0;
						margin-bottom: ${remSpace[2]};
						flex-basis: ${pxToRem(335)}rem;
					`}
				/>
				<Button
					size="small"
					title="Sign up"
					type="submit"
					disabled={isWaitingForResponse}
					cssOverrides={buttonStyle}
				>
					Sign up
				</Button>
			</form>

			{isWaitingForResponse && (
				<div>
					<SvgSpinner isAnnouncedByScreenReader={true} size="small" />
				</div>
			)}

			{submitResult === 'ERROR' && (
				<div
					css={css`
						display: flex;
						align-items: flex-start;
						justify-content: flex-end;
						flex-wrap: wrap;
					`}
				>
					<ErrorMessageWithAdvice
						text={`Failed to sign up to ${newsletterId}`}
					/>
					<Button
						size="small"
						icon={<SvgReload />}
						iconSide={'right'}
						onClick={resetForm}
						cssOverrides={buttonStyle}
					>
						Try again
					</Button>
				</div>
			)}
			{submitResult === 'SUCCESS' && (
				<SuccessMessage text={`Signed up to ${newsletterId}`} />
			)}
		</div>
	);
};

// ----- Exports ----- //

export default HydratableEmailSignupForm;
export { Props };
