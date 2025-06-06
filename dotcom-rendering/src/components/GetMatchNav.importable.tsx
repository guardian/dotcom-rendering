import { css } from '@emotion/react';
import { isObject } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import type { SWRConfiguration } from 'swr';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { useApi } from '../lib/useApi';
import type { TeamType } from '../types/sport';
import type { TagType } from '../types/tag';
import { ArticleHeadline } from './ArticleHeadline';
import { MatchNav } from './MatchNav';

type Props = {
	matchUrl: string;
	headlineString: string;
	format: ArticleFormat;
	tags: TagType[];
	webPublicationDateDeprecated: string;
};

type MatchData = {
	homeTeam: Pick<TeamType, 'name' | 'score' | 'scorers' | 'crest'>;
	awayTeam: Pick<TeamType, 'name' | 'score' | 'scorers' | 'crest'>;
	comments?: string;
	minByMinUrl?: string;
	venue?: string;
};

const fallbackTeam = {
	name: '―',
	scorers: [],
	score: NaN,
	crest: '',
} satisfies MatchData['homeTeam'];

const fallbackData = {
	homeTeam: fallbackTeam,
	awayTeam: fallbackTeam,
} satisfies MatchData;

const validateMatchData = (data: unknown): data is MatchData => {
	if (!isObject(data)) {
		return false;
	}

	const homeTeam = data.homeTeam;
	if (
		!isObject(homeTeam) ||
		typeof homeTeam.name !== 'string' ||
		homeTeam.name.length === 0 ||
		typeof homeTeam.score !== 'number' ||
		isNaN(homeTeam.score)
	) {
		return false;
	}

	const awayTeam = data.awayTeam;
	if (
		!isObject(awayTeam) ||
		typeof awayTeam.name !== 'string' ||
		awayTeam.name.length === 0 ||
		typeof awayTeam.score !== 'number' ||
		isNaN(awayTeam.score)
	) {
		return false;
	}

	return true;
};

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
	const options = {
		errorRetryCount: 1,
		fallbackData,
		refreshInterval:
			// If this blog is live then poll for new stats
			format.design === ArticleDesign.LiveBlog ? 16_000 : undefined,
	} satisfies SWRConfiguration<MatchData>;

	const { data, error } = useApi<MatchData>(matchUrl, options);

	if (error) {
		// Send the error to Sentry and then render the headline in its place as a fallback
		window.guardian.modules.sentry.reportError(error, 'match-nav');

		if (
			format.design === ArticleDesign.LiveBlog ||
			format.design === ArticleDesign.DeadBlog
		) {
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
	}

	if (!data) {
		// this should never happen because we pass fallback data to SWR
		return null;
	}

	const isDataValid = validateMatchData(data);
	if (isDataValid) {
		return (
			<MatchNav
				homeTeam={data.homeTeam}
				awayTeam={data.awayTeam}
				comments={data.comments}
				usage="Article"
			/>
		);
	}

	// Invalid data indicates that we do not have the data for this fixture, likely because the match is old.
	return null;
};
