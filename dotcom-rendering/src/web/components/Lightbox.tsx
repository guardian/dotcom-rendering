import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { getIslandsByName } from '../browser/islands/getIslandsByName';
import { getProps } from '../browser/islands/getProps';
import { getZIndex } from '../lib/getZIndex';
import { LightboxPicture } from './LightboxPicture';
import type { Props as LightboxProps } from './LightboxWrapper.importable';

type Props = LightboxProps & {
	isOpen: boolean;
	onClose: () => void;
};

const getLightboxElements = (): LightboxProps[] => {
	const elements = getIslandsByName('LightboxWrapper');
	return elements.map((element) => getProps(element) as LightboxProps);
};

export const Lightbox = ({
	isOpen,
	onClose,
	...initialElementProps
}: Props) => {
	const [elements, setElements] = useState<LightboxProps[]>([]);
	const [index, setIndex] = useState(-1);
	useEffect(() => {
		const lightboxElements = getLightboxElements();
		const initialIndex = lightboxElements.findIndex(
			(element) => element.master === initialElementProps.master,
		);

		if (initialIndex === -1) {
			const error = new Error(
				'Unable to find lightbox element when opening',
			);
			window.guardian.modules.sentry.reportError(error, 'lightbox');
			throw error;
		}

		setElements(lightboxElements);
		setIndex(initialIndex);
	}, [initialElementProps.master]);

	if (index === -1) {
		return null;
	}

	const canPrev = () => index > 0;
	const canNext = () => index < elements.length - 1;

	const { master, alt, caption } = elements[index];

	return (
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
							color: #ffffff;
						`}
					>
						<span>
							{index + 1}/{elements.length}
						</span>
						<button
							type="button"
							disabled={!canNext()}
							onClick={() => canNext() && setIndex(index + 1)}
						>
							Next
						</button>
						<button
							type="button"
							disabled={!canPrev()}
							onClick={() => canPrev() && setIndex(index - 1)}
						>
							Prev
						</button>
						<button type="button" onClick={() => onClose()}>
							Close
						</button>
					</div>
					<figcaption
						css={css`
							color: #ffffff;
						`}
					>
						{caption}
					</figcaption>
				</div>
			</div>
		</div>
	);
};
