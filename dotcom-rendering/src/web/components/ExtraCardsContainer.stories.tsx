import { css } from '@emotion/react';
import { trails } from '../../../fixtures/manual/trails';
import { ExtraCardsContainer } from './ExtraCardsContainer';

export default {
	component: ExtraCardsContainer,
	title: 'Components/ExtraCardsContainer',
};

const wrapperStyles = css`
	max-width: 960px;
	padding: 20px 10px;
`;

export const Five = () => (
	<div css={wrapperStyles}>
		<ExtraCardsContainer trails={trails.slice(0, 5)} />
	</div>
);
Five.story = { name: 'Five cards' };

export const Eight = () => (
	<div css={wrapperStyles}>
		<ExtraCardsContainer trails={trails.slice(0, 8)} />
	</div>
);
Eight.story = { name: 'Eight cards' };

export const Nine = () => (
	<div css={wrapperStyles}>
		<ExtraCardsContainer trails={trails.slice(0, 9)} />
	</div>
);
Nine.story = { name: 'Nine cards' };

export const Eleven = () => (
	<div css={wrapperStyles}>
		<ExtraCardsContainer trails={trails.slice(0, 11)} />
	</div>
);
Eleven.story = { name: 'Eleven cards' };
