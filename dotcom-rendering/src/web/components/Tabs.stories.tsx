import { useState } from 'react';
import { Tabs } from './Tabs';

export default {
	component: Tabs,
	title: 'Components/Tabs',
};

const tabsContent = [
	{
		id: 'cat',
		text: 'Cats',
		content: (
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec
				scelerisque lacus. Nulla aliquam nisi quis sollicitudin
				placerat. Nulla lacinia aliquet pretium. Vestibulum sit amet
				nisl cursus, consectetur sapien nec, cursus diam. Donec ornare
				eget eros sed sollicitudin. Fusce vitae lacinia diam. Integer eu
				suscipit felis. Integer tellus mauris, congue sit amet nisl
				tristique, feugiat viverra est. Praesent faucibus sagittis ante,
				rutrum cursus augue iaculis eu. Quisque et justo eget dolor
				pharetra consequat et ac ante. Nunc cursus molestie neque, vel
				sollicitudin nunc lacinia vitae. Aenean eget tincidunt felis.
				Pellentesque sagittis nisi eu mauris fermentum ultricies.
			</p>
		),
	},
	{
		id: 'dog',
		text: 'Dogs',
		content: (
			<p>
				Vestibulum fermentum nibh ac est venenatis facilisis. In
				vehicula mattis mi, id eleifend metus suscipit posuere. Nulla
				sed sem magna. Sed ante orci, convallis a facilisis sed, mollis
				id lacus. Aenean ullamcorper pellentesque nisi sed vehicula.
				Aenean quis auctor libero. Vestibulum aliquam in tellus id
				varius. Donec congue consectetur sem, sit amet sagittis turpis.
				Maecenas mattis massa augue, sit amet aliquet libero elementum
				nec.
			</p>
		),
	},
];

export const TwoTabs = () => {
	const [selectedTab, setSelectedTab] = useState('cat');
	return (
		<div style={{ margin: '8px' }}>
			<Tabs
				tabsLabel="Pets"
				tabElement="button"
				tabs={tabsContent}
				selectedTab={selectedTab}
				onTabChange={(tabName: string): void => {
					setSelectedTab(tabName);
				}}
			/>
		</div>
	);
};

TwoTabs.story = { name: 'TwoTabs' };
