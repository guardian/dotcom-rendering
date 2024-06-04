// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { remSpace, textSans14 } from '@guardian/source/foundations';
import type { Option } from '../../../vendor/@guardian/types/index';
import { map, withDefault } from '../../../vendor/@guardian/types/index';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';

// ----- Component ----- //

interface Props {
	credit: Option<string>;
	format: ArticleFormat;
}

const mediaStyles = css`
	${textSans14};
	margin: ${remSpace[1]} 0;
`;

const defaultStyles = css`
	${textSans14};
`;

const Credit: FC<Props> = ({ format, credit }) =>
	pipe(
		credit,
		map((cred) => {
			switch (format.design) {
				case ArticleDesign.Gallery:
				case ArticleDesign.Audio:
				case ArticleDesign.Video:
				case ArticleDesign.Picture:
					return <p css={mediaStyles}>{cred}</p>;
				default:
					return <span css={defaultStyles}> {cred}</span>;
			}
		}),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Credit;
