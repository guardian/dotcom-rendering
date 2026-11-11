import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { NewsletterSignupCardProps } from './NewsletterSignupCard';
import { NewsletterSignupCard } from './NewsletterSignupCard';

type Props = Pick<
	NewsletterSignupCardProps,
	'name' | 'frequency' | 'description' | 'illustrationSquare'
> & {
	isSignedIn?: boolean | 'Pending';
	children?: React.ReactNode;
	heading?: string;
};

export const NewsletterSignupCardContainer = ({
	name,
	heading,
	frequency,
	description,
	illustrationSquare,
	isSignedIn,
	children,
}: Props) => {
	return (
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
	);
};
