import preview from '../../.storybook/preview';
import { FootballMatchDay as FootballMatchDayComponent } from './FootballMatchDay';

const meta = preview.meta({
	title: 'Components/Football Match Day',
	component: FootballMatchDayComponent,
});

export const FootballMatchDay = meta.story();
