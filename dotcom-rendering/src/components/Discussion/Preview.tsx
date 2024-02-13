import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { palette as schemedPalette } from '../../palette';

type Props = {
	previewHtml: string;
	showSpout: boolean;
};

const previewStyle = css`
	${textSans.small()}
	padding: ${space[2]}px ${space[4]}px;
	background-color: ${schemedPalette('--discussion-preview-background')};
	border-radius: 5px;
	margin-top: 0;
	margin-bottom: ${20}px;
	word-break: break-word;

	blockquote {
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		margin-left: ${space[5]}px;
		margin-right: ${space[5]}px;
		padding-left: ${space[2]}px;
		color: ${schemedPalette('--discussion-subdued')};
	}

	i {
		font-style: italic;
	}

	b {
		font-weight: bold;
	}

	code {
		/* stylelint-disable-next-line property-disallowed-list -- Source doesn't have a monospace font */
		font-family: monospace;
		font-size: 1em;
	}

	/*
		todo: this spacing is currently repeated here, on regular comments, and
		on TopPick comments; can we factor out the common styling for these
		three components?
	*/
	p {
		margin-top: 0;
		margin-bottom: ${space[3]}px;
	}
`;

const spout = css`
	display: block;
	left: 0;
	width: 0;
	height: 0;
	border-right: 1rem solid transparent;
	border-bottom: 1rem solid ${schemedPalette('--discussion-border')};
	margin-left: 12.5rem;
	border-right-style: inset;
`;

export const Preview = ({ previewHtml, showSpout }: Props) => (
	<>
		{showSpout && <div css={spout} />}
		<div
			css={previewStyle}
			dangerouslySetInnerHTML={{ __html: previewHtml || '' }}
		/>
	</>
);
