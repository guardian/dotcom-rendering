import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	palette,
	space,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getZIndex } from '../lib/getZIndex';

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
	${headlineBold20};
	font-weight: 700;
	color: ${palette.neutral[7]};

	${from.tablet} {
		${headlineBold24};
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
	display: none;

	${from.tablet} {
		display: inline-flex;
	}
`;

const mobileCloseBarStyles = css`
	padding: ${space[3]}px ${space[3]}px ${space[6]}px;
	border-top: 1px solid ${palette.neutral[86]};
	background: ${palette.neutral[100]};

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
				css={previewDialogStyles}
			>
				<div css={previewHeaderStyles}>
					<p css={previewTitleStyles}>{newsletterName} preview</p>
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
						size="small"
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
