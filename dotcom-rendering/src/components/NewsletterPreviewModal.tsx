import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	headlineMedium24,
	palette,
	space,
	textSans15,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getZIndex } from '../lib/getZIndex';
import { EMAIL_PREVIEW_ORIGIN } from '../lib/newsletterPreviewUrl';

const PREVIEW_LOAD_TIMEOUT_MS = 10_000;
const OPEN_ANIMATION_DURATION_MS = 300;
const CLOSE_ANIMATION_DURATION_MS = 225;
const TIMEOUT_FAILURE_MESSAGE =
	'The preview is taking longer than expected. You can retry loading it.';
const UNAVAILABLE_FAILURE_MESSAGE =
	'This preview is currently unavailable. Please try again shortly.';

type EmbedStatusMessage = {
	type: 'embed-status';
	ok: boolean;
};

const parseEmbedStatusMessage = (
	data: unknown,
): EmbedStatusMessage | undefined => {
	let payload: unknown = data;

	if (typeof payload === 'string') {
		try {
			payload = JSON.parse(payload);
		} catch {
			return undefined;
		}
	}

	if (!payload || typeof payload !== 'object') return undefined;

	const { type, ok } = payload as {
		type?: unknown;
		ok?: unknown;
	};

	if (type !== 'embed-status' || typeof ok !== 'boolean') return undefined;

	return {
		type: 'embed-status',
		ok,
	};
};

const getTrustedIframeOrigin = (url: string): string | undefined => {
	try {
		const origin = new URL(url).origin;
		return origin === EMAIL_PREVIEW_ORIGIN ? origin : undefined;
	} catch {
		return undefined;
	}
};

const isTrustedIframeMessage = ({
	event,
	trustedOrigin,
	iframeWindow,
}: {
	event: MessageEvent;
	trustedOrigin: string;
	iframeWindow: Window | null;
}): boolean => {
	const isTrustedOrigin = event.origin === trustedOrigin;
	const isExpectedSource =
		iframeWindow !== null && event.source === iframeWindow;

	if (!isTrustedOrigin || !isExpectedSource) {
		return false;
	}

	return true;
};

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

const previewOverlayStyles = (isVisible: boolean) => css`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding: ${space[3]}px 0 0;
	background: rgba(0, 0, 0, 0.75);
	opacity: ${isVisible ? 1 : 0};
	transition: opacity
		${isVisible
			? OPEN_ANIMATION_DURATION_MS
			: CLOSE_ANIMATION_DURATION_MS}ms
		ease;
	z-index: ${getZIndex('lightbox')};
	will-change: opacity;

	${from.tablet} {
		align-items: center;
		padding: ${space[3]}px;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

const previewDialogStyles = (isVisible: boolean) => css`
	display: flex;
	flex-direction: column;
	background: ${palette.neutral[100]};
	width: 100%;
	height: min(82vh, 760px);
	border-radius: ${space[3]}px ${space[3]}px 0 0;
	overflow: hidden;
	transform: translateY(${isVisible ? '0' : '100%'});
	transition: transform
		${isVisible
			? OPEN_ANIMATION_DURATION_MS
			: CLOSE_ANIMATION_DURATION_MS}ms
		ease;
	will-change: transform;

	${from.tablet} {
		width: min(652px, 100%);
		height: min(90vh, 900px);
		border-radius: ${space[2]}px;
		transform: none;
		opacity: ${isVisible ? 1 : 0};
		transition: opacity ${isVisible ? 225 : 175}ms ease;
		will-change: opacity;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
		transform: none;
		opacity: 1;
	}
`;

const previewHeaderStyles = css`
	display: flex;
	align-items: flex-start;
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
		padding-right: ${space[3]}px;
	}
`;

const previewFrameStyles = css`
	flex: 1;
	min-height: 0;
	height: 100%;
	width: 100%;
	display: block;
	border: 0;
	background: ${palette.neutral[100]};
	padding: 0;
`;

const previewFrameContainerStyles = css`
	position: relative;
	display: flex;
	min-height: 0;
	flex: 1;
	background: ${palette.neutral[100]};

	${from.tablet} {
		padding: 0 ${space[6]}px;
	}
`;

const previewIframeVisibilityStyles = (isVisible: boolean) => css`
	opacity: ${isVisible ? 1 : 0};
	visibility: ${isVisible ? 'visible' : 'hidden'};
	transition: opacity 180ms ease;

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

const previewLoadingOverlayStyles = (isVisible: boolean) => css`
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0 ${space[3]}px ${space[4]}px;
	background: ${palette.neutral[100]};
	overflow-y: hidden;
	opacity: ${isVisible ? 1 : 0};
	pointer-events: ${isVisible ? 'auto' : 'none'};
	transition: opacity 180ms ease;
	will-change: opacity;

	${from.tablet} {
		padding: 0 ${space[9]}px ${space[9]}px;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

const previewSkeletonBlockStyles = css`
	width: 100%;
	flex-shrink: 0;
	background: linear-gradient(
		90deg,
		${palette.neutral[86]} 25%,
		${palette.neutral[97]} 50%,
		${palette.neutral[86]} 75%
	);
	background-size: 200% 100%;
	animation: preview-skeleton-shimmer 1.2s linear infinite;

	@keyframes preview-skeleton-shimmer {
		from {
			background-position: 200% 0;
		}
		to {
			background-position: -200% 0;
		}
	}
`;

const previewSkeletonBannerStyles = css`
	${previewSkeletonBlockStyles};
	height: 96px;
`;

const previewSkeletonLargeStyles = css`
	${previewSkeletonBlockStyles};
	height: 332px;
	margin: 16px 0;
`;

const previewSkeletonSmallStyles = css`
	${previewSkeletonBlockStyles};
	height: 52px;
	margin-top: 16px;
`;

const previewStatusStyles = css`
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${space[4]}px ${space[3]}px;
	background: ${palette.neutral[100]};
	text-align: center;

	${from.tablet} {
		padding: ${space[6]}px;
	}
`;

const previewStatusInnerStyles = css`
	max-width: 520px;
`;

const previewStatusTitleStyles = css`
	${headlineMedium20};
	margin: 0 0 ${space[2]}px;
	color: ${palette.neutral[7]};
`;

const previewStatusBodyStyles = css`
	${textSans15};
	margin: 0 0 ${space[4]}px;
	color: ${palette.neutral[20]};
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
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const hasEmbedStatusFailureRef = useRef(false);
	const closeTimeoutRef = useRef<number | null>(null);
	const titleId = useId();
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [hasLoadFailed, setHasLoadFailed] = useState(false);
	const [failureMessage, setFailureMessage] = useState(
		UNAVAILABLE_FAILURE_MESSAGE,
	);
	const [iframeKey, setIframeKey] = useState(0);

	const trustedIframeOrigin = getTrustedIframeOrigin(renderUrl);

	const applyEmbedStatus = (ok: boolean) => {
		hasEmbedStatusFailureRef.current = !ok;

		if (!ok) {
			setFailureMessage(UNAVAILABLE_FAILURE_MESSAGE);
		}

		setIsLoading(false);
		setHasLoadFailed(!ok);
	};

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

	const requestClose = useCallback(() => {
		if (closeTimeoutRef.current !== null) return;

		setIsVisible(false);
		closeTimeoutRef.current = window.setTimeout(() => {
			closeTimeoutRef.current = null;
			onClose();
		}, CLOSE_ANIMATION_DURATION_MS);
	}, [onClose]);

	useEffect(() => {
		const animationFrameId = window.requestAnimationFrame(() => {
			setIsVisible(true);
		});

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

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
				requestClose();
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
	}, [requestClose]);

	useEffect(() => {
		const closeOnClickAway = (event: MouseEvent) => {
			if (!dialogRef.current) return;
			if (!dialogRef.current.contains(event.target as Node)) {
				requestClose();
			}
		};

		document.addEventListener('mousedown', closeOnClickAway);

		return () => {
			document.removeEventListener('mousedown', closeOnClickAway);
		};
	}, [requestClose]);

	useEffect(() => {
		hasEmbedStatusFailureRef.current = false;
		setIsLoading(true);
		setHasLoadFailed(false);
		setFailureMessage(UNAVAILABLE_FAILURE_MESSAGE);
	}, [renderUrl, iframeKey]);

	useEffect(() => {
		if (!isLoading) return;

		const timeoutId = window.setTimeout(() => {
			setFailureMessage(TIMEOUT_FAILURE_MESSAGE);
			setHasLoadFailed(true);
			setIsLoading(false);
		}, PREVIEW_LOAD_TIMEOUT_MS);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [isLoading]);

	useEffect(() => {
		if (!trustedIframeOrigin) return;

		const handleMessage = (event: MessageEvent) => {
			if (!iframeRef.current) return;

			const iframeWindow = iframeRef.current.contentWindow;
			if (
				!isTrustedIframeMessage({
					event,
					trustedOrigin: trustedIframeOrigin,
					iframeWindow,
				})
			) {
				return;
			}

			const embedStatusMessage = parseEmbedStatusMessage(event.data);
			if (!embedStatusMessage) return;

			applyEmbedStatus(embedStatusMessage.ok);
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [trustedIframeOrigin]);

	const handleIframeLoad = () => {
		if (hasEmbedStatusFailureRef.current) return;
		setIsLoading(false);
		setHasLoadFailed(false);
	};

	const handleIframeError = () => {
		setFailureMessage(UNAVAILABLE_FAILURE_MESSAGE);
		setHasLoadFailed(true);
		setIsLoading(false);
	};

	const retryLoad = () => {
		setIframeKey((currentKey) => currentKey + 1);
	};

	if (typeof document === 'undefined') return null;

	return createPortal(
		<div css={previewOverlayStyles(isVisible)}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabIndex={-1}
				css={previewDialogStyles(isVisible)}
			>
				<div css={previewHeaderStyles}>
					<h2 id={titleId} css={previewTitleStyles}>
						{newsletterName} preview
					</h2>
					<Button
						size="small"
						priority="tertiary"
						onClick={requestClose}
						icon={<SvgCross size="small" />}
						hideLabel={true}
						cssOverrides={desktopCloseButtonStyles}
					>
						Close preview
					</Button>
				</div>
				<div css={previewFrameContainerStyles}>
					<div
						css={previewLoadingOverlayStyles(isLoading)}
						aria-live={isLoading ? 'polite' : undefined}
						aria-hidden={isLoading ? undefined : true}
						aria-label={
							isLoading ? 'Loading newsletter preview' : undefined
						}
					>
						<div css={previewSkeletonBannerStyles} />
						<div css={previewSkeletonLargeStyles} />
						<div css={previewSkeletonSmallStyles} />
						<div css={previewSkeletonSmallStyles} />
						<div css={previewSkeletonLargeStyles} />
					</div>
					{hasLoadFailed && (
						<div
							css={previewStatusStyles}
							role="status"
							aria-live="polite"
						>
							<div css={previewStatusInnerStyles}>
								<h3 css={previewStatusTitleStyles}>
									Preview failed to load
								</h3>
								<p css={previewStatusBodyStyles}>
									{failureMessage}
								</p>
								<Button
									size="small"
									priority="primary"
									onClick={retryLoad}
								>
									Retry preview
								</Button>
							</div>
						</div>
					)}
					<iframe
						ref={iframeRef}
						key={iframeKey}
						title={`${newsletterName} preview`}
						src={renderUrl}
						onLoad={handleIframeLoad}
						onError={handleIframeError}
						css={[
							previewFrameStyles,
							previewIframeVisibilityStyles(
								!isLoading && !hasLoadFailed,
							),
						]}
					/>
				</div>
				<div css={mobileCloseBarStyles}>
					<Button
						priority="tertiary"
						onClick={requestClose}
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
