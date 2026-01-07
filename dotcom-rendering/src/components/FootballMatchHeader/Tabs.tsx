import { css } from '@emotion/react';
import {
	from,
	headlineBold15Object,
	headlineBold17Object,
	space,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { grid } from '../../grid';
import { palette } from '../../palette';

type Props =
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
				borderColor: palette(
					'--football-match-header-fixture-result-border',
				),
				[from.leftCol]: headlineBold17Object,
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
		return <Tab>Match report</Tab>;
	}

	if (props.reportURL !== undefined) {
		return <Tab href={props.reportURL}>Match report</Tab>;
	}

	return null;
};

const LiveFeed = (props: Props) => {
	if (props.selected === 'live') {
		return <Tab>Live feed</Tab>;
	}

	if (props.liveURL !== undefined) {
		return <Tab href={props.liveURL}>Live feed</Tab>;
	}

	return null;
};

const MatchInfo = (props: Props) => {
	if (props.selected === 'info') {
		return <Tab>Match info</Tab>;
	}

	return <Tab href={props.infoURL}>Match info</Tab>;
};

const Tab = (props: { children: ReactNode; href?: URL }) => (
	<li
		css={{
			// Ensures that if there are only two tabs they take up exactly 50%
			flex: '1 1 50%',
			borderLeftStyle: 'solid',
			borderLeftColor: palette(
				'--football-match-header-fixture-result-border',
			),
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
	>
		<TabText href={props.href}>{props.children}</TabText>
	</li>
);

const TabText = (props: { children: ReactNode; href?: URL }) => {
	if (props.href !== undefined) {
		return (
			<a href={props.href.toString()} css={tabTextStyles}>
				{props.children}
			</a>
		);
	}

	return (
		<span
			css={tabTextStyles}
			style={{
				borderBottomColor: palette(
					'--football-match-header-fixture-result-selected',
				),
			}}
		>
			{props.children}
		</span>
	);
};

const tabTextStyles = css({
	display: 'block',
	paddingBottom: space[2],
	borderBottomWidth: space[1],
	borderBottomStyle: 'solid',
	borderBottomColor: 'transparent',
	color: palette('--football-match-header-fixture-result-primary-text'),
	textDecoration: 'none',
	'&:hover': {
		borderBottomColor: palette(
			'--football-match-header-fixture-result-selected',
		),
	},
	[from.leftCol]: {
		paddingRight: space[6],
		paddingBottom: space[3],
	},
});
