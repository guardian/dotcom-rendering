import type { FEFrontCard, TreatType } from '../types/front';

export const enhanceTreats = (treats: FEFrontCard[]): TreatType[] =>
	treats.map((treat) => {
		return {
			text: treat.header.headline,
			linkTo: treat.properties.href ?? treat.header.url,
		};
	});
