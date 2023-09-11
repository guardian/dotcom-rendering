import type { MutableRefObject } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AdPlaceholderSlot } from './AdPlaceholderSlot.apps';

type AdSlotRef = MutableRefObject<HTMLDivElement | null>;
type AdSlots = Record<number, AdSlotRef>;
export const AdPortals = () => {
	// const [isPremium, setIsPremium] = useState(true);
	const [adPlaceholders, setAdPlaceholders] = useState([]);
	const [adSlots, setAdSlots] = useState<AdSlots>();

	const getIsPremium = () => Promise.resolve(true);

	useEffect(() => {
		getIsPremium().then((isPremium) => {
			!isPremium &&
				setAdPlaceholders(
					Array.from(
						document.getElementsByClassName('ad-placeholder'),
					),
				);
		});
	}, []);

	const updateAdSlotRefs = (index: number, ref: AdSlotRef) => {
		setAdSlots({
			...adSlots,
			[index]: ref,
		});
	};

	useEffect(() => {
		if (adSlots.length === adPlaceholders.length) {
			console.log(
				adSlots.map((slot) => slot.current.getBoundingClientRect()),
			);
		}
	}, [adSlots]);

	return adPlaceholders.map(ad, (idx) =>
		createPortal(
			<AdPlaceholderSlot
				isHidden={false}
				isSquare={false}
				index={idx}
				setAdPlaceholders={setAdPlaceholders}
			/>,
			ad,
		),
	);
};
