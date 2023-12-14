#!/usr/bin/env node

// @ts-check

import ar from '../../apps-rendering/package.json' assert { type: 'json' };
import dcr from '../../dotcom-rendering/package.json' assert { type: 'json' };
import { log, warn } from '../log.js';

log('checking mistmached dependencies between AR & DCR');

for (const [name, dcrVersion] of Object.entries(dcr.dependencies)) {
	const arVersion = ar.dependencies[name];
	if (arVersion === undefined) continue;
	if (arVersion !== dcrVersion)
		warn(['Mismatch:', dcrVersion, '≠', arVersion, '\t', name].join(' '));
}
