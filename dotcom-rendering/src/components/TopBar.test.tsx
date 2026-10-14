import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { until } from '@guardian/source/foundations';
import { renderToString } from 'react-dom/server';
import { useAB } from '../lib/useAB';
import { ConfigProvider } from './ConfigContext';
import { TopBar } from './TopBar.island';

jest.mock('../lib/useAB');
jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: () => ({ kind: 'SignedOut' }),
}));
jest.mock('../lib/usePageViewId', () => ({
	usePageViewId: () => 'page-view-id',
}));
jest.mock('./TopBarSupport.island', () => ({
	TopBarSupport: () => null,
}));

const renderTopBar = () =>
	renderToString(
		<CacheProvider value={createCache({ key: 'topbar-test' })}>
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<TopBar
					editionId="UK"
					discussionApiUrl="https://discussion.example.com"
					idApiUrl="https://id.example.com"
					contributionsServiceUrl="https://support.example.com"
				/>
			</ConfigProvider>
		</CacheProvider>,
	);

describe('TopBar mobile sign-in experiment', () => {
	it('hides the mobile account control before the experiment resolves', () => {
		jest.mocked(useAB).mockReturnValue(undefined);

		const html = renderTopBar();
		const container = document.createElement('div');
		container.innerHTML = html;
		const accountContainer = container.querySelector(
			'a[data-link-name="header : topbar : signin"]',
		)?.parentElement;

		expect(accountContainer).not.toBeNull();
		expect(html.replace(/\s/g, '')).toContain(
			`${until.tablet}{.${accountContainer?.className}{visibility:hidden;}}`.replace(
				/\s/g,
				'',
			),
		);
	});

	it.each([false, true])(
		'shows the resolved account control when variant membership is %s',
		(isVariant) => {
			jest.mocked(useAB).mockReturnValue({
				getParticipations: jest.fn(),
				isUserInTest: jest.fn(),
				isUserInTestGroup: () => isVariant,
				trackABTests: jest.fn(),
			});

			const html = renderTopBar();
			const container = document.createElement('div');
			container.innerHTML = html;
			const signInLink = container.querySelector(
				'a[data-link-name="header : topbar : signin"]',
			);

			expect(html).not.toContain('visibility:hidden');
			expect(signInLink?.querySelector('div svg') !== null).toBe(
				isVariant,
			);
		},
	);
});
