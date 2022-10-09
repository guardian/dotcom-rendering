import { useEffect, useState } from 'react';
import { getIslandsByName } from '../browser/islands/getIslandsByName';
import { getProps } from '../browser/islands/getProps';
import { Lightbox } from './Lightbox';
import type { Props as LightboxPictureProps } from './LightboxPicture';

const isServer = typeof window === 'undefined';

export type Props = LightboxPictureProps & {
	caption?: string;
};

const getLightboxElements = (): Props[] => {
	const elements = getIslandsByName('LightboxWrapper');
	return elements.map((element) => getProps(element) as Props);
};

export const LightboxWrapper = (initialElementProps: Props) => {
	const [isOpen, setOpen] = useState(true);
	const [elements, setElements] = useState<Props[]>([]);
	useEffect(() => {
		setElements(getLightboxElements());
	}, []);

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Open Lightbox
			</button>
			{/* TODO: This might work better as its own component */}
			{!isServer && elements.length > 0 && (
				<Lightbox
					{...initialElementProps}
					isOpen={isOpen}
					onClose={() => setOpen(false)}
					elements={elements}
				/>
			)}
		</>
	);
};
