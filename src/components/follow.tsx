// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { Special } from '@guardian/types';
import type { Format } from '@guardian/types';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

// ----- Component ----- //

interface Props extends Format {
	contributors: Contributor[];
}

interface IconProps {
	format: Format;
}

const styles = (kicker: string, inverted: string): SerializedStyles => css`
	${textSans.small()}
	color: ${kicker};
	display: block;
	padding: 0;
	border: none;
	background: none;
	margin-left: 0;
	margin-top: 4px;

	${darkModeCss`
        color: ${inverted};
    `}
`;

function getStyles({ theme }: Format): SerializedStyles {
	const { kicker, inverted } = getThemeStyles(theme);

	return styles(kicker, inverted);
}

const FollowIcon: FC<IconProps> = ({ format }) => {
	const iconStyles = ({ theme }: Format): SerializedStyles => {
		const { kicker, inverted } = getThemeStyles(theme);
		return css`
			width: ${remSpace[6]};
			height: ${remSpace[6]};
			margin-bottom: -0.375rem;
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
		`;
	};

	return (
		<svg xmlns="http://www.w3.org/2000/svg" css={iconStyles(format)}>
			<circle cx="12" cy="12" r="12" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.167 9.833c1.216 0 2.65-1.366 2.65-3.033 0-1.667-.984-2.633-2.65-2.633-1.667 0-2.634.966-2.634 2.633s1.55 3.033 2.634 3.033zm6.5 3.667h-1v-2.167H14.5v-1h2.167V8.167h1v2.166h2.166v1h-2.166V13.5zm-6.5-2.333c.716 0 1.4.05 2.016.166.184 1.734 1.55 3.134 3.25 3.434l.734 2.733-.684.667H5.817l-.65-.667 1.316-5 .684-.683c1.333-.45 2.533-.65 4-.65z"
			/>
		</svg>
	);
};

const Follow: FC<Props> = ({ contributors, ...format }) => {
	const [contributor] = contributors;

	if (
		isSingleContributor(contributors) &&
		contributor.apiUrl !== '' &&
		format.theme !== Special.Labs
	) {
		return (
			<button
				className="js-follow"
				css={getStyles(format)}
				data-id={contributor.id}
				data-display-name={contributor.name}
			>
				<span className="js-status">
					<FollowIcon format={format} /> Follow{' '}
				</span>
				{contributor.name}
			</button>
		);
	}

	return null;
};

// ----- Exports ----- //

export default Follow;
