import { AlreadyVisited } from './AlreadyVisited';
import { BrazeMessaging } from './BrazeMessaging';
import { CommercialMetrics } from './CommercialMetrics';
import { FocusStyles } from './FocusStyles';
import { ReaderRevenueDev } from './ReaderRevenueDev';

type Props = {
	commercialMetrics: boolean;
	switches: Switches;
	isSensitive: boolean;
	isDev?: boolean;
	idApiUrl: string;
	shouldHideReaderRevenue: boolean;
};

export const BootPage = ({
	commercialMetrics,
	switches,
	isSensitive,
	isDev,
	idApiUrl,
	shouldHideReaderRevenue,
}: Props) => (
	/**
	 * 🚫 React state is forbidden here 🚫
	 *
	 * If you think you need to add state to this file then stop what you are doing, lift
	 * your hands off the keyboard, and back away from your laptop.
	 *
	 * The *only* reason we group these files is to prevent multiple http requests. Adding state
	 * here risks introducing complexity, reducing our ability to maintain and scale the platform.
	 *
	 * */
	<>
		<FocusStyles />
		<AlreadyVisited />
		<CommercialMetrics
			enabled={commercialMetrics}
			switches={switches}
			isSensitive={isSensitive}
			isDev={isDev}
		/>
		<BrazeMessaging idApiUrl={idApiUrl} />
		<ReaderRevenueDev shouldHideReaderRevenue={shouldHideReaderRevenue} />
	</>
);
