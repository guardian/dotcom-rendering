import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useEffect, useId, useRef } from 'react';
import { getZIndex } from '../../../lib/getZIndex';
import { generateImageURL } from '../../../lib/image';
import { useNewsletterSubscription } from '../../../lib/useNewsletterSubscription';
import type { Newsletter } from '../../../types/content';
import { NewsletterSignupCard } from '../../NewsletterSignupCard';
import { NewsletterSignupForm } from '../../NewsletterSignupForm.island';

const overlayStyles = css`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-top: ${space[3]}px;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: ${getZIndex('lightbox')};

	${from.tablet} {
		align-items: center;
		padding: ${space[3]}px;
	}
`;

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
		? `url(${generateImageURL({ mainImage: imageSrc, imageWidth: 560, resolution: 'high' })})`
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

const contentStyles = css`
	padding: 0;
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

export const HighlightsNewsletterSignupModal = ({
	newsletter,
	onClose,
}: Props) => {
	const isSubscribed = useNewsletterSubscription(
		newsletter.listId,
		window.guardian.config.page.idApiUrl,
	);

	const overlayRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const titleId = useId();

	useEffect(() => {
		const previousRootOverflow = document.documentElement.style.overflow;
		const previousBodyOverflow = document.body.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';

		return () => {
			document.documentElement.style.overflow = previousRootOverflow;
			document.body.style.overflow = previousBodyOverflow;
		};
	}, []);

	useEffect(() => {
		const dialogElement = dialogRef.current;
		if (!dialogElement) {
			return;
		}

		const previouslyFocusedElement =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		dialogElement.focus();

		return () => {
			if (
				previouslyFocusedElement &&
				document.contains(previouslyFocusedElement)
			) {
				previouslyFocusedElement.focus();
			}
		};
	}, []);
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const dialogElement = dialogRef.current;
			if (!dialogElement) {
				return;
			}

			if (!dialogElement.contains(document.activeElement)) {
				return;
			}

			if (event.key === 'Escape') {
				event.stopPropagation();
				onClose();
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [onClose]);

	return (
		<div
			ref={overlayRef}
			css={overlayStyles}
			onClick={(event) => {
				if (event.target === overlayRef.current) {
					onClose();
				}
			}}
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabIndex={-1}
				css={dialogStyles}
			>
				<div css={closeButtonWrapperStyles}>
					<Button
						size="small"
						priority="tertiary"
						onClick={onClose}
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
				<div css={contentStyles}>
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
				</div>
			</div>
		</div>
	);
};
