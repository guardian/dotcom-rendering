import { css } from '@emotion/react';
import { from, headline, neutral, space } from '@guardian/source-foundations';
import type { ReactNode } from 'react';

const tabList = css`
	display: flex;
	align-items: flex-end;
	justify-content: flex-start;
`;

const tabButton = css`
	background-color: ${neutral[97]};
	${headline.xxxsmall({
		fontWeight: 'bold',
	})}
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	appearance: none;
	width: 100%;
	height: ${space[12]}px;
	text-align: left;
	color: ${neutral[7]};
	padding: ${space[2]}px ${space[3]}px;
	border: 1px solid ${neutral[60]};
	border-bottom: none;
	cursor: pointer;

	:first-of-type {
		margin-left: ${space[2]}px;
		border-radius: ${space[2]}px 0 0 0;
	}
	:last-of-type {
		border-radius: 0 ${space[2]}px 0 0;
	}

	${from.phablet} {
		${headline.xxsmall({
			fontWeight: 'bold',
		})}
		width: 210px;
	}

	&[aria-selected='false'] {
		background-color: ${neutral[86]};
	}

	/* Pseudo-element that covers the tab panel bottom border for the active tab */
	&[aria-selected='true']::after {
		position: absolute;
		z-index: 1;
		bottom: -1px;
		right: 0;
		left: 0;
		height: 1px;
		background: inherit;
		content: '';
	}
`;
const tabPanel = css`
	position: relative;
	padding: ${space[3]}px;
	border-top: 1px solid ${neutral[60]};
`;

type TabElement = 'a' | 'button';

type TabProps = {
	id: string;
	text: string;
	href?: string;
	content: ReactNode;
};

type PropTypes = {
	tabsLabel: string;
	tabElement: TabElement;
	tabs: TabProps[];
	onTabChange: (tabName: string) => void;
	selectedTab: string;
};

export const Tabs = ({
	tabsLabel,
	tabElement,
	tabs,
	selectedTab,
	onTabChange,
}: PropTypes) => {
	const TabControllerElement = tabElement;
	return (
		<div>
			<div css={tabList} role="tablist" aria-label={tabsLabel}>
				{tabs.map((tab: TabProps) => {
					return (
						<TabControllerElement
							key={tab.id}
							css={tabButton}
							role="tab"
							id={tab.id}
							href={tab.href}
							aria-selected={selectedTab === tab.id}
							aria-controls={`${tab.id}-tab`}
							onClick={(event): void => {
								event.preventDefault();
								onTabChange(tab.id);
							}}
						>
							{tab.text}
						</TabControllerElement>
					);
				})}
			</div>
			{tabs.map((tab: TabProps) => (
				<div
					key={`${tab.id}-tab`}
					css={tabPanel}
					role="tabpanel"
					id={`${tab.id}-tab`}
					aria-labelledby={tab.id}
					hidden={!(tab.id === selectedTab)}
				>
					{tab.content}
				</div>
			))}
		</div>
	);
};
