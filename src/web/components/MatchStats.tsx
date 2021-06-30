import { css } from '@emotion/react';

import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { border } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';

import { GridItem } from '@root/src/web/components/GridItem';
import { Hide } from '@root/src/web/components/Hide';

import { Doughnut } from '@frontend/web/components/Doughnut';
import { Distribution } from '@frontend/web/components/Distribution';
import { GoalAttempts } from '@frontend/web/components/GoalAttempts';
import { Lineup } from '@frontend/web/components/Lineup';

type Props = {
	home: TeamType;
	away: TeamType;
};

const BACKGROUND_COLOUR = '#d9edf6';

const StatsGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			/* IE Fallback */
			display: flex;
			flex-direction: column;

			@supports (display: grid) {
				display: grid;

				${from.wide} {
					grid-template-columns: 50% 50%;
					grid-template-areas:
						'title          .'
						'possession     attempts'
						'possession     corners'
						'possession     fouls'
						'subtitle       .'
						'home           away';
				}

				${until.wide} {
					grid-template-columns: 50% 50%;
					grid-template-areas:
						'title          .'
						'possession     attempts'
						'possession     corners'
						'possession     fouls'
						'subtitle       .'
						'home           away';
				}

				${until.phablet} {
					grid-template-columns: 100%;
					grid-template-areas:
						'title'
						'possession'
						'attempts'
						'corners'
						'fouls'
						'subtitle'
						'home'
						'away';
				}
			}
		`}
	>
		{children}
	</div>
);

const StretchBackground = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			clear: left;
			position: relative;
			flex-grow: 1;
			padding: ${space[2]}px 10px;
			/* We use min-height to help reduce our CLS value */
			min-height: 800px;
			background-color: ${BACKGROUND_COLOUR};

			:before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				/* Always stretch left */
				left: -100vw;
				/* Only stretch right below desktop */
				right: 0;
				${until.desktop} {
					right: -20px;
				}
				${until.mobileLandscape} {
					right: -10px;
				}

				background-color: ${BACKGROUND_COLOUR};
				z-index: -1;
			}
		`}
	>
		{children}
	</div>
);

const ShiftLeft = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			${from.leftCol} {
				position: absolute;
				left: -160px;
			}
			${from.wide} {
				position: absolute;
				left: -240px;
			}
		`}
	>
		{children}
	</div>
);

const Center = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			justify-content: center;
		`}
	>
		{children}
	</div>
);

const RightBorder = ({ children }: { children: React.ReactNode }) => (
	<h4
		css={css`
			${from.phablet} {
				border-right: 1px solid ${border.secondary};
			}
			margin-right: 10px;
			padding-right: 10px;
		`}
	>
		{children}
	</h4>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
	<h3
		css={css`
			${headline.xxsmall({ fontWeight: 'bold' })}
		`}
	>
		{children}
	</h3>
);

const H4 = ({ children }: { children: React.ReactNode }) => (
	<h4
		css={css`
			${textSans.small()}
		`}
	>
		{children}
	</h4>
);

export const MatchStats = ({ home, away }: Props) => (
	<StretchBackground>
		<StatsGrid>
			<GridItem area="title">
				<ShiftLeft>
					{/* Don't show the right border if this text was
                        shifted into the left column */}
					<Hide when="above" breakpoint="leftCol">
						<RightBorder>
							<H3>Match Stats</H3>
						</RightBorder>
					</Hide>
					<Hide when="below" breakpoint="leftCol">
						<H3>Match Stats</H3>
					</Hide>
				</ShiftLeft>
			</GridItem>
			<GridItem area="possession">
				<RightBorder>
					<H4>Possession</H4>
					<Center>
						<Doughnut
							sections={[
								{
									value: home.possession,
									label: home.codename,
									color: home.colours,
								},
								{
									value: away.possession,
									label: away.codename,
									color: away.colours,
								},
							].reverse()}
						/>
					</Center>
					<br />
				</RightBorder>
			</GridItem>
			<GridItem area="attempts">
				<H4>Attempts</H4>
				<GoalAttempts
					left={{
						onTarget: home.shotsOn,
						offTarget: home.shotsOff,
						color: home.colours,
					}}
					right={{
						onTarget: away.shotsOn,
						offTarget: away.shotsOff,
						color: away.colours,
					}}
					backgroundColour={BACKGROUND_COLOUR}
				/>
			</GridItem>
			<GridItem area="corners">
				<H4>Corners</H4>
				<Distribution
					left={{
						value: home.corners,
						color: home.colours,
					}}
					right={{
						value: away.corners,
						color: away.colours,
					}}
				/>
			</GridItem>
			<GridItem area="fouls">
				<H4>Fouls</H4>
				<Distribution
					left={{
						value: home.fouls,
						color: home.colours,
					}}
					right={{
						value: away.fouls,
						color: away.colours,
					}}
				/>
				<br />
			</GridItem>
			<GridItem area="subtitle">
				<ShiftLeft>
					{/* Don't show the right border if this text was
                        shifted into the left column */}
					<Hide when="above" breakpoint="leftCol">
						<RightBorder>
							<H3>Lineups</H3>
						</RightBorder>
					</Hide>
					<Hide when="below" breakpoint="leftCol">
						<H3>Lineups</H3>
					</Hide>
				</ShiftLeft>
			</GridItem>
			<GridItem area="home">
				<RightBorder>
					<H4>{home.name}</H4>
					<Lineup
						players={home.players.filter(
							(player) => !player.substitute,
						)}
					/>
					<br />
					<H4>Substitutes</H4>
					<Lineup
						players={home.players.filter(
							(player) => player.substitute,
						)}
					/>
					<br />
				</RightBorder>
			</GridItem>
			<GridItem area="away">
				<H4>{away.name}</H4>
				<Lineup
					players={away.players.filter(
						(player) => !player.substitute,
					)}
				/>
				<br />
				<H4>Substitutes</H4>
				<Lineup
					players={away.players.filter((player) => player.substitute)}
				/>
				<br />
			</GridItem>
		</StatsGrid>
	</StretchBackground>
);
