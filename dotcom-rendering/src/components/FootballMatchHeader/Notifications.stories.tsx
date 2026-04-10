import { gridContainerDecorator } from '../../../.storybook/decorators/gridDecorators';
import preview from '../../../.storybook/preview';
import { palette } from '../../palette';
import { NotificationsToggle } from '../NotificationsToggle.stories';
import { background } from './colours';
import { Notifications } from './Notifications';

const meta = preview.meta({
	component: Notifications,
});

export const Fixture = meta.story({
	args: {
		matchKind: 'Fixture',
		displayName: 'Wolverhampton Wanderers vs Belgium (2026-03-20 GMT)',
		id: 'match-id',
		notificationsClient: NotificationsToggle.args.notificationsClient,
	},
	decorators: [gridContainerDecorator],
	parameters: {
		colourSchemeBackground: {
			light: palette(background('Fixture')),
			dark: palette(background('Fixture')),
		},
		config: {
			renderingTarget: 'Apps',
		},
	},
});

export const Live = Fixture.extend({
	args: {
		matchKind: 'Live',
	},
	parameters: {
		colourSchemeBackground: {
			light: palette(background('Live')),
			dark: palette(background('Live')),
		},
	},
});

/**
 * This should be blank. You can't sign up for notifications once a match is
 * over.
 */
export const Result = Fixture.extend({
	args: {
		matchKind: 'Result',
	},
});
