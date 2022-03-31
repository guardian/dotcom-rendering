import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { useApi } from '../lib/useApi';

import { Placeholder } from './Placeholder';

import { MatchNav } from './MatchNav';
import { ArticleHeadline } from './ArticleHeadline';

type Props = {
	matchUrl: string;
	headlineString: string;
	format: ArticleFormat;
	tags: TagType[];
	webPublicationDateDeprecated: string;
};

const Loading = () => <Placeholder height={230} />;

export const GetMatchNav = ({
	matchUrl,
	headlineString,
	format,
	tags,
	webPublicationDateDeprecated,
}: Props) => {
	const { data, error, loading } = useApi<{
		homeTeam: TeamType;
		awayTeam: TeamType;
		comments?: string;
		minByMinUrl?: string;
		venue?: string;
	}>(matchUrl, { errorRetryCount: 1 });

	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then render the headline in its place as a fallback
		window.guardian?.modules?.sentry?.reportError?.(error, 'match-nav');

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
					webPublicationDateDeprecated={webPublicationDateDeprecated}
				/>
			</div>
		);
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
