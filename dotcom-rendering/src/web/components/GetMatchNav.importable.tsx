import { useApi } from '../lib/useApi';

import { Placeholder } from './Placeholder';

import { MatchNav } from './MatchNav';

type Props = {
	matchUrl: string;
};

const Loading = () => <Placeholder height={230} />;

export const GetMatchNav = ({ matchUrl }: Props) => {
	const { data, error, loading } = useApi<{
		homeTeam: TeamType;
		awayTeam: TeamType;
		comments?: string;
		minByMinUrl?: string;
		venue?: string;
	}>(matchUrl);

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
			/>
		);
	}

	return null;
};
