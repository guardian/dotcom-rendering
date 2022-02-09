import ReactDOM from 'react-dom';

import { App } from '@root/src/web/components/App';
import { loadableReady } from '@loadable/component';
import { getOphanRecordFunction } from '@root/src/web/browser/ophan/ophan';
import { WithABProvider } from './WithABProvider';

type Props = {
	CAPI: CAPIBrowserType;
};

export const BootReact = ({ CAPI }: Props) => {
	const ophanRecord = getOphanRecordFunction();

	loadableReady(() => {
		ReactDOM.render(
			<WithABProvider
				abTestSwitches={CAPI.config.switches}
				pageIsSensitive={CAPI.config.isSensitive}
				isDev={CAPI.config.isDev}
			>
				<App CAPI={CAPI} ophanRecord={ophanRecord} />
			</WithABProvider>,

			document.getElementById('react-root'),
		);
	}).catch((e) =>
		console.error(`BootReact @loadable/component - error: ${e}`),
	);
};
