import { log } from '@guardian/libs';
import { useBraze } from '../lib/useBraze';

type Props = {
	idApiUrl: string;
};

/**
 * This component ensures we call buildBrazeMessaging at least once
 * on every page
 */
export const BrazeMessaging = ({ idApiUrl }: Props) => {
	const { brazeMessages, brazeCards } = useBraze(idApiUrl);

	if (brazeMessages) {
		log('tx', 'Braze Messages Interface loaded', brazeMessages);
	}
	if (brazeCards) {
		log('tx', 'Braze Cards Interface loaded', brazeCards);
	}

	// we don’t render anything
	return null;
};
