import { css } from '@emotion/react';
import { unifyPageContent } from '../lib/unifyPageContent';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';
import { InteractiveAtomMessenger } from './InteractiveAtomMessenger.island';
import { Island } from './Island';

const containerStyles = css`
	margin: 0;
	width: 100%;
	position: relative;
	contain: layout;
`;

// TODO: Apply white background to older interactive atoms
const iframe = css`
	width: 100%;
	background-color: ${palette('--interactive-atom-background')};

	&.scrolly {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
	}
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
	title: string;
	customData?: string;
};

export const InteractiveAtom = ({
	id,
	elementHtml,
	elementJs,
	elementCss,
	isMainMedia,
	title,
	customData,
}: InteractiveAtomType) => {
	const { renderingTarget, darkModeAvailable } = useConfig();
	const forceLightColorScheme =
		!darkModeAvailable && renderingTarget === 'Web';

	return (
		<div
			css={[containerStyles, !!isMainMedia && fullHeightStyles]}
			data-atom-id={id}
			data-atom-type="interactive"
		>
			<Island
				priority="feature"
				defer={{ until: 'visible', rootMargin: '200px' }}
			>
				<InteractiveAtomMessenger id={id} />
			</Island>
			<iframe
				title={title}
				id={id}
				css={iframe}
				srcDoc={unifyPageContent({
					elementJs,
					elementCss,
					elementHtml,
					renderingTarget,
					customData,
					forceLightColorScheme,
				})}
				frameBorder="0"
			/>
		</div>
	);
};
