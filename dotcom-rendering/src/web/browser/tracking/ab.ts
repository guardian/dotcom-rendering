import { AB } from '@guardian/ab-core';
import { getCookie } from '@guardian/libs';
import { tests as arrayOfTestObjects } from '../../../web/experiments/ab-tests';

const cookie =
	getCookie({ name: 'GU_mvt_id_local', shouldMemoize: true }) ??
	getCookie({ name: 'GU_mvt_id', shouldMemoize: true }) ??
	'0';
const mvtId = parseInt(cookie, 10) || 1;

const ab = new AB({
	abTestSwitches: window.guardian.config.switches,
	mvtId,
	pageIsSensitive: window.guardian.config.page.isSensitive,
	arrayOfTestObjects,
});

export { ab };
