// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { textSans } from '@guardian/src-foundations/typography';
import { Design } from '@guardian/types';
import type { Format } from '@guardian/types';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import React from 'react';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props extends Format {
	contributors: Contributor[];
}

const styles = (kicker: string, inverted: string): SerializedStyles => css`
	${textSans.small()}
	color: ${kicker};
	display: block;
	padding: 0;
	border: none;
	background: none;
	margin-left: 0;

	${darkModeCss`
        color: ${inverted};
    `}
`;

function getStyles({ theme }: Format): SerializedStyles {
	const { kicker, inverted } = getThemeStyles(theme);

	return styles(kicker, inverted);
}

const Follow: FC<Props> = ({ contributors, ...format }) => {
	const [contributor] = contributors;

	if (
		isSingleContributor(contributors) &&
		contributor.apiUrl !== '' &&
		format.design !== Design.AdvertisementFeature
	) {
		return (
			<button
				className="js-follow"
				css={getStyles(format)}
				data-id={contributor.id}
				data-display-name={contributor.name}
			>
				<span className="js-status">Follow </span>
				{contributor.name}
			</button>
		);
	}

	return null;
};

// ----- Exports ----- //

export default Follow;
