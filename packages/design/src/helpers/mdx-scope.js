import * as figures from '../components/figure';
import * as lists from '../components/list';
import * as asides from '../components/aside';
import * as guui from '@guardian/guui/index.ts';

const scope = { ...asides, ...lists, ...figures, ...guui };

export { scope };
