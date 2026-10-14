import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { until } from '@guardian/source/foundations';
import { render } from '@testing-library/react';
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

const renderTopBar = () => {
	const cache = createCache({ key: 'topbar-test' });

	const { container } = render(
		<CacheProvider value={cache}>
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
	const css = cache.sheet.tags
		.flatMap((tag) =>
			Array.from(tag.sheet?.cssRules ?? [], (rule) => rule.cssText),
		)
		.join('')
		.replace(/\s/g, '');
	cache.sheet.flush();

	return { html: container.innerHTML, css };
};

describe('TopBar mobile sign-in experiment', () => {
	it('hides the mobile account control before the experiment resolves', () => {
		jest.mocked(useAB).mockReturnValue(undefined);

		const { html, css } = renderTopBar();
		const container = document.createElement('div');
		container.innerHTML = html;
		const accountContainer = container.querySelector(
			'a[data-link-name="header : topbar : signin"]',
		)?.parentElement;

		expect(accountContainer).not.toBeNull();
		expect(css).toContain(
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

			const { html, css } = renderTopBar();
			const container = document.createElement('div');
			container.innerHTML = html;
			const signInLink = container.querySelector(
				'a[data-link-name="header : topbar : signin"]',
			);

			expect(css).not.toContain('visibility:hidden');
			expect(signInLink?.querySelector('div svg') !== null).toBe(
				isVariant,
			);
		},
	);
});
