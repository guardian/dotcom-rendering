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
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getZIndex } from '../lib/getZIndex';

const PREVIEW_LOAD_TIMEOUT_MS = 10_000;

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
	min-width: 0;

	${from.tablet} {
		padding: 0;
	}
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

const previewIframeHiddenStyles = css`
	visibility: hidden;
`;

const previewLoadingOverlayStyles = css`
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: ${space[4]}px ${space[3]}px;
	background: ${palette.neutral[100]};
	overflow-y: auto;

	${from.tablet} {
		padding: ${space[6]}px;
	}
`;

const previewSkeletonBlockStyles = css`
	width: 100%;
	flex-shrink: 0;
	background: linear-gradient(
		90deg,
		${palette.neutral[93]} 25%,
		${palette.neutral[97]} 50%,
		${palette.neutral[93]} 75%
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

const previewSkeletonLongStyles = css`
	${previewSkeletonBlockStyles};
	height: 96px;
`;

const previewSkeletonLargeStyles = css`
	${previewSkeletonBlockStyles};
	height: 332px;
	margin-top: 16px;
`;

const previewSkeletonThirdStyles = css`
	${previewSkeletonBlockStyles};
	height: 52px;
	margin-top: 32px;
`;

const previewSkeletonFourthStyles = css`
	${previewSkeletonBlockStyles};
	height: 52px;
	margin-top: 16px;
`;

const previewSkeletonFinalStyles = css`
	${previewSkeletonBlockStyles};
	height: 272px;
	margin-top: 16px;
	background: linear-gradient(
		90deg,
		${palette.neutral[93]} 25%,
		${palette.neutral[97]} 50%,
		${palette.neutral[93]} 75%
	);
	background-size: 200% 100%;
	animation: preview-skeleton-shimmer 1.2s linear infinite;
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
	const titleId = useId();
	const [isLoading, setIsLoading] = useState(true);
	const [hasLoadFailed, setHasLoadFailed] = useState(false);
	const [iframeKey, setIframeKey] = useState(0);

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
		const rootElement = document.documentElement;
		const previousRootOverflow = rootElement.style.overflow;
		const previousBodyOverflow = document.body.style.overflow;

		rootElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		return () => {
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

	useEffect(() => {
		setIsLoading(true);
		setHasLoadFailed(false);
	}, [renderUrl, iframeKey]);

	useEffect(() => {
		if (!isLoading) return;

		const timeoutId = window.setTimeout(() => {
			setHasLoadFailed(true);
			setIsLoading(false);
		}, PREVIEW_LOAD_TIMEOUT_MS);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [isLoading]);

	const handleIframeLoad = () => {
		setIsLoading(false);
		setHasLoadFailed(false);
	};

	const handleIframeError = () => {
		setHasLoadFailed(true);
		setIsLoading(false);
	};

	const retryLoad = () => {
		setIframeKey((currentKey) => currentKey + 1);
	};

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
				<div css={previewFrameContainerStyles}>
					{true && (
						<div
							css={previewLoadingOverlayStyles}
							aria-live="polite"
							aria-label="Loading newsletter preview"
						>
							<div css={previewSkeletonLongStyles} />
							<div css={previewSkeletonLargeStyles} />
							<div css={previewSkeletonThirdStyles} />
							<div css={previewSkeletonFourthStyles} />
							<div css={previewSkeletonFinalStyles} />
						</div>
					)}
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
									The preview is taking longer than expected.
									You can retry loading it.
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
						key={iframeKey}
						title={`${newsletterName} preview`}
						src={renderUrl}
						onLoad={handleIframeLoad}
						onError={handleIframeError}
						css={[
							previewFrameStyles,
							(isLoading || hasLoadFailed) &&
								previewIframeHiddenStyles,
						]}
					/>
				</div>
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
