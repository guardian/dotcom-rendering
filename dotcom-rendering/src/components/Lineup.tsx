import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';

type Props = {
	players: PlayerType[];
};

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			position: relative;
		`}
	>
		{children}
	</div>
);

const BackgroundRed = '#cc2b12';

const BackgroundYellow = '#fb0';

const Event = ({
	type,
	time,
}: {
	type: 'substitution' | 'dismissal' | 'booking';
	time: string;
}) => {
	switch (type) {
		case 'dismissal':
			return (
				<i
					css={css`
						display: inline-block;
						background-color: ${BackgroundRed};
						background-position: 0 0;
						width: 0.5625rem;
						height: 0.75rem;
						transform: rotate(8deg);
						background-size: contain;
					`}
				/>
			);
		case 'booking':
			return (
				<i
					css={css`
						display: inline-block;
						background-color: ${BackgroundYellow};
						background-position: 0 0;
						width: 0.5625rem;
						height: 0.75rem;
						transform: rotate(8deg);
						background-size: contain;
					`}
				/>
			);
		case 'substitution':
			return <span>{`(s ${time}')`}</span>;
	}
};

export const Lineup = ({ players }: Props) => {
	return (
		<ul>
			{players.map((player) => (
				<li
					key={player.id}
					css={css`
						${textSans.small()}
					`}
				>
					<Row>
						<div
							css={css`
								font-weight: bold;
								width: 30px;
							`}
						>
							{player.shirtNumber}
						</div>
						<div>
							<span>{player.name} </span>
							{player.events.map((event: EventType) => (
								<Event
									key={event.eventTime + event.eventType}
									type={event.eventType}
									time={event.eventTime}
								/>
							))}
						</div>
					</Row>
				</li>
			))}
		</ul>
	);
};
