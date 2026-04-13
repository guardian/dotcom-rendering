import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	space,
	textSans14,
} from '@guardian/source/foundations';
import { buildDetailText } from '../lib/buildNewsletterSignUpText';
import { palette as themePalette } from '../palette';
import { NewsletterDetail } from './NewsletterDetail';

export type NewsletterSignupCardProps = {
	name: string;
	frequency: string;
	description: string;
	illustration: string;
	children?: React.ReactNode;
};

const containerStyles = css`
	clear: left;
	border: ${themePalette('--recaptcha-border')} 3px dashed;
	border-radius: 12px;
	margin-bottom: ${space[3]}px;
	padding: ${space[2]}px;

	${from.tablet} {
		padding: ${space[2]}px ${space[3]}px;
	}
`;

const headerStyles = css`
	display: grid;
	grid-template-columns: 1fr 96px;
	gap: ${space[3]}px;
	margin-bottom: ${space[2]}px;

	${from.tablet} {
		grid-template-columns: 1fr 120px;
	}
`;

const titleAndMetaStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const titleStyles = css`
	${headlineBold20};

	span {
		color: var(--newsletter-signup-title-color, inherit);
	}
`;

const metaStyles = css`
	max-height: 0;
	overflow: visible;
`;

const descriptionStyles = css`
	${textSans14};
	line-height: 1.15;
	margin-bottom: ${space[2]}px;
	max-width: ${335 + space[3] + 118}px;
`;

const illustrationStyles = css`
	width: 100%;
	height: auto;
	border-radius: ${space[1]}px;
	object-fit: cover;
`;

export const NewsletterSignupCard = ({
	name,
	frequency,
	description,
	illustration,
	children,
}: NewsletterSignupCardProps) => {
	return (
		<aside css={containerStyles} aria-label="newsletter promotion">
			<div css={headerStyles}>
				<div css={titleAndMetaStyles}>
					<p css={titleStyles}>
						Sign up to <span>{name}</span>
					</p>
					<div css={metaStyles}>
						<NewsletterDetail text={buildDetailText(frequency)} />
					</div>
				</div>
				<img
					css={illustrationStyles}
					src={illustration}
					alt={`${name} newsletter illustration`}
				/>
			</div>
			<p css={descriptionStyles}>{description}</p>
			{children}
		</aside>
	);
};
