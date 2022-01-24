// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans } from '@guardian/source-foundations';
import FollowStatus from 'components/followStatus';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props extends ArticleFormat {
	contributors: Contributor[];
}

const styles = (format: ArticleFormat): SerializedStyles => {
	const follow = text.follow(format);
	const followDark = text.followDark(format);

	return css`
		${textSans.small()}
		color: ${follow};
		display: flex;
		align-items: center;
		column-gap: 0.2em;
		padding: 0;
		border: none;
		background: none;
		margin-left: 0;
		margin-top: ${remSpace[1]};
		min-height: ${remSpace[6]};

		svg {
			width: ${remSpace[6]};
			height: ${remSpace[6]};
			fill: currentColor;
		}

		${darkModeCss`
			color: ${followDark};
		`}
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
				<span className="js-follow-status">
					<FollowStatus isFollowing={false} /> {contributor.name}
				</span>
			</button>
		);
	}

	return null;
};

// ----- Exports ----- //

export default Follow;
