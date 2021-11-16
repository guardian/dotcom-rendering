import { useApi } from '@root/src/web/lib/useApi';

import { Placeholder } from '@root/src/web/components/Placeholder';

import { MatchNav } from './MatchNav';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={230} />;

export const GetMatchNav = ({ matchUrl, format }: Props) => {
	const { data, error, loading } = useApi<{
		homeTeam: TeamType;
		awayTeam: TeamType;
		comments?: string;
		minByMinUrl?: string;
	}>(matchUrl);

	// We are using a variable because the MatchNav does not have direct access to
	const MATCH_URL: string = matchUrl;

	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'match-nav');

		return null;
	}
	if (data) {
		return (
			<MatchNav
				homeTeam={data.homeTeam}
				awayTeam={data.awayTeam}
				comments={data.comments}
				minByMinUrl={data.minByMinUrl}
				reportUrl={matchUrl}
				format={format}
			/>
		);
	}

	return null;
};
