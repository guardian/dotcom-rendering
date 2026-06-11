import { css } from '@emotion/react';
import {
	between,
	focusHalo,
	from,
	space,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { SvgNewsletterFilled } from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import type { ArticleFormat } from '../../../lib/articleFormat';
import { getZIndex } from '../../../lib/getZIndex';
import {
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	sendNewsletterSignupEvent,
} from '../../../lib/newsletterSignupTracking';
import { useIsInView } from '../../../lib/useIsInView';
import { palette } from '../../../palette';
import type { Newsletter } from '../../../types/content';
import type { DCRFrontImage } from '../../../types/front';
import type { RenderingTarget } from '../../../types/renderingTarget';
import { CardHeadline } from '../../CardHeadline';
import type { Loading } from '../../CardPicture';
import { FormatBoundary } from '../../FormatBoundary';
import { HighlightsCardImage } from '../HighlightsCardImage';
import { HighlightsNewsletterSignupModal } from './HighlightsNewsletterSignupModal';

type Props = {
	format: ArticleFormat;
	newsletter: Newsletter;
	headlineText: string;
	linkTo: string;
	dataLinkName: string;
	image?: DCRFrontImage;
	imageLoading?: Loading;
	renderingTarget: RenderingTarget;
};

const container = css`
	display: flex;
	flex-direction: column;
	height: 100%;
	column-gap: ${space[2]}px;
	justify-content: space-between;
	/** Relative positioning is required to absolutely position the card link overlay */
	position: relative;
	padding: ${space[2]}px ${space[2]}px 0 ${space[2]}px;
	background-color: ${palette('--newsletter-card-background')};
	word-break: break-word;

	${until.mobileMedium} {
		min-height: 174px;
	}
	${between.mobileMedium.and.tablet} {
		min-height: 194px;
	}
	${from.tablet} {
		width: 280px;
		padding: 10px 10px 0 10px;
		flex-direction: row;
	}
	${from.desktop} {
		width: 300px;
	}
`;

const hoverStyles = css`
	:hover .media-overlay {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
		background-color: ${palette('--card-background-hover')};
	}
	:hover .circular {
		border-radius: 100%;
	}

	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

const linkOverlayStyles = css`
	position: absolute;
	z-index: ${getZIndex('card-link')};
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: transparent;

	:focus {
		${focusHalo};
	}
`;

const content = css`
	display: flex;
	flex-direction: column;

	${from.tablet} {
		padding-bottom: 10px;
	}

	${between.mobileMedium.and.mobileLandscape} {
		.headline-text {
			font-size: 1rem;
		}
	}
`;

const kickerStyles = css`
	${textSans15};
	line-height: 1;
	color: ${palette('--highlights-card-kicker-text')};
	display: flex;
	align-items: center;
	gap: 2px;

	svg {
		height: 20px;
		width: 20px;
		fill: ${palette('--newsletter-card-frequency-tag')};
		flex-shrink: 0;
	}
`;

export const HighlightsNewsletterCard = ({
	format,
	newsletter,
	headlineText,
	linkTo,
	dataLinkName,
	image,
	imageLoading = 'lazy',
	renderingTarget,
}: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const componentId = NEWSLETTER_SIGNUP_COMPONENT_ID.highlightsCard(
		newsletter.identityName,
	);
	const [hasBeenSeen, setIsInViewRef] = useIsInView({});
	const hasTrackedView = useRef(false);

	useEffect(() => {
		if (hasBeenSeen !== true || hasTrackedView.current) return;

		hasTrackedView.current = true;

		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName: newsletter.identityName,
			componentId,
			renderingTarget,
			value: { eventDescription: 'highlights-card-viewed' },
		});
	}, [hasBeenSeen, componentId, newsletter.identityName, renderingTarget]);

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		if (renderingTarget === 'Web') {
			event.preventDefault();
			setIsModalOpen(true);

			sendNewsletterSignupEvent({
				action: 'EXPAND',
				identityName: newsletter.identityName,
				componentId,
				renderingTarget,
				value: { eventDescription: 'highlights-card-modal-opened' },
			});
		}
	};

	const newsletterImageSrc =
		newsletter.illustrationSquare ?? newsletter.illustrationCard;
	const newsletterImage: DCRFrontImage | undefined =
		newsletterImageSrc !== undefined
			? {
					src: newsletterImageSrc,
					altText: `${newsletter.name} newsletter`,
				}
			: image;

	return (
		<FormatBoundary format={format}>
			<>
				{isModalOpen && (
					<HighlightsNewsletterSignupModal
						newsletter={newsletter}
						onClose={() => {
							setIsModalOpen(false);
							sendNewsletterSignupEvent({
								action: 'CLOSE',
								identityName: newsletter.identityName,
								componentId,
								renderingTarget,
								value: {
									eventDescription:
										'highlights-card-modal-closed',
								},
							});
						}}
					/>
				)}
				<div ref={setIsInViewRef} css={[container, hoverStyles]}>
					<a
						href={linkTo}
						css={linkOverlayStyles}
						onClick={handleClick}
						data-link-name={dataLinkName}
						aria-label={headlineText}
					/>

					<div css={content}>
						<span css={kickerStyles}>
							<SvgNewsletterFilled />
							Free newsletter
						</span>

						<CardHeadline
							headlineText={headlineText}
							format={format}
							fontSizes={{
								desktop: 'xxsmall',
								tablet: 'xxsmall',
								mobileMedium: 'xxsmall',
								mobile: 'xxxsmall',
							}}
							showQuotes={false}
							headlineColour={palette(
								'--newsletter-highlights-card-headline',
							)}
						/>
					</div>

					{newsletterImage !== undefined && (
						<HighlightsCardImage
							imageLoading={imageLoading}
							image={newsletterImage}
						/>
					)}
				</div>
			</>
		</FormatBoundary>
	);
};
