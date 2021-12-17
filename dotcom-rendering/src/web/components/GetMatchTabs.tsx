import { useApi } from '@root/src/web/lib/useApi';

import { Placeholder } from '@root/src/web/components/Placeholder';

import { MatchTabs } from './MatchTabs';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={40} />;

export const GetMatchTabs = ({ matchUrl, format }: Props) => {
	const { data, error, loading } = useApi<{
		reportUrl?: string;
		minByMinUrl?: string;
	}>(matchUrl);
	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'match-tabs');

		return null;
	}
	if (data && data.minByMinUrl && data.reportUrl) {
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
