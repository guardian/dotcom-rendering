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
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	margin-bottom: ${space[2]}px;
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

export const NewsletterSignupCard = ({
	name,
	frequency,
	description,
	children,
}: NewsletterSignupCardProps) => {
	return (
		<aside css={containerStyles} aria-label="newsletter promotion">
			<div css={headerStyles}>
				<p css={titleStyles}>
					Sign up to <span>{name}</span>
				</p>
				<div css={metaStyles}>
					<NewsletterDetail text={buildDetailText(frequency)} />
				</div>
			</div>
			<p css={descriptionStyles}>{description}</p>
			{children}
		</aside>
	);
};
