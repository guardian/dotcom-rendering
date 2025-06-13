import { assertEquals, assertThrows } from 'jsr:@std/assert';
import { ABTest } from '../../types.ts';
import {
	limitServerSideTests,
	MAX_SERVER_SIDE_TESTS,
} from './limitServerSide.ts';

Deno.test(
	'limitServerSideTests - throws if the amount of tests exceeds the limit',
	() => {
		const serverSideTest: ABTest = {
			name: 'commercial-server-side',
			description: 'A server-side test',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: new Date(),
			type: 'server',
			highImpact: false,
			audienceSize: 10 / 100,
			groups: ['control', 'variant'],
		};
		assertThrows(() => {
			limitServerSideTests(
				Array.from({ length: MAX_SERVER_SIDE_TESTS + 1 }).map(
					() => serverSideTest,
				),
			);
		});
	},
);

Deno.test(
	'limitServerSideTests - passes if the amount of tests is within the limit',
	() => {
		const serverSideTest: ABTest = {
			name: 'commercial-server-side',
			description: 'A server-side test',
			owners: ['commercial.dev@guardian.co.uk'],
			status: 'ON',
			expirationDate: new Date(),
			type: 'server',
			highImpact: false,
			audienceSize: 10 / 100,
			groups: ['control', 'variant'],
		};
		assertEquals(
			limitServerSideTests(
				Array.from({ length: MAX_SERVER_SIDE_TESTS }).map(
					() => serverSideTest,
				),
			),
			true,
		);
	},
);
