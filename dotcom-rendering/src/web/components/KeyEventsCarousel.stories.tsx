import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { Live } from '../../../fixtures/generated/articles/Live';

import { KeyEventsCarousel } from './KeyEventsCarousel.importable';

const getFormat = (theme: ArticleTheme) => {
	return {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme,
	};
};

const format = getFormat(ArticlePillar.News);

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				position: relative;
				max-width: 700px;
				${from.tablet} {
					width: 700px;
				}
			`}
		>
			{children}
		</div>
	);
};

export default {
	component: KeyEventsCarousel,
	title: 'Components/KeyEventsCarousel',
};

export const Standard = () => {
	return (
		<Wrapper>
			<KeyEventsCarousel
				keyEvents={Live.keyEvents}
				filterKeyEvents={false}
				format={format}
			/>
		</Wrapper>
	);
};
