import { useApi } from '../lib/useApi';
import { CricketScoreboard } from './CricketScoreboard';

import { Placeholder } from './Placeholder';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={172} />;

export const GetCricketScoreboard = ({ matchUrl, format }: Props) => {
	// TODO: This is for testing only
	const url = matchUrl.replace(
		'http://localhost:9000',
		'https://api.nextgen.guardianapps.co.uk',
	);

	const { data, error, loading } = useApi<CricketMatch>(url, {
		errorRetryCount: 1,
	});

	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian?.modules?.sentry?.reportError?.(
			error,
			'cricket-scoreboard',
		);

		return null;
	}
	if (data && data.matchId) {
		return (
			<CricketScoreboard match={data} matchUrl={url} format={format} />
		);
	}

	return null;
};
