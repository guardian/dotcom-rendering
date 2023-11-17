import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay } from '@guardian/libs';
import { unifyPageContent } from '../lib/unifyPageContent';

const containerStyles = css`
	margin: 0;
`;

const fullWidthStyles = css`
	width: 100%;
`;
const fullHeightStyles = css`
	height: 100%;
`;

type InteractiveAtomType = {
	id: string;
	elementHtml?: string;
	elementJs?: string;
	elementCss?: string;
	isMainMedia?: boolean;
	format: ArticleFormat;
};

export const InteractiveAtom = ({
	id,
	elementHtml,
	elementJs,
	elementCss,
	isMainMedia,
	format,
}: InteractiveAtomType) => (
	<div
		css={[containerStyles, isMainMedia && fullHeightStyles]}
		data-atom-id={id}
		data-atom-type="interactive"
	>
		<iframe
			css={[
				fullWidthStyles,
				isMainMedia &&
					format.display === ArticleDisplay.Immersive &&
					fullHeightStyles,
			]}
			title={id}
			srcDoc={unifyPageContent({ elementJs, elementCss, elementHtml })}
			frameBorder="0"
			/**
			 * Do NOT add `allow-same-origin` to this attribute if `allow-scripts` is present.
			 * This undermines the sandbox when using `srcdoc` (which is used here), because a
			 * `srcdoc` has the same origin as the embedding page:
			 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sect6
			 */
			sandbox="allow-scripts"
		/>
	</div>
);
