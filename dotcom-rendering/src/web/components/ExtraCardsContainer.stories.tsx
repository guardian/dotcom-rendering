import { trails } from '../../../fixtures/manual/trails';
import { ExtraCardsContainer } from './ExtraCardsContainer';

export default {
	component: ExtraCardsContainer,
	title: 'Components/ExtraCardsContainer',
};

export const Five = () => <ExtraCardsContainer trails={trails.slice(0, 5)} />;
Five.story = { name: 'Five cards' };

export const Eight = () => <ExtraCardsContainer trails={trails.slice(0, 8)} />;
Eight.story = { name: 'Eight cards' };

export const Nine = () => <ExtraCardsContainer trails={trails.slice(0, 9)} />;
Nine.story = { name: 'Nine cards' };

export const Eleven = () => (
	<ExtraCardsContainer trails={trails.slice(0, 11)} />
);
Eleven.story = { name: 'Eleven cards' };
