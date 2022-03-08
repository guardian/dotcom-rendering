import { log } from '@guardian/libs';
import { useBraze } from '../lib/useBraze';

type Props = {
	idApiUrl: string;
};

/**
 * This component ensure we call buildBrazeMessaging at least once
 * on every page
 */
export const BrazeMessaging = ({ idApiUrl }: Props) => {
	// eslint-disable-next-line no-void -- we don’t use this promise
	const data = useBraze(idApiUrl);

	if (data) {
		log('tx', 'Braze Messages Interface loaded', data);
	}

	// we don’t render anything
	return null;
};
