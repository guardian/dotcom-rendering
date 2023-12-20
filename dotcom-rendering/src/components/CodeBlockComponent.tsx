// We don't want to build our own theme from the GU palette so disable this rule
// stylelint-disable color-no-hex

import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { palette } from '../palette';

type Props = {
	code: string;
	language?: string;
};

const codeStyles = css`
	/**
    * Adapted from prism.js default theme for JavaScript, CSS and HTML
    * Based on dabblet (http://dabblet.com)
    * @author Lea Verou
    */
	color: inherit;
	text-shadow: 0 1px ${palette('--code-block-text-shadow')};
	/* The GU fonts don't work here */
	/* stylelint-disable-next-line property-disallowed-list */
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	tab-size: 4;
	hyphens: none;

	padding: ${space[3]}px;
	overflow: auto;

	background: ${palette('--code-block-background')};

	@media print {
		text-shadow: none;
	}
`;

export const CodeBlockComponent = ({
	code,
	// Date: May 2021
	//     The CodeBlockComponent is taking a `language` attribute which comes from CAPI
	//     for the purpose of syntaxt highlighting, but we decided to not perform that highlighting
	//     for the moment. Feel free to implement it in the future, for instance using
	//     https://prismjs.com
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	language = 'text',
}: Props) => {
	return (
		<pre css={codeStyles}>
			<code>
				<div dangerouslySetInnerHTML={{ __html: code }} />
			</code>
		</pre>
	);
};
