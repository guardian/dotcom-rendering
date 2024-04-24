import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { space, textSans } from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	InlineSuccess,
	Option,
	Select,
	SvgCross,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import { useEffect, useRef, useState } from 'react';
import type { reportAbuse } from '../../lib/discussionApi';
import { palette as schemedPalette } from '../../palette';

type FormData = {
	categoryId: number;
	reason?: string;
	email?: string;
};

const formWrapper = css`
	z-index: 1;
	border: 1px solid ${schemedPalette('--discussion-border')};
	position: absolute;
	width: 300px;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	padding: ${space[3]}px;
	background-color: ${schemedPalette('--discussion-report-background')};
	${textSans.xxsmall()};
`;

const labelColour = schemedPalette('--discussion-report-label-text');

const errorColour = schemedPalette('--discussion-report-error-text');

const buttonStyles = css`
	background-color: ${schemedPalette('--discussion-report-button')};
`;

const errorBorderColour = css`
	select,
	input,
	textarea {
		border: 1px solid ${schemedPalette('--discussion-report-error-text')};
	}
`;

const borderColour = css`
	select,
	input,
	textarea {
		border: 1px solid ${schemedPalette('--discussion-report-border')};
	}
`;

const inputWrapper = css`
	display: flex;
	flex-direction: column;
	margin-bottom: ${space[2]}px;

	label {
		display: block;
	}

	select,
	input,
	textarea {
		background-color: ${schemedPalette('--discussion-report-background')};
		min-height: ${space[5]}px;
		width: 75%;
		color: inherit;
	}
`;

const svgStyles = css`
	div {
		svg {
			right: 80px;
			fill: ${labelColour};
		}
	}
`;

const errorSvgStyles = css`
	span[role='alert'] {
		svg {
			fill: ${errorColour};
		}
	}
`;

type Props = {
	commentId: string;
	toggleSetShowForm: () => void;
	reportAbuse: ReturnType<typeof reportAbuse>;
};

export const AbuseReportForm = ({
	commentId,
	toggleSetShowForm,
	reportAbuse,
}: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	// TODO: use ref once forwardRef is implemented @guardian/src-button
	// We want to pull out the 1st and last elements of the form, and highlight the 1st element
	let firstElement: HTMLSelectElement | null = null;
	let lastElement: HTMLButtonElement | null = null;
	useEffect(() => {
		if (!modalRef.current) return;
		// eslint-disable-next-line react-hooks/exhaustive-deps -- https://github.com/guardian/discussion-rendering/pull/56 for where this was first introduced
		firstElement = modalRef.current.querySelector(
			'select[name="category"]',
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- https://github.com/guardian/discussion-rendering/pull/56 for where this was first introduced
		lastElement = modalRef.current.querySelector(
			'button[custom-guardian="close-modal"]',
		);
	}, [modalRef]);
	// We want to highlight the 1st element when the modal is open
	useEffect(() => {
		firstElement?.focus();
	}, [firstElement]);

	// We want to make sure to close the modal when a user clicks away from the modal
	useEffect(() => {
		const closeOnClickAway = (e: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(e.target as Node)
			) {
				toggleSetShowForm();
			}
		};
		document.addEventListener('mousedown', closeOnClickAway);
	}, [modalRef, toggleSetShowForm]);

	// We want to listen to keydown events for accessibility
	useEffect(() => {
		const keyListener = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				toggleSetShowForm();
			} else if (e.code === 'Tab') {
				// If firstElement or lastElement are not defined, do not continue
				if (!firstElement || !lastElement) return;

				// we use `e.shiftKey` internally to determine the direction of the highlighting
				// using document.activeElement and e.shiftKey we can check what should be the next element to be highlighted
				if (!e.shiftKey && document.activeElement === lastElement) {
					firstElement.focus();
					e.preventDefault();
				}

				if (e.shiftKey && document.activeElement === firstElement) {
					lastElement.focus(); // The shift key is down so loop focus back to the last item
					e.preventDefault();
				}
			}
		};
		document.addEventListener('keydown', keyListener);
		return () => document.removeEventListener('keydown', keyListener);
	});

	const [formVariables, setFormVariables] = useState<FormData>({
		categoryId: 0,
		reason: '',
		email: '',
	});

	const defaultErrorTexts = {
		categoryId: '',
		reason: '',
		email: '',
		response: '',
	};
	const [errors, setErrors] = useState(defaultErrorTexts);
	const [successMessage, setSuccessMessage] = useState<string>();
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { categoryId, reason, email } = formVariables;

		// Reset error messages
		setErrors(defaultErrorTexts);

		// Error validation
		if (!categoryId) {
			setErrors({
				...errors,
				categoryId: 'You must select a category before submitting',
			});

			return;
		}

		reportAbuse({
			categoryId,
			reason,
			email,
			commentId,
		})
			.then((response) => {
				if (response.kind === 'error') {
					// Fallback to errors returned from the API
					setErrors({ ...errors, response: response.error });
				} else {
					setSuccessMessage('Report submitted');
				}
			})
			.catch(() => {
				log('dotcom', 'Discussion: error reporting abuse');
			});
	};

	/** If the "Other" or the "Legal Issue" categories are selected, you must supply a reason */
	const legalIssueCategoryId = 3;
	const otherCategoryId = 9;
	const isReasonRequired =
		formVariables.categoryId === otherCategoryId ||
		formVariables.categoryId === legalIssueCategoryId;

	return (
		<div aria-modal="true" ref={modalRef}>
			<form css={formWrapper} onSubmit={onSubmit}>
				<div
					css={[
						inputWrapper,
						svgStyles,
						errorSvgStyles,
						errors.categoryId ? errorBorderColour : borderColour,
					]}
				>
					<Select
						label={'Category'}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							setFormVariables({
								...formVariables,
								categoryId: Number(e.target.value),
							});

							errors.categoryId = '';
							setErrors(errors);
						}}
						value={formVariables.categoryId}
						theme={{
							textLabel: labelColour,
							textOptional: labelColour,
							textError: errorColour,
							borderError: errorColour,
						}}
						error={
							errors.categoryId ? errors.categoryId : undefined
						}
					>
						<Option value="0">Please select</Option>
						<Option value="1">Personal abuse</Option>
						<Option value="2">Off topic</Option>
						<Option value={legalIssueCategoryId}>
							Legal issue
						</Option>
						<Option value="4">Trolling</Option>
						<Option value="5">Hate speech</Option>
						<Option value="6">
							Offensive/Threatening language
						</Option>
						<Option value="7">Copyright</Option>
						<Option value="8">Spam</Option>
						<Option value={otherCategoryId}>Other</Option>
					</Select>
				</div>

				<div
					css={[
						inputWrapper,
						svgStyles,
						errorSvgStyles,
						errors.reason ? errorBorderColour : borderColour,
					]}
				>
					<TextArea
						id="reason"
						size={'medium'}
						label={'Reason'}
						optional={!isReasonRequired}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setFormVariables({
								...formVariables,
								reason: e.target.value,
							})
						}
						value={formVariables.reason}
						required={isReasonRequired}
						theme={{
							textLabel: labelColour,
							textOptional: labelColour,
							textError: errorColour,
							borderError: errorColour,
						}}
						error={errors.reason ? errors.reason : undefined}
					/>
				</div>

				<div
					css={[
						inputWrapper,
						svgStyles,
						errorSvgStyles,
						errors.email ? errorBorderColour : borderColour,
					]}
				>
					<TextInput
						label={'Email'}
						optional={true}
						id="email"
						type="email"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFormVariables({
								...formVariables,
								email: e.target.value,
							})
						}
						value={formVariables.email}
						theme={{
							textLabel: labelColour,
							textOptional: labelColour,
							textError: errorColour,
							borderError: errorColour,
						}}
						error={errors.email ? errors.email : undefined}
					/>
				</div>

				<div>
					<Button
						type="submit"
						size="small"
						data-link-name="Post report abuse"
						cssOverrides={buttonStyles}
					>
						Report
					</Button>

					{!!errors.response && (
						<InlineError
							css={css`
								color: ${errorColour};
								padding-top: ${space[2]}px;
							`}
						>
							{errors.response}
						</InlineError>
					)}

					{!!successMessage && (
						<InlineSuccess
							css={css`
								color: ${schemedPalette(
									'--discussion-report-success-text',
								)};
								padding-top: ${space[2]}px;
							`}
						>
							{successMessage}
						</InlineSuccess>
					)}
				</div>
				<div
					css={css`
						position: absolute;
						right: ${space[3]}px;
						top: ${space[3]}px;
					`}
				>
					<Button
						// TODO: use ref once forwardRef is implemented @guardian/src-button
						// ref={lastElement}
						custom-guardian="close-modal"
						size="small"
						iconSide="right"
						icon={<SvgCross />}
						onClick={toggleSetShowForm}
						data-link-name="cancel-report-abuse"
						hideLabel={true}
						cssOverrides={buttonStyles}
					>
						close report abuse modal
					</Button>
				</div>
			</form>
		</div>
	);
};
