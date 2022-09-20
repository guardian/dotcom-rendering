import { css } from '@emotion/react';
import { useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import type { Props as PictureProps } from './Picture';
import { Picture } from './Picture';

const isServer = typeof window === 'undefined';

type Props = {};

export const Lightbox = ({
	role,
	format,
	master,
	alt,
	height,
	width,
}: Props & PictureProps) => {
	const [isOpen, setOpen] = useState(true);
	return (
		<div>
			<button type="button" onClick={() => setOpen(true)}>
				Open Lightbox
			</button>
			{!isServer && (
				<div
					css={css`
						display: ${isOpen ? 'block' : 'none'};
						position: fixed;
						top: 0;
						right: 0;
						width: 100vw;
						height: 100vh;
						background-color: black;
						${getZIndex('lightbox')};
					`}
				>
					<h2
						css={css`
							color: white;
						`}
					>
						Hello World!
						<button type="button" onClick={() => setOpen(false)}>
							Close
						</button>
					</h2>
					{/* <Picture
						role={role}
						format={format}
						master={master}
						alt={alt}
						width={width}
						height={height}
						isLightBox={true}
					/> */}
				</div>
			)}
		</div>
	);
};
