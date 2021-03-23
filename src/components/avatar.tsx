// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import type { Format } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
import Img from 'components/img';
import { isSingleContributor } from 'contributor';
import type { Contributor } from 'contributor';
import { pipe2 } from 'lib';
import type { FC, ReactElement } from 'react';
import { getThemeStyles } from 'themeStyles';

// ----- Setup ----- //

const dimensions = '4rem';

// ----- Component ----- //

interface Props extends Format {
	contributors: Contributor[];
}

const styles = (background: string): SerializedStyles => css`
	width: ${dimensions};
	height: ${dimensions};
	clip-path: circle(50%);
	object-fit: cover;
	background: ${background};
	margin-right: ${remSpace[3]};
	margin-top: ${remSpace[1]};
`;

const getStyles = ({ theme }: Format): SerializedStyles => {
	const colours = getThemeStyles(theme);
	return styles(colours.inverted);
};

const Avatar: FC<Props> = ({ contributors, ...format }: Props) => {
	const [contributor] = contributors;

	if (!isSingleContributor(contributors)) {
		return null;
	}

	return pipe2(
		contributor.image,
		map((image) => (
			<Img
				image={image}
				sizes={dimensions}
				className={getStyles(format)}
				format={format}
			/>
		)),
		withDefault<ReactElement | null>(null),
	);
};

// ----- Exports ----- //

export default Avatar;
