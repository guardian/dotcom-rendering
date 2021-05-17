// We don't want to build our own theme from the GU palette so disable this rule
// stylelint-disable color-no-hex
import React from 'react';
import { css } from 'emotion';
// import Prism from 'prismjs';

import { space } from '@guardian/src-foundations';

type Props = {
	code: string;
	language?: Language;
};

const codeStyles = css`
	/**
    * Adapted from prism.js default theme for JavaScript, CSS and HTML
    * Based on dabblet (http://dabblet.com)
    * @author Lea Verou
    */
	color: black;
	text-shadow: 0 1px white;
	/* The GU fonts don't work here */
	/* stylelint-disable-next-line property-blacklist */
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

	background: #f5f2f0;

	@media print {
		text-shadow: none;
	}

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: slategray;
	}

	.token.punctuation {
		color: #999;
	}

	.token.namespace {
		opacity: 0.7;
	}

	.token.property,
	.token.tag,
	.token.boolean,
	.token.number,
	.token.constant,
	.token.symbol,
	.token.deleted {
		color: #905;
	}

	.token.selector,
	.token.attr-name,
	.token.string,
	.token.char,
	.token.builtin,
	.token.inserted {
		color: #690;
	}

	.token.operator,
	.token.entity,
	.token.url,
	.language-css .token.string,
	.style .token.string {
		color: #9a6e3a;
		/* This background color was intended by the author of this theme. */
		background: hsla(0, 0%, 100%, 0.5);
	}

	.token.atrule,
	.token.attr-value,
	.token.keyword {
		color: #07a;
	}

	.token.function,
	.token.class-name {
		color: #dd4a68;
	}

	.token.regex,
	.token.important,
	.token.variable {
		color: #e90;
	}

	.token.important,
	.token.bold {
		font-weight: bold;
	}
	.token.italic {
		font-style: italic;
	}

	.token.entity {
		cursor: help;
	}
`;

export const CodeBlockComponent = ({
	code,
	// Igoring language, while Prism.highlight is being fixed.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	language = 'typescript',
}: Props) => {

	/*
	Not using Prism.highlight for the moment because it's broken. Will fix shortly.

	const highlighted = Prism.highlight(
		code,
		Prism.languages[language],
		language,
	);
	*/

	return (
		<pre className={codeStyles}>
			<code>
				<div dangerouslySetInnerHTML={{ __html: code }} />
			</code>
		</pre>
	);
};
