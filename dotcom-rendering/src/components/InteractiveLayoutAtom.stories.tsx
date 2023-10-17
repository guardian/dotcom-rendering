import { css } from '@emotion/react';
import { interactiveLayoutAtom } from '../../fixtures/manual/InteractiveLayoutAtom';
import { InteractiveLayoutAtom } from './InteractiveLayoutAtom';

export default {
	title: 'InteractiveLayoutAtom',
	component: InteractiveLayoutAtom,
};

export const DefaultStory = (): JSX.Element => {
	const { id, html, js, css: atomCss } = interactiveLayoutAtom;
	return (
		<div
			css={css`
				width: 1920px;
				height: 1280px;
			`}
		>
			<InteractiveLayoutAtom
				id={id}
				elementHtml={html}
				elementJs={js}
				elementCss={atomCss}
			/>
		</div>
	);
};
DefaultStory.parameters = {
	// This interactive uses animation which is causing false negatives for Chromatic
	chromatic: { disable: true },
};
