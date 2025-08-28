import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source/foundations';
import {
	Checkbox,
	CheckboxGroup,
	TextInput,
} from '@guardian/source/react-components';
import type { FC } from 'react';
import { useState } from 'react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import type { FormProps } from './ManyNewslettersForm';

const inputWrapperStyle = css`
	margin-bottom: ${space[2]}px;
	${from.desktop} {
		margin-bottom: 0;
		margin-right: ${space[2]}px;
		flex-basis: 296px;
	}
`;

const inputAndOptInWrapperStyle = css`
	${from.desktop} {
		flex-basis: 296px;
		margin-right: ${space[2]}px;
	}
`;

const optInCheckboxTextSmall = css`
	label > div {
		font-size: 13px;
		line-height: 16px;
	}
`;

export interface ManyNewslettersFormFieldsProps
	extends Omit<FormProps, 'handleSubmitButton' | 'newsletterCount'> {}

export const ManyNewslettersFormFields: FC<ManyNewslettersFormFieldsProps> = ({
	status,
	email,
	handleTextInput,
	marketingOptIn,
	setMarketingOptIn,
	useReCaptcha,
	captchaSiteKey,
	visibleRecaptcha,
	reCaptchaRef,
	handleCaptchaError,
}) => {
	const [firstInteractionOccurred, setFirstInteractionOccurred] =
		useState(false);

	const isMarketingOptInVisible = marketingOptIn !== undefined;

	const errorMessage =
		status === 'Failed'
			? 'Sign up failed. Please try again'
			: status === 'InvalidEmail'
			? 'Please enter a valid email address'
			: undefined;

	return (
		<div css={inputAndOptInWrapperStyle}>
			<span css={inputWrapperStyle}>
				<TextInput
					label="Enter your email"
					value={email}
					onChange={handleTextInput}
					error={errorMessage}
					disabled={status === 'Loading'}
					onFocus={() => setFirstInteractionOccurred(true)}
				/>
			</span>
			{isMarketingOptInVisible && (
				<div>
					<CheckboxGroup
						name="marketing-preferences"
						label="Marketing preferences"
						hideLabel={true}
						cssOverrides={optInCheckboxTextSmall}
					>
						<Checkbox
							label="Get updates about our journalism and ways to support and enjoy our work."
							value="marketing-opt-in"
							checked={marketingOptIn}
							onChange={(e) =>
								setMarketingOptIn(e.target.checked)
							}
							theme={{
								fillUnselected: palette.neutral[100],
							}}
						/>
					</CheckboxGroup>
				</div>
			)}
			{useReCaptcha && !!captchaSiteKey && (
				<div
					css={css`
						.grecaptcha-badge {
							visibility: hidden;
						}
					`}
				>
					{(!visibleRecaptcha || firstInteractionOccurred) && (
						<ReactGoogleRecaptcha
							sitekey={captchaSiteKey}
							ref={reCaptchaRef}
							onError={handleCaptchaError}
							size={visibleRecaptcha ? 'normal' : 'invisible'}
						/>
					)}
				</div>
			)}
		</div>
	);
};
