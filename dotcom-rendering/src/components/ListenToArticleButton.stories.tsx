import preview from '../../.storybook/preview';
import { ListenToArticleButton as ListenToArticleButtonComponent } from './ListenToArticleButton';

const meta = preview.meta({
	component: ListenToArticleButtonComponent,
	title: 'Components/Listen To Article Button',
});

export const ListenToArticleWithDurationButton = meta.story({
	args: {
		onClickHandler: () => undefined,
		audioDuration: '5:14',
	},
});

export const ListenToArticleNoDurationButton = meta.story({
	args: {
		onClickHandler: () => undefined,
		audioDuration: undefined,
	},
});
