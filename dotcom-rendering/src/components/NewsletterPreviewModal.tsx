import { css } from '@emotion/react';
import { palette, space, textSans14 } from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getZIndex } from '../lib/getZIndex';

const previewOverlayStyles = css`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${space[3]}px;
	background: rgba(0, 0, 0, 0.75);
	z-index: ${getZIndex('lightbox')};
`;

const previewDialogStyles = css`
	display: flex;
	flex-direction: column;
	background: ${palette.neutral[100]};
	width: min(625px, 100%);
	height: min(90vh, 900px);
	border-radius: ${space[2]}px;
	overflow: hidden;
`;

const previewHeaderStyles = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: ${space[2]}px ${space[3]}px;
	border-bottom: 1px solid ${palette.neutral[86]};
`;

const previewTitleStyles = css`
	${textSans14};
	font-weight: 700;
	color: ${palette.neutral[7]};
`;

const previewFrameStyles = css`
	flex: 1;
	width: 100%;
	border: 0;
	background: ${palette.neutral[100]};
`;

const closeButtonStyles = css`
	padding: 0;
	min-width: 32px;
	min-height: 32px;
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
						cssOverrides={closeButtonStyles}
					>
						Close preview
					</Button>
				</div>
				<iframe
					title={`${newsletterName} preview`}
					src={renderUrl}
					css={previewFrameStyles}
				/>
			</div>
		</div>,
		document.body,
	);
};
