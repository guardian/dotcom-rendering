import { Pillar } from '@guardian/libs';
import { render, within } from '@testing-library/react';
import { ConfigProvider } from '../ConfigContext';
import { Nav } from './Nav';
import { nav } from './Nav.mock';

describe('Nav', () => {
	const { getByTestId } = render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<Nav
				nav={nav}
				selectedPillar={Pillar.News}
				subscribeUrl=""
				editionId={'UK'}
			/>
		</ConfigProvider>,
	);

	const pillarList = getByTestId('pillar-list');

	it('should display pillar titles', () => {
		const list = within(pillarList);

		expect(list.getByText('News')).toBeInTheDocument();
		expect(list.getByText('Opinion')).toBeInTheDocument();
		expect(list.getByText('Sport')).toBeInTheDocument();
		expect(list.getByText('Culture')).toBeInTheDocument();
	});

	it('should render the correct number of pillar items', () => {
		const listItems = pillarList.querySelectorAll('li');

		expect(listItems.length).toEqual(nav.pillars.length);
	});
});
