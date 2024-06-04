// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import { remSpace, space, textSans15 } from '@guardian/source/foundations';
import { FollowNotificationStatus } from 'components/FollowStatus';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import { background, fill, text } from 'palette';
import { type FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	contributors: Contributor[];
	format: ArticleFormat;
}

const followButtonStyles: SerializedStyles = css`
	display: flex;
	margin: 0;
	height: 24px;
	width: 24px;
	margin-right: ${space[1]}px;
	border-radius: 100%;
`;

const styles = (format: ArticleFormat): SerializedStyles => css`
	${textSans15};
	color: ${text.follow(format)};
	background: none;
	border: none;
	display: block;
	margin-top: ${remSpace[1]};
	margin-left: 0;

	padding: 0;
	text-align: left;

	${darkModeCss`
		color: ${text.followDark(format)};
	`}

	.notifications-on, .tag-following {
		${followButtonStyles}
		background-color: ${fill.followIcon(format)};
		${darkModeCss`
			background-color: ${fill.followIconDark(format)};
		`}

		svg {
			fill: ${background.articleContentFollowIcon(format)};

			margin: 1px;
			margin-left: 2px;
			${darkModeCss`
				fill: ${background.articleContentDark(format)};
			`}
		}
	}
	.notifications-off,
	.tag-not-following {
		${followButtonStyles}
		background-color: none;
		border: 1px solid ${fill.followIcon(format)};
		${darkModeCss`
				border: 1px solid ${fill.followIconDark(format)};
		`}

		svg {
			fill: ${fill.followIcon(format)};
			margin: 1px;
			${darkModeCss`
				fill: ${fill.followIconDark(format)};
			`}
		}
	}
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
					aria-hidden="true"
					disabled
				>
					<span
						className="js-follow-tag-status"
						css={followStatusStyles}
					>
						{/* The FollowTagStatus component will be rendered here after
						code in article.ts checks if bridget version is compatible
						and client env has MyGuardian enabled */}
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
