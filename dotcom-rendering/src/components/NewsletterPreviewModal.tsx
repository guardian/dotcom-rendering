import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	headlineMedium24,
	palette,
	space,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getZIndex } from '../lib/getZIndex';

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

const previewOverlayStyles = css`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: ${space[3]}px 0 0;
	background: rgba(0, 0, 0, 0.75);
	z-index: ${getZIndex('lightbox')};

	${from.tablet} {
		align-items: center;
		padding: ${space[3]}px;
	}
`;

const previewDialogStyles = css`
	display: flex;
	flex-direction: column;
	background: ${palette.neutral[100]};
	width: 100%;
	height: min(82vh, 760px);
	border-radius: ${space[3]}px ${space[3]}px 0 0;
	overflow: hidden;

	${from.tablet} {
		width: min(652px, 100%);
		height: min(90vh, 900px);
		border-radius: ${space[2]}px;
	}
`;

const previewHeaderStyles = css`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: ${space[4]}px ${space[3]}px;
	border-bottom: 1px solid ${palette.neutral[86]};

	${from.tablet} {
		justify-content: space-between;
	}
`;

const previewTitleStyles = css`
	${headlineMedium20};
	color: ${palette.neutral[7]};
	margin: 0;

	${from.tablet} {
		${headlineMedium24};
	}
`;

const previewFrameStyles = css`
	flex: 1;
	width: 100%;

	${from.tablet} {
		padding: 0 ${space[6]}px;
	}
`;

const desktopCloseButtonStyles = css`
	padding: 0;
	min-width: 32px;
	min-height: 32px;
	width: 32px;
	height: 32px;
	border: 0;
	border-radius: 50%;
	background: ${palette.neutral[93]};
	color: ${palette.brand[400]};
	display: none;

	&&:hover,
	&&:focus {
		background: ${palette.neutral[86]};
		border: 0;
		color: ${palette.brand[400]};
	}

	${from.tablet} {
		display: inline-flex;
	}
`;

const mobileCloseBarStyles = css`
	padding: ${space[3]}px ${space[3]}px ${space[6]}px;
	border-top: 1px solid ${palette.neutral[86]};
	background: ${palette.neutral[100]};
	position: relative;
	z-index: 1;
	box-shadow: 0 0 14px rgba(0, 0, 0, 0.4);

	${from.tablet} {
		display: none;
	}
`;

const mobileCloseButtonStyles = css`
	&& {
		width: 100%;
		justify-content: center;
		background: ${palette.neutral[100]};
		border: 1px solid ${palette.brand[400]};
		color: ${palette.brand[400]};
	}

	&&:hover,
	&&:focus {
		background: ${palette.neutral[100]};
		border-color: ${palette.brand[400]};
		color: ${palette.brand[400]};
	}
`;

type Props = {
	newsletterName: string;
	renderUrl: string;
	onClose: () => void;
};

export const NewsletterPreviewModal = ({
	newsletterName,
	renderUrl,
	onClose,
}: Props) => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const titleId = useId();

	const getVisibleFocusableElements = (dialog: HTMLElement): HTMLElement[] =>
		Array.from(
			dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
		).filter((element) => {
			const computedStyle = window.getComputedStyle(element);
			return (
				computedStyle.display !== 'none' &&
				computedStyle.visibility !== 'hidden' &&
				element.getAttribute('aria-hidden') !== 'true'
			);
		});

	useEffect(() => {
		const previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousBodyOverflow;
		};
	}, []);

	useEffect(() => {
		if (!dialogRef.current) return;

		const dialogElement = dialogRef.current;
		const previouslyFocusedElement =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		dialogElement.focus();

		return () => {
			if (
				previouslyFocusedElement &&
				document.contains(previouslyFocusedElement)
			) {
				previouslyFocusedElement.focus();
			}
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (!dialogRef.current) return;

			const dialogElement = dialogRef.current;
			if (!dialogElement.contains(document.activeElement)) return;

			if (event.key === 'Escape') {
				event.stopPropagation();
				onClose();
				return;
			}

			if (event.key !== 'Tab') return;

			const focusableElements =
				getVisibleFocusableElements(dialogElement);
			if (focusableElements.length === 0) {
				event.preventDefault();
				dialogElement.focus();
				return;
			}

			const firstFocusableElement = focusableElements[0]!;
			const lastFocusableElement =
				focusableElements[focusableElements.length - 1]!;

			if (event.shiftKey) {
				if (
					document.activeElement === firstFocusableElement ||
					document.activeElement === dialogElement
				) {
					event.preventDefault();
					lastFocusableElement.focus();
				}
				return;
			}

			if (document.activeElement === lastFocusableElement) {
				event.preventDefault();
				firstFocusableElement.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	useEffect(() => {
		const closeOnClickAway = (event: MouseEvent) => {
			if (!dialogRef.current) return;
			if (!dialogRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', closeOnClickAway);

		return () => {
			document.removeEventListener('mousedown', closeOnClickAway);
		};
	}, [onClose]);

	if (typeof document === 'undefined') return null;

	return createPortal(
		<div css={previewOverlayStyles}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabIndex={-1}
				css={previewDialogStyles}
			>
				<div css={previewHeaderStyles}>
					<h2 id={titleId} css={previewTitleStyles}>
						{newsletterName} preview
					</h2>
					<Button
						size="small"
						priority="tertiary"
						onClick={onClose}
						icon={<SvgCross size="small" />}
						hideLabel={true}
						cssOverrides={desktopCloseButtonStyles}
					>
						Close preview
					</Button>
				</div>
				<iframe
					title={`${newsletterName} preview`}
					src={renderUrl}
					css={previewFrameStyles}
				/>
				<div css={mobileCloseBarStyles}>
					<Button
						priority="tertiary"
						onClick={onClose}
						cssOverrides={mobileCloseButtonStyles}
					>
						Close
					</Button>
				</div>
			</div>
		</div>,
		document.body,
	);
};
