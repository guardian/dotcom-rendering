import type { NewsletterSignupCardProps } from './NewsletterSignupCard';
import { NewsletterSignupCard } from './NewsletterSignupCard';

type Props = NewsletterSignupCardProps;

export const NewsletterSignupCardContainer = ({
	name,
	frequency,
	description,
	illustrationSquare,
	children,
}: Props) => (
	<NewsletterSignupCard
		name={name}
		frequency={frequency}
		description={description}
		illustrationSquare={illustrationSquare}
	>
		{children}
	</NewsletterSignupCard>
);
