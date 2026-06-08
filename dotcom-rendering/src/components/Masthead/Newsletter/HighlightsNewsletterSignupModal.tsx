import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useId } from 'react';
import {
	ArticleDesign,
	ArticleDisplay,
	Pillar,
} from '../../../lib/articleFormat';
import { generateImageURL } from '../../../lib/image';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import type { Newsletter } from '../../../types/content';
import { FormatBoundary } from '../../FormatBoundary';
import { ModalOverlay, useModalRequestClose } from '../../ModalOverlay';
import { NewsletterSignupCard } from '../../NewsletterSignupCard';
import { NewsletterSignupForm } from '../../NewsletterSignupForm.island';

const HIGHLIGHTS_MODAL_FORMAT = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
} as const;

const dialogStyles = css`
	background: transparent;
	width: 100%;
	max-height: 90vh;
	overflow: auto;
	position: relative;
	border-radius: ${space[3]}px ${space[3]}px 0 0;

	${from.tablet} {
		width: min(560px, 100%);
		border-radius: ${space[2]}px;
	}
`;

const closeButtonWrapperStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
	z-index: 1;
`;

const heroStyles = (imageSrc?: string) => css`
	width: 100%;
	height: 136px;
	background-color: ${sourcePalette.neutral[86]};
	background-image: ${imageSrc !== undefined
		? `url(${generateImageURL({
				mainImage: imageSrc,
				imageWidth: 560,
				resolution: 'high',
			})})`
		: 'none'};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

const closeButtonStyles = css`
	padding: 0;
	min-width: 44px;
	min-height: 44px;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	background-color: ${sourcePalette.neutral[86]}99;
	border: none;
	color: ${sourcePalette.brand[400]};

	svg {
		fill: ${sourcePalette.brand[400]};
	}

	&:hover {
		background-color: ${sourcePalette.neutral[86]}cc;
	}
`;

const visuallyHiddenStyles = css`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
`;

type Props = {
	newsletter: Newsletter;
	onClose: () => void;
};

const HighlightsNewsletterSignupModalContent = ({
	newsletter,
	titleId,
	isSubscribed,
}: {
	newsletter: Newsletter;
	titleId: string;
	isSubscribed: boolean | undefined;
}) => {
	const requestClose = useModalRequestClose();

	return (
		<FormatBoundary format={HIGHLIGHTS_MODAL_FORMAT}>
			<div css={closeButtonWrapperStyles}>
				<Button
					size="small"
					priority="tertiary"
					onClick={requestClose}
					icon={<SvgCross size="small" />}
					hideLabel={true}
					cssOverrides={closeButtonStyles}
				>
					Close signup form
				</Button>
			</div>
			<h2 id={titleId} css={visuallyHiddenStyles}>
				Sign up to {newsletter.name}
			</h2>
			<div
				css={heroStyles(newsletter.illustrationCard)}
				aria-hidden="true"
			/>
			<NewsletterSignupCard
				name={newsletter.name}
				frequency={newsletter.frequency}
				description={newsletter.description}
				isModal={true}
			>
				<NewsletterSignupForm
					newsletterId={newsletter.identityName}
					newsletterName={newsletter.name}
					frequency={newsletter.frequency}
					isModal={true}
					isAlreadySubscribed={isSubscribed === true}
					abTest={{
						name: 'highlights-newsletter-card',
						variant: 'highlightsCard',
					}}
				/>
			</NewsletterSignupCard>
		</FormatBoundary>
	);
};

export const HighlightsNewsletterSignupModal = ({
	newsletter,
	onClose,
}: Props) => {
	const isSubscribed = useNewsletterSubscription(
		newsletter.listId,
		window.guardian.config.page.idApiUrl,
	);

	const titleId = useId();

	return (
		<ModalOverlay
			aria-labelledby={titleId}
			onClose={onClose}
			dialogCss={dialogStyles}
		>
			<HighlightsNewsletterSignupModalContent
				newsletter={newsletter}
				titleId={titleId}
				isSubscribed={isSubscribed}
			/>
		</ModalOverlay>
	);
};
