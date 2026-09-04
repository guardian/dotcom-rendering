import { css } from '@emotion/react';
import { palette, space, textSans14 } from '@guardian/source/foundations';
import {
	Button,
	SvgCamera,
	SvgDownload,
} from '@guardian/source/react-components';
import { useState } from 'react';
import type { PuzzleItem } from '../types/puzzlesPage';

type Props = {
	targetId: string;
	title: string;
};

export const shouldShowSudokuPrintControls = (
	puzzle: Pick<PuzzleItem, 'printable' | 'type' | 'url'>,
): boolean =>
	puzzle.type === 'sudoku' &&
	puzzle.printable === true &&
	puzzle.url !== undefined;

const controlsStyles = css`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: ${space[2]}px;
	margin-bottom: ${space[4]}px;

	button * {
		pointer-events: none;
	}
`;

const messageStyles = css`
	flex-basis: 100%;
	margin: 0;
	color: ${palette.neutral[20]};
	${textSans14};
`;

const nextAnimationFrame = (): Promise<void> =>
	new Promise((resolve) => requestAnimationFrame(() => resolve()));

const waitForVideo = (video: HTMLVideoElement): Promise<void> =>
	new Promise((resolve, reject) => {
		video.addEventListener('loadedmetadata', () => resolve(), {
			once: true,
		});
		video.addEventListener(
			'error',
			() => reject(new Error('Unable to read the captured tab.')),
			{ once: true },
		);
	});

const sanitiseFilename = (title: string): string =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

const downloadBlob = (blob: Blob, filename: string): void => {
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.hidden = true;
	document.body.append(link);
	link.click();
	link.remove();
	setTimeout(() => URL.revokeObjectURL(url), 0);
};

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
	new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob);
			else reject(new Error('Unable to create the image.'));
		}, 'image/png');
	});

const captureVisibleIframe = async (
	targetId: string,
	title: string,
): Promise<void> => {
	const mediaDevices = (
		navigator as unknown as {
			mediaDevices?: {
				getDisplayMedia?: MediaDevices['getDisplayMedia'];
			};
		}
	).mediaDevices;
	const getDisplayMedia = mediaDevices?.getDisplayMedia;

	if (typeof getDisplayMedia !== 'function') {
		throw new Error('Image download is not supported by this browser.');
	}

	const target = document.getElementById(targetId)?.querySelector('iframe');
	if (!target) {
		throw new Error('The sudoku is still loading. Try again shortly.');
	}
	target.scrollIntoView({ block: 'start' });

	const stream = await getDisplayMedia.call(mediaDevices, {
		video: true,
		audio: false,
		// Supported by Chromium. Other browsers safely ignore this hint.
		preferCurrentTab: true,
	} as DisplayMediaStreamOptions);

	try {
		const video = document.createElement('video');
		const loaded = waitForVideo(video);
		video.srcObject = stream;
		await loaded;
		await video.play();
		await nextAnimationFrame();

		const rect = target.getBoundingClientRect();
		const left = Math.max(0, rect.left);
		const top = Math.max(0, rect.top);
		const right = Math.min(window.innerWidth, rect.right);
		const bottom = Math.min(window.innerHeight, rect.bottom);
		const width = right - left;
		const height = bottom - top;

		if (width <= 0 || height <= 0) {
			throw new Error('Scroll the sudoku into view and try again.');
		}

		const scaleX = video.videoWidth / window.innerWidth;
		const scaleY = video.videoHeight / window.innerHeight;
		const canvas = document.createElement('canvas');
		canvas.width = Math.round(width * scaleX);
		canvas.height = Math.round(height * scaleY);

		const context = canvas.getContext('2d');
		if (!context) throw new Error('Unable to create the image.');

		context.drawImage(
			video,
			Math.round(left * scaleX),
			Math.round(top * scaleY),
			canvas.width,
			canvas.height,
			0,
			0,
			canvas.width,
			canvas.height,
		);

		const blob = await canvasToBlob(canvas);
		downloadBlob(blob, `${sanitiseFilename(title) || 'sudoku'}.png`);
	} finally {
		for (const track of stream.getTracks()) {
			track.stop();
		}
	}
};

export const SudokuPrintControls = ({ targetId, title }: Props) => {
	const [message, setMessage] = useState<string>();
	console.log('loading');
	return (
		<div css={controlsStyles} data-print-layout="hide">
			<Button
				icon={<SvgDownload />}
				iconSide="left"
				onClick={() => window.print()}
				priority="primary"
				size="small"
				type="button"
			>
				Print / save as PDFs
			</Button>
			<Button
				icon={<SvgCamera />}
				iconSide="left"
				onClick={() => {
					console.log('test');
					setMessage('Choose This Tab to create the image.');
					void captureVisibleIframe(targetId, title)
						.then(() => setMessage('Image downloaded.'))
						.catch((error: unknown) => {
							if (
								error instanceof DOMException &&
								error.name === 'NotAllowedError'
							) {
								setMessage('Image capture was cancelled.');
								return;
							}
							setMessage(
								error instanceof Error
									? error.message
									: 'Unable to create the image.',
							);
						});
				}}
				priority="secondary"
				size="small"
				type="button"
			>
				Download visible image (PNG)
			</Button>
			{message !== undefined && (
				<p aria-live="polite" css={messageStyles} role="status">
					{message}
				</p>
			)}
		</div>
	);
};
