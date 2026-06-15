import { css } from '@emotion/react';
import {
	from,
	headlineBold15Object,
	headlineBold17Object,
	space,
} from '@guardian/source/foundations';
import type { CSSProperties, ReactNode } from 'react';
import type { FootballMatch } from '../../footballMatchV2';
import { grid } from '../../grid';
import { palette } from '../../palette';
import type { RenderingTarget } from '../../types/renderingTarget';
import { useConfig } from '../ConfigContext';
import { border, primaryText, selected } from './colours';

export type TabName = 'info' | 'live' | 'report';

type Props = {
	matchKind: FootballMatch['kind'];
	sportKind: 'football' | 'cricket';
	selected: TabName;
	reportURL?: URL;
	liveURL?: URL;
	infoURL?: URL;
	onTabClick?: (tab: TabName) => void;
};

export const Tabs = (props: Props) => (
	<nav css={[grid.column.centre]} aria-label="Match details navigation">
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
			<MatchReport {...props} />
			<LiveFeed {...props} />
			<MatchInfo {...props} />
		</ul>
	</nav>
);

const MatchReport = (
	props: Pick<Props, 'selected' | 'matchKind' | 'reportURL'>,
) => {
	if (props.selected === 'report') {
		return <Tab matchKind={props.matchKind}>Match report</Tab>;
	}

	if (props.reportURL !== undefined) {
		return (
			<Tab matchKind={props.matchKind} href={props.reportURL}>
				Match report
			</Tab>
		);
	}

	return null;
};

const LiveFeed = (props: Pick<Props, 'selected' | 'matchKind' | 'liveURL'>) => {
	if (props.selected === 'live') {
		return <Tab matchKind={props.matchKind}>Live feed</Tab>;
	}

	if (props.liveURL !== undefined) {
		return (
			<Tab matchKind={props.matchKind} href={props.liveURL}>
				Live feed
			</Tab>
		);
	}

	return null;
};

const MatchInfo = (
	props: Pick<Props, 'selected' | 'matchKind' | 'sportKind' | 'onTabClick'>,
) => {
	const tabText = props.sportKind === 'cricket' ? 'Scorecard' : 'Match info';
	if (props.selected === 'info') {
		return <Tab matchKind={props.matchKind}>{tabText}</Tab>;
	}

	return (
		<Tab
			matchKind={props.matchKind}
			onClick={() => props.onTabClick?.('info')}
		>
			{tabText}
		</Tab>
	);
};

const Tab = (props: {
	children: ReactNode;
	href?: URL;
	matchKind: FootballMatch['kind'];
	onClick?: () => void;
	selected?: boolean;
}) => (
	<li
		css={{
			// Ensures that if there are only two tabs they take up exactly 50%
			flex: '1 1 50%',
			borderLeftStyle: 'solid',
			borderLeftColor: 'var(--border-left-colour)',
			'&:not(:first-of-type)': {
				paddingLeft: space[2],
				borderLeftWidth: 1,
			},
			[from.leftCol]: {
				flex: '0 0 auto',
				position: 'relative',
				'&:first-of-type::before': {
					content: '""',
					top: 0,
					left: -10,
					width: 1,
					backgroundColor: 'var(--border-left-colour)',
					position: 'absolute',
					height: '100%',
				},
			},
		}}
		style={{
			'--border-left-colour': palette(border(props.matchKind)),
		}}
	>
		{props.onClick ? (
			<TabButton
				onClick={props.onClick}
				matchKind={props.matchKind}
				selected={props.selected ?? false}
			>
				{props.children}
			</TabButton>
		) : (
			<TabLink
				href={props.href}
				matchKind={props.matchKind}
				selected={props.selected}
			>
				{props.children}
			</TabLink>
		)}
	</li>
);

const TabLink = (props: {
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
				style={tabTextStyle(props.matchKind, renderingTarget)}
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
				borderBottomColor: palette(selected(props.matchKind)),
			}}
			aria-current={props.selected}
		>
			{props.children}
		</span>
	);
};

const TabButton = (props: {
	children: ReactNode;
	onClick: () => void;
	matchKind: FootballMatch['kind'];
	selected: boolean;
}) => {
	const { renderingTarget } = useConfig();
	return (
		<button
			type="button"
			onClick={props.onClick}
			css={tabTextCss}
			style={{
				...tabTextStyle(props.matchKind, renderingTarget),
				borderBottomColor: palette(selected(props.matchKind)),
				background: 'none',
				border: 'none',
				cursor: 'pointer',
				font: 'inherit',
				padding: 0,
				margin: 0,
			}}
			role="tab"
			aria-current={props.selected}
		>
			{props.children}
		</button>
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
			? palette(selected(matchKind))
			: 'transparent',
});
