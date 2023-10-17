import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import type { SWRConfiguration } from 'swr';
import { reportErrorToSentry } from '../lib/reportErrorToSentry';
import { useApi } from '../lib/useApi';
import type { TagType } from '../types/tag';
import { ArticleHeadline } from './ArticleHeadline';
import { cleanTeamData } from './GetMatchStats.importable';
import { MatchNav } from './MatchNav';
import { Placeholder } from './Placeholder';

type Props = {
	matchUrl: string;
	headlineString: string;
	format: ArticleFormat;
	tags: TagType[];
	webPublicationDateDeprecated: string;
};

const Loading = () => <Placeholder height={230} />;

/**
 * Wrapper around `MatchNav` with loading and fallback.
 *
 * ## Why does this need to be an Island?
 *
 * We poll the results from the match url on the client-side.
 * e.g. https://api.nextgen.guardianapps.co.uk/football/api/match-nav/2023/02/08/12/28.json?dcr=true
 *
 * ---
 *
 * [`MatchNav` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-matchnav)
 */
export const GetMatchNav = ({
	matchUrl,
	headlineString,
	format,
	tags,
	webPublicationDateDeprecated,
}: Props) => {
	const options: SWRConfiguration = { errorRetryCount: 1 };
	// If this blog is live then poll for new stats
	if (format.design === ArticleDesign.LiveBlog) {
		options.refreshInterval = 16_000;
	}
	const { data, error, loading } = useApi<{
		homeTeam: TeamType;
		awayTeam: TeamType;
		comments?: string;
		minByMinUrl?: string;
		venue?: string;
	}>(matchUrl, options);

	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then render the headline in its place as a fallback
		reportErrorToSentry(error, 'match-nav');

		if (
			format.design === ArticleDesign.LiveBlog ||
			format.design === ArticleDesign.DeadBlog
		)
			return (
				<div
					css={css`
						${from.leftCol} {
							margin-left: 10px;
						}
						${from.desktop} {
							max-width: 700px;
						}
					`}
				>
					<ArticleHeadline
						headlineString={headlineString}
						format={format}
						tags={tags}
						webPublicationDateDeprecated={
							webPublicationDateDeprecated
						}
						isMatch={true}
					/>
				</div>
			);
	}
	if (data) {
		return (
			<MatchNav
				homeTeam={cleanTeamData(data.homeTeam)}
				awayTeam={cleanTeamData(data.awayTeam)}
				comments={data.comments}
			/>
		);
	}

	return null;
};
