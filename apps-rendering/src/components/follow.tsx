// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleSpecial } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans } from '@guardian/source-foundations';
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
		display: flex;
		align-items: center;
		// TODO: check if the gap is needed
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
			color: ${inverted};
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
				<FollowStatus isFollowing={false} /> {contributor.name}
			</button>
		);
	}

	return null;
};

// ----- Exports ----- //

export default Follow;
