import ReactDOM from 'react-dom';

import { App } from '@root/src/web/components/App';
import { loadableReady } from '@loadable/component';
import { WithABProvider } from './WithABProvider';

type Props = {
	CAPI: CAPIBrowserType;
};

export const BootReact = ({ CAPI }: Props) => {
	loadableReady(() => {
		ReactDOM.render(
			<WithABProvider
				abTestSwitches={CAPI.config.switches}
				pageIsSensitive={CAPI.config.isSensitive}
				isDev={CAPI.config.isDev}
			>
				<App CAPI={CAPI} />
			</WithABProvider>,

			document.getElementById('react-root'),
		);
	}).catch((e) =>
		console.error(`BootReact @loadable/component - error: ${e}`),
	);
};
