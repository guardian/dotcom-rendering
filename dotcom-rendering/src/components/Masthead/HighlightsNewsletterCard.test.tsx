import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { newsletterCard } from '../../../fixtures/manual/highlights-trails';
import { sendNewsletterSignupEvent } from '../../lib/newsletterSignupTracking';
import { useIsInView } from '../../lib/useIsInView';
import { ConfigProvider } from '../ConfigContext';
import { HighlightsCardImage } from './HighlightsCardImage';
import { HighlightsNewsletterCard } from './HighlightsNewsletterCard';

jest.mock('../../lib/newsletterSignupTracking', () => ({
	sendNewsletterSignupEvent: jest.fn(),
	NEWSLETTER_SIGNUP_COMPONENT_ID: {
		highlightsCard: (id: string) => `highlights-card-${id}`,
	},
}));

jest.mock('../../lib/useIsInView', () => ({
	useIsInView: jest.fn(),
}));

jest.mock('./HighlightsCardImage', () => ({
	HighlightsCardImage: jest.fn(() => (
		<div data-testid="highlights-card-image" />
	)),
}));

jest.mock('./HighlightsNewsletterSignupModal', () => ({
	HighlightsNewsletterSignupModal: jest.fn(() => (
		<div data-testid="highlights-newsletter-signup-modal" />
	)),
}));

const defaultProps: React.ComponentProps<typeof HighlightsNewsletterCard> = {
	format: newsletterCard.format,
	newsletter: newsletterCard.newsletterData!,
	headlineText: newsletterCard.headline,
	linkTo: newsletterCard.url,
	dataLinkName: 'highlights-newsletter-card | open-signup',
	image: newsletterCard.image,
	renderingTarget: 'Web',
};

const mockUseIsInView = useIsInView as jest.MockedFunction<typeof useIsInView>;

const setCardInView = (isInView: boolean | null) => {
	mockUseIsInView.mockReturnValue([isInView, jest.fn()] as ReturnType<
		typeof useIsInView
	>);
};

const renderCard = (
	overrides: Partial<
		React.ComponentProps<typeof HighlightsNewsletterCard>
	> = {},
) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<HighlightsNewsletterCard {...defaultProps} {...overrides} />
		</ConfigProvider>,
	);

describe('HighlightsNewsletterCard', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		setCardInView(false);
	});

	it('opens signup modal on Web click and tracks click', () => {
		setCardInView(true);
		renderCard();

		const link = screen.getByRole('link', {
			name: defaultProps.headlineText,
		});
		expect(link).toHaveAttribute('href', defaultProps.linkTo);
		expect(link).toHaveAttribute(
			'data-link-name',
			defaultProps.dataLinkName,
		);

		expect(sendNewsletterSignupEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'VIEW',
				identityName: defaultProps.newsletter.identityName,
				componentId: `highlights-card-${defaultProps.newsletter.identityName}`,
				renderingTarget: defaultProps.renderingTarget,
				value: { eventDescription: 'highlights-card-viewed' },
			}),
		);

		fireEvent.click(link);
		expect(
			screen.getByTestId('highlights-newsletter-signup-modal'),
		).toBeInTheDocument();

		expect(sendNewsletterSignupEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'EXPAND',
				identityName: defaultProps.newsletter.identityName,
				componentId: `highlights-card-${defaultProps.newsletter.identityName}`,
				renderingTarget: defaultProps.renderingTarget,
				value: { eventDescription: 'highlights-card-modal-opened' },
			}),
		);
	});

	it('does not track a VIEW event before the card is seen', () => {
		setCardInView(false);

		renderCard();

		expect(sendNewsletterSignupEvent).not.toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'VIEW',
				identityName: defaultProps.newsletter.identityName,
				componentId: `highlights-card-${defaultProps.newsletter.identityName}`,
				renderingTarget: defaultProps.renderingTarget,
				value: { eventDescription: 'highlights-card-viewed' },
			}),
		);
	});

	it('does not open signup modal on Apps click', () => {
		renderCard({ renderingTarget: 'Apps' });

		const link = screen.getByRole('link', {
			name: defaultProps.headlineText,
		});

		fireEvent.click(link);

		expect(
			screen.queryByTestId('highlights-newsletter-signup-modal'),
		).not.toBeInTheDocument();
	});

	it('prefers newsletter illustrationSquare for the card image', () => {
		renderCard({
			newsletter: {
				...defaultProps.newsletter,
				illustrationSquare: 'https://example.com/newsletter-square.jpg',
				illustrationCard: 'https://example.com/newsletter-card.jpg',
			},
			image: {
				src: 'https://example.com/trail-image.jpg',
				altText: 'Trail image',
			},
		});

		const firstCallProps = (
			HighlightsCardImage as jest.MockedFunction<
				typeof HighlightsCardImage
			>
		).mock.calls[0]?.[0];
		expect(firstCallProps).toEqual(
			expect.objectContaining({
				image: {
					src: 'https://example.com/newsletter-square.jpg',
					altText: `${defaultProps.newsletter.name} newsletter`,
				},
			}),
		);
	});

	it('falls back to newsletter illustrationCard when illustrationSquare is absent', () => {
		renderCard({
			newsletter: {
				...defaultProps.newsletter,
				illustrationSquare: undefined,
				illustrationCard: 'https://example.com/newsletter-card.jpg',
			},
			image: {
				src: 'https://example.com/trail-image.jpg',
				altText: 'Trail image',
			},
		});

		const firstCallProps = (
			HighlightsCardImage as jest.MockedFunction<
				typeof HighlightsCardImage
			>
		).mock.calls[0]?.[0];
		expect(firstCallProps).toEqual(
			expect.objectContaining({
				image: {
					src: 'https://example.com/newsletter-card.jpg',
					altText: `${defaultProps.newsletter.name} newsletter`,
				},
			}),
		);
	});

	it('falls back to trail image when newsletter image metadata is absent', () => {
		renderCard({
			newsletter: {
				...defaultProps.newsletter,
				illustrationSquare: undefined,
				illustrationCard: undefined,
			},
			image: {
				src: 'https://example.com/trail-image.jpg',
				altText: 'Trail image',
			},
		});

		const firstCallProps = (
			HighlightsCardImage as jest.MockedFunction<
				typeof HighlightsCardImage
			>
		).mock.calls[0]?.[0];
		expect(firstCallProps).toEqual(
			expect.objectContaining({
				image: {
					src: 'https://example.com/trail-image.jpg',
					altText: 'Trail image',
				},
			}),
		);
	});
});
