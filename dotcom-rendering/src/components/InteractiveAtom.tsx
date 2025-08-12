import { css } from '@emotion/react';
import { getInteractionClient } from '../lib/bridgetApi';
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

	&.scrolly {
		position: sticky;
		top: 0;
		height: 100vh;
		height: 100dvh;
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
};

export const InteractiveAtom = ({
	id,
	elementHtml,
	elementJs,
	elementCss,
	isMainMedia,
	title,
}: InteractiveAtomType) => {
	const { renderingTarget } = useConfig();

	const isApps = renderingTarget === 'Apps';

	const onTouchStart = () => getInteractionClient().disableArticleSwipe(true);
	const onTouchEnd = () => getInteractionClient().disableArticleSwipe(false);

	return (
		<div
			css={[containerStyles, !!isMainMedia && fullHeightStyles]}
			data-atom-id={id}
			data-atom-type="interactive"
			onTouchStart={isApps ? onTouchStart : undefined}
			onTouchEnd={isApps ? onTouchEnd : undefined}
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
				})}
				frameBorder="0"
			/>
		</div>
	);
};
