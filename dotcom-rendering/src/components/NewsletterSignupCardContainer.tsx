import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source/foundations';
import type { NewsletterSignupCardProps } from './NewsletterSignupCard';
import { NewsletterSignupCard } from './NewsletterSignupCard';

type Props = Pick<
	NewsletterSignupCardProps,
	'name' | 'frequency' | 'description' | 'illustrationSquare'
> & {
	theme: string;
	isSignedIn?: boolean | 'Pending';
	children?: React.ReactNode;
	heading?: string;
};

const themeColorStyles = (theme: string) => css`
	--newsletter-signup-title-color: ${theme === 'news'
		? sourcePalette.sport[400]
		: 'inherit'};
`;

export const NewsletterSignupCardContainer = ({
	theme,
	name,
	heading,
	frequency,
	description,
	illustrationSquare,
	isSignedIn,
	children,
}: Props) => {
	return (
		<div css={themeColorStyles(theme)}>
			<div
				css={css`
					margin-bottom: ${space[6]}px;
				`}
			>
				<NewsletterSignupCard
					name={name}
					frequency={frequency}
					description={description}
					illustrationSquare={illustrationSquare}
					isSignedIn={isSignedIn}
					heading={heading}
				>
					{children}
				</NewsletterSignupCard>
			</div>
		</div>
	);
};
