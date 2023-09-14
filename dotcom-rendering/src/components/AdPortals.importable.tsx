import { AdSlot as BridgetAdSlot } from '@guardian/bridget/AdSlot';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AdPlaceholderSlot } from './AdPlaceholderSlot.apps';
import { getCommercialClient } from '../lib/bridgetApi';

type AdSlotRef = React.RefObject<HTMLDivElement>;
type AdSlots = Record<number, AdSlotRef>;
type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};
function getRect(slotPosition: DOMRect): Rect {
	const scrollLeft = document.scrollingElement
		? document.scrollingElement.scrollLeft
		: document.body.scrollLeft;
	const scrollTop = document.scrollingElement
		? document.scrollingElement.scrollTop
		: document.body.scrollTop;

	return {
		x: slotPosition.left + scrollLeft,
		y: slotPosition.top + scrollTop,
		width: slotPosition.width,
		height: slotPosition.height,
	};
}

export const AdPortals = () => {
	// ad placeholders === list of server rendered divs for ad slot to be inserted into by DCR
	const [adPlaceholders, setAdPlaceholders] = useState<Element[]>([]);
	// ad slots === list of DCR rendered ad slots
	const [appAdSlots, setAppAdSlots] = useState<AdSlots>({});
	// briget ad slots === list of AdSlots on a page used for native ad injection.
	const [bridgetAdSlots, setBridgetAdSlots] = useState<BridgetAdSlot[]>([]);
	const [clientHeight, setClientHeight] = useState(0);

	const addRefToAppAdSlots = (ref: [number, AdSlotRef]) => {
		setAppAdSlots((prevSlots) => ({
			...prevSlots,
			[ref[0]]: ref[1],
		}));
	};
	const resizeObserver = new ResizeObserver((entries) => {
		if (entries[0]) {
			console.log('height change!', entries[0].target.clientHeight);

			if (entries[0].target.clientHeight !== clientHeight)
				setClientHeight(entries[0].target.clientHeight);
		}
	});

	useEffect(() => {
		const body = document.body;
		if (body) {
			resizeObserver.observe(body);
		}
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const getIsPremium = () => Promise.resolve(false);

	useEffect(() => {
		getIsPremium().then((isPremium) => {
			!isPremium &&
				setAdPlaceholders(
					Array.from(
						document.getElementsByClassName(
							'ad-portal-placeholder',
						),
					),
				);
		});
	}, []);

	useEffect(() => {
		if (Object.keys(appAdSlots).length === adPlaceholders.length) {
			const updatedAdSlots = Object.values(appAdSlots)
				.map((slot: React.RefObject<HTMLDivElement>) => {
					if (slot && slot.current) {
						return new BridgetAdSlot({
							rect: getRect(
								slot.current.getBoundingClientRect?.(),
							),
							isSquare: false,
						});
					} else return null;
				})
				.filter(
					(
						position: BridgetAdSlot | null,
					): position is BridgetAdSlot => {
						return position !== null;
					},
				);

			//TODO: this comparison doesnt work!
			if (bridgetAdSlots !== updatedAdSlots) {
				if (updatedAdSlots.length > 0) {
					void getCommercialClient().insertAdverts(updatedAdSlots);
					// void getCommercialClient().updateAdverts(updatedAdSlots);
				}
				setBridgetAdSlots(updatedAdSlots);
			}
		}
	}, [appAdSlots, clientHeight, adPlaceholders.length]);

	return (
		<>
			{adPlaceholders.map((ad, idx) =>
				createPortal(
					<AdPlaceholderSlot
						isHidden={false}
						isSquare={false}
						index={idx}
						setAdPlaceholders={addRefToAppAdSlots}
					/>,
					ad,
				),
			)}
		</>
	);
};
