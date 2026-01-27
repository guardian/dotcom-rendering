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
import { border, primaryText, selected } from './colours';

type Props = {
	matchKind: FootballMatch['kind'];
} & (
	| {
			selected: 'info';
			reportURL?: URL;
			liveURL?: URL;
	  }
	| {
			selected: 'live';
			reportURL?: URL;
			infoURL: URL;
	  }
	| {
			selected: 'report';
			liveURL?: URL;
			infoURL: URL;
	  }
);

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
			<MatchReport {...props} />
			<LiveFeed {...props} />
			<MatchInfo {...props} />
		</ul>
	</nav>
);

const MatchReport = (props: Props) => {
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

const LiveFeed = (props: Props) => {
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

const MatchInfo = (props: Props) => {
	if (props.selected === 'info') {
		return <Tab matchKind={props.matchKind}>Match info</Tab>;
	}

	return (
		<Tab matchKind={props.matchKind} href={props.infoURL}>
			Match info
		</Tab>
	);
};

const Tab = (props: {
	children: ReactNode;
	href?: URL;
	matchKind: FootballMatch['kind'];
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
		<TabText href={props.href} matchKind={props.matchKind}>
			{props.children}
		</TabText>
	</li>
);

const TabText = (props: {
	children: ReactNode;
	href?: URL;
	matchKind: FootballMatch['kind'];
}) => {
	if (props.href !== undefined) {
		return (
			<a
				href={props.href.toString()}
				css={tabTextCss}
				style={tabTextStyle(props.matchKind)}
			>
				{props.children}
			</a>
		);
	}

	return (
		<span
			css={tabTextCss}
			style={{
				...tabTextStyle(props.matchKind),
				borderBottomColor: palette(selected(props.matchKind)),
			}}
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

const tabTextStyle = (matchKind: FootballMatch['kind']): CSSProperties => ({
	color: palette(primaryText(matchKind)),
	'--hover-colour': palette(selected(matchKind)),
});
