import { css } from '@emotion/react';

import { textSans } from '@guardian/src-foundations/typography';

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
					css={css`
						${textSans.small()}
					`}
				>
					<Row>
						<div
							css={css`
								font-weight: bold;
							`}
						>
							{player.shirtNumber}
						</div>
						<div
							css={css`
								position: absolute;
								left: 40px;
							`}
						>
							<Row>
								{player.name}
								{player.events.map((event: EventType) => (
									<div
										css={css`
											margin-left: 4px;
										`}
									>
										<Event
											type={event.eventType}
											time={event.eventTime}
										/>
									</div>
								))}
							</Row>
						</div>
					</Row>
				</li>
			))}
		</ul>
	);
};
