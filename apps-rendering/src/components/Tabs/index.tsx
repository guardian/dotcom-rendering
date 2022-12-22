import type { ReactNode } from 'react';
import { tabButton, tabList, tabPanel } from './styles';

type TabElement = 'a' | 'button';
export type TabProps = {
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

function Tabs({
	tabsLabel,
	tabElement,
	tabs,
	selectedTab,
	onTabChange,
}: PropTypes): JSX.Element {
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
}

export default Tabs;
