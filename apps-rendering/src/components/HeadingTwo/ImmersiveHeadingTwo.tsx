// ----- Imports ----- //

import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import type { FC } from 'react';
import DefaultHeadingTwo, { DefaultProps } from './HeadingTwo.defaults';

// ----- Component ----- //

const styles = css`
	${headline.medium({ fontWeight: 'light' })}
`;

const ImmersiveHeadingTwo: FC<DefaultProps> = (props) => (
	<DefaultHeadingTwo
		{...props}
		css={styles}
	/>
)

// ----- Exports ----- //

export default ImmersiveHeadingTwo;
