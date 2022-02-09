import ReactDOM from 'react-dom';

import { App } from '@root/src/web/components/App';
import { tests } from '@frontend/web/experiments/ab-tests';
import { loadableReady } from '@loadable/component';
import { getOphanRecordFunction } from '@root/src/web/browser/ophan/ophan';
import { getCookie } from '@guardian/libs';
import { WithABProvider } from './WithABProvider';

type Props = {
	CAPI: CAPIBrowserType;
};

export const BootReact = ({ CAPI }: Props) => {
	const mvtId = Number(
		(CAPI.config.isDev &&
			getCookie({ name: 'GU_mvt_id_local', shouldMemoize: true })) || // Simplify localhost testing by creating a different mvt id
			getCookie({ name: 'GU_mvt_id', shouldMemoize: true }),
	);
	if (!mvtId) {
		// 0 is default and falsy here
		// eslint-disable-next-line no-console
		console.log('There is no MVT ID set, see BootReact.tsx');
	}

	const ophanRecord = getOphanRecordFunction();

	loadableReady(() => {
		ReactDOM.render(
			<WithABProvider
				arrayOfTestObjects={tests}
				abTestSwitches={CAPI.config.switches}
				pageIsSensitive={CAPI.config.isSensitive}
				mvtId={mvtId}
				ophanRecord={ophanRecord}
			>
				<App CAPI={CAPI} ophanRecord={ophanRecord} />
			</WithABProvider>,

			document.getElementById('react-root'),
		);
	}).catch((e) =>
		console.error(`BootReact @loadable/component - error: ${e}`),
	);
};
