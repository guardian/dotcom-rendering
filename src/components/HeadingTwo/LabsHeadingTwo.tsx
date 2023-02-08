// ----- Imports ----- //

import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import type { FC } from 'react';
import type { DefaultProps } from './HeadingTwo.defaults';
import DefaultHeadingTwo, { defaultStyles } from './HeadingTwo.defaults';

// ----- Component ----- //

const styles = css`
	${textSans.large({ fontWeight: 'bold' })}
`;

const LabsHeadingTwo: FC<DefaultProps> = (props) => (
	<DefaultHeadingTwo {...props} css={css(defaultStyles, styles)} />
);

// ----- Exports ----- //

export default LabsHeadingTwo;
