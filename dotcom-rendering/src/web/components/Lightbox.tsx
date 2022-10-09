import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { useEffect, useRef, useState } from 'react';
import { LightboxPicture } from './LightboxPicture';
import type { Props as LightboxProps } from './LightboxWrapper.importable';

type Props = LightboxProps & {
	isOpen: boolean;
	onClose: () => void;
	elements: LightboxProps[];
};

// Browsers apply some weird default styling to dialogs,
// lets reset that!
const dialogElementCssReset = css`
	margin: 0;
	max-width: none;
	max-height: none;
	box-sizing: border-box;
`;

export const Lightbox = ({
	isOpen,
	onClose,
	elements,
	...initialElementProps
}: Props) => {
	const dialogElement = useRef<HTMLDialogElement>(null);
	const [index, setIndex] = useState(
		elements.findIndex(
			(element) => element.master === initialElementProps.master,
		),
	);

	useEffect(() => {
		if (isOpen)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- typescript doesn't know this method exists for some reason
			dialogElement.current?.showModal();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- typescript doesn't know this method exists for some reason
		else dialogElement.current?.close();
	}, [isOpen, dialogElement]);

	const canPrev = () => index > 0;
	const canNext = () => index < elements.length - 1;

	const { master, alt, caption } = elements[index];

	return (
		<dialog
			ref={dialogElement}
			css={css`
				${dialogElementCssReset}

				width: 100vw;
				height: 100vh;
				background-color: black;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: row;
				`}
			>
				<div
					id={`lightbox-image-${index}`}
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
							color: white;
						`}
					>
						<span>
							{index + 1}/{elements.length}
						</span>
						<button
							type="button"
							disabled={!canPrev()}
							onClick={() => canPrev() && setIndex(index - 1)}
						>
							Prev
						</button>
						<button
							type="button"
							disabled={!canNext()}
							onClick={() => canNext() && setIndex(index + 1)}
						>
							Next
						</button>

						<button type="button" onClick={() => onClose()}>
							Close
						</button>
					</div>
					<figcaption
						css={css`
							color: white;
						`}
					>
						{caption}
					</figcaption>
				</div>
			</div>
		</dialog>
	);
};
