import { useApi } from '../lib/useApi';
import type { Branding } from '../types/branding';
import type { TrailType } from '../types/trails';
import { HostedContentOnwards } from './HostedContentOnwards';

type Props = {
	url: string;
	branding?: Branding;
};

type OnwardsResponse = {
	result: {
		owner: string;
		trails: Array<TrailType>;
		// trails: Array<{
		// 	/** URL of the article, used for the anchor tag */
		// 	url: string;
		// 	/** Headline of the article represented by trail */
		// 	headline: string;
		// 	/** Image thumbnail details for the article */
		// 	image: {
		// 		/** Trail image URL */
		// 		src: string;
		// 		/** Alt text for the trail image */
		// 		alt: string;
		// 	};
		// 	format: FEFormat;
		// }>;
	};
};

export const FetchHostedOnwards = ({ branding, url }: Props) => {
	const { data } = useApi<OnwardsResponse>(url);

	const { result: { trails = [] } = {} } = data ?? {};

	if (!trails.length) {
		return null;
	}

	return (
		<HostedContentOnwards
			trails={trails}
			brandName={branding?.sponsorName ?? ''}
			accentColor={branding?.hostedCampaignColour}
		/>
	);
};
