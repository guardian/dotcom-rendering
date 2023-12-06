// ----- Imports ----- //

import { css } from '@emotion/react';
import { neutral, remSpace } from '@guardian/source-foundations';
import { withDefault } from '../../../vendor/@guardian/types/index';
import type { Option } from '../../../vendor/@guardian/types/index';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	url: string;
	title: Option<string>;
}

const styles = css`
	margin: ${remSpace[4]} 0;

	${darkModeCss`
        padding: ${remSpace[4]};
        background: ${neutral[100]};
    `}
`;

const iframeStyles = css`
	width: 100%;
`;

const Interactive: FC<Props> = ({ url, title }) => (
	<figure css={styles} className="interactive">
		<iframe
			css={iframeStyles}
			src={url}
			height="500"
			title={withDefault('')(title)}
		/>
	</figure>
);

// ----- Exports ----- //

export default Interactive;
