import { render, screen } from '@testing-library/react';
import { customSubnav } from '../../fixtures/manual/customSubnav';
import { trails } from '../../fixtures/manual/trails';
import type { CustomSubnav } from '../types/customSubnav';
import type { DCRContainerType, DCRFrontCard } from '../types/front';
import { ConfigProvider } from './ConfigContext';
import { FrontCard } from './FrontCard';

const miniNavData = {
	...customSubnav,
	id: 'football-mini-nav',
	header: {
		...customSubnav.header,
		headerText: 'Football',
		dotcomPath: '/football',
		copy: 'Football navigation',
	},
	format: 'compact',
	links: [{ linkText: 'More Football', dotcomPath: '/football' }],
} satisfies CustomSubnav;

const defaultTrail = {
	...trails[0],
	boostLevel: 'boost',
	showMiniNav: true,
	miniNavData,
} satisfies DCRFrontCard;

const renderCard = ({
	trail = defaultTrail,
	...props
}: {
	trail?: DCRFrontCard;
	containerType?: DCRContainerType;
} = {}) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<FrontCard
				trail={trail}
				containerType="flexible/general"
				imageLoading="eager"
				serverTime={1793031866891}
				{...props}
			/>
		</ConfigProvider>,
	);

const expectMiniNavAbsent = () => {
	expect(screen.queryByText('Football')).not.toBeInTheDocument();
	expect(
		screen.queryByRole('link', { name: 'More Football' }),
	).not.toBeInTheDocument();
	expect(screen.getByText(defaultTrail.headline)).toBeInTheDocument();
};

describe('FrontCard mini navigation', () => {
	it.each(['boost', 'megaboost', 'gigaboost'] as const)(
		'renders mini navigation for a %s card',
		(boostLevel) => {
			renderCard({ trail: { ...defaultTrail, boostLevel } });

			expect(
				screen.getByRole('link', { name: 'More Football' }),
			).toHaveAttribute('href', '/football');
			expect(screen.getByText(defaultTrail.headline)).toBeInTheDocument();
		},
	);

	it.each([undefined, 'default'] as const)(
		'does not render mini navigation with boost level %s',
		(boostLevel) => {
			renderCard({ trail: { ...defaultTrail, boostLevel } });

			expectMiniNavAbsent();
		},
	);

	it.each([undefined, 'static/medium/4', 'flexible/special'] as const)(
		'does not render mini navigation in container %s',
		(containerType) => {
			renderCard({ containerType });

			expectMiniNavAbsent();
		},
	);

	it('does not render mini navigation when disabled', () => {
		renderCard({ trail: { ...defaultTrail, showMiniNav: false } });

		expectMiniNavAbsent();
	});

	it('does not render mini navigation when configuration is missing', () => {
		renderCard({ trail: { ...defaultTrail, miniNavData: undefined } });

		expectMiniNavAbsent();
	});

	it('renders an underlined header link when header text is enabled', () => {
		renderCard();

		const header = screen.getByRole('link', { name: 'Football' });
		expect(header).toHaveAttribute('href', '/football');
		expect(header).toHaveStyle('text-decoration: underline');
	});

	it('renders header text without a link when the header has no path', () => {
		renderCard({
			trail: {
				...defaultTrail,
				miniNavData: {
					...miniNavData,
					header: { ...miniNavData.header, dotcomPath: undefined },
				},
			},
		});

		expect(screen.getByText('Football')).toBeInTheDocument();
		expect(screen.getByText('Football').closest('a')).toBeNull();
		expect(
			screen.getByRole('link', { name: 'More Football' }),
		).toHaveAttribute('href', '/football');
	});

	it('hides the header without hiding navigation links when header text is disabled', () => {
		renderCard({
			trail: {
				...defaultTrail,
				miniNavData: {
					...miniNavData,
					header: { ...miniNavData.header, showHeaderText: false },
				},
			},
		});

		expect(screen.queryByText('Football')).not.toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'More Football' }),
		).toHaveAttribute('href', '/football');
		expect(screen.getByText(defaultTrail.headline)).toBeInTheDocument();
	});

	it('places mini navigation before the card content in a full-width column', () => {
		renderCard();

		const miniNav = screen
			.getByRole('link', { name: 'More Football' })
			.closest('[data-component-id]');
		const navWrapper = miniNav?.parentElement;
		const cardWrapper = navWrapper?.parentElement;

		expect(cardWrapper).toHaveStyle({
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
		});
		expect(cardWrapper?.firstElementChild).toBe(navWrapper);
		expect(cardWrapper).toContainElement(
			screen.getByText(defaultTrail.headline),
		);
	});

	it('uses the card kicker colour for the header and headline colour for links', () => {
		renderCard();

		const miniNav = screen
			.getByRole('link', { name: 'More Football' })
			.closest('[data-component-id]');

		expect(miniNav?.parentElement).toHaveStyle({
			'--custom-subnav-header-text': 'var(--card-kicker-text)',
			'--masthead-nav-link-text': 'var(--card-headline)',
			'--masthead-nav-link-text-hover': 'var(--card-headline)',
		});
	});
});
