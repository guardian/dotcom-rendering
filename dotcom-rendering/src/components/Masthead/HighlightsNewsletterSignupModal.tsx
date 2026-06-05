import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Newsletter } from '../../types/content';
import { NewsletterSignupCard } from '../NewsletterSignupCard';
import { NewsletterSignupForm } from '../NewsletterSignupForm.island';

const overlayStyles = css`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-top: ${space[3]}px;
	background-color: rgba(0, 0, 0, 0.75);
	z-index: 1000;

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
	background-image: ${imageSrc ? `url(${imageSrc})` : 'none'};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

const closeButtonStyles = css`
	padding: 0;
	min-width: 32px;
	min-height: 32px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
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
	const heroImage =
		newsletter.illustrationCard ?? newsletter.illustrationSquare;

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
		dialogRef.current?.focus();
	}, []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [onClose]);

	if (typeof document === 'undefined') {
		return null;
	}

	return createPortal(
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
				<div css={heroStyles(heroImage)} aria-hidden="true" />
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
						/>
					</NewsletterSignupCard>
				</div>
			</div>
		</div>,
		document.body,
	);
};
