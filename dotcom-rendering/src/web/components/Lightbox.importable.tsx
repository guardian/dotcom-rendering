import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { useState } from 'react';
import { getIslandsByName } from '../browser/islands/getIslandsByName';
import { getProps } from '../browser/islands/getProps';
import { getZIndex } from '../lib/getZIndex';
import { LightboxPicture } from './LightboxPicture';
import type { Props as LightboxPictureProps } from './LightboxPicture';

const isServer = typeof window === 'undefined';

type Props = LightboxPictureProps & {
	caption?: string;
};

const getLightboxElements = (): Props[] => {
	const elements = getIslandsByName('Lightbox');
	return elements.map((element) => getProps(element) as Props);
};

export const Lightbox = (initialElementProps: Props) => {
	// TODO: This should only be fetched once on component load
	const elements = isServer ? [] : getLightboxElements();
	const [index, setIndex] = useState(
		elements.findIndex(
			(element) => element.master === initialElementProps.master,
		),
	);
	const [isOpen, setOpen] = useState(true);

	const canPrev = () => index > 0;
	const canNext = () => index < elements.length - 1;

	const { master, alt, caption } =
		index !== -1 ? elements[index] : initialElementProps;

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Open Lightbox
			</button>
			{/* TODO: This might work better as its own component */}
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
					<div
						css={css`
							display: flex;
							flex-direction: row;
						`}
					>
						<div
							css={css`
								flex-basis: 85%;
							`}
						>
							<LightboxPicture master={master} alt={alt} />
						</div>
						<div
							css={css`
								flex-basis: 15%;
								align-items: flex-end;
								display: flex;
								flex-direction: column;
								padding: ${space[2]}px;
							`}
						>
							<div
								css={css`
									margin-bottom: ${space[2]}px;
									color: #fff;
								`}
							>
								<span>
									{index + 1}/{elements.length}
								</span>
								<button
									type="button"
									disabled={!canNext()}
									onClick={() =>
										canNext() && setIndex(index + 1)
									}
								>
									Next
								</button>
								<button
									type="button"
									disabled={!canPrev()}
									onClick={() =>
										canPrev() && setIndex(index - 1)
									}
								>
									Prev
								</button>
								<button
									type="button"
									onClick={() => setOpen(false)}
								>
									Close
								</button>
							</div>
							<figcaption
								css={css`
									color: #fff;
								`}
							>
								{caption}
							</figcaption>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
