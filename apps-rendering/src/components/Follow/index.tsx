// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans } from '@guardian/source-foundations';
import {
	FollowNotificationStatus,
	FollowTagStatus,
} from 'components/FollowStatus';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import { text } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	contributors: Contributor[];
	format: ArticleFormat;
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()}
	color: ${text.follow(format)};
	display: block;
	padding: 0;
	border: none;
	background: none;
	margin-left: 0;
	margin-top: ${remSpace[1]};
	min-height: ${remSpace[6]};

	${darkModeCss`
		color: ${text.followDark(format)};
	`}
`;

const followStatusStyles = (): SerializedStyles => css`
	display: flex;
	align-items: center;
	column-gap: 0.2em;
`;

const Follow: FC<Props> = ({ contributors, format }) => {
	const [contributor] = contributors;

	if (
		isSingleContributor(contributors) &&
		contributor.apiUrl !== '' &&
		format.theme !== ArticleSpecial.Labs
	) {
		return (
			<>
				<button
					className="js-follow-tag"
					css={styles(format)}
					data-id={contributor.id}
					data-display-name={contributor.name}
				>
					<span
						className="js-follow-tag-status"
						css={followStatusStyles}
					>
						<FollowTagStatus
							isFollowing={false}
							contributorName={contributor.name}
						/>
					</span>
				</button>
				<button
					className="js-follow-notifications"
					css={styles(format)}
					data-id={contributor.id}
					data-display-name={contributor.name}
				>
					<span
						className="js-follow-notifications-status"
						css={followStatusStyles}
					>
						<FollowNotificationStatus
							isFollowing={false}
							contributorName={contributor.name}
						/>
					</span>
				</button>
			</>
		);
	}

	return null;
};

// ----- Exports ----- //

export default Follow;
