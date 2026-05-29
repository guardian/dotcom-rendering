import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import {
	type ReactNode,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getZIndex } from '../lib/getZIndex';

const OPEN_ANIMATION_DURATION_MS = 300;
const CLOSE_ANIMATION_DURATION_MS = 225;

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const overlayStyles = (isVisible: boolean) => css`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	height: 100vh;
	height: 100svh;
	background-color: rgba(0, 0, 0, ${isVisible ? 0.75 : 0});
	transition: background-color
		${isVisible
			? OPEN_ANIMATION_DURATION_MS
			: CLOSE_ANIMATION_DURATION_MS}ms
		ease;
	z-index: ${getZIndex('lightbox')};
	will-change: background-color;

	@supports (height: 100dvh) {
		height: 100dvh;
	}

	${from.tablet} {
		align-items: center;
		padding: ${space[3]}px;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

const dialogStyles = (isVisible: boolean) => css`
	display: flex;
	flex-direction: column;
	background: ${palette.neutral[100]};
	width: 100%;
	max-height: 90vh;
	max-height: 90svh;
	border-radius: ${space[3]}px ${space[3]}px 0 0;
	overflow: hidden;
	transform: translateY(${isVisible ? '0' : '100%'});
	transition: transform
		${isVisible
			? OPEN_ANIMATION_DURATION_MS
			: CLOSE_ANIMATION_DURATION_MS}ms
		ease;
	will-change: transform;
	outline: none;

	@supports (max-height: 90dvh) {
		max-height: 90dvh;
	}

	${from.tablet} {
		width: min(540px, 100%);
		max-height: min(90vh, 800px);
		border-radius: ${space[2]}px;
		transform: none;
		opacity: ${isVisible ? 1 : 0};
		transition: opacity
			${isVisible
				? OPEN_ANIMATION_DURATION_MS
				: CLOSE_ANIMATION_DURATION_MS}ms
			ease;
		will-change: opacity;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
		transform: none;
		opacity: 1;
	}
`;

const headerStyles = css`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: ${space[2]}px ${space[3]}px;
	border-bottom: 1px solid ${palette.neutral[86]};
	flex-shrink: 0;
`;

const closeButtonStyles = css`
	padding: 0;
	min-width: 32px;
	min-height: 32px;
	width: 32px;
	height: 32px;
	border: 0;
	border-radius: 50%;
	background: ${palette.neutral[93]};
	color: ${palette.brand[400]};

	&&:hover,
	&&:focus {
		background: ${palette.neutral[86]};
		border: 0;
		color: ${palette.brand[400]};
	}
`;

const bodyStyles = css`
	flex: 1;
	overflow-y: auto;
	overscroll-behavior: contain;
	-webkit-overflow-scrolling: touch;
`;

type Props = {
	/** Used as the accessible label for the dialog. Should identify the newsletter. */
	titleId?: string;
	onClose: () => void;
	children: ReactNode;
};

/**
 * Modal shell for the Highlights newsletter signup flow.
 *
 * - Mobile: bottom sheet (slides up from bottom)
 * - Desktop: centred dialog (fades in)
 *
 * Accepts `children` so content states (form, success, etc.) can be composed
 * independently in Tasks 4 and 5.
 *
 * Accessibility: role=dialog, aria-modal, aria-labelledby, focus trap, Escape to close.
 */
export const NewsletterSignupHighlightsModal = ({
	titleId,
	onClose,
	children,
}: Props) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeTimeoutRef = useRef<number | null>(null);
	const generatedTitleId = useId();
	const labelId = titleId ?? generatedTitleId;

	const [isVisible, setIsVisible] = useState(false);

	const requestClose = useCallback(() => {
		if (closeTimeoutRef.current !== null) {
			return;
		}
		setIsVisible(false);
		closeTimeoutRef.current = window.setTimeout(() => {
			closeTimeoutRef.current = null;
			onClose();
		}, CLOSE_ANIMATION_DURATION_MS);
	}, [onClose]);

	// Trigger open animation on mount
	useEffect(() => {
		const animationFrameId = window.requestAnimationFrame(() => {
			setIsVisible(true);
		});
		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

	// Prevent body scroll while modal is open
	useEffect(() => {
		const root = document.documentElement;
		const prevRootOverflow = root.style.overflow;
		const prevBodyOverflow = document.body.style.overflow;

		root.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		return () => {
			if (closeTimeoutRef.current !== null) {
				window.clearTimeout(closeTimeoutRef.current);
				closeTimeoutRef.current = null;
			}
			root.style.overflow = prevRootOverflow;
			document.body.style.overflow = prevBodyOverflow;
		};
	}, []);

	// Focus management: focus dialog on mount, restore previously focused element on unmount
	useEffect(() => {
		if (!dialogRef.current) {
			return;
		}
		const previouslyFocused =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		dialogRef.current.focus();

		return () => {
			if (previouslyFocused && document.contains(previouslyFocused)) {
				previouslyFocused.focus();
			}
		};
	}, []);

	// Keyboard: Escape to close, Tab focus trap
	useEffect(() => {
		const getVisibleFocusable = (el: HTMLElement): HTMLElement[] =>
			Array.from(
				el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
			).filter((node) => {
				const style = window.getComputedStyle(node);
				return (
					style.display !== 'none' &&
					style.visibility !== 'hidden' &&
					node.getAttribute('aria-hidden') !== 'true'
				);
			});

		const handleKeyDown = (event: KeyboardEvent) => {
			const dialog = dialogRef.current;
			if (!dialog || !dialog.contains(document.activeElement)) {
				return;
			}

			if (event.key === 'Escape') {
				event.stopPropagation();
				requestClose();
				return;
			}

			if (event.key !== 'Tab') {
				return;
			}

			const focusable = getVisibleFocusable(dialog);
			if (focusable.length === 0) {
				event.preventDefault();
				dialog.focus();
				return;
			}

			const first = focusable[0]!;
			const last = focusable[focusable.length - 1]!;

			if (event.shiftKey) {
				if (
					document.activeElement === first ||
					document.activeElement === dialog
				) {
					event.preventDefault();
					last.focus();
				}
				return;
			}

			if (document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [requestClose]);

	// Backdrop click to close
	useEffect(() => {
		const overlay = overlayRef.current;
		if (!overlay) {
			return;
		}
		const handleMouseDown = (event: MouseEvent) => {
			if (event.target === overlay) {
				requestClose();
			}
		};
		overlay.addEventListener('mousedown', handleMouseDown);
		return () => {
			overlay.removeEventListener('mousedown', handleMouseDown);
		};
	}, [requestClose]);

	if (typeof document === 'undefined') {
		return null;
	}

	return createPortal(
		<div ref={overlayRef} css={overlayStyles(isVisible)}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelId}
				tabIndex={-1}
				css={dialogStyles(isVisible)}
			>
				<div css={headerStyles}>
					<Button
						size="small"
						priority="tertiary"
						onClick={requestClose}
						icon={<SvgCross size="small" />}
						hideLabel={true}
						cssOverrides={closeButtonStyles}
					>
						Close
					</Button>
				</div>
				<div css={bodyStyles}>{children}</div>
			</div>
		</div>,
		document.body,
	);
};
