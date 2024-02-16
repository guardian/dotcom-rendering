import { css } from '@emotion/react';
import { unifyPageContent } from '../lib/unifyPageContent';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';
import { InteractiveAtomMessenger } from './InteractiveAtomMessenger.importable';
import { Island } from './Island';

const containerStyles = css`
	margin: 0;
	width: 100%;
	position: relative;
	contain: layout;
`;

const iframe = css`
	width: 100%;
	background-color: ${palette('--interactive-atom-background')};
`;
const fullHeightStyles = css`
	height: 100%;
`;

const scrollyStyles = css`
	position: sticky;
	top: 0;
	height: 100vh;
	height: 100dvh;
	overflow: hidden;
`;

type InteractiveAtomType = {
	id: string;
	elementHtml?: string;
	elementJs?: string;
	elementCss?: string;
	isMainMedia?: boolean;
	title: string;
};

/** this hardcoded list is temporary, but we do not currently have a identifying mechanism */
const scrollies = new Set([
	'interactives/2018/06/migrant-deaths',
	'interactives/2022/02/orion/project-in-numbers',
	'interactives/2022/02/interactive-russian-deployments-ukraine-article/default',
	'interactives/2023/01/colour-of-power/default',
	'interactives/2024/01/ai2html-scrolly-safe-version-test/default',
]);

export const InteractiveAtom = ({
	id,
	elementHtml,
	elementJs,
	elementCss,
	isMainMedia,
	title,
}: InteractiveAtomType) => {
	const { renderingTarget } = useConfig();

	const isScrolly = scrollies.has(id);

	return (
		<div
			css={[containerStyles, !!isMainMedia && fullHeightStyles]}
			data-atom-id={id}
			data-atom-type="interactive"
		>
			{isScrolly ? (
				<Island
					priority="feature"
					defer={{ until: 'visible', rootMargin: '200px' }}
				>
					<InteractiveAtomMessenger id={id} />
				</Island>
			) : null}
			<iframe
				title={title}
				id={id}
				css={[iframe, isScrolly && scrollyStyles]}
				srcDoc={unifyPageContent({
					elementJs,
					elementCss,
					elementHtml,
					renderingTarget,
				})}
				frameBorder="0"
			/>
		</div>
	);
};
