// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { neutral, remSpace, textSans } from '@guardian/source-foundations';
import FollowStatus from 'components/followStatus';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props extends ArticleFormat {
	contributors: Contributor[];
}

const styles = ({ theme }: ArticleFormat): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(theme);

	return css`
		${textSans.small()}
		color: ${kicker};
		display: block;
		padding: 0;
		border: none;
		background: none;
		margin-left: 0;
		margin-top: ${remSpace[1]};
		min-height: 1.5rem;

		${darkModeCss`
			color: ${inverted};
		`}
	`;
};

const statusStyles = ({ theme }: ArticleFormat): SerializedStyles => {
	const { kicker, inverted } = getThemeStyles(theme);

	return css`
		svg {
			width: ${remSpace[6]};
			height: ${remSpace[6]};
			margin-bottom: -0.375rem;
		}

		.follow-icon {
			circle {
				fill: ${kicker};
			}

			path {
				fill: #fff;
			}

			${darkModeCss`
				circle {
					fill: ${inverted};
				}

				path {
					fill: ${neutral[7]};
				}
			`}
		}

		.following-icon {
			fill: ${kicker};

			${darkModeCss`
				fill: ${inverted};
			`}
		}
	`;
};

const Follow: FC<Props> = ({ contributors, ...format }) => {
	const [contributor] = contributors;

	if (
		isSingleContributor(contributors) &&
		contributor.apiUrl !== '' &&
		format.theme !== ArticleSpecial.Labs
	) {
		return (
			<button
				className="js-follow"
				css={styles(format)}
				data-id={contributor.id}
				data-display-name={contributor.name}
			>
				<span className="js-follow-status" css={statusStyles(format)}>
					<FollowStatus isFollowing={false} />
				</span>

				{contributor.name}
			</button>
		);
	}

	return null;
};

// ----- Exports ----- //

export default Follow;
