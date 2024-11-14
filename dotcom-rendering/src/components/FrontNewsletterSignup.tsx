import type { Newsletter } from '../types/content';
import type { DCRContainerType } from '../types/front';
import { SecureSignup } from './SecureSignup.importable';

interface Props {
	newsletter: Newsletter;
	containerType?: DCRContainerType;
}

export const FrontNewsletterSignup = ({ newsletter, containerType }: Props) => {
	return (
		<div>
			<p>newsletter: {newsletter.name}</p>
			<p>containerType: {containerType}</p>
			<SecureSignup
				newsletterId={newsletter.identityName}
				successDescription={newsletter.successDescription}
			/>
		</div>
	);
};
