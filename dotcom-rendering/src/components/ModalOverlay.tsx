import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getZIndex } from '../lib/getZIndex';

const OPEN_ANIMATION_DURATION_MS = 300;
const CLOSE_ANIMATION_DURATION_MS = 225;

const prefersReducedMotion = (): boolean =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ModalRequestCloseContext = createContext<(() => void) | null>(null);

export const useModalRequestClose = (): (() => void) => {
	const ctx = useContext(ModalRequestCloseContext);
	if (ctx === null) {
		throw new Error(
			'useModalRequestClose must be used inside ModalOverlay',
		);
	}
	return ctx;
};

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

const getVisibleFocusableElements = (dialog: HTMLElement): HTMLElement[] =>
	Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		(element) => {
			const computedStyle = window.getComputedStyle(element);
			return (
				computedStyle.display !== 'none' &&
				computedStyle.visibility !== 'hidden' &&
				computedStyle.visibility !== 'collapse' &&
				element.getAttribute('aria-hidden') !== 'true'
			);
		},
	);

const overlayStyles = (isVisible: boolean) => css`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: ${space[3]}px 0 0;
	height: 100vh;
	overflow: hidden;
	background-color: rgba(0, 0, 0, ${isVisible ? 0.75 : 0});
	transition: background-color
		${isVisible
			? OPEN_ANIMATION_DURATION_MS
			: CLOSE_ANIMATION_DURATION_MS}ms
		ease;
	z-index: ${getZIndex('lightbox')};

	@supports (height: 100dvh) {
		height: 100dvh;
	}

	${from.tablet} {
		align-items: center;
		padding: ${space[3]}px;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
		background-color: rgba(0, 0, 0, 0.75);
	}
`;

type DialogStylesOptions = {
	isVisible: boolean;
	dialogCss?: ReturnType<typeof css>;
};

const dialogStyles = ({ isVisible, dialogCss }: DialogStylesOptions) => [
	css`
		transform: translateY(${isVisible ? '0' : '100%'});
		transition: transform
			${isVisible
				? OPEN_ANIMATION_DURATION_MS
				: CLOSE_ANIMATION_DURATION_MS}ms
			ease;

		/*
		   This blocks Android from recognising or passing horizontal
		   swipes to whatever carousel happens to live behind it.
		*/
		touch-action: pan-y;
		overscroll-behavior: contain;

		${from.tablet} {
			transform: none;
			opacity: ${isVisible ? 1 : 0};
			transition: opacity
				${isVisible
					? OPEN_ANIMATION_DURATION_MS
					: CLOSE_ANIMATION_DURATION_MS}ms
				ease;
		}

		@media (prefers-reduced-motion: reduce) {
			transition: none;
			transform: none;
			opacity: 1;
		}
	`,
	dialogCss,
];

type Props = {
	'aria-labelledby': string;
	onClose: () => void;
	dialogCss?: ReturnType<typeof css>;
	children: React.ReactNode;
};

export const ModalOverlay = ({
	'aria-labelledby': labelledBy,
	onClose,
	dialogCss,
	children,
}: Props) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeTimeoutRef = useRef<number | null>(null);

	const [isVisible, setIsVisible] = useState(() => prefersReducedMotion());

	const requestClose = useCallback(() => {
		if (closeTimeoutRef.current !== null) {
			return;
		}

		if (prefersReducedMotion()) {
			// Use -1 as a sentinel to block re-entrant calls. 0 is a valid
			// setTimeout ID and must not be used here.
			closeTimeoutRef.current = -1;
			onClose();
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
		if (prefersReducedMotion()) {
			return;
		}

		const animationFrameId = window.requestAnimationFrame(() => {
			setIsVisible(true);
		});

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

	// Scroll lock
	useEffect(() => {
		const rootElement = document.documentElement;
		const previousRootOverflow = rootElement.style.overflow;
		const previousBodyOverflow = document.body.style.overflow;

		rootElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		return () => {
			if (closeTimeoutRef.current !== null) {
				window.clearTimeout(closeTimeoutRef.current);
				closeTimeoutRef.current = null;
			}
			rootElement.style.overflow = previousRootOverflow;
			document.body.style.overflow = previousBodyOverflow;
		};
	}, []);

	// Focus management
	useEffect(() => {
		const dialogElement = dialogRef.current;
		if (!dialogElement) {
			return;
		}

		const previouslyFocusedElement =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		// preventScroll stops iOS Safari from jerking the viewport to bring
		// the off-screen element into view before the slide-up animation runs.
		dialogElement.focus({ preventScroll: true });

		return () => {
			if (
				previouslyFocusedElement &&
				document.contains(previouslyFocusedElement)
			) {
				previouslyFocusedElement.focus();
			}
		};
	}, []);

	// Keyboard handling: Escape to close, Tab to trap focus
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			const dialogElement = dialogRef.current;
			if (!dialogElement) {
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

			if (!dialogElement.contains(document.activeElement)) {
				return;
			}

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
	}, [requestClose]);

	// Click outside to close
	useEffect(() => {
		const overlayElement = overlayRef.current;
		if (!overlayElement) {
			return;
		}

		const handleOverlayPointerDown = (event: PointerEvent) => {
			if (event.target === overlayElement) {
				event.preventDefault();
				requestClose();
			}
		};

		overlayElement.addEventListener(
			'pointerdown',
			handleOverlayPointerDown,
		);

		return () => {
			overlayElement.removeEventListener(
				'pointerdown',
				handleOverlayPointerDown,
			);
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
				aria-labelledby={labelledBy}
				tabIndex={-1}
				css={dialogStyles({ isVisible, dialogCss })}
			>
				<ModalRequestCloseContext.Provider value={requestClose}>
					{children}
				</ModalRequestCloseContext.Provider>
			</div>
		</div>,
		document.body,
	);
};
