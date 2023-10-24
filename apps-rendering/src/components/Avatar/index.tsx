// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source-foundations';
import { map, withDefault } from '@guardian/types';
import Img from 'components/Img';
import type { Contributor } from 'contributor';
import { isSingleContributor } from 'contributor';
import { pipe } from 'lib';
import { background } from 'palette';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';

// ----- Setup ----- //

const dimensions = '4rem';

// ----- Component ----- //

interface Props extends ArticleFormat {
	contributors: Contributor[];
}

const styles = (format: ArticleFormat): SerializedStyles => css`
	width: ${dimensions};
	height: ${dimensions};
	clip-path: circle(50%);
	object-fit: cover;
	background: ${background.avatar(format)};
	margin-right: ${remSpace[3]};
	margin-top: ${remSpace[1]};

	${darkModeCss`
		background-color: ${background.avatarDark(format)};
	`}
`;

const Avatar: FC<Props> = ({ contributors, ...format }: Props) => {
	const [contributor] = contributors;

	if (!isSingleContributor(contributors)) {
		return null;
	}

	return pipe(
		contributor.image,
		map((image) => (
			<Img
				image={image}
				sizes={dimensions}
				className={styles(format)}
				format={format}
			/>
		)),
		withDefault<ReactElement | null>(null),
	);
};

// ----- Exports ----- //

export default Avatar;
