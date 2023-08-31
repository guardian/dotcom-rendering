import { useApi } from '../lib/useApi';
import { MatchTabs } from './MatchTabs';
import { Placeholder } from './Placeholder';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={40} />;

/**
 * ## Why does this need to be an Island?
 *
 * Data is fetched from an API on the client-side.
 *
 * ---
 *
 * (No visual story exists)
 */
export const GetMatchTabs = ({ matchUrl, format }: Props) => {
	const { data, error, loading } = useApi<{
		reportUrl?: string;
		minByMinUrl?: string;
	}>(matchUrl, { errorRetryCount: 1 });

	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'match-tabs');

		return null;
	}
	if (data?.minByMinUrl && data.reportUrl) {
		return (
			<MatchTabs
				minByMinUrl={data.minByMinUrl}
				reportUrl={data.reportUrl}
				format={format}
			/>
		);
	}

	return null;
};
