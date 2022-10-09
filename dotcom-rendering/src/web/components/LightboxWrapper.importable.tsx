import { useState } from 'react';
import { Lightbox } from './Lightbox';
import type { Props as LightboxPictureProps } from './LightboxPicture';

const isServer = typeof window === 'undefined';

export type Props = LightboxPictureProps & {
	caption?: string;
};

export const LightboxWrapper = (initialElementProps: Props) => {
	const [isOpen, setOpen] = useState(true);

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Open Lightbox
			</button>
			{/* TODO: This might work better as its own component */}
			{!isServer && (
				<Lightbox
					{...initialElementProps}
					isOpen={isOpen}
					onClose={() => setOpen(false)}
				/>
			)}
		</>
	);
};
