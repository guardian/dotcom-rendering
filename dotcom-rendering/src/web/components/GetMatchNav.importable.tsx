import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import type { SWRConfiguration } from 'swr';
import type { TagType } from '../../types/tag';
import { useApi } from '../lib/useApi';
import { ArticleHeadline } from './ArticleHeadline';
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
		window.guardian.modules.sentry.reportError(error, 'match-nav');

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
						webPublicationDateDeprecated={webPublicationDateDeprecated}
						isMatch={true}
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
