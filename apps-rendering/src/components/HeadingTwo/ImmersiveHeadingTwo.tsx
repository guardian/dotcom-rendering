// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { text } from '@guardian/common-rendering/src/editorialPalette/text';
import type { ArticleFormat } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { FC } from 'react';
import { darkModeCss } from 'styles';
import type { DefaultProps } from './HeadingTwo.defaults';
import DefaultHeadingTwo from './HeadingTwo.defaults';

// ----- Component ----- //

const styles = (
	format: ArticleFormat,
	isEditions: boolean,
): SerializedStyles => css`
	${headline.medium({ fontWeight: 'light' })}

	${isEditions
		? null
		: darkModeCss`
		color: ${text.headingTwoDark(format)};
	`}
`;

const ImmersiveHeadingTwo: FC<DefaultProps> = (props) => (
	<DefaultHeadingTwo
		{...props}
		css={styles(props.format, props.isEditions)}
	/>
);

// ----- Exports ----- //

export default ImmersiveHeadingTwo;
