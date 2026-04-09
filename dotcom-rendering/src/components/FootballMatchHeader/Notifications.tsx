import { css } from '@emotion/react';
import { space, textSans14Object } from '@guardian/source/foundations';
import type { FootballMatch } from '../../footballMatchV2';
import { grid } from '../../grid';
import type { NotificationsClient } from '../../lib/bridgetApi';
import { palette } from '../../palette';
import { useConfig } from '../ConfigContext';
import { NotificationsToggle } from '../NotificationsToggle';
import { background, border, primaryText } from './colours';
import { Hr } from './Hr';

type Props = {
	matchKind: FootballMatch['kind'];
	displayName: string;
	id: string;
	notificationsClient: NotificationsClient;
};

export const Notifications = (props: Props) => {
	const { renderingTarget } = useConfig();

	if (renderingTarget !== 'Apps' || props.matchKind === 'Result') {
		return null;
	}

	return (
		<>
			<Hr borderStyle="solid" borderColour={border(props.matchKind)} />
			<p
				css={{
					...textSans14Object,
					'&': css(grid.column.centre),
					paddingTop: space[2],
					paddingBottom: space[3],
					paddingLeft: 6,
					paddingRight: 6,
				}}
				style={{
					color: palette(primaryText(props.matchKind)),
				}}
			>
				Be notified about the lineup, kick-off time, goals, half-time
				and full time scores
			</p>
			<NotificationsToggle
				displayName={props.displayName}
				id={props.id}
				notificationType="football-match"
				notificationsClient={props.notificationsClient}
				colour={primaryText(props.matchKind)}
				backgroundColour={background(props.matchKind)}
				iconColour={primaryText(props.matchKind)}
				css={{
					'&': css(grid.column.centre),
					paddingLeft: 6,
					paddingRight: 6,
					paddingBottom: space[5],
				}}
			/>
		</>
	);
};
