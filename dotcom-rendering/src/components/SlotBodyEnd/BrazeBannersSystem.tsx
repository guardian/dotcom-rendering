import type { CanShowResult } from '../../lib/messagePicker';
import { BrazeInstance } from '../../lib/braze/initialiseBraze';
import { BrazeBannersSystemPlacementId } from '../../lib/braze/buildBrazeMessaging';

type BrazeBanner = {
	// dataFromBraze: { [key: string]: string };
	// logImpressionWithBraze: () => void;
	// logButtonClickWithBraze: (id: number) => void;
};

export const canShowBrazeBannersSystem = async (
	braze: BrazeInstance | null,
	placementId: BrazeBannersSystemPlacementId,
): Promise<CanShowResult<BrazeBanner>> => {
	// First, check if Braze dependencies are satisfied
	if (!braze) {
		return { show: false };
	}

	/**
	 * NOTE: ℹ️
	 * If loading the banners for the first time, Braze requires some time to fetch them from their servers.
	 * Therefore, on the first load, there might be no banners available yet.
	 * Question for the relevant team: Should we implement a retry mechanism here to wait for the banners to be fetched?
	 * Or is it acceptable to not show any banners on the first load?
	 * We can implement a waiting mechanism with a timeout to avoid blocking the other candidates for too long.
	 * But should we? 🤔
	 */

	const banner = braze.getBanner(placementId);
	if (!!banner) {
		return {
			show: true,
			meta: banner,
		};
	} else {
		return { show: false };
	}
};
