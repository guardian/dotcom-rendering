import React from 'react';
import { Ad } from '@root/src/amp/components/Ad';
import { css } from 'emotion';

const clear = css`
	clear: both;
`;

interface AdInfo {
	edition: Edition;
	contentType: string;
	commercialProperties: CommercialProperties;
	switches: {
		ampPrebid: boolean;
		permutive: boolean;
	};
	section?: string;
}

type Props = {
	items: JSX.Element[];
	adSlots: number[];
	adClassName: string;
	adInfo: AdInfo;
};

export const WithAds = ({ items, adSlots, adClassName, adInfo }: Props) => {
	const commercialConfig = {
		usePrebid: adInfo.switches.ampPrebid,
		usePermutive: adInfo.switches.permutive,
	};

	const ad = (id: string): JSX.Element => (
		// data-sort-time and id needed for amp-live-list validation
		<div id={id} data-sort-time="1">
			<Ad
				className={adClassName}
				edition={adInfo.edition}
				section={adInfo.section}
				contentType={adInfo.contentType}
				config={commercialConfig}
				commercialProperties={adInfo.commercialProperties}
			/>
		</div>
	);

	const withAds = items.map((item, i) => {
		if (adSlots.includes(i)) {
			return (
				<>
					{item}
					{/* TODO: we should not be assuming the JSX has an ID property and using it as such, we should update `items` to contain IDs and JSX elements */}
					{/*
                    // @ts-ignore */}
					{ad(`ad-${item.id}`)}
				</>
			);
		}

		return item;
	});

	return (
		<>
			{withAds}
			<div id="clean-blocks" data-sort-time="1" className={clear} />
		</>
	);
};
