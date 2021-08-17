import { storage } from '@guardian/libs';

const KEY = 'gu.geo.override';

export const overrideGeo = (geo) => storage.local.set(KEY, geo);
