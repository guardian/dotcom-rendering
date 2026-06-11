import { css } from '@emotion/react';
import {
	from,
	headlineBold15Object,
	headlineBold17Object,
	space,
} from '@guardian/source/foundations';
import { type CSSProperties, type ReactNode } from 'react';
import type { FootballMatch } from '../../footballMatchV2';
import { grid } from '../../grid';
import { palette } from '../../palette';
import type { RenderingTarget } from '../../types/renderingTarget';
import { useConfig } from '../ConfigContext';
import { border, primaryText, selected as selectedTabColour } from './colours';

export type TabName = 'info' | 'live' | 'report';

type Props = {
	matchKind: FootballMatch['kind'];
	sportKind: 'football' | 'cricket';
	selected: TabName;
	reportURL?: URL;
	liveURL?: URL;
	infoURL?: URL;
};

export const Tabs = (props: Props) => (
	<nav css={[grid.column.centre]}>
		<ul
			css={{
				...headlineBold15Object,
				paddingTop: space[2],
				display: 'flex',
				width: '100%',
				borderBottomWidth: 1,
				borderStyle: 'solid',
				[from.leftCol]: headlineBold17Object,
			}}
			style={{
				borderColor: palette(border(props.matchKind)),
			}}
		>
			{props.reportURL !== undefined && (
				<Tab
					matchKind={props.matchKind}
					href={props.reportURL}
					selected={props.selected === 'report'}
				>
					Match report
				</Tab>
			)}

			{props.liveURL !== undefined && (
				<Tab
					matchKind={props.matchKind}
					href={props.liveURL}
					selected={props.selected === 'live'}
				>
					Live feed
				</Tab>
			)}

			{props.infoURL !== undefined && (
				<Tab
					matchKind={props.matchKind}
					href={props.infoURL}
					selected={props.selected === 'info'}
				>
					{props.sportKind === 'football'
						? 'Match info'
						: 'Scorecard'}
				</Tab>
			)}
		</ul>
	</nav>
);

const Tab = (props: {
	children: ReactNode;
	href?: URL;
	matchKind: FootballMatch['kind'];
	selected?: boolean;
}) => (
	<li
		css={{
			// Ensures that if there are only two tabs they take up exactly 50%
			flex: '1 1 50%',
			borderLeftStyle: 'solid',
			'&:not(:first-of-type)': {
				paddingLeft: space[2],
				borderLeftWidth: 1,
			},
			[from.leftCol]: {
				paddingLeft: space[2],
				borderLeftWidth: 1,
				flex: '0 0 auto',
			},
		}}
		style={{
			borderLeftColor: palette(border(props.matchKind)),
		}}
	>
		<TabText
			href={props.href}
			matchKind={props.matchKind}
			selected={props.selected}
		>
			{props.children}
		</TabText>
	</li>
);

const TabText = (props: {
	children: ReactNode;
	href?: URL;
	matchKind: FootballMatch['kind'];
	selected?: boolean;
}) => {
	const { renderingTarget } = useConfig();

	if (props.href !== undefined) {
		return (
			<a
				href={props.href.toString()}
				css={tabTextCss}
				style={{
					...tabTextStyle(props.matchKind, renderingTarget),
					borderBottomColor:
						props.selected === true
							? palette(selectedTabColour(props.matchKind))
							: 'transparent',
				}}
				aria-current={props.selected}
			>
				{props.children}
			</a>
		);
	}

	return (
		<span
			css={tabTextCss}
			style={{
				...tabTextStyle(props.matchKind, renderingTarget),
				borderBottomColor: palette(selectedTabColour(props.matchKind)),
			}}
			aria-current={props.selected}
		>
			{props.children}
		</span>
	);
};

const tabTextCss = css({
	display: 'block',
	paddingBottom: space[2],
	borderBottomWidth: space[1],
	borderBottomStyle: 'solid',
	borderBottomColor: 'transparent',
	textDecoration: 'none',
	'&:hover': {
		borderBottomColor: 'var(--hover-colour)',
	},
	[from.leftCol]: {
		paddingRight: space[6],
		paddingBottom: space[3],
	},
});

const tabTextStyle = (
	matchKind: FootballMatch['kind'],
	renderingTarget: RenderingTarget,
): CSSProperties => ({
	color: palette(primaryText(matchKind)),
	'--hover-colour':
		renderingTarget === 'Web'
			? palette(selectedTabColour(matchKind))
			: 'transparent',
});
