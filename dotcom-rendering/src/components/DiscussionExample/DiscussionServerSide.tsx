import { useConfig } from '../ConfigContext';
import { Island } from '../Island';
import { DiscussionApps } from './DiscussionApps.importable';
import { DiscussionWeb } from './DiscussionWeb.importable';

/**
 * The component to be rendered on the server. It chooses one of two islands
 * to render depending on the platform.
 */
const DiscussionServerSide = () => {
	const { renderingTarget } = useConfig();

	switch (renderingTarget) {
		case 'Web':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<DiscussionWeb />
				</Island>
			);
		case 'Apps':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<DiscussionApps />
				</Island>
			);
	}
};

export { DiscussionServerSide };
