import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgCross } from '@guardian/source-react-components';
import { useEffect, useRef, useState } from 'react';
import { reportAbuse } from '../../lib/discussionApi';
import type { SignedInWithCookies, SignedInWithOkta } from '../../lib/identity';
import { palette as themePalette } from '../../palette';

type FormData = {
	categoryId: number;
	reason?: string;
	email?: string;
};

const formWrapper = css`
	z-index: 1;
	border: 1px solid ${sourcePalette.neutral[86]};
	position: absolute;
	width: 300px;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	padding: ${space[3]}px;
	background-color: white;
	${textSans.xxsmall()};
`;

const labelStyles = css`
	color: ${themePalette('--discussion-colour')};
	${textSans.small({ fontWeight: 'bold' })}
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
		min-height: ${space[5]}px;
		width: 75%;
		border: 1px solid ${sourcePalette.neutral[86]};
	}
`;

const errorMessageStyles = css`
	color: red;
`;

type Props = {
	commentId: number;
	toggleSetShowForm: () => void;
	authStatus?: SignedInWithCookies | SignedInWithOkta;
};

export const AbuseReportForm = ({
	commentId,
	toggleSetShowForm,
	authStatus,
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
			authStatus,
		})
			.then((response) => {
				if (response.status !== 'ok') {
					// Fallback to errors returned from the API
					setErrors({ ...errors, response: response.message });
				} else {
					setSuccessMessage('Report submitted');
				}
			})
			.catch(() => {
				log('dotcom', 'Discussion: error reporting abuse');
			});
	};

	const labelStylesClass = labelStyles;
	return (
		<div aria-modal="true" ref={modalRef}>
			<form css={formWrapper} onSubmit={onSubmit}>
				<div css={inputWrapper}>
					<label css={labelStylesClass} htmlFor="category">
						Category
					</label>
					<select
						name="category"
						id="category"
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
							setFormVariables({
								...formVariables,
								categoryId: Number(e.target.value),
							})
						}
						value={formVariables.categoryId}
						// TODO: use ref once forwardRef is implemented @guardian/src-button
						// ref={firstElement}
					>
						<option value="0">Please select</option>
						<option value="1">Personal abuse</option>
						<option value="2">Off topic</option>
						<option value="3">Legal issue</option>
						<option value="4">Trolling</option>
						<option value="5">Hate speech</option>
						<option value="6">
							Offensive/Threatening language
						</option>
						<option value="7">Copyright</option>
						<option value="8">Spam</option>
						<option value="9">Other</option>
					</select>
					{!!errors.categoryId && (
						<span css={errorMessageStyles}>
							{errors.categoryId}
						</span>
					)}
				</div>

				<div css={inputWrapper}>
					<label css={labelStylesClass} htmlFor="reason">
						Reason (optional)
					</label>
					<textarea
						name="reason"
						id="reason"
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setFormVariables({
								...formVariables,
								reason: e.target.value,
							})
						}
						value={formVariables.reason}
					></textarea>
					{!!errors.reason && (
						<span css={errorMessageStyles}>{errors.reason}</span>
					)}
				</div>

				<div css={inputWrapper}>
					<label css={labelStylesClass} htmlFor="email">
						Email (optional)
					</label>
					<input
						type="email"
						name="email"
						id="email"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFormVariables({
								...formVariables,
								email: e.target.value,
							})
						}
						value={formVariables.email}
					></input>
					{!!errors.email && (
						<span css={errorMessageStyles}>{errors.email}</span>
					)}
				</div>

				<div>
					<Button
						type="submit"
						size="small"
						data-link-name="Post report abuse"
					>
						Report
					</Button>

					{!!errors.response && (
						<span
							css={[
								errorMessageStyles,
								css`
									margin-left: 1em;
								`,
							]}
						>
							{errors.response}
						</span>
					)}

					{!!successMessage && (
						<span
							css={css`
								color: green;
								margin-left: 1em;
							`}
						>
							{successMessage}
						</span>
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
					>
						close report abuse modal
					</Button>
				</div>
			</form>
		</div>
	);
};
