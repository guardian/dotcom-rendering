import React, { useRef, useState, useEffect, RefObject } from 'react';
import { css } from 'emotion';

import { MostViewedRight } from './MostViewedRight';

type Props = {
	palette: Palette;
	limitItems?: number;
};

// Minimum height needed to render MostViewedRight is its own outer height.
const HEIGHT_REQUIRED = 482 + 24 + 24;

const flexGrow = css`
	flex-grow: 1;
`;

// Wrapping MostViewedRight so we can determine whether or not there's enough vertical space in the container to render it.
export const MostViewedRightWrapper = ({ palette, limitItems }: Props) => {
	const bodyRef = useRef<HTMLDivElement>(null);
	const [heightIsAvailable, setHeightIsAvailable] = useState<boolean>(false);

	useEffect(() => {
		const checkHeight = (ref: RefObject<HTMLDivElement>) => {
			if (!heightIsAvailable) {
				// Don't bother checking if height already available
				if (ref.current) {
					const { offsetHeight } = ref.current;
					setHeightIsAvailable(offsetHeight > HEIGHT_REQUIRED);
				}
			}
		};

		// Check if we have the available height
		checkHeight(bodyRef);

		// setTimeout here lets us put another check at the end of the
		// event queue in case any in body elements still need to render
		// which could push the page down giving us the space we need
		setTimeout(() => {
			checkHeight(bodyRef);
		});
	}, [heightIsAvailable]);

	return (
		<div ref={bodyRef} className={flexGrow}>
			{heightIsAvailable ? (
				<MostViewedRight palette={palette} limitItems={limitItems} />
			) : null}
		</div>
	);
};
