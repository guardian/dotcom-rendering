// ----- Imports ----- //

import { css } from '@emotion/react';
import { headline, neutral } from '@guardian/source-foundations';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import type { DefaultProps } from './HeadingTwo.defaults';
import DefaultHeadingTwo from './HeadingTwo.defaults';

// ----- Component ----- //

const styles = css`
	${headline.medium({ fontWeight: 'light' })}

	${darkModeCss`color: ${neutral[93]}`};
`;

const ImmersiveHeadingTwo: FC<DefaultProps> = (props) => (
	<DefaultHeadingTwo {...props} css={styles} />
);

// ----- Exports ----- //

export default ImmersiveHeadingTwo;
