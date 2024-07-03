// ----- Imports ----- //

import { css } from '@emotion/react';
import { textSansBold20 } from '@guardian/source/foundations';
import type { DefaultProps } from './HeadingTwo.defaults';
import DefaultHeadingTwo, { defaultStyles } from './HeadingTwo.defaults';

// ----- Component ----- //

const styles = css`
	${textSansBold20}
`;

const LabsHeadingTwo = (props: DefaultProps) => (
	<DefaultHeadingTwo {...props} css={css(defaultStyles, styles)} />
);

// ----- Exports ----- //

export default LabsHeadingTwo;
