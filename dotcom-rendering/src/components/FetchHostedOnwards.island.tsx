import { useApi } from '../lib/useApi';
import type { Branding } from '../types/branding';
import type { TrailType } from '../types/trails';
import { HostedContentOnwards } from './HostedContentOnwards';

type Props = {
	url: string;
	branding?: Branding;
};

type OnwardsResponse = {
	trails: Array<TrailType>;
};

export const FetchHostedOnwards = ({ branding, url }: Props) => {
	const { data, error } = useApi<OnwardsResponse>(url);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'hosted-onwards');
		return null;
	}

	const { trails = [] } = data ?? {};

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
