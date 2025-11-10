import {
	headlineBold24Object,
	palette,
	space,
} from '@guardian/source/foundations';
import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
	children: ReactNode;
	open: boolean;
	heading: string;
};

export const Dialog = (props: Props) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	// Required for the `::backdrop` pseudo-element, otherwise we could use the
	// `open` attribute.
	useEffect(() => {
		if (props.open) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [props.open]);

	return (
		<dialog
			css={{
				width: 'min(500px, 95vw)',
				'::backdrop': {
					backgroundColor: palette.neutral[10],
					opacity: 0.7,
				},
			}}
			ref={dialogRef}
		>
			<Heading>{props.heading}</Heading>
			{props.children}
		</dialog>
	);
};

const Heading = (props: { children: ReactNode }) => (
	<h2
		css={{
			...headlineBold24Object,
			paddingBottom: space[5],
		}}
	>
		{props.children}
	</h2>
);
