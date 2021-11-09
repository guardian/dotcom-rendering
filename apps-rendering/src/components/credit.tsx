// ----- Imports ----- //

import { css } from '@emotion/react';
import { remSpace, textSans } from '@guardian/source-foundations';
import type { Format, Option } from '@guardian/types';
import { Design, map, withDefault } from '@guardian/types';
import { pipe } from 'lib';
import type { FC, ReactElement } from 'react';

// ----- Component ----- //

interface Props {
	credit: Option<string>;
	format: Format;
}

const mediaStyles = css`
	${textSans.xsmall()}
	margin: ${remSpace[1]} 0;
`;

const defaultStyles = css`
	${textSans.xxsmall()}
`;

const Credit: FC<Props> = ({ format, credit }) =>
	pipe(
		credit,
		map((cred) => {
			switch (format.design) {
				case Design.Media:
					return <p css={mediaStyles}>{cred}</p>;
				default:
					return <span css={defaultStyles}> {cred}</span>;
			}
		}),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Credit;
