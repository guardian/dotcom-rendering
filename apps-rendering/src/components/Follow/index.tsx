// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleSpecial } from '@guardian/libs';
import { remSpace, textSans } from '@guardian/source-foundations';
import { FollowNotificationStatus } from 'components/FollowStatus';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import { background, text } from 'palette';
import { type FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	contributors: Contributor[];
	format: ArticleFormat;
}

const followButtonStyles: SerializedStyles = css`
	height: 24px;
	width: 24px;
	border-radius: 100%;
`;
const followIconStyles: SerializedStyles = css`
	height: 18px;
	width: 18px;
	margin-top: 2px;
`;

const styles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()}
	color: ${text.follow(format)};
	display: block;
	padding: 0;
	border: none;
	background: none;
	margin-left: 0;
	margin-top: ${remSpace[1]};

	${darkModeCss`
		color: ${text.followDark(format)};
	`}

	.notifications-on, .tag-following {
		${followButtonStyles}
		padding-top: 0.15ch;
		background-color: currentColor;

		svg {
			fill: ${background.articleContent(format)};
			${followIconStyles}
			${darkModeCss`
				fill: ${background.articleContentDark(format)};
			`}
		}
	}
	.notifications-off,
	.tag-not-following {
		${followButtonStyles}
		border: 1px solid currentColor;
		background-color: none;

		svg {
			fill: currentColor;
			${followIconStyles}
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
